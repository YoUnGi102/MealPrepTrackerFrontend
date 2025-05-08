import styles from './Navbar.module.scss';
import Logo from '@/components/common/Logo';
import NavbarItem from './NavbarItem';
import NavbarSubItem from './NavbarSubItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faUser, faUtensils } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <Logo className={styles.logo} />
      <div className={styles.navbarContainer}>
        <NavbarItem link={''} icon={faBook} text={'Recipes'} />
        <NavbarItem link={''} icon={faUtensils} text={'Fridge'} />
        <NavbarItem link={''} icon={faUser} text={'Account'}>
          <NavbarSubItem link={''}>Profile</NavbarSubItem>
          <NavbarSubItem link={''}>Settings</NavbarSubItem>
          <NavbarSubItem link={''}>Logs</NavbarSubItem>
          <NavbarSubItem link={''}>Log Out</NavbarSubItem>
        </NavbarItem>
      </div>
    </div>
  );
};

export default Navbar;
