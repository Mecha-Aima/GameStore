import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });
  const [orderId, setOrderIdState] = useState(() => {
    const stored = localStorage.getItem('orderId');
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (orderId !== null) {
      localStorage.setItem('orderId', JSON.stringify(orderId));
    } else {
      localStorage.removeItem('orderId');
    }
  }, [orderId]);

  const setOrderId = (id) => {
    setOrderIdState(id);
    if (id !== null) {
      localStorage.setItem('orderId', JSON.stringify(id));
    } else {
      localStorage.removeItem('orderId');
    }
  };

  const login = (userData) => {
    localStorage.removeItem('cart');
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };
  const logout = () => {
    setUser(null);
    setOrderId(null);
    localStorage.removeItem('cart');
    localStorage.removeItem('user');
  };
  const signup = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  return (
    <UserContext.Provider value={{ user, login, logout, signup, orderId, setOrderId }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
