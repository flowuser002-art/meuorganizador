import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useStore = create(
  persist(
    (set) => ({
      // User Profile
      profile: {
        name: 'John Doe',
        mainSalary: 8000,
        otherIncome: 1200,
        wealthGoal: 1000000,
        age: 30,
        retirementAge: 50,
        investorProfile: 'Moderate'
      },
      updateProfile: (data) => set((state) => ({ profile: { ...state.profile, ...data } })),

      // Accounts
      accounts: [
        { id: '1', bank: 'Nubank', type: 'Checking', balance: 5400 },
        { id: '2', bank: 'Inter', type: 'Brokerage', balance: 45000 },
      ],
      addAccount: (account) => set((state) => ({ accounts: [...state.accounts, { ...account, id: Date.now().toString() }] })),
      updateAccount: (id, updates) => set((state) => ({
        accounts: state.accounts.map(acc => acc.id === id ? { ...acc, ...updates } : acc)
      })),
      
      // Transactions
      transactions: [
        { id: 't1', accountId: '1', description: 'Salary', amount: 8000, date: new Date().toISOString(), category: 'Income', type: 'income' },
        { id: 't2', accountId: '1', description: 'Rent', amount: 2000, date: new Date().toISOString(), category: 'Housing', type: 'expense' },
        { id: 't3', accountId: '1', description: 'Groceries', amount: 450, date: new Date().toISOString(), category: 'Food', type: 'expense' },
        { id: 't4', accountId: '1', description: 'Uber', amount: 120, date: new Date().toISOString(), category: 'Transport', type: 'expense' },
      ],
      addTransaction: (tx) => set((state) => {
        // Here we also need to update the account balance
        const updatedAccounts = state.accounts.map(acc => {
          if (acc.id === tx.accountId) {
            return {
              ...acc,
              balance: acc.balance + (tx.type === 'income' ? tx.amount : -tx.amount)
            };
          }
          return acc;
        });

        return { 
          transactions: [...state.transactions, { ...tx, id: Date.now().toString(), date: new Date().toISOString() }],
          accounts: updatedAccounts
        };
      }),

      // Goals
      goals: [
        { id: '1', name: 'Emergency Fund', targetAmount: 25000, currentAmount: 18000, deadline: '2024-12-31' },
      ],
      
      // Budgets
      budgets: [
        { id: '1', category: 'Food', limit: 1200, spent: 800 },
        { id: '2', category: 'Transport', limit: 400, spent: 450 },
      ],

    }),
    {
      name: 'financial-os-storage',
    }
  )
);
