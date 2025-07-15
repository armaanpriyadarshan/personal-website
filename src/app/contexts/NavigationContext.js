"use client";

import { createContext, useContext, useState } from 'react';

const NavigationContext = createContext();

export function NavigationProvider({ children }) {
  const [unlocked, setUnlocked] = useState([]);

  const unlock = (item) => {
    setUnlocked((prev) => prev.includes(item) ? prev : [...prev, item]);
  };

  return (
    <NavigationContext.Provider value={{ unlocked, unlock }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  return useContext(NavigationContext);
} 