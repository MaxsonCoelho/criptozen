import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import ChartComponent, { LineBarChartData } from '../../components/ChartComponent';
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
          labels: [...prevData.labels, significantData[0].timestamp],
          datasets: [{ data: [...prevData.datasets[0].data, significantData[0].price] }],
          volumes: [...prevData.volumes, significantData[0].volume],
          variations: [...prevData.variations, significantData[0].variation]
        }));

        setEthData(prevData => ({
          labels: [...prevData.labels, significantData[1].timestamp],
          datasets: [{ data: [...prevData.datasets[0].data, significantData[1].price] }],
          volumes: [...prevData.volumes, significantData[1].volume],
          variations: [...prevData.variations, significantData[1].variation]
        }));

        setXrpData(prevData => ({
          labels: [...prevData.labels, significantData[2].timestamp],
          datasets: [{ data: [...prevData.datasets[0].data, significantData[2].price] }],
          volumes: [...prevData.volumes, significantData[2].volume],
          variations: [...prevData.variations, significantData[2].variation]
        }));
      }
    });

    return () => {
      priceWs.close();
    };
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>CryptoZen</Text>
      <ChartComponent type="line" data={btcData} title="BTC - Preços em Tempo Real" labels={btcData.labels} />
      <ChartComponent type="line" data={ethData} title="ETH - Preços em Tempo Real" labels={ethData.labels} />
      <ChartComponent type="line" data={xrpData} title="XRP - Preços em Tempo Real" labels={xrpData.labels} />
    </ScrollView>
  );
};