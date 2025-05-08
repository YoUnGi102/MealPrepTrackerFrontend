import { ReactNode } from 'react';
import styles from './NavbarItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Link } from 'react-router-dom';

const NavbarItem = ({
  link,
  icon,
  text,
  children,
}: {
  link: string;
  icon?: IconDefinition;
  text: string;
  children?: ReactNode;
}) => {
  return (
    <div className={styles.navbarItem}>
      <Link to={link} className={styles.navbarItemText}>
        {icon && <FontAwesomeIcon icon={icon} />}
        <p>{text}</p>
      </Link>
      {children && <div className={styles.submenu}>{children}</div>}
    </div>
  );
};

export default NavbarItem;
