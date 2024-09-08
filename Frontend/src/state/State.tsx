// AuthContext.tsx
import React, { createContext, useState, ReactNode } from 'react';

interface StateProps {
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
  username: string;
  setUserName: (username: string) => void;
}

const StateContext = createContext<StateProps | undefined>(undefined);

export const StateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [username, setUserName] = useState<string>('');

  return (
    <StateContext.Provider value={{ isLogin, setIsLogin, username, setUserName }}>
      {children}
    </StateContext.Provider>
  );
};

export const useAppState = () => {
  const context = React.useContext(StateContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
