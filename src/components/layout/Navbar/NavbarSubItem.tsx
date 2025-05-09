import { ReactNode } from 'react';
import styles from './NavbarSubItem.module.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

const NavbarSubItem = ({
  children,
  link,
}: {
  children: ReactNode;
  link: string;
}) => {
  return (
    <Link to={link} className={styles.navbarSubItem}>
      <FontAwesomeIcon icon={faCircle} /> {children}
    </Link>
  );
};

export default NavbarSubItem;
