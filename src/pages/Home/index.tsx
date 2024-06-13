import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Dimensions, SafeAreaView } from 'react-native';
import ChartComponent, { LineBarChartData } from '../../components/ChartComponent';
import { connectWebSocket, formatPriceData, formatTradeData, CryptoData } from '../../services/websocketService';
import Config from 'react-native-config';
import { stylesCollections } from './styles';
import Header from '../../components/Header';
import CurrencyList from '../../components/CurrencyList';
import { useCurrency } from '../../contexts/currency';
import ButtonGeneric from '../../components/GenericButton';
import { useThemeStyle } from '../../contexts/theme';
import GenericLoading from '../../components/GenericLoading';
import { useConnection } from '../../contexts/infoConnection';

const { PRICE_WS_URL, TRADES_WS_URL } = Config;

const filterSignificantData = (data: CryptoData[], symbols: string[]) => {
  const MINIMUM_VOLUME = 1000;
  return data.filter(item => symbols.includes(item.name) && item.volume >= MINIMUM_VOLUME);
};

export const Home: React.FC = () => {
  const { selectedCurrency } = useCurrency();
  const { isConnected, isConnectionSlow } = useConnection();
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [timeFilter, setTimeFilter] = useState('5m');
  const [chartType, setChartType] = useState<'line' | 'area' | 'bar'>('area');
  const [chartData, setChartData] = useState<{ [key: string]: LineBarChartData }>({});
  const styles = stylesCollections();
  const { theme } = useThemeStyle();

  const updateChartData = (symbol: string, significantData: CryptoData[]) => {
    setChartData(prevData => {
      const newData = significantData.filter(item => item.name === symbol).map(item => ({
        x: item.timestamp,
        y: item.price as number,
        volume: item.volume as number,
        variation: item.variation as number,
      }));
      return {
        ...prevData,
        [symbol]: {
          labels: [...(prevData[symbol]?.labels || []), ...newData.map(item => item.x)],
          datasets: [{ data: [...(prevData[symbol]?.datasets[0].data || []), ...newData.map(item => item.y)] }],
          volumes: [...(prevData[symbol]?.volumes || []), ...newData.map(item => item.volume)],
          variations: [...(prevData[symbol]?.variations || []), ...newData.map(item => item.variation)],
        },
      };
    });
  };

  useEffect(() => {
    const symbols = [
      'BTCUSDT', 'ETHUSDT', 'XRPUSDT', 'LTCUSDT', 'BCHUSDT', 'EOSUSDT', 'ADAUSDT',
      'XLMUSDT', 'TRXUSDT', 'IOTAUSDT', 'DASHUSDT', 'NEOUSDT', 'XMRUSDT', 'ZECUSDT', 'DOGEUSDT'
    ];

    const priceWs = connectWebSocket(PRICE_WS_URL!, (data) => {
      const formattedData = formatPriceData(data);
      const significantData = filterSignificantData(formattedData, symbols);
      setCryptoData(significantData);

      symbols.forEach(symbol => {
        updateChartData(symbol, significantData);
      });
    });

    const tradeWs = connectWebSocket(TRADES_WS_URL!, (data) => {
      const formattedData = formatTradeData(data);
      const significantData = filterSignificantData([formattedData], symbols);

      if (significantData.length > 0) {
        const item = significantData[0];
        updateChartData(item.name, [item]);
      }
    });

    return () => {
      priceWs.close();
      tradeWs.close();
    };
  }, []);

  const getCurrentData = () => chartData[selectedCurrency] || { labels: [], datasets: [{ data: [] }], volumes: [], variations: [] };

  return (
    <SafeAreaView style={styles.container}>
      <Header iconRight='menu_points' />
      <View style={[styles.buttonContainer, {marginTop: 10}]}>
        <ButtonGeneric title="Comprar" colorTitle={theme.scrim} color={theme.primaryContainer} width={150} />
        <ButtonGeneric title="Vender" colorTitle={theme.surfaceBright} color={theme.surfaceDim} width={150} />
      </View>
      <ScrollView>
        {isConnected === false && (
          <View style={styles.slowConnectionWarning}>
            <Text style={styles.slowConnectionText}>Sua conexão está lenta. Por favor, conecte-se a uma rede mais rápida para uma melhor experiência.</Text>
          </View>
        )}
        {isConnectionSlow && (
          <View style={styles.slowConnectionWarning}>
            <Text style={styles.slowConnectionText}>Sua conexão está lenta. Por favor, conecte-se a uma rede mais rápida para uma melhor experiência.</Text>
          </View>
        )}
        <View style={[styles.buttonContainer, { height: cryptoData.length === 0 ? 100 : 'auto', alignItems: 'center', justifyContent: 'center' }]}>
          {cryptoData.length === 0 && <GenericLoading />}
          {cryptoData.length > 0 && <CurrencyList data={cryptoData} />}
        </View>
        <View style={styles.buttonContainer}>
          <ButtonGeneric title="5 Min" colorTitle={theme.surfaceBright} executeFunction={() => setTimeFilter('5m')} color={theme.surfaceContainerLowest} selected={timeFilter === '5m'} />
          <ButtonGeneric title="1 Hour" colorTitle={theme.surfaceBright} executeFunction={() => setTimeFilter('1h')} color={theme.surfaceContainerLowest} selected={timeFilter === '1h'} />
          <ButtonGeneric title="1 Day" colorTitle={theme.surfaceBright} executeFunction={() => setTimeFilter('1d')} color={theme.surfaceContainerLowest} selected={timeFilter === '1d'} />
          <ButtonGeneric title="1 Month" colorTitle={theme.surfaceBright} executeFunction={() => setTimeFilter('1m')} color={theme.surfaceContainerLowest} selected={timeFilter === '1m'} />
        </View>
        <View style={styles.buttonContainer}>
          <ButtonGeneric title="Line" colorTitle={theme.surfaceBright} executeFunction={() => setChartType('line')} color={theme.surfaceContainerLowest} selected={chartType === 'line'} />
          <ButtonGeneric title="Area" colorTitle={theme.surfaceBright} executeFunction={() => setChartType('area')} color={theme.surfaceContainerLowest} selected={chartType === 'area'} />
          <ButtonGeneric title="Bar" colorTitle={theme.surfaceBright} executeFunction={() => setChartType('bar')} color={theme.surfaceContainerLowest} selected={chartType === 'bar'} />
        </View>
        <View style={[styles.chartContainer, { height: getCurrentData().labels.length == 0 ? 200 : 'auto' }]}>
          {getCurrentData().labels.length === 0 && <GenericLoading />}
          {getCurrentData().labels.length > 0 &&
            <ChartComponent
              type={chartType}
              data={getCurrentData()}
              labels={getCurrentData().labels}
              width={Dimensions.get('window').width}
              currency={selectedCurrency.slice(0, 3)}
              timeFilter={timeFilter}
            />
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
