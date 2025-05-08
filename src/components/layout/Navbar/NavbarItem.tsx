import { ReactNode } from 'react';
import styles from './NavbarItem.module.scss';

const NavbarItem = ({children}: {children: ReactNode}) => {
    return <div className={styles.navbarItem}>
        {children}
    </div>
}

export default NavbarItem;