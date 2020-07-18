import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
}

export interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface AuthContextData {
  user: User;
  signin(credentials: SignInCredentials): Promise<void>;
  signout(): void;
  updateUser(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@goBarber:token');
    const user = localStorage.getItem('@goBarber:user');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signin = useCallback(async ({ email, password }) => {
    const reponse = await api.post('session', {
      email,
      password,
    });

    const { token, user } = reponse.data;

    localStorage.setItem('@goBarber:token', token);
    localStorage.setItem('@goBarber:user', JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const signout = useCallback(() => {
    localStorage.removeItem('@goBarber:token');
    localStorage.removeItem('@goBarber:user');
    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(() => {
    api.get('/profile').then(response => {
      const user = response.data;
      localStorage.setItem('@goBarber:user', JSON.stringify(user));
      setData(state => ({
        token: state.token,
        user,
      }));
    });
  }, [setData]);

  return (
    <AuthContext.Provider
      value={{ user: data.user, signin, signout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider!!');
  }

  return context;
}
