import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Main Page</h1>
      <p>Welcome to the main page of our app!</p>
      <Link to="/ingredients">Go to Ingredients Page</Link>
    </div>
  );
};

export default HomePage;
