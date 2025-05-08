import { useState } from 'react';
import styles from './Navbar.module.scss';
import Logo from '@/components/common/Logo';
import NavbarItem from './NavbarItem';
import NavbarSubItem from './NavbarSubItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBook,
  faUser,
  faUtensils,
  faBars,
} from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {token} = useSelector((state: RootState) => state.auth);

  return (
    <div className={styles.navbar}>
      <Logo className={styles.logo} fill="#fff" />

      <FontAwesomeIcon
        icon={faBars}
        className={styles.hamburger}
        onClick={() => setIsOpen(!isOpen)}
      />
      {token ?
      <div
        className={`${styles.navbarContainer} ${isOpen ? styles.active : ''}`}>
        <NavbarItem link={''} icon={faBook} text={'Recipes'}>
          <NavbarSubItem link={'/ingredients'}>Ingredients</NavbarSubItem>
        </NavbarItem>
        <NavbarItem link={''} icon={faUtensils} text={'Fridge'} />
        <NavbarItem link={''} icon={faUser} text={'Account'}>
          <NavbarSubItem link={''}>Profile</NavbarSubItem>
          <NavbarSubItem link={''}>Settings</NavbarSubItem>
          <NavbarSubItem link={''}>Logs</NavbarSubItem>
          <NavbarSubItem link={''}>Log Out</NavbarSubItem>
        </NavbarItem>
      </div>
      :
      <div>
        <NavbarItem link={'/login'} text={'Log in'}/>
      </div>
      }
    </div>
  );
};

export default Navbar;
