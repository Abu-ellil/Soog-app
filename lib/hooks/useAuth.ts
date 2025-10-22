import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, logout } from '../../features/authSlice';
import { RootState } from '../store';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state: RootState) => state.auth);

  const login = (userData: any, authToken: string) => {
    dispatch(loginSuccess({ user: userData, token: authToken }));
  };

  const signOut = () => {
    dispatch(logout());
  };

  return {
    user,
    token,
    isAuthenticated: !!token,
    login,
    signOut,
  };
};