
export interface CryptoData {
  name: string;
  price: number;
  timestamp: string;
}

export const connectWebSocket = (url: string, onMessage: (data: any) => void) => {
  const ws = new WebSocket(url);

  ws.onopen = () => {
    console.log('Connected to WebSocket server');
  };

  ws.onmessage = (e) => {
    const data = JSON.parse(e.data);
    onMessage(data);
  };

  ws.onclose = () => {
    console.log('Disconnected from WebSocket server');
  };

  return ws;
};

export const formatPriceData = (data: any[]): CryptoData[] => {
  return data.map((item: any) => ({
    name: item.s, // symbol
    price: parseFloat(item.c), // last price
    timestamp: new Date().toISOString(),
  }));
};

export const formatTradeData = (data: any): CryptoData => {
  return {
    name: data.s, // symbol
    price: parseFloat(data.p), // price of the trade
    timestamp: new Date().toISOString(),
  };
};
