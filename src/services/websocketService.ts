export interface CryptoData {
  name: string;
  price: number;
  volume: number; 
  variation: number; 
  timestamp: string;
}

// Connect to WebSocket server and handle messages
export const connectWebSocket = (url: string, onMessage: (data: any) => void) => {
  const ws = new WebSocket(url);

  ws.onopen = () => {
    console.log('Conectado ao servidor WebSocket');
  };

  ws.onmessage = (e) => {
    try {
      const data = JSON.parse(e.data);
      onMessage(data);
    } catch (error) {
      console.error('Erro ao processar mensagem do WebSocket:', error);
    }
  };

  ws.onclose = () => {
    console.log('Desconectado do servidor WebSocket');
  };

  ws.onerror = (error) => {
    console.error('Erro no WebSocket:', error);
  };

  return ws;
};

// Format price data received from WebSocket
export const formatPriceData = (data: any): CryptoData[] => {
  try {
    return data.map((item: any) => ({
      name: item.s,
      price: parseFloat(item.c),
      volume: parseFloat(item.q), 
      variation: parseFloat(item.P), 
      timestamp: new Date().toISOString(),
    }));
  } catch (error) {
    console.error('Erro ao formatar dados de preços:', error);
    return [];
  }
};

// Format trade data received from WebSocket
// designed to deal with trade data, but it would require more time
// export const formatTradeData = (data: any): CryptoData => {
//   try {
//     return {
//       name: data.s,
//       price: parseFloat(data.p),
//       volume: parseFloat(data.q), 
//       variation: 0,
//       timestamp: new Date().toISOString(),
//     };
//   } catch (error) {
//     console.error('Erro ao formatar dados de trade:', error);
//     return {
//       name: '',
//       price: 0,
//       volume: 0,
//       variation: 0,
//       timestamp: new Date().toISOString(),
//     };
//   }
// };
