import React from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import store from './store';
import IngredientsPage from '../features/ingredients/ingredientsPage';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <h1 className={'title'}>MealPrepTracker</h1>
          <Routes>
            <Route path="/" element={<h2>Home Page</h2>} />
            <Route path="/ingredients" element={<IngredientsPage />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer position="top-right" autoClose={3000} />
    </Provider>
  );
};

export default App;
