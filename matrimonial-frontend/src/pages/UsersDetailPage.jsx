import React, { useState, useEffect } from 'react';
import API from '../api';
import './DetailedPages.css';

const UsersDetailPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchUsers();
    }, [currentPage, search]);

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
        } finally {
            setLoading(false);
        }
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
                            <th>Member</th>
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
                                <td data-label="Member">
                                    {user.has_active_membership ? (
                                        <span className="badge success">Premium</span>
                                    ) : (
                                        <span className="badge">Free</span>
                                    )}
                                </td>
                                <td data-label="Joined">{new Date(user.created_at).toLocaleDateString()}</td>
                                <td data-label="Actions">
                                    <button className="action-btn view">View</button>
                                    <button className="action-btn edit">Edit</button>
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