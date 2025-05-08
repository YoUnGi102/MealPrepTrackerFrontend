import { ReactNode } from 'react';
import styles from './PageContainer.module.scss';

const PageContainer = ({ children }: { children: ReactNode }) => {
  return <div className={styles.pageContainer}> {children} </div>;
};

export default PageContainer;
