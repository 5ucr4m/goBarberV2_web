import React, { createContext, useCallback, useContext, useState } from 'react';
import { uuid } from 'uuidv4';
import Toast from '../components/ToastContainer';

interface ToastContextData {
  addToast(message: Omit<ToastMessage, 'id'>): void;
  removeToast(id: string): void;
}

export interface ToastMessage {
  id: string;
  type?: 'success' | 'error';
  title: string;
  description?: string;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);
export const ToastProvier: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<ToastMessage[]>([]);
  const addToast = useCallback(
    ({ type, title, description }: Omit<ToastMessage, 'id'>): void => {
      const id = uuid();
      const toast = {
        id,
        type,
        title,
        description,
      };

      setMessages(oldItems => [...oldItems, toast]);
    },
    [],
  );
  const removeToast = useCallback((id: string): void => {
    setMessages(state => state.filter(item => item.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <Toast messages={messages} />
    </ToastContext.Provider>
  );
};

export function useToast(): ToastContextData {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within an toastProvider!!');
  }

  return context;
}
