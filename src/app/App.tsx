import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HashRouter as Router } from 'react-router-dom';
import store, { persistor } from './store';
import LoginDialog from '../features/auth/LoginDialog';
import './App.css';
import { PersistGate } from 'redux-persist/integration/react';
import AppRoutes from '@/routes/AppRoutes';
import PageContainer from '@/components/layout/PageContainer';
import { Navbar } from '@/components/layout/Navbar';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Navbar />
          <LoginDialog />
          <PageContainer>
            <AppRoutes />
          </PageContainer>
          <ToastContainer position="top-right" autoClose={3000} />
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;
