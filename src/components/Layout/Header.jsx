import { Bell, Search, User } from 'lucide-react';
import { useStore } from '../../store/useStore';
import styles from './Layout.module.css';

export function Header() {
  const profile = useStore((state) => state.profile);
  return (
    <header className={`${styles.header} glass`}>
      <div className={styles.searchBar}>
        <Search size={18} className={styles.searchIcon} />
        <input type="text" placeholder="Search transactions, accounts..." />
      </div>
      
      <div className={styles.headerActions}>
        <button className={styles.iconButton}>
          <Bell size={20} />
          <span className={styles.badge}></span>
        </button>
        <div className={styles.userProfile}>
          <div className={styles.avatar}>
            <User size={20} />
          </div>
          <div className={styles.userInfo}>
            <span className={styles.userName}>{profile.name || 'User'}</span>
            <span className={styles.userStatus}>Premium</span>
          </div>
        </div>
      </div>
    </header>
  );
}
