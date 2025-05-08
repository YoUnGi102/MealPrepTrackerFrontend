import { ReactNode } from 'react';
import styles from './NavbarSubItem.module.scss';
import { Link } from 'react-router-dom';

const NavbarSubItem = ({
  children,
  link,
}: {
  children: ReactNode;
  link: string;
}) => {
  return (
    <Link to={link} className={styles.navbarSubItem}>
      {children}
    </Link>
  );
};

export default NavbarSubItem;
