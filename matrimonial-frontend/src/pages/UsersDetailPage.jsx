import React, { useState, useEffect } from 'react';
import API from '../api';
import './DetailedPages.css';

const UsersDetailPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [updatingUser, setUpdatingUser] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, [currentPage, search]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = () => {
            setActiveDropdown(null);
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await API.get(`/dashboard/users?per_page=20&page=${currentPage}&search=${search}`);
            if (response.data.success) {
                setUsers(response.data.data.data || []);
                setTotalPages(response.data.data.last_page || 1);
            }
        } catch (error) {
            console.error('Failed to fetch users:', error);
            alert('Failed to load users: ' + (error.response?.data?.message || error.message));
        } finally {
            setLoading(false);
        }
    };

    const updateUserMembership = async (userId, planType) => {
    try {
        setUpdatingUser(userId);
        
        console.log(`Updating user ${userId} to plan: ${planType}`);
        
        const response = await API.put(`/dashboard/users/${userId}/membership`, {
            plan_type: planType
        });

        if (response.data.success) {
            console.log('Membership update successful:', response.data);
            
            // Update the local state
            setUsers(prevUsers => 
                prevUsers.map(user => 
                    user.id === userId 
                        ? { 
                            ...user, 
                            has_active_membership: planType !== 'free',
                            current_membership_plan: planType,
                            membership_plan: planType
                        } 
                        : user
                )
            );
            setActiveDropdown(null);
            alert(response.data.message || `Membership updated to ${planType.toUpperCase()} successfully! User's plan features will be activated soon.`);
            
            // Force refresh to ensure changes are reflected
            fetchUsers();
        }
    } catch (error) {
        console.error('Failed to update user membership:', error);
        console.error('Error details:', error.response?.data);
        alert('Failed to update membership: ' + (error.response?.data?.message || error.message));
    } finally {
        setUpdatingUser(null);
    }
};

    const toggleDropdown = (userId, e) => {
        e.stopPropagation();
        setActiveDropdown(activeDropdown === userId ? null : userId);
    };

    const getMembershipBadge = (user) => {
        const plan = user.current_membership_plan || user.membership_plan || (user.has_active_membership ? 'premium assisted' : 'free');
        
        const badgeConfig = {
            free: { label: 'Free', class: 'badge', color: '#6B7280' },
            starter: { label: 'Starter', class: 'badge starter', color: '#3B82F6' },
            essential: { label: 'Essential', class: 'badge essential', color: '#8B5CF6' },
            popular: { label: 'Popular', class: 'badge popular', color: '#F59E0B' },
            'premium assisted': { label: 'Premium Assisted', class: 'badge premium', color: '#10B981' }
        };

        const config = badgeConfig[plan.toLowerCase()] || badgeConfig.free;
        
        return (
            <span className={config.class} style={{ borderLeft: `3px solid ${config.color}` }}>
                {config.label}
            </span>
        );
    };

    const getPlanDescription = (planType) => {
        const plans = {
            free: '❌ Messaging, ❌ AI Kundli, ❌ AI Companion, ❌ View Profiles, ✅ Limited Matches',
            starter: '❌ Messaging, ❌ AI Kundli, ❌ AI Companion, ✅ View Profiles, ✅ Unlimited Matches (1 Month)',
            essential: '✅ Messaging, ❌ AI Kundli, ❌ AI Companion, ✅ View Profiles, ✅ Unlimited Matches (3 Months)',
            popular: '✅ Messaging, ✅ AI Kundli, ❌ AI Companion, ✅ View Profiles, ✅ Unlimited Matches (12 Months)',
            'premium assisted': '✅ Messaging, ✅ AI Kundli, ✅ AI Companion, ✅ View Profiles, ✅ Unlimited Matches (Full Access)'
        };
        return plans[planType] || 'No plan information available';
    };

    const getPlanFeatures = (planType) => {
        const features = {
            free: ['Limited Matches'],
            starter: ['View Profiles', 'Unlimited Matches', '1 Month Duration'],
            essential: ['Messaging', 'View Profiles', 'Unlimited Matches', '3 Months Duration'],
            popular: ['Messaging', 'AI Kundli', 'View Profiles', 'Unlimited Matches', '12 Months Duration'],
            'premium assisted': ['Messaging', 'AI Kundli', 'AI Companion', 'View Profiles', 'Unlimited Matches', 'Full Access']
        };
        return features[planType] || [];
    };

    if (loading) {
        return (
            <div className="detailed-page">
                <div className="loading-spinner">Loading users...</div>
            </div>
        );
    }

    return (
        <div className="detailed-page">
            <div className="page-header">
                <h1>All Users</h1>
                <div className="page-actions">
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="search-input"
                    />
                </div>
            </div>

            <div className="table-container">
                <table className="detailed-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Profile Completion</th>
                            <th>Member Plan</th>
                            <th>Features</th>
                            <th>Joined</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td data-label="ID">{user.id}</td>
                                <td data-label="Name">{user.name}</td>
                                <td data-label="Email">{user.email}</td>
                                <td data-label="Phone">{user.phone || 'N/A'}</td>
                                <td data-label="Profile Completion">
                                    <div className="completion-bar">
                                        <div 
                                            className="completion-fill"
                                            style={{ width: `${user.profile_completion || 0}%` }}
                                        ></div>
                                        <span>{user.profile_completion || 0}%</span>
                                    </div>
                                </td>
                                <td data-label="Member Plan">
                                    {getMembershipBadge(user)}
                                </td>
                                <td data-label="Features">
                                    <div className="features-tooltip">
                                        <span className="features-info">ℹ️</span>
                                        <div className="features-content">
                                            <strong>Plan Features:</strong><br/>
                                            {getPlanDescription(user.current_membership_plan || user.membership_plan || 'free')}
                                        </div>
                                    </div>
                                </td>
                                <td data-label="Joined">{new Date(user.created_at).toLocaleDateString()}</td>
                                <td data-label="Actions">
                                    <div className="dropdown">
                                        <button 
                                            className="action-btn edit"
                                            onClick={(e) => toggleDropdown(user.id, e)}
                                            disabled={updatingUser === user.id}
                                        >
                                            {updatingUser === user.id ? 'Updating...' : 'Edit Plan'}
                                        </button>
                                        <div className={`dropdown-content ${activeDropdown === user.id ? 'show' : ''}`}>
                                            <button 
                                                onClick={(e) => updateUserMembership(user.id, 'free', e)}
                                                className={`dropdown-item ${((user.current_membership_plan || user.membership_plan) === 'free') ? 'active' : ''}`}
                                            >
                                                🆓 Free
                                            </button>
                                            <button 
                                                onClick={(e) => updateUserMembership(user.id, 'starter', e)}
                                                className={`dropdown-item ${((user.current_membership_plan || user.membership_plan) === 'starter') ? 'active' : ''}`}
                                            >
                                                ⭐ Starter (1 Month)
                                            </button>
                                            <button 
                                                onClick={(e) => updateUserMembership(user.id, 'essential', e)}
                                                className={`dropdown-item ${((user.current_membership_plan || user.membership_plan) === 'essential') ? 'active' : ''}`}
                                            >
                                                🔑 Essential (3 Months)
                                            </button>
                                            <button 
                                                onClick={(e) => updateUserMembership(user.id, 'popular', e)}
                                                className={`dropdown-item ${((user.current_membership_plan || user.membership_plan) === 'popular') ? 'active' : ''}`}
                                            >
                                                🌟 Popular (12 Months)
                                            </button>
                                            <button 
                                                onClick={(e) => updateUserMembership(user.id, 'premium assisted', e)}
                                                className={`dropdown-item ${((user.current_membership_plan || user.membership_plan) === 'premium assisted') ? 'active' : ''}`}
                                            >
                                                💎 Premium Assisted
                                            </button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="pagination">
                <button 
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                >
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button 
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default UsersDetailPage;