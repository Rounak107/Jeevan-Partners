import React, { useState, useEffect } from 'react';
import API from '../api';
import './DetailedPages.css';

const PaymentsDetailPage = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchPayments();
    }, [currentPage, search]);

    const fetchPayments = async () => {
        try {
            setLoading(true);
            const response = await API.get(`/dashboard/payments?per_page=20&page=${currentPage}&search=${search}`);
            if (response.data.success) {
                setPayments(response.data.data.data || []);
                setTotalPages(response.data.data.last_page || 1);
            }
        } catch (error) {
            console.error('Failed to fetch payments:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="detailed-page">
                <div className="loading-spinner">Loading payments...</div>
            </div>
        );
    }

    return (
        <div className="detailed-page">
            <div className="page-header">
                <h1>All Payments</h1>
                <div className="page-actions">
                    <input
                        type="text"
                        placeholder="Search payments..."
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
                            <th>Payment ID</th>
                            <th>User</th>
                            <th>Amount</th>
                            <th>Plan</th>
                            <th>Status</th>
                            <th>Payment Method</th>
                            <th>Date</th>
                            <th>Actions</th>
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
                                <td data-label="Payment Method">{payment.payment_method || 'N/A'}</td>
                                <td data-label="Date">{new Date(payment.created_at).toLocaleString()}</td>
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

export default PaymentsDetailPage;