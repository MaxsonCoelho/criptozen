import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import ChartComponent from '../../components/ChartComponent';
import { connectWebSocket, formatPriceData, formatTradeData, CryptoData } from '../../services/websocketService';
import Config from 'react-native-config';
import { stylesCollections } from './styles';

const { PRICE_WS_URL, TRADES_WS_URL } = Config;

interface LineBarChartData {
  labels: string[];
  datasets: {
    data: number[];
  }[];
}

interface PieChartData {
  key: string;
  value: number;
  svg: {
    fill: string;
  };
  arc: {
    outerRadius: string;
    cornerRadius: number;
  };
}

export const Home: React.FC = () => {
  const [priceData, setPriceData] = useState<LineBarChartData>({ labels: [], datasets: [{ data: [] }] });
  const [tradeData, setTradeData] = useState<LineBarChartData>({ labels: [], datasets: [{ data: [] }] });
  const [marketData, setMarketData] = useState<PieChartData[]>([]);
  const styles = stylesCollections();

  useEffect(() => {
    const priceWs = connectWebSocket(PRICE_WS_URL!, (data) => {
      const formattedData = formatPriceData(data);
      setPriceData({
        labels: formattedData.map(item => item.name),
        datasets: [{ data: formattedData.map(item => item.price) }]
      });
    });

    const tradeWs = connectWebSocket(TRADES_WS_URL!, (data) => {
      const formattedData = formatTradeData(data);
      setTradeData(prevData => ({
        labels: [...prevData.labels, formattedData.timestamp],
        datasets: [{ data: [...prevData.datasets[0].data, formattedData.price] }]
      }));
    });

    // Simulando dados de mercado para exemplo
    const simulatedMarketData: PieChartData[] = [
      { key: 'BTC', value: 30000, svg: { fill: '#f00' }, arc: { outerRadius: '100%', cornerRadius: 10 } },
      { key: 'ETH', value: 2000, svg: { fill: '#0f0' }, arc: { outerRadius: '100%', cornerRadius: 10 } },
      { key: 'BNB', value: 300, svg: { fill: '#00f' }, arc: { outerRadius: '100%', cornerRadius: 10 } },
    ];
    setMarketData(simulatedMarketData);

    return () => {
      priceWs.close();
      tradeWs.close();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>CryptoZen</Text>
      <ChartComponent type="line" data={priceData} title="Preços em Tempo Real" labels={priceData.labels} />
      <ChartComponent type="bar" data={tradeData} title="Trades em Tempo Real" labels={tradeData.labels} />
      <ChartComponent type="pie" data={marketData} title="Dados do Mercado" labels={marketData.map(data => data.key)} />
    </View>
  );
};
