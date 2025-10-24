import React, { useState, useEffect } from 'react';
import API from '../api';
import './DashboardPage.css';

const DashboardPage = () => {
    const [stats, setStats] = useState(null);
    const [users, setUsers] = useState([]);
    const [payments, setPayments] = useState([]);
    const [activity, setActivity] = useState({});
    const [activeTab, setActiveTab] = useState('overview');
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        checkAuthAndFetchData();
    }, []);

    const checkAuthAndFetchData = async () => {
        try {
            setLoading(true);
            
            // First, check if we're authenticated
            const authCheck = await API.get('/test-auth-check');
            console.log('Auth check result:', authCheck.data);
            setIsAuthenticated(true);
            
            // If authenticated, fetch dashboard data
            await fetchDashboardData();
            
        } catch (error) {
            console.error('Authentication check failed:', error);
            setIsAuthenticated(false);
            
            if (error.response?.status === 401) {
                console.log('User not authenticated, redirecting to login...');
                // Redirect to login
                window.location.href = '/login';
                return;
            }
        } finally {
            setLoading(false);
        }
    };

   const fetchDashboardData = async () => {
    try {
        const [statsRes, usersRes, paymentsRes, activityRes] = await Promise.all([
            API.get('/dashboard/stats'),        // Add /api prefix
            API.get('/dashboard/users?per_page=5'),
            API.get('/dashboard/payments?per_page=5'),
            API.get('/dashboard/activity?per_page=10')
        ]);

            console.log('Dashboard API Responses:', {
                stats: statsRes.data,
                users: usersRes.data,
                payments: paymentsRes.data,
                activity: activityRes.data
            });

            if (statsRes.data && statsRes.data.success) setStats(statsRes.data.data);
            else console.error('Stats API error:', statsRes.data);

            if (usersRes.data && usersRes.data.success) setUsers(usersRes.data.data?.data || []);
            else console.error('Users API error:', usersRes.data);

            if (paymentsRes.data && paymentsRes.data.success) setPayments(paymentsRes.data.data?.data || []);
            else console.error('Payments API error:', paymentsRes.data);

            if (activityRes.data && activityRes.data.success) setActivity(activityRes.data.data || {});
            else console.error('Activity API error:', activityRes.data);

        } catch (error) {
            console.error('Failed to fetch dashboard data:', error);
            console.error('Error details:', error.response?.data);
            
            // Set empty states
            setStats(null);
            setUsers([]);
            setPayments([]);
            setActivity({});
        }
    };

    if (loading) {
        return (
            <div className="dashboard-loading">
                <div className="loading-spinner">
                    {isAuthenticated ? 'Loading Dashboard...' : 'Checking authentication...'}
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="dashboard-loading">
                <div className="loading-spinner">
                    Redirecting to login...
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard-page">
            <div className="dashboard-header">
                <h1>Admin Dashboard</h1>
                <p>Manage your matrimonial platform</p>
            </div>

            {/* Navigation Tabs */}
            <div className="dashboard-tabs">
                <button 
                    className={activeTab === 'overview' ? 'active' : ''}
                    onClick={() => setActiveTab('overview')}
                >
                    📊 Overview
                </button>
                <button 
                    className={activeTab === 'users' ? 'active' : ''}
                    onClick={() => setActiveTab('users')}
                >
                    👥 Users
                </button>
                <button 
                    className={activeTab === 'payments' ? 'active' : ''}
                    onClick={() => setActiveTab('payments')}
                >
                    💰 Payments
                </button>
                <button 
                    className={activeTab === 'activity' ? 'active' : ''}
                    onClick={() => setActiveTab('activity')}
                >
                    🔥 Activity
                </button>
            </div>

            {/* Tab Content */}
            <div className="dashboard-content">
                {activeTab === 'overview' && <OverviewTab stats={stats} />}
                {activeTab === 'users' && <UsersTab users={users} />}
                {activeTab === 'payments' && <PaymentsTab payments={payments} />}
                {activeTab === 'activity' && <ActivityTab activity={activity} />}
            </div>
        </div>
    );
};

// Overview Tab Component
const OverviewTab = ({ stats }) => {
    if (!stats) return <div>No data available</div>;

    return (
        <div className="overview-tab">
            {/* Statistics Cards */}
            <div className="stats-grid">
                <StatCard 
                    title="Total Users" 
                    value={stats.users.total}
                    icon="👥"
                    color="#3B82F6"
                />
                <StatCard 
                    title="Profile Completion" 
                    value={`${stats.users.completion_rate}%`}
                    icon="✅"
                    color="#10B981"
                />
                <StatCard 
                    title="Total Revenue" 
                    value={`₹${stats.payments.revenue}`}
                    icon="💰"
                    color="#F59E0B"
                />
                <StatCard 
                    title="Total Likes" 
                    value={stats.engagement.total_likes}
                    icon="❤️"
                    color="#EF4444"
                />
                <StatCard 
                    title="Total Messages" 
                    value={stats.engagement.total_messages}
                    icon="💬"
                    color="#8B5CF6"
                />
                <StatCard 
                    title="Active Conversations" 
                    value={stats.engagement.total_conversations}
                    icon="🔗"
                    color="#06B6D4"
                />
            </div>

            {/* Detailed Stats */}
            <div className="detailed-stats">
                <div className="stat-section">
                    <h3>User Analytics</h3>
                    <div className="stat-list">
                        <div className="stat-item">
                            <span>Users with Profile:</span>
                            <strong>{stats.users.with_profile}</strong>
                        </div>
                        <div className="stat-item">
                            <span>Users without Profile:</span>
                            <strong>{stats.users.without_profile}</strong>
                        </div>
                        <div className="stat-item">
                            <span>New Users (7 days):</span>
                            <strong>{stats.users.recent}</strong>
                        </div>
                    </div>
                </div>

                <div className="stat-section">
                    <h3>Payment Analytics</h3>
                    <div className="stat-list">
                        <div className="stat-item">
                            <span>Successful Payments:</span>
                            <strong>{stats.payments.successful}</strong>
                        </div>
                        <div className="stat-item">
                            <span>Pending Payments:</span>
                            <strong>{stats.payments.pending}</strong>
                        </div>
                        <div className="stat-item">
                            <span>Total Transactions:</span>
                            <strong>{stats.payments.total}</strong>
                        </div>
                    </div>
                </div>

                <div className="stat-section">
                    <h3>Engagement Analytics</h3>
                    <div className="stat-list">
                        <div className="stat-item">
                            <span>Recent Likes (7 days):</span>
                            <strong>{stats.engagement.recent_likes}</strong>
                        </div>
                        <div className="stat-item">
                            <span>Recent Messages (7 days):</span>
                            <strong>{stats.engagement.recent_messages}</strong>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Users Tab Component
const UsersTab = ({ users }) => {
    return (
        <div className="users-tab">
            <h3>Recent Users</h3>
            <div className="users-table">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Profile Completion</th>
                            <th>Member</th>
                            <th>Joined</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.phone || 'N/A'}</td>
                                <td>
                                    <div className="completion-bar">
                                        <div 
                                            className="completion-fill"
                                            style={{ width: `${user.profile_completion || 0}%` }}
                                        ></div>
                                        <span>{user.profile_completion || 0}%</span>
                                    </div>
                                </td>
                                <td>
                                    {user.has_active_membership ? (
                                        <span className="badge success">Premium</span>
                                    ) : (
                                        <span className="badge">Free</span>
                                    )}
                                </td>
                                <td>{new Date(user.created_at).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// Payments Tab Component
const PaymentsTab = ({ payments }) => {
    return (
        <div className="payments-tab">
            <h3>Recent Payments</h3>
            <div className="payments-table">
                <table>
                    <thead>
                        <tr>
                            <th>Payment ID</th>
                            <th>User</th>
                            <th>Amount</th>
                            <th>Plan</th>
                            <th>Status</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map(payment => (
                            <tr key={payment.id}>
                                <td>{payment.id}</td>
                                <td>{payment.user?.name || 'N/A'}</td>
                                <td>₹{payment.amount}</td>
                                <td>{payment.plan_name || 'N/A'}</td>
                                <td>
                                    <span className={`status-badge ${payment.status}`}>
                                        {payment.status}
                                    </span>
                                </td>
                                <td>{new Date(payment.created_at).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// Activity Tab Component
const ActivityTab = ({ activity }) => {
    return (
        <div className="activity-tab">
            <div className="activity-columns">
                {/* Recent Likes */}
                <div className="activity-column">
                    <h4>Recent Likes ❤️</h4>
                    <div className="activity-list">
                        {activity.recent_likes?.map(like => (
                            <div key={like.id} className="activity-item">
                                <div className="activity-content">
                                    <strong>{like.sender?.name}</strong> liked 
                                    <strong>{like.profile?.user?.name}'s</strong> profile
                                </div>
                                <div className="activity-time">
                                    {new Date(like.created_at).toLocaleString()}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Messages */}
                <div className="activity-column">
                    <h4>Recent Messages 💬</h4>
                    <div className="activity-list">
                        {activity.recent_messages?.map(message => (
                            <div key={message.id} className="activity-item">
                                <div className="activity-content">
                                    <strong>{message.sender?.name}:</strong> 
                                    {message.body?.substring(0, 50)}...
                                </div>
                                <div className="activity-time">
                                    {new Date(message.created_at).toLocaleString()}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Users */}
                <div className="activity-column">
                    <h4>Recent Users 👥</h4>
                    <div className="activity-list">
                        {activity.recent_users?.map(user => (
                            <div key={user.id} className="activity-item">
                                <div className="activity-content">
                                    <strong>{user.name}</strong> joined
                                </div>
                                <div className="activity-time">
                                    {new Date(user.created_at).toLocaleString()}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Stat Card Component
const StatCard = ({ title, value, icon, color }) => {
    return (
        <div className="stat-card" style={{ borderTopColor: color }}>
            <div className="stat-icon" style={{ backgroundColor: color }}>
                {icon}
            </div>
            <div className="stat-content">
                <h3>{value}</h3>
                <p>{title}</p>
            </div>
        </div>
    );
};

export default DashboardPage;