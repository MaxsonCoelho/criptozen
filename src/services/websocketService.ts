export interface CryptoData {
  name: string;
  price: number;
  volume: number; 
  variation: number; 
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

export const formatPriceData = (data: any): CryptoData[] => {
  return data.map((item: any) => ({
    name: item.s,
    price: parseFloat(item.c),
    volume: parseFloat(item.q), 
    variation: parseFloat(item.P), 
    timestamp: new Date().toISOString(),
  }));
};

export const formatTradeData = (data: any): CryptoData => {
  return {
    name: data.s,
    price: parseFloat(data.p),
    volume: parseFloat(data.q), 
    variation: 0,
    timestamp: new Date().toISOString(),
  };
};
