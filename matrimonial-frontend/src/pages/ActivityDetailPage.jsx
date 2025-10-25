import React, { useState, useEffect } from 'react';
import API from '../api';
import './DetailedPages.css';

const ActivityDetailPage = () => {
    const [activity, setActivity] = useState({});
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('all');

    useEffect(() => {
        fetchActivity();
    }, []);

    const fetchActivity = async () => {
        try {
            setLoading(true);
            const response = await API.get('/dashboard/activity?per_page=50');
            if (response.data.success) {
                setActivity(response.data.data || {});
            }
        } catch (error) {
            console.error('Failed to fetch activity:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="detailed-page">
                <div className="loading-spinner">Loading activity...</div>
            </div>
        );
    }

    const allActivities = [
        ...(activity.recent_likes || []).map(item => ({ ...item, type: 'like' })),
        ...(activity.recent_messages || []).map(item => ({ ...item, type: 'message' })),
        ...(activity.recent_users || []).map(item => ({ ...item, type: 'user' }))
    ].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    const filteredActivities = activeTab === 'all' 
        ? allActivities 
        : allActivities.filter(item => item.type === activeTab);

    return (
        <div className="detailed-page">
            <div className="page-header">
                <h1>All Activity</h1>
                <div className="activity-tabs">
                    <button 
                        className={activeTab === 'all' ? 'active' : ''}
                        onClick={() => setActiveTab('all')}
                    >
                        All Activity
                    </button>
                    <button 
                        className={activeTab === 'like' ? 'active' : ''}
                        onClick={() => setActiveTab('like')}
                    >
                        Likes
                    </button>
                    <button 
                        className={activeTab === 'message' ? 'active' : ''}
                        onClick={() => setActiveTab('message')}
                    >
                        Messages
                    </button>
                    <button 
                        className={activeTab === 'user' ? 'active' : ''}
                        onClick={() => setActiveTab('user')}
                    >
                        Users
                    </button>
                </div>
            </div>

            <div className="activity-list-detailed">
                {filteredActivities.map((item, index) => (
                    <div key={`${item.type}-${item.id}`} className="activity-item-detailed">
                        <div className="activity-icon">
                            {item.type === 'like' && '❤️'}
                            {item.type === 'message' && '💬'}
                            {item.type === 'user' && '👤'}
                        </div>
                        <div className="activity-content-detailed">
                            {item.type === 'like' && (
                                <p>
                                    <strong>{item.sender?.name}</strong> liked 
                                    <strong> {item.profile?.user?.name}'s</strong> profile
                                </p>
                            )}
                            {item.type === 'message' && (
                                <p>
                                    <strong>{item.sender?.name}</strong> sent a message: "
                                    {item.body?.substring(0, 100)}..."
                                </p>
                            )}
                            {item.type === 'user' && (
                                <p>
                                    <strong>{item.name}</strong> joined the platform
                                </p>
                            )}
                            <span className="activity-time">
                                {new Date(item.created_at).toLocaleString()}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ActivityDetailPage;