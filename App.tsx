import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabs from './src/navigation/BottomTabs';
import { ThemeProviderStyle } from './src/contexts/theme';
import { ModalProvider } from './src/contexts/modal';
import { CurrencyProvider } from './src/contexts/currency';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <ThemeProviderStyle>
        <CurrencyProvider>
          <ModalProvider>
            <BottomTabs />
          </ModalProvider>
        </CurrencyProvider>
      </ThemeProviderStyle>
    </NavigationContainer>
  );
}

export default App;
