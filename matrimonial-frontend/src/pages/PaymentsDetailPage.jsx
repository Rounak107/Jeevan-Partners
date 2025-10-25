import React, { useState, useEffect } from 'react';
import API from '../api';
import './DetailedPages.css';

const PaymentsDetailPage = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newPayment, setNewPayment] = useState({
        user_name: '',
        user_email: '',
        amount: '',
        plan_name: '',
        payment_status: 'pending',
        payment_method: 'manual'
    });
    const [addingPayment, setAddingPayment] = useState(false);

    useEffect(() => {
        fetchPayments();
    }, [currentPage, search]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = () => {
            setActiveDropdown(null);
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

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
            alert('Failed to load payments: ' + (error.response?.data?.message || error.message));
        } finally {
            setLoading(false);
        }
    };

    const updatePaymentStatus = async (paymentId, newStatus, e) => {
        if (e) e.stopPropagation();
        
        try {
            const response = await API.put(`/dashboard/payments/${paymentId}/status`, {
                status: newStatus
            });

            if (response.data.success) {
                // Update the local state
                setPayments(prevPayments => 
                    prevPayments.map(payment => 
                        payment.id === paymentId 
                            ? { ...payment, payment_status: newStatus }
                            : payment
                    )
                );
                setActiveDropdown(null);
                alert('Payment status updated successfully!');
            }
        } catch (error) {
            console.error('Failed to update payment status:', error);
            console.error('Error details:', error.response?.data);
            alert('Failed to update payment status: ' + (error.response?.data?.message || error.message));
        }
    };

    // Helper function to generate plan_id from plan_name
    const generatePlanId = (planName) => {
        const planMap = {
            'starter': 'plan_starter',
            'basic': 'plan_basic', 
            'premium': 'plan_premium',
            'standard': 'plan_standard',
            'gold': 'plan_gold',
            'silver': 'plan_silver',
            'bronze': 'plan_bronze'
        };

        const lowerPlanName = planName.toLowerCase().trim();
        
        for (const [key, value] of Object.entries(planMap)) {
            if (lowerPlanName.includes(key)) {
                return value;
            }
        }

        // If no match found, create a simple ID
        return 'plan_' + lowerPlanName.replace(/\s+/g, '_');
    };

    const handleAddPayment = async (e) => {
        e.preventDefault();
        setAddingPayment(true);
        
        try {
            console.log('Adding payment:', newPayment);
            
            // The plan_id will be generated automatically in the backend
            const response = await API.post('/dashboard/payments', newPayment);
            
            if (response.data.success) {
                setShowAddModal(false);
                setNewPayment({
                    user_name: '',
                    user_email: '',
                    amount: '',
                    plan_name: '',
                    payment_status: 'pending',
                    payment_method: 'manual'
                });
                fetchPayments(); // Refresh the list
                alert('Payment added successfully!');
            } else {
                throw new Error(response.data.message || 'Failed to add payment');
            }
        } catch (error) {
            console.error('Failed to add payment:', error);
            console.error('Error response:', error.response?.data);
            
            let errorMessage = 'Failed to add payment: ';
            
            if (error.response?.data?.message) {
                errorMessage += error.response.data.message;
            } else if (error.response?.data?.error) {
                errorMessage += error.response.data.error;
            } else if (error.message) {
                errorMessage += error.message;
            } else {
                errorMessage += 'Unknown server error';
            }
            
            alert(errorMessage);
        } finally {
            setAddingPayment(false);
        }
    };

    const toggleDropdown = (paymentId, e) => {
        e.stopPropagation();
        setActiveDropdown(activeDropdown === paymentId ? null : paymentId);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPayment(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const resetForm = () => {
        setNewPayment({
            user_name: '',
            user_email: '',
            amount: '',
            plan_name: '',
            payment_status: 'pending',
            payment_method: 'manual'
        });
        setShowAddModal(false);
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
            {/* Add Payment Modal */}
            {showAddModal && (
                <div className="modal-overlay" onClick={resetForm}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Add New Payment</h2>
                            <button className="close-btn" onClick={resetForm}>×</button>
                        </div>
                        <form onSubmit={handleAddPayment}>
                            <div className="form-group">
                                <label>User Name *</label>
                                <input
                                    type="text"
                                    name="user_name"
                                    value={newPayment.user_name}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    required
                                    placeholder="Enter user full name"
                                />
                            </div>
                            <div className="form-group">
                                <label>User Email *</label>
                                <input
                                    type="email"
                                    name="user_email"
                                    value={newPayment.user_email}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    required
                                    placeholder="Enter user email address"
                                />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Amount (₹) *</label>
                                    <input
                                        type="number"
                                        name="amount"
                                        value={newPayment.amount}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        step="0.01"
                                        min="0"
                                        required
                                        placeholder="0.00"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Plan Name *</label>
                                    <input
                                        type="text"
                                        name="plan_name"
                                        value={newPayment.plan_name}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        required
                                        placeholder="e.g., Starter Membership"
                                        onBlur={(e) => {
                                            // Auto-suggest plan_id based on plan_name
                                            const planName = e.target.value;
                                            if (planName) {
                                                const suggestedPlanId = generatePlanId(planName);
                                                console.log('Suggested Plan ID:', suggestedPlanId);
                                            }
                                        }}
                                    />
                                    <small style={{color: '#6b7280', fontSize: '12px'}}>
                                        Plan ID will be generated automatically
                                    </small>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Payment Status</label>
                                    <select
                                        name="payment_status"
                                        value={newPayment.payment_status}
                                        onChange={handleInputChange}
                                        className="form-control"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Payment Method</label>
                                    <select
                                        name="payment_method"
                                        value={newPayment.payment_method}
                                        onChange={handleInputChange}
                                        className="form-control"
                                    >
                                        <option value="manual">Manual Entry</option>
                                        <option value="upi">UPI</option>
                                        <option value="card">Card</option>
                                        <option value="netbanking">Net Banking</option>
                                        <option value="cash">Cash</option>
                                    </select>
                                </div>
                            </div>
                            <div className="modal-actions">
                                <button 
                                    type="button" 
                                    className="btn btn-secondary" 
                                    onClick={resetForm}
                                    disabled={addingPayment}
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    className="btn btn-primary"
                                    disabled={addingPayment}
                                >
                                    {addingPayment ? 'Adding...' : 'Add Payment'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

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
                    <button 
                        className="btn btn-success"
                        onClick={() => setShowAddModal(true)}
                    >
                        + Add Payment
                    </button>
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
                            <th>Plan ID</th>
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
                                <td data-label="User">
                                    <div>
                                        <div style={{ fontWeight: '500' }}>{payment.user?.name || 'N/A'}</div>
                                        <div style={{ fontSize: '12px', color: '#6b7280' }}>{payment.user?.email || ''}</div>
                                    </div>
                                </td>
                                <td data-label="Amount">₹{payment.amount}</td>
                                <td data-label="Plan">{payment.plan_name || 'N/A'}</td>
                                <td data-label="Plan ID">
                                    <code style={{ fontSize: '11px', background: '#f3f4f6', padding: '2px 6px', borderRadius: '4px' }}>
                                        {payment.plan_id || 'N/A'}
                                    </code>
                                </td>
                                <td data-label="Status">
                                    <span className={`status-badge ${payment.payment_status}`}>
                                        {payment.payment_status}
                                    </span>
                                </td>
                                <td data-label="Payment Method">
                                    <span style={{ textTransform: 'capitalize' }}>
                                        {payment.payment_method || 'N/A'}
                                    </span>
                                </td>
                                <td data-label="Date">{new Date(payment.created_at).toLocaleString()}</td>
                                <td data-label="Actions">
                                    <div className="dropdown">
                                        <button 
                                            className="dropdown-toggle"
                                            onClick={(e) => toggleDropdown(payment.id, e)}
                                        >
                                            Edit Status
                                        </button>
                                        <div className={`dropdown-content ${activeDropdown === payment.id ? 'show' : ''}`}>
                                            <button 
                                                onClick={(e) => updatePaymentStatus(payment.id, 'pending', e)}
                                                className={`dropdown-item ${payment.payment_status === 'pending' ? 'active' : ''}`}
                                            >
                                                ⏳ Pending
                                            </button>
                                            <button 
                                                onClick={(e) => updatePaymentStatus(payment.id, 'completed', e)}
                                                className={`dropdown-item ${payment.payment_status === 'completed' ? 'active' : ''}`}
                                            >
                                                ✅ Completed
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

export default PaymentsDetailPage;