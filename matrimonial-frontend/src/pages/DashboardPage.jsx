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
    const [lastUpdated, setLastUpdated] = useState(null);

    useEffect(() => {
        checkAuthAndFetchData();
        
        // Set up auto-refresh every 30 seconds
        const interval = setInterval(() => {
            if (isAuthenticated) {
                fetchDashboardData();
            }
        }, 30000);

        return () => clearInterval(interval);
    }, [isAuthenticated]);

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
                API.get('/dashboard/stats'),
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
            if (usersRes.data && usersRes.data.success) setUsers(usersRes.data.data?.data || []);
            if (paymentsRes.data && paymentsRes.data.success) setPayments(paymentsRes.data.data?.data || []);
            if (activityRes.data && activityRes.data.success) setActivity(activityRes.data.data || {});

            setLastUpdated(new Date());
            
        } catch (error) {
            console.error('Failed to fetch dashboard data:', error);
            console.error('Error details:', error.response?.data);
            
            setStats(null);
            setUsers([]);
            setPayments([]);
            setActivity({});
        }
    };

    const refreshData = () => {
        fetchDashboardData();
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
                <div className="header-content">
                    <div>
                        <h1>Admin Dashboard</h1>
                        <p>Manage your matrimonial platform</p>
                    </div>
                    <div className="header-actions">
                        {lastUpdated && (
                            <span className="last-updated">
                                Last updated: {lastUpdated.toLocaleTimeString()}
                            </span>
                        )}
                        <button className="refresh-btn" onClick={refreshData}>
                            🔄 Refresh
                        </button>
                    </div>
                </div>
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
    if (!stats) return <div className="no-data">No data available</div>;

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

            {/* Detailed Stats in Beautiful Boxes */}
            <div className="analytics-grid">
                {/* User Analytics Box */}
                <div className="analytics-box">
                    <div className="analytics-header">
                        <h3>👥 User Analytics</h3>
                    </div>
                    <div className="analytics-content">
                        <div className="stat-item-box">
                            <span className="stat-label">Users with Profile:</span>
                            <span className="stat-value">{stats.users.with_profile}</span>
                        </div>
                        <div className="stat-item-box">
                            <span className="stat-label">Users without Profile:</span>
                            <span className="stat-value">{stats.users.without_profile}</span>
                        </div>
                        <div className="stat-item-box">
                            <span className="stat-label">New Users (7 days):</span>
                            <span className="stat-value highlight">{stats.users.recent}</span>
                        </div>
                    </div>
                </div>

                {/* Payment Analytics Box - Only show if there are payments */}
                {stats.payments.total > 0 && (
                    <div className="analytics-box">
                        <div className="analytics-header">
                            <h3>💰 Payment Analytics</h3>
                        </div>
                        <div className="analytics-content">
                            <div className="stat-item-box">
                                <span className="stat-label">Successful Payments:</span>
                                <span className="stat-value success">{stats.payments.successful}</span>
                            </div>
                            <div className="stat-item-box">
                                <span className="stat-label">Pending Payments:</span>
                                <span className="stat-value warning">{stats.payments.pending}</span>
                            </div>
                            <div className="stat-item-box">
                                <span className="stat-label">Total Transactions:</span>
                                <span className="stat-value">{stats.payments.total}</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Engagement Analytics Box */}
                <div className="analytics-box">
                    <div className="analytics-header">
                        <h3>🔥 Engagement Analytics</h3>
                    </div>
                    <div className="analytics-content">
                        <div className="stat-item-box">
                            <span className="stat-label">Recent Likes (7 days):</span>
                            <span className="stat-value highlight">{stats.engagement.recent_likes}</span>
                        </div>
                        <div className="stat-item-box">
                            <span className="stat-label">Recent Messages (7 days):</span>
                            <span className="stat-value highlight">{stats.engagement.recent_messages}</span>
                        </div>
                        <div className="stat-item-box">
                            <span className="stat-label">Total Conversations:</span>
                            <span className="stat-value">{stats.engagement.total_conversations}</span>
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
            <div className="tab-header">
                <h3>Recent Users</h3>
                <a href="/dashboard/users" className="view-all-link">
                    View All Users →
                </a>
            </div>
            <div className="table-container">
                <table className="responsive-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Profile Completion</th>
                            <th>Member</th>
                            <th>Joined</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td data-label="ID">{user.id}</td>
                                <td data-label="Name">{user.name}</td>
                                <td data-label="Email">{user.email}</td>
                                <td data-label="Profile Completion">
                                    <div className="completion-bar">
                                        <div 
                                            className="completion-fill"
                                            style={{ width: `${user.profile_completion || 0}%` }}
                                        ></div>
                                        <span>{user.profile_completion || 0}%</span>
                                    </div>
                                </td>
                                <td data-label="Member">
                                    {user.has_active_membership ? (
                                        <span className="badge success">Premium</span>
                                    ) : (
                                        <span className="badge">Free</span>
                                    )}
                                </td>
                                <td data-label="Joined">{new Date(user.created_at).toLocaleDateString()}</td>
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
            <div className="tab-header">
                <h3>Recent Payments</h3>
                <a href="/dashboard/payments" className="view-all-link">
                    View All Payments →
                </a>
            </div>
            <div className="table-container">
                <table className="responsive-table">
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
                                <td data-label="Payment ID">{payment.id}</td>
                                <td data-label="User">{payment.user?.name || 'N/A'}</td>
                                <td data-label="Amount">₹{payment.amount}</td>
                                <td data-label="Plan">{payment.plan_name || 'N/A'}</td>
                                <td data-label="Status">
                                    <span className={`status-badge ${payment.payment_status}`}>
                                        {payment.payment_status}
                                    </span>
                                </td>
                                <td data-label="Date">{new Date(payment.created_at).toLocaleDateString()}</td>
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
            <div className="tab-header">
                <h3>Recent Activity</h3>
                <a href="/dashboard/activity" className="view-all-link">
                    View All Activity →
                </a>
            </div>
            
            <div className="activity-cards-grid">
                {/* Recent Likes Card */}
                <div className="activity-card">
                    <div className="activity-card-header">
                        <h4>❤️ Recent Likes</h4>
                        <span className="activity-count">{activity.recent_likes?.length || 0}</span>
                    </div>
                    <div className="activity-card-content">
                        {activity.recent_likes?.length > 0 ? (
                            activity.recent_likes.map(like => (
                                <div key={like.id} className="activity-item-card">
                                    <div className="activity-avatar">
                                        {like.sender?.name?.charAt(0) || 'U'}
                                    </div>
                                    <div className="activity-details">
                                        <p className="activity-text">
                                            <strong>{like.sender?.name}</strong> liked{" "}
                                            <strong>{like.profile?.user?.name}'s</strong> profile
                                        </p>
                                        <span className="activity-time">
                                            {new Date(like.created_at).toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="no-activity">No recent likes</div>
                        )}
                    </div>
                </div>

                {/* Recent Messages Card */}
                <div className="activity-card">
                    <div className="activity-card-header">
                        <h4>💬 Recent Messages</h4>
                        <span className="activity-count">{activity.recent_messages?.length || 0}</span>
                    </div>
                    <div className="activity-card-content">
                        {activity.recent_messages?.length > 0 ? (
                            activity.recent_messages.map(message => (
                                <div key={message.id} className="activity-item-card">
                                    <div className="activity-avatar">
                                        {message.sender?.name?.charAt(0) || 'U'}
                                    </div>
                                    <div className="activity-details">
                                        <p className="activity-text">
                                            <strong>{message.sender?.name}:</strong>{" "}
                                            {message.body?.substring(0, 50)}...
                                        </p>
                                        <span className="activity-time">
                                            {new Date(message.created_at).toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="no-activity">No recent messages</div>
                        )}
                    </div>
                </div>

                {/* Recent Users Card */}
                <div className="activity-card">
                    <div className="activity-card-header">
                        <h4>👥 Recent Users</h4>
                        <span className="activity-count">{activity.recent_users?.length || 0}</span>
                    </div>
                    <div className="activity-card-content">
                        {activity.recent_users?.length > 0 ? (
                            activity.recent_users.map(user => (
                                <div key={user.id} className="activity-item-card">
                                    <div className="activity-avatar">
                                        {user.name?.charAt(0) || 'U'}
                                    </div>
                                    <div className="activity-details">
                                        <p className="activity-text">
                                            <strong>{user.name}</strong> joined
                                        </p>
                                        <span className="activity-time">
                                            {new Date(user.created_at).toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="no-activity">No recent users</div>
                        )}
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