import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Button, Dimensions } from 'react-native';
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
  const [selectedCurrency, setSelectedCurrency] = useState('BTCUSDT');
  const [timeFilter, setTimeFilter] = useState('1d');
  const [chartType, setChartType] = useState<'line' | 'area' | 'bar'>('area');
  const styles = stylesCollections();

  useEffect(() => {
    const symbols = ['BTCUSDT', 'ETHUSDT', 'XRPUSDT'];

    const priceWs = connectWebSocket(PRICE_WS_URL!, (data) => {
      const formattedData = formatPriceData(data);
      const significantData = filterSignificantData(formattedData, symbols);

      if (significantData.length > 0) {
        setBtcData(prevData => ({
          labels: [...prevData.labels, ...significantData.filter(item => item.name === 'BTCUSDT').map(item => item.timestamp)],
          datasets: [{ data: [...prevData.datasets[0].data, ...significantData.filter(item => item.name === 'BTCUSDT').map(item => item.price as number)] }],
          volumes: [...prevData.volumes, ...significantData.filter(item => item.name === 'BTCUSDT').map(item => item.volume as number)],
          variations: [...prevData.variations, ...significantData.filter(item => item.name === 'BTCUSDT').map(item => item.variation as number)]
        }));

        setEthData(prevData => ({
          labels: [...prevData.labels, ...significantData.filter(item => item.name === 'ETHUSDT').map(item => item.timestamp)],
          datasets: [{ data: [...prevData.datasets[0].data, ...significantData.filter(item => item.name === 'ETHUSDT').map(item => item.price as number)] }],
          volumes: [...prevData.volumes, ...significantData.filter(item => item.name === 'ETHUSDT').map(item => item.volume as number)],
          variations: [...prevData.variations, ...significantData.filter(item => item.name === 'ETHUSDT').map(item => item.variation as number)]
        }));

        setXrpData(prevData => ({
          labels: [...prevData.labels, ...significantData.filter(item => item.name === 'XRPUSDT').map(item => item.timestamp)],
          datasets: [{ data: [...prevData.datasets[0].data, ...significantData.filter(item => item.name === 'XRPUSDT').map(item => item.price as number)] }],
          volumes: [...prevData.volumes, ...significantData.filter(item => item.name === 'XRPUSDT').map(item => item.volume as number)],
          variations: [...prevData.variations, ...significantData.filter(item => item.name === 'XRPUSDT').map(item => item.variation as number)]
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
            datasets: [{ data: [...prevData.datasets[0].data, item.price as number] }],
            volumes: [...prevData.volumes, item.volume as number],
            variations: [...prevData.variations, item.variation as number]
          }));
        } else if (item.name === 'ETHUSDT') {
          setEthData(prevData => ({
            labels: [...prevData.labels, item.timestamp],
            datasets: [{ data: [...prevData.datasets[0].data, item.price as number] }],
            volumes: [...prevData.volumes, item.volume as number],
            variations: [...prevData.variations, item.variation as number]
          }));
        } else if (item.name === 'XRPUSDT') {
          setXrpData(prevData => ({
            labels: [...prevData.labels, item.timestamp],
            datasets: [{ data: [...prevData.datasets[0].data, item.price as number] }],
            volumes: [...prevData.volumes, item.volume as number],
            variations: [...prevData.variations, item.variation as number]
          }));
        }
      }
    });

    return () => {
      priceWs.close();
      tradeWs.close();
    };
  }, []);

  const getCurrentData = () => {
    switch (selectedCurrency) {
      case 'BTCUSDT':
        return btcData;
      case 'ETHUSDT':
        return ethData;
      case 'XRPUSDT':
        return xrpData;
      default:
        return btcData;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>CryptoZen</Text>
      <View style={styles.buttonContainer}>
        <Button title="BTC" onPress={() => setSelectedCurrency('BTCUSDT')} />
        <Button title="ETH" onPress={() => setSelectedCurrency('ETHUSDT')} />
        <Button title="XRP" onPress={() => setSelectedCurrency('XRPUSDT')} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="5 Min" onPress={() => setTimeFilter('5m')} />
        <Button title="1 Hour" onPress={() => setTimeFilter('1h')} />
        <Button title="1 Day" onPress={() => setTimeFilter('1d')} />
        <Button title="1 Month" onPress={() => setTimeFilter('1m')} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Line" onPress={() => setChartType('line')} />
        <Button title="Area" onPress={() => setChartType('area')} />
        <Button title="Bar" onPress={() => setChartType('bar')} />
      </View>
      <ChartComponent
        type={chartType}
        data={getCurrentData()}
        title={`${selectedCurrency} - Preços em Tempo Real`}
        labels={getCurrentData().labels}
        width={Dimensions.get('window').width}
        currency={selectedCurrency.slice(0, 3)} 
        timeFilter={timeFilter}
      />
    </ScrollView>
  );
};

export default Home;
