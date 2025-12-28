import React, { useState } from 'react';
import { useBudget } from '../context/BudgetContext';
import Icon from './Icon';

function AccountList() {
    const { accounts, addAccount, updateAccount, deleteAccount, getAccountBalance, getAccountTransactions } = useBudget();
    const [showModal, setShowModal] = useState(false);
    const [editingAccount, setEditingAccount] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        type: 'Checking',
        initialBalance: 0,
        description: ''
    });

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const accountData = {
            ...formData,
            initialBalance: parseFloat(formData.initialBalance) || 0
        };

        if (editingAccount) {
            updateAccount(editingAccount.id, accountData);
        } else {
            addAccount(accountData);
        }

        resetForm();
    };

    const resetForm = () => {
        setFormData({
            name: '',
            type: 'Checking',
            initialBalance: 0,
            description: ''
        });
        setEditingAccount(null);
        setShowModal(false);
    };

    const handleEdit = (account) => {
        setEditingAccount(account);
        setFormData({
            name: account.name,
            type: account.type,
            initialBalance: account.initialBalance,
            description: account.description || ''
        });
        setShowModal(true);
    };

    const handleDelete = (accountId) => {
        if (window.confirm('Are you sure you want to delete this account? All associated transactions will also be deleted.')) {
            deleteAccount(accountId);
        }
    };

    return (
        <div className="content-section">
            <div className="transactions-header">
                <h2>Bank Accounts</h2>
                <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                    <Icon name="plus" size={16} /> Add Account
                </button>
            </div>

            {accounts.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-state-icon"><Icon name="bank" size={64} /></div>
                    <h3>No Accounts Yet</h3>
                    <p>Create your first bank account to start tracking your finances</p>
                    <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                        Create Account
                    </button>
                </div>
            ) : (
                <div className="accounts-grid">
                    {accounts.map(account => (
                        <div key={account.id} className="account-card">
                            <h3>{account.name}</h3>
                            <div className="balance">{formatCurrency(getAccountBalance(account.id))}</div>
                            <div className="transactions-count">
                                {account.type} • {getAccountTransactions(account.id).length} transactions
                            </div>
                            {account.description && (
                                <p style={{ fontSize: '0.9rem', opacity: 0.9, marginTop: '10px' }}>
                                    {account.description}
                                </p>
                            )}
                            <div className="actions">
                                <button className="btn btn-secondary btn-small" onClick={() => handleEdit(account)}>
                                    <Icon name="pencil" size={14} /> Edit
                                </button>
                                <button className="btn btn-danger btn-small" onClick={() => handleDelete(account.id)}>
                                    <Icon name="trash" size={14} /> Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {showModal && (
                <div className="modal-overlay" onClick={resetForm}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>{editingAccount ? 'Edit Account' : 'Add New Account'}</h2>
                            <button className="close-btn" onClick={resetForm}><Icon name="x" size={20} /></button>
                        </div>
                        
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Account Name *</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    placeholder="e.g., Chase Checking"
                                    required
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Account Type *</label>
                                    <select
                                        value={formData.type}
                                        onChange={(e) => setFormData({...formData, type: e.target.value})}
                                        required
                                    >
                                        <option value="Checking">Checking</option>
                                        <option value="Savings">Savings</option>
                                        <option value="Credit Card">Credit Card</option>
                                        <option value="Cash">Cash</option>
                                        <option value="Investment">Investment</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Initial Balance *</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={formData.initialBalance}
                                        onChange={(e) => setFormData({...formData, initialBalance: e.target.value})}
                                        placeholder="0.00"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Description (Optional)</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                                    placeholder="Add any notes about this account..."
                                />
                            </div>

                            <div className="modal-actions">
                                <button type="button" className="btn btn-secondary" onClick={resetForm}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    {editingAccount ? 'Update Account' : 'Create Account'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AccountList;
