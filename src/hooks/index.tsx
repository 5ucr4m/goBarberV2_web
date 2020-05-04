import React from 'react';

import { AuthProvider } from './Auth';
import { ToastProvier } from './Toast';

const AppProvider: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      <ToastProvier>{children}</ToastProvier>
    </AuthProvider>
  );
};

export default AppProvider;
