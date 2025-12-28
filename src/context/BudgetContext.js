import React, { createContext, useState, useContext, useEffect } from 'react';

const BudgetContext = createContext();

export const useBudget = () => {
    const context = useContext(BudgetContext);
    if (!context) {
        throw new Error('useBudget must be used within BudgetProvider');
    }
    return context;
};

export const BudgetProvider = ({ children }) => {
    const [accounts, setAccounts] = useState([]);
    const [transactions, setTransactions] = useState([]);

    // Load data from localStorage on mount
    useEffect(() => {
        const savedAccounts = localStorage.getItem('budgetTrackerAccounts');
        const savedTransactions = localStorage.getItem('budgetTrackerTransactions');
        
        if (savedAccounts) {
            setAccounts(JSON.parse(savedAccounts));
        }
        if (savedTransactions) {
            setTransactions(JSON.parse(savedTransactions));
        }
    }, []);

    // Save accounts to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('budgetTrackerAccounts', JSON.stringify(accounts));
    }, [accounts]);

    // Save transactions to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('budgetTrackerTransactions', JSON.stringify(transactions));
    }, [transactions]);

    // Account operations
    const addAccount = (account) => {
        const newAccount = {
            id: Date.now().toString(),
            ...account,
            createdAt: new Date().toISOString()
        };
        setAccounts(prev => [...prev, newAccount]);
        return newAccount;
    };

    const updateAccount = (id, updates) => {
        setAccounts(prev => prev.map(acc => 
            acc.id === id ? { ...acc, ...updates } : acc
        ));
    };

    const deleteAccount = (id) => {
        setAccounts(prev => prev.filter(acc => acc.id !== id));
        // Also delete all transactions for this account
        setTransactions(prev => prev.filter(trans => trans.accountId !== id));
    };

    // Transaction operations
    const addTransaction = (transaction) => {
        const newTransaction = {
            id: Date.now().toString(),
            ...transaction,
            createdAt: new Date().toISOString()
        };
        setTransactions(prev => [...prev, newTransaction]);
        return newTransaction;
    };

    const updateTransaction = (id, updates) => {
        setTransactions(prev => prev.map(trans => 
            trans.id === id ? { ...trans, ...updates } : trans
        ));
    };

    const deleteTransaction = (id) => {
        setTransactions(prev => prev.filter(trans => trans.id !== id));
    };

    // Calculate account balance
    const getAccountBalance = (accountId) => {
        const account = accounts.find(acc => acc.id === accountId);
        if (!account) return 0;

        const accountTransactions = transactions.filter(trans => trans.accountId === accountId);
        const transactionsTotal = accountTransactions.reduce((sum, trans) => {
            return sum + (trans.type === 'income' ? trans.amount : -trans.amount);
        }, 0);

        return account.initialBalance + transactionsTotal;
    };

    // Get total balance across all accounts
    const getTotalBalance = () => {
        return accounts.reduce((sum, account) => {
            return sum + getAccountBalance(account.id);
        }, 0);
    };

    // Get total income
    const getTotalIncome = () => {
        return transactions
            .filter(trans => trans.type === 'income')
            .reduce((sum, trans) => sum + trans.amount, 0);
    };

    // Get total expenses
    const getTotalExpenses = () => {
        return transactions
            .filter(trans => trans.type === 'expense')
            .reduce((sum, trans) => sum + trans.amount, 0);
    };

    // Get transactions for an account
    const getAccountTransactions = (accountId) => {
        return transactions.filter(trans => trans.accountId === accountId);
    };

    const value = {
        accounts,
        transactions,
        addAccount,
        updateAccount,
        deleteAccount,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        getAccountBalance,
        getTotalBalance,
        getTotalIncome,
        getTotalExpenses,
        getAccountTransactions
    };

    return (
        <BudgetContext.Provider value={value}>
            {children}
        </BudgetContext.Provider>
    );
};
