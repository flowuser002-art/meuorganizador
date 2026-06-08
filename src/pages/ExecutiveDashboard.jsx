import { useMemo } from 'react';
import styles from './ExecutiveDashboard.module.css';
import { TrendingUp, Wallet, ArrowDownRight, ArrowUpRight, Target, AlertTriangle } from 'lucide-react';
import { useStore } from '../store/useStore';
import { formatCurrency, formatPercentage } from '../utils/formatters';

export function ExecutiveDashboard() {
  const accounts = useStore((state) => state.accounts);
  const transactions = useStore((state) => state.transactions);

  // Derived state
  const totalNetWorth = useMemo(() => {
    return accounts.reduce((acc, account) => acc + account.balance, 0);
  }, [accounts]);

  const currentMonthTransactions = useMemo(() => {
    const now = new Date();
    return transactions.filter(tx => {
      const txDate = new Date(tx.date);
      return txDate.getMonth() === now.getMonth() && txDate.getFullYear() === now.getFullYear();
    });
  }, [transactions]);

  const monthlyIncome = useMemo(() => {
    return currentMonthTransactions
      .filter(tx => tx.type === 'income')
      .reduce((acc, tx) => acc + tx.amount, 0);
  }, [currentMonthTransactions]);

  const monthlyExpenses = useMemo(() => {
    return currentMonthTransactions
      .filter(tx => tx.type === 'expense')
      .reduce((acc, tx) => acc + tx.amount, 0);
  }, [currentMonthTransactions]);

  const savingsRate = useMemo(() => {
    if (monthlyIncome === 0) return 0;
    const saved = monthlyIncome - monthlyExpenses;
    return saved > 0 ? (saved / monthlyIncome) * 100 : 0;
  }, [monthlyIncome, monthlyExpenses]);

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Executive Dashboard</h1>
          <p className={styles.subtitle}>Your financial overview at a glance.</p>
        </div>
        <button className={styles.primaryAction}>+ New Transaction</button>
      </header>

      <section className={styles.overviewCards}>
        <div className={`${styles.card} glass`}>
          <div className={styles.cardHeader}>
            <span className={styles.cardTitle}>Total Net Worth</span>
            <div className={`${styles.iconWrapper} ${styles.info}`}>
              <Wallet size={20} />
            </div>
          </div>
          <div className={styles.cardBody}>
            <h2 className={styles.amount}>{formatCurrency(totalNetWorth)}</h2>
          </div>
        </div>

        <div className={`${styles.card} glass`}>
          <div className={styles.cardHeader}>
            <span className={styles.cardTitle}>Monthly Income</span>
            <div className={`${styles.iconWrapper} ${styles.success}`}>
              <ArrowUpRight size={20} />
            </div>
          </div>
          <div className={styles.cardBody}>
            <h2 className={styles.amount}>{formatCurrency(monthlyIncome)}</h2>
          </div>
        </div>

        <div className={`${styles.card} glass`}>
          <div className={styles.cardHeader}>
            <span className={styles.cardTitle}>Monthly Expenses</span>
            <div className={`${styles.iconWrapper} ${styles.danger}`}>
              <ArrowDownRight size={20} />
            </div>
          </div>
          <div className={styles.cardBody}>
            <h2 className={styles.amount}>{formatCurrency(monthlyExpenses)}</h2>
          </div>
        </div>

        <div className={`${styles.card} glass`}>
          <div className={styles.cardHeader}>
            <span className={styles.cardTitle}>Savings Rate</span>
            <div className={`${styles.iconWrapper} ${styles.primary}`}>
              <Target size={20} />
            </div>
          </div>
          <div className={styles.cardBody}>
            <h2 className={styles.amount}>{formatPercentage(savingsRate)}</h2>
          </div>
        </div>
      </section>
      
      <section className={styles.mainGrid}>
        <div className={`${styles.chartSection} glass`}>
          <h3 className={styles.sectionTitle}>Wealth Evolution Projection</h3>
          <div className={styles.chartPlaceholder}>
            {/* We will add recharts here later */}
            <p>Chart component loading...</p>
          </div>
        </div>
        
        <div className={`${styles.alertsSection} glass`}>
          <h3 className={styles.sectionTitle}>Actionable Insights</h3>
          <ul className={styles.insightsList}>
            <li className={styles.insightItem}>
              <div className={styles.insightIcon}><AlertTriangle size={16} color="var(--warning)" /></div>
              <div>
                <h4>Keep it up!</h4>
                <p>Track your expenses to see actionable insights here.</p>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
