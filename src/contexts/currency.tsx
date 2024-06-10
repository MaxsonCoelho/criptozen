import React, { createContext, useState, useContext, ReactNode } from 'react';

interface CurrencyContextProps {
  selectedCurrency: string;
  setSelectedCurrency: (currency: string) => void;
}

const CurrencyContext = createContext<CurrencyContextProps | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedCurrency, setSelectedCurrency] = useState('BTCUSDT');

  return (
    <CurrencyContext.Provider value={{ selectedCurrency, setSelectedCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
    const context = useContext(CurrencyContext);
    if (!context) {
      throw new Error('useCurrency must be used within a CurrencyProvider');
    }
    return context;
};
