import React, { createContext, useContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userAuthenticated, setUserAuthenticated] = useState(false);

  return <UserContext.Provider value={{ userAuthenticated, setUserAuthenticated }}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
