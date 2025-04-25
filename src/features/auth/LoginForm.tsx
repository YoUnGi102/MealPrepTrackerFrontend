import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../features/auth/authSlice';
import { AppDispatch, RootState } from '../../app/store';
import { User } from '@/types';

const LoginForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { token, loading, error } = useSelector((state: RootState) => state.auth);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const credentials: User = {username, password};
    dispatch(loginUser(credentials));
  };

  return (
    <div>
      <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="username" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" />
      <button onClick={handleLogin} disabled={loading}>Login</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {token && <p>You're logged in!</p>}
    </div>
  );
};

export default LoginForm;
