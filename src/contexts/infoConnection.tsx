import React, { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import NetInfo, { NetInfoState, NetInfoCellularGeneration } from '@react-native-community/netinfo';

interface ConnectionContextProps {
  isConnected: boolean | null;
  isConnectionSlow: boolean;
  isConnectedToWifi(): Promise<boolean>;
  monitoringConnection(): void;
  updateIsConnected(value: boolean | null): void;
  checkConnectionSpeed(): void;
}

interface Props {
  children: ReactNode;
}

const ConnectionContext = createContext<ConnectionContextProps>({} as ConnectionContextProps);

function InfoConnectionProvider({ children }: Props) {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [isConnectionSlow, setIsConnectionSlow] = useState<boolean>(false);

  // Function to monitor the connection status
  async function monitoringConnection() {
    const connect = await NetInfo.fetch().then((state) => state.isConnected);
    return connect;
  }

  // Function to update the connection status
  function updateIsConnected(value: boolean | null) {
    setIsConnected(value);
  }

  // Function to check if connected to WiFi
  async function isConnectedToWifi(): Promise<boolean> {
    const state = await NetInfo.fetch();
    return !!state.isConnected && state.type === 'wifi';
  }

  // Function to check the connection speed
  function checkConnectionSpeed() {
    NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        const isSlow = state.type === 'cellular' && state.details?.cellularGeneration !== '4g';
        setIsConnectionSlow(isSlow);
      } else {
        setIsConnectionSlow(false);
      }
    });
  }

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      setIsConnected(state.isConnected);
      checkConnectionSpeed();
    });

    // Check the connection status when the component mounts
    NetInfo.fetch().then((state) => {
      setIsConnected(state.isConnected);
      checkConnectionSpeed();
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <ConnectionContext.Provider value={{ isConnected, isConnectionSlow, isConnectedToWifi, monitoringConnection, updateIsConnected, checkConnectionSpeed }}>
      {children}
    </ConnectionContext.Provider>
  );
}

// Hook to use connection context
const useConnection = () => {
  const context = useContext(ConnectionContext);
  if (!context) {
    throw new Error('useConnection must be used within a ConnectionProvider');
  }
  return context;
};

export { InfoConnectionProvider, useConnection };
