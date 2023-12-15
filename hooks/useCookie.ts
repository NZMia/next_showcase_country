import { useState, useEffect } from "react";
import { clear } from 'console';
interface IUserInfo {
  name: string;
  job: string;
}

const useCookie = () => {
  const [value, setValue] = useState<IUserInfo | null>(null);

  useEffect(() => {
    const getCookieValue = (): IUserInfo | null => {
      const cookieValue = document.cookie
        .split('; ')
        .find((row) => row.startsWith('userInfo='));

      if (cookieValue) {
        const userInfoString = cookieValue.split('=')[1];
        return JSON.parse(userInfoString) as IUserInfo;
      }

      return null;
    };

    setValue(getCookieValue());
  }, []);


  const saveCookie = (userInfo: IUserInfo): Promise<void> => {
    console.debug('saving cookie', userInfo);
    if (!userInfo.name || !userInfo.job) {
      return Promise.reject('Invalid user info');
    }
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getMinutes() + 10);

    const cookieValue = JSON.stringify(userInfo);
    document.cookie = `userInfo=${cookieValue};expires=${expirationDate.toUTCString()};path=/`;
    console.log('cookie saved', document.cookie);
    setValue(userInfo);
    return Promise.resolve();
  };

  const clearCookie = async(): Promise<void>  => {
    const cookieValue = document.cookie
        .split('; ')
        .find((row) => row.startsWith('userInfo='));

      if (cookieValue) {
        document.cookie = 'userInfo=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;';
        console.log('cookie cleared');
      }
    setValue(null);
    return Promise.resolve();
  }

  return {value, saveCookie, clearCookie};
}

export default useCookie;
