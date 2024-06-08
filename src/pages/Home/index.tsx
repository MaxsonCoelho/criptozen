// pages/Home/index.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import ChartComponent, { LineBarChartData } from '../../components/ChartComponent';
import LinearGradient from 'react-native-linear-gradient';
import { connectWebSocket, formatPriceData, formatTradeData, CryptoData } from '../../services/websocketService';
import Config from 'react-native-config';
import { stylesCollections } from './styles';

const { PRICE_WS_URL, TRADES_WS_URL } = Config;

const filterSignificantData = (data: CryptoData[], symbols: string[]) => {
  const MINIMUM_VOLUME = 1000;
  return data.filter(item => symbols.includes(item.name) && item.volume >= MINIMUM_VOLUME);
};

export const Home: React.FC = () => {
  const [btcData, setBtcData] = useState<LineBarChartData>({ labels: [], datasets: [{ data: [] }], volumes: [], variations: [] });
  const [ethData, setEthData] = useState<LineBarChartData>({ labels: [], datasets: [{ data: [] }], volumes: [], variations: [] });
  const [xrpData, setXrpData] = useState<LineBarChartData>({ labels: [], datasets: [{ data: [] }], volumes: [], variations: [] });
  const styles = stylesCollections();

  useEffect(() => {
    const symbols = ['BTCUSDT', 'ETHUSDT', 'XRPUSDT'];

    const priceWs = connectWebSocket(PRICE_WS_URL!, (data) => {
      const formattedData = formatPriceData(data);
      const significantData = filterSignificantData(formattedData, symbols);

      if (significantData.length > 0) {
        setBtcData(prevData => ({
          labels: [...prevData.labels, ...significantData.filter(item => item.name === 'BTCUSDT').map(item => item.timestamp)],
          datasets: [{ data: [...prevData.datasets[0].data, ...significantData.filter(item => item.name === 'BTCUSDT').map(item => item.price)] }],
          volumes: [...prevData.volumes, ...significantData.filter(item => item.name === 'BTCUSDT').map(item => item.volume)],
          variations: [...prevData.variations, ...significantData.filter(item => item.name === 'BTCUSDT').map(item => item.variation)]
        }));

        setEthData(prevData => ({
          labels: [...prevData.labels, ...significantData.filter(item => item.name === 'ETHUSDT').map(item => item.timestamp)],
          datasets: [{ data: [...prevData.datasets[0].data, ...significantData.filter(item => item.name === 'ETHUSDT').map(item => item.price)] }],
          volumes: [...prevData.volumes, ...significantData.filter(item => item.name === 'ETHUSDT').map(item => item.volume)],
          variations: [...prevData.variations, ...significantData.filter(item => item.name === 'ETHUSDT').map(item => item.variation)]
        }));

        setXrpData(prevData => ({
          labels: [...prevData.labels, ...significantData.filter(item => item.name === 'XRPUSDT').map(item => item.timestamp)],
          datasets: [{ data: [...prevData.datasets[0].data, ...significantData.filter(item => item.name === 'XRPUSDT').map(item => item.price)] }],
          volumes: [...prevData.volumes, ...significantData.filter(item => item.name === 'XRPUSDT').map(item => item.volume)],
          variations: [...prevData.variations, ...significantData.filter(item => item.name === 'XRPUSDT').map(item => item.variation)]
        }));
      }
    });

    const tradeWs = connectWebSocket(TRADES_WS_URL!, (data) => {
      const formattedData = formatTradeData(data);
      const significantData = filterSignificantData([formattedData], symbols);

      if (significantData.length > 0) {
        const item = significantData[0];
        if (item.name === 'BTCUSDT') {
          setBtcData(prevData => ({
            labels: [...prevData.labels, item.timestamp],
            datasets: [{ data: [...prevData.datasets[0].data, item.price] }],
            volumes: [...prevData.volumes, item.volume],
            variations: [...prevData.variations, item.variation]
          }));
        } else if (item.name === 'ETHUSDT') {
          setEthData(prevData => ({
            labels: [...prevData.labels, item.timestamp],
            datasets: [{ data: [...prevData.datasets[0].data, item.price] }],
            volumes: [...prevData.volumes, item.volume],
            variations: [...prevData.variations, item.variation]
          }));
        } else if (item.name === 'XRPUSDT') {
          setXrpData(prevData => ({
            labels: [...prevData.labels, item.timestamp],
            datasets: [{ data: [...prevData.datasets[0].data, item.price] }],
            volumes: [...prevData.volumes, item.volume],
            variations: [...prevData.variations, item.variation]
          }));
        }
      }
    });

    return () => {
      priceWs.close();
      tradeWs.close();
    };
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>CryptoZen</Text>
      <ChartComponent type="line" data={btcData} title="BTC - Preços em Tempo Real" labels={btcData.labels} />
      {/* <ChartComponent type="line" data={ethData} title="ETH - Preços em Tempo Real" labels={ethData.labels} />
      <ChartComponent type="line" data={xrpData} title="XRP - Preços em Tempo Real" labels={xrpData.labels} /> */}
    </ScrollView>
  );
};
