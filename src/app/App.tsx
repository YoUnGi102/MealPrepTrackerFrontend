import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HashRouter as Router} from 'react-router-dom';
import store, { persistor } from './store';
import LoginDialog from '../features/auth/LoginDialog';
import './App.css';
import { PersistGate } from 'redux-persist/integration/react';
import AppRoutes from '@/routes/AppRoutes';
import PageContainer from '@/components/layout/PageContainer';
import {Navbar} from '@/components/layout/Navbar';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navbar />
        <Router>
          <LoginDialog />
            <PageContainer>
              <AppRoutes />
            </PageContainer>
        </Router>
        <ToastContainer position="top-right" autoClose={3000} />
      </PersistGate>
    </Provider>
  );
};

export default App;
