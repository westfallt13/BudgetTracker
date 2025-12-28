import React, { useState } from 'react';
import { BudgetProvider } from './context/BudgetContext';
import Dashboard from './components/Dashboard';
import AccountList from './components/AccountList';
import TransactionList from './components/TransactionList';
import Icon from './components/Icon';
import './styles.css';

function App() {
    const [activeTab, setActiveTab] = useState('dashboard');

    return (
        <BudgetProvider>
            <div className="app-container">
                <header className="app-header">
                    <h1><Icon name="money-bag" size={32} /> Budget Tracker</h1>
                    <p>Manage your finances across multiple accounts</p>
                </header>

                <nav className="nav-tabs">
                    <button 
                        className={`nav-tab ${activeTab === 'dashboard' ? 'active' : ''}`}
                        onClick={() => setActiveTab('dashboard')}
                    >
                        <Icon name="chart" size={18} /> Dashboard
                    </button>
                    <button 
                        className={`nav-tab ${activeTab === 'accounts' ? 'active' : ''}`}
                        onClick={() => setActiveTab('accounts')}
                    >
                        <Icon name="bank" size={18} /> Accounts
                    </button>
                    <button 
                        className={`nav-tab ${activeTab === 'transactions' ? 'active' : ''}`}
                        onClick={() => setActiveTab('transactions')}
                    >
                        <Icon name="credit-card" size={18} /> Transactions
                    </button>
                </nav>

                <main>
                    {activeTab === 'dashboard' && <Dashboard />}
                    {activeTab === 'accounts' && <AccountList />}
                    {activeTab === 'transactions' && <TransactionList />}
                </main>
            </div>
        </BudgetProvider>
    );
}

export default App;
