import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Wallet, 
  ArrowRightLeft, 
  PieChart, 
  TrendingUp, 
  Target, 
  Settings 
} from 'lucide-react';
import styles from './Layout.module.css';

const navItems = [
  { path: '/', label: 'Executive Dashboard', icon: LayoutDashboard },
  { path: '/accounts', label: 'Accounts', icon: Wallet },
  { path: '/transactions', label: 'Transactions', icon: ArrowRightLeft },
  { path: '/audit', label: 'Audit & Leaks', icon: PieChart },
  { path: '/investments', label: 'Investments', icon: TrendingUp },
  { path: '/goals', label: 'Goals', icon: Target },
  { path: '/profile', label: 'Profile Settings', icon: Settings },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className={`${styles.sidebar} glass`}>
      <div className={styles.logo}>
        <div className={styles.logoIcon}></div>
        <h2>Finance OS</h2>
      </div>
      
      <nav className={styles.nav}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link 
              key={item.path} 
              to={item.path} 
              className={`${styles.navItem} ${isActive ? styles.active : ''}`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
