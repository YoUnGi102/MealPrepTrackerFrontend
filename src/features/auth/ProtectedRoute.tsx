import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import { setRedirectUrl } from '../../features/redirect/redirectSlice';
import { ReactNode, useEffect } from 'react';
import UnauthorizedPage from './UnauthorizedPage';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const token = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) {
      const currentPath = window.location.hash.replace(/^#/, '');
      dispatch(setRedirectUrl(currentPath));
    }
  }, [token, dispatch]);

  return token ? children : <UnauthorizedPage />;
};

export default ProtectedRoute;
