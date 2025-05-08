import styles from './Navbar.module.scss';
import Logo from '@/components/common/Logo';
import NavbarItem from './NavbarItem';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {

    return <div className={styles.navbar}>
        <Logo className={styles.logo}/>
        <div className={styles.navbarContainer}>
            <NavbarItem><FontAwesomeIcon icon={faUser} /></NavbarItem>       
        </div>
    </div>
}

export default Navbar;