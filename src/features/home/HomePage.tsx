import Logo from '@/components/common/Logo';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.scss'

const HomePage: React.FC = () => {
  return (
    <div className={styles.homePage}>
      <Logo />
      <h2>Welcome to the main page of our app!</h2>
      <Link className={styles.link} to="/ingredients">Search Ingredients</Link>
      <Link className={styles.link} to="/meals/add">Add a Meal</Link>
    </div>
  );
};

export default HomePage;
