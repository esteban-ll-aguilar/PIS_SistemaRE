// components/GrayscaleContext.js
import React, { createContext, useState, useContext } from 'react';

const GrayscaleContext = createContext();

export const useGrayscale = () => useContext(GrayscaleContext);

export const GrayscaleProvider = ({ children }) => {
  const [isGrayscale, setIsGrayscale] = useState(false);

  const toggleGrayscale = () => setIsGrayscale(prev => !prev);

  return (
    <GrayscaleContext.Provider value={{ isGrayscale, toggleGrayscale }}>
      {children}
    </GrayscaleContext.Provider>
  );
};
