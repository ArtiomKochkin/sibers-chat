import { JoinForm } from '@features/JoinForm';
import styles from './HomePage.module.css';

export const HomePage = () => {
  
  return (
    <div className={styles.homepage}>
      <h2 className={styles.title}>Online chat</h2>
      <p className={styles.subtitle}>
        Create your own chat for communication or connect to an existing one
      </p>
      <JoinForm/>
    </div>
  );
};