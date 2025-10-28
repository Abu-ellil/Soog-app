import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, logout } from '../../features/authSlice';
import { RootState } from '../store';
import { useState, useEffect } from 'react';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state: RootState) => state.auth);

  const login = (userData: any, authToken: string) => {
    dispatch(loginSuccess({ user: userData, token: authToken }));
  };

  const signOut = () => {
    dispatch(logout());
  };

  // Check if auth state is still loading (initial state)
  // We'll consider it loading initially until we've checked for persisted auth state
  const [initialLoading, setInitialLoading] = useState(true);
  
  useEffect(() => {
    // Simulate checking for persisted auth state (like from async storage)
    // In a real app, you would check for stored tokens here
    const checkAuthState = async () => {
      // Simulate a brief delay to check auth state
      setTimeout(() => {
        setInitialLoading(false);
      }, 500);
    };
    
    checkAuthState();
  }, []);

  // For development purposes, we can bypass authentication
  // In production, set this to false
  const DEV_BYPASS_AUTH = true; // Change this to false for production

  const isAuthenticatedState = DEV_BYPASS_AUTH ? true : !!token;

  return {
    user,
    token,
    isAuthenticated: isAuthenticatedState,
    isLoading: initialLoading,
    login,
    signOut,
  };
};