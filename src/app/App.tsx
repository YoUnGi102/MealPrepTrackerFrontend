import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import store, { persistor } from './store';
import IngredientsPage from '../features/ingredients/ingredientsPage';
import MainPage from '../components/pages/mainPage';
import ProtectedRoute from '../features/auth/ProtectedRoute';
import LoginForm from '../features/auth/LoginForm';
import './App.css'
import { PersistGate } from 'redux-persist/integration/react';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <div>
            <h1 className={'title'}>MealPrepTracker</h1>
            <Routes>
              <Route path='/login' element={<LoginForm/>}/>
              <Route
                path="/ingredients"
                element={
                  <ProtectedRoute>
                    <IngredientsPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/" element={<MainPage />} />
            </Routes>
          </div>
        </Router>
      <ToastContainer position="top-right" autoClose={3000} />
      </PersistGate>
    </Provider>
  );
};

export default App;
