import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import store from './store';
import IngredientsPage from '../features/ingredients/ingredientsPage';
import MainPage from '../components/pages/mainPage';
import ProtectedRoute from '../features/auth/ProtectedRoute';
import LoginForm from '../features/auth/LoginForm';
import './App.css'

const App = () => {
  return (
    <Provider store={store}>
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
    </Provider>
  );
};

export default App;
