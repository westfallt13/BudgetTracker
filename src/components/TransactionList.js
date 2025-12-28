import React, { useState } from 'react';
import { useBudget } from '../context/BudgetContext';
import Icon from './Icon';

function TransactionList() {
    const { 
        accounts, 
        transactions, 
        addTransaction, 
        updateTransaction, 
        deleteTransaction 
    } = useBudget();
    
    const [showModal, setShowModal] = useState(false);
    const [editingTransaction, setEditingTransaction] = useState(null);
    const [filterAccount, setFilterAccount] = useState('all');
    const [filterType, setFilterType] = useState('all');
    const [filterCategory, setFilterCategory] = useState('all');
    const [formData, setFormData] = useState({
        accountId: '',
        type: 'expense',
        amount: 0,
        description: '',
        category: '',
        date: new Date().toISOString().split('T')[0],
        notes: ''
    });

    const categories = [
        'Food & Dining',
        'Transportation',
        'Shopping',
        'Entertainment',
        'Bills & Utilities',
        'Healthcare',
        'Education',
        'Travel',
        'Salary',
        'Investment',
        'Gift',
        'Other'
    ];

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const transactionData = {
            ...formData,
            amount: parseFloat(formData.amount) || 0
        };

        if (editingTransaction) {
            updateTransaction(editingTransaction.id, transactionData);
        } else {
            addTransaction(transactionData);
        }

        resetForm();
    };

    const resetForm = () => {
        setFormData({
            accountId: accounts.length > 0 ? accounts[0].id : '',
            type: 'expense',
            amount: 0,
            description: '',
            category: '',
            date: new Date().toISOString().split('T')[0],
            notes: ''
        });
        setEditingTransaction(null);
        setShowModal(false);
    };

    const handleEdit = (transaction) => {
        setEditingTransaction(transaction);
        setFormData({
            accountId: transaction.accountId,
            type: transaction.type,
            amount: transaction.amount,
            description: transaction.description,
            category: transaction.category || '',
            date: transaction.date,
            notes: transaction.notes || ''
        });
        setShowModal(true);
    };

    const handleDelete = (transactionId) => {
        if (window.confirm('Are you sure you want to delete this transaction?')) {
            deleteTransaction(transactionId);
        }
    };

    const handleAddTransaction = () => {
        if (accounts.length === 0) {
            alert('Please create an account first before adding transactions.');
            return;
        }
        setFormData({
            ...formData,
            accountId: accounts[0].id
        });
        setShowModal(true);
    };

    // Filter transactions
    const filteredTransactions = transactions.filter(transaction => {
        if (filterAccount !== 'all' && transaction.accountId !== filterAccount) return false;
        if (filterType !== 'all' && transaction.type !== filterType) return false;
        if (filterCategory !== 'all' && transaction.category !== filterCategory) return false;
        return true;
    }).sort((a, b) => new Date(b.date) - new Date(a.date));

    // Get all unique categories from transactions
    const usedCategories = [...new Set(transactions.map(t => t.category).filter(Boolean))];

    return (
        <div className="content-section">
            <div className="transactions-header">
                <h2>Transactions</h2>
                <button className="btn btn-primary" onClick={handleAddTransaction}>
                    <Icon name="plus" size={16} /> Add Transaction
                </button>
            </div>

            {accounts.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-state-icon"><Icon name="credit-card" size={64} /></div>
                    <h3>No Accounts Available</h3>
                    <p>Create an account first to start adding transactions</p>
                </div>
            ) : (
                <>
                    <div className="filter-group">
                        <select value={filterAccount} onChange={(e) => setFilterAccount(e.target.value)}>
                            <option value="all">All Accounts</option>
                            {accounts.map(account => (
                                <option key={account.id} value={account.id}>{account.name}</option>
                            ))}
                        </select>

                        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                            <option value="all">All Types</option>
                            <option value="income">Income</option>
                            <option value="expense">Expense</option>
                        </select>

                        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
                            <option value="all">All Categories</option>
                            {usedCategories.map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>

                    {filteredTransactions.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-state-icon"><Icon name="credit-card" size={64} /></div>
                            <h3>No Transactions Yet</h3>
                            <p>Start tracking your income and expenses</p>
                            <button className="btn btn-primary" onClick={handleAddTransaction}>
                                Add Transaction
                            </button>
                        </div>
                    ) : (
                        <div className="transactions-container">
                            <div className="transactions-list">
                                {filteredTransactions.map(transaction => {
                                    const account = accounts.find(acc => acc.id === transaction.accountId);
                                    return (
                                        <div key={transaction.id} className={`transaction-item ${transaction.type}`}>
                                            <div className="transaction-info">
                                                <h4>{transaction.description}</h4>
                                                <div className="transaction-meta">
                                                    <span><Icon name="bank" size={14} /> {account?.name || 'Unknown Account'}</span>
                                                    <span><Icon name="calendar" size={14} /> {formatDate(transaction.date)}</span>
                                                    {transaction.category && (
                                                        <span className="category-badge">{transaction.category}</span>
                                                    )}
                                                </div>
                                                {transaction.notes && (
                                                    <p style={{ marginTop: '8px', fontSize: '0.9rem', color: '#666' }}>
                                                        {transaction.notes}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="transaction-amount">
                                                <div className={`amount-value ${transaction.type}`}>
                                                    {transaction.type === 'expense' ? '-' : '+'}
                                                    {formatCurrency(transaction.amount)}
                                                </div>
                                                <div className="transaction-actions">
                                                    <button 
                                                        className="btn btn-secondary btn-small" 
                                                        onClick={() => handleEdit(transaction)}
                                                    >
                                                        <Icon name="pencil" size={14} /> Edit
                                                    </button>
                                                    <button 
                                                        className="btn btn-danger btn-small" 
                                                        onClick={() => handleDelete(transaction.id)}
                                                    >
                                                        <Icon name="trash" size={14} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </>
            )}

            {showModal && (
                <div className="modal-overlay" onClick={resetForm}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>{editingTransaction ? 'Edit Transaction' : 'Add New Transaction'}</h2>
                            <button className="close-btn" onClick={resetForm}><Icon name="x" size={20} /></button>
                        </div>
                        
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Account *</label>
                                <select
                                    value={formData.accountId}
                                    onChange={(e) => setFormData({...formData, accountId: e.target.value})}
                                    required
                                >
                                    {accounts.map(account => (
                                        <option key={account.id} value={account.id}>
                                            {account.name} ({account.type})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Type *</label>
                                    <select
                                        value={formData.type}
                                        onChange={(e) => setFormData({...formData, type: e.target.value})}
                                        required
                                    >
                                        <option value="expense">Expense</option>
                                        <option value="income">Income</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Amount *</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={formData.amount}
                                        onChange={(e) => setFormData({...formData, amount: e.target.value})}
                                        placeholder="0.00"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Description *</label>
                                <input
                                    type="text"
                                    value={formData.description}
                                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                                    placeholder="e.g., Grocery shopping"
                                    required
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Category</label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                                    >
                                        <option value="">Select category...</option>
                                        {categories.map(category => (
                                            <option key={category} value={category}>{category}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Date *</label>
                                    <input
                                        type="date"
                                        value={formData.date}
                                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Notes (Optional)</label>
                                <textarea
                                    value={formData.notes}
                                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                                    placeholder="Add any additional notes..."
                                />
                            </div>

                            <div className="modal-actions">
                                <button type="button" className="btn btn-secondary" onClick={resetForm}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    {editingTransaction ? 'Update Transaction' : 'Add Transaction'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TransactionList;
