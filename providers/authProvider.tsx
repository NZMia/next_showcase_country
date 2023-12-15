
import React, { createContext, useContext, } from 'react';
import useCookie from '../hooks/useCookie';

interface IUserInfo {
  name: string;
  job: string;
}

interface IAuthContext {
  value: IUserInfo | null;
  save: (userInfo: IUserInfo) => Promise<void>;
  clear?: () => void;
}

export const AuthContext = createContext<IAuthContext | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { value, saveCookie, clearCookie } = useCookie();

  const save = async (userInfo: IUserInfo) => {
    await saveCookie(userInfo);
  }

  const clear = ():void => {
    clearCookie();
  }

  return (
    <AuthContext.Provider value={{ value, save, clear }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };