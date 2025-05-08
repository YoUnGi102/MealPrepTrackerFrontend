// components/LoginDialog.tsx
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { loginUser } from '@/features/auth/authSlice';
import { AppDispatch, RootState } from '@/app/store';
import { setRedirectUrl } from '@/features/redirect/redirectSlice';
import { useNavigate } from 'react-router-dom';

const LoginDialog = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { token, error } = useSelector((state: RootState) => state.auth);
  const { redirectUrl } = useSelector((state: RootState) => state.redirect);

  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (!token) {
      setOpen(true);
    }
  }, [token]);

  useEffect(() => {
    if (token && open) {
      setOpen(false);
      dispatch(setRedirectUrl(null));
      navigate(redirectUrl || '/');
    }
  }, [token, redirectUrl, open, navigate, dispatch]);

  const handleSubmit = () => {
    dispatch(loginUser({ username, password }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Login Required</DialogTitle>
        </DialogHeader>
        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <Button onClick={handleSubmit}>Login</Button>
        {error && <p className="text-red-500">{JSON.stringify(error)}</p>}
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
