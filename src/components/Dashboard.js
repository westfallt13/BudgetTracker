import React from 'react';
import { useBudget } from '../context/BudgetContext';
import Icon from './Icon';

function Dashboard() {
    const { 
        accounts, 
        transactions, 
        getTotalBalance, 
        getTotalIncome, 
        getTotalExpenses,
        getAccountBalance 
    } = useBudget();

    const totalBalance = getTotalBalance();
    const totalIncome = getTotalIncome();
    const totalExpenses = getTotalExpenses();
    const recentTransactions = [...transactions]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);

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

    return (
        <div className="content-section">
            <h2 style={{ marginBottom: '25px', color: '#2c3e50' }}>Dashboard Overview</h2>
            
            <div className="dashboard">
                <div className="stat-card">
                    <h3>Total Balance</h3>
                    <div className="amount">{formatCurrency(totalBalance)}</div>
                    <div className="subtext">{accounts.length} Account{accounts.length !== 1 ? 's' : ''}</div>
                </div>
                
                <div className="stat-card" style={{ background: 'linear-gradient(135deg, #27ae60 0%, #219653 100%)' }}>
                    <h3>Total Income</h3>
                    <div className="amount">{formatCurrency(totalIncome)}</div>
                    <div className="subtext">{transactions.filter(t => t.type === 'income').length} Transaction{transactions.filter(t => t.type === 'income').length !== 1 ? 's' : ''}</div>
                </div>
                
                <div className="stat-card" style={{ background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)' }}>
                    <h3>Total Expenses</h3>
                    <div className="amount">{formatCurrency(totalExpenses)}</div>
                    <div className="subtext">{transactions.filter(t => t.type === 'expense').length} Transaction{transactions.filter(t => t.type === 'expense').length !== 1 ? 's' : ''}</div>
                </div>
            </div>

            {accounts.length > 0 && (
                <div style={{ marginTop: '30px' }}>
                    <h3 style={{ marginBottom: '20px', color: '#2c3e50' }}>Account Balances</h3>
                    <div className="accounts-grid">
                        {accounts.map(account => (
                            <div key={account.id} className="account-card">
                                <h3>{account.name}</h3>
                                <div className="balance">{formatCurrency(getAccountBalance(account.id))}</div>
                                <div className="transactions-count">
                                    {account.type} • {transactions.filter(t => t.accountId === account.id).length} transactions
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {recentTransactions.length > 0 && (
                <div style={{ marginTop: '30px' }}>
                    <h3 style={{ marginBottom: '20px', color: '#2c3e50' }}>Recent Transactions</h3>
                    <div className="transactions-list">
                        {recentTransactions.map(transaction => {
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
                                    </div>
                                    <div className="transaction-amount">
                                        <div className={`amount-value ${transaction.type}`}>
                                            {transaction.type === 'expense' ? '-' : '+'}
                                            {formatCurrency(transaction.amount)}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {accounts.length === 0 && (
                <div className="empty-state">
                    <div className="empty-state-icon"><Icon name="bank" size={64} /></div>
                    <h3>No Accounts Yet</h3>
                    <p>Create your first account to start tracking your finances</p>
                </div>
            )}
        </div>
    );
}

export default Dashboard;
