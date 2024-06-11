import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Dimensions, SafeAreaView } from 'react-native';
import ChartComponent, { LineBarChartData } from '../../components/ChartComponent';
import { connectWebSocket, formatPriceData, formatTradeData, CryptoData } from '../../services/websocketService';
import Config from 'react-native-config';
import { stylesCollections } from './styles';
import Header from '../../components/Header';
import CurrencyList from '../../components/CurrencyList';
import { Button } from 'react-native-elements';
import { useCurrency } from '../../contexts/currency';

const { PRICE_WS_URL, TRADES_WS_URL } = Config;

const filterSignificantData = (data: CryptoData[], symbols: string[]) => {
  const MINIMUM_VOLUME = 1000;
  return data.filter(item => symbols.includes(item.name) && item.volume >= MINIMUM_VOLUME);
};

export const Home: React.FC = () => {
  const { selectedCurrency } = useCurrency();
  const [btcData, setBtcData] = useState<LineBarChartData>({ labels: [], datasets: [{ data: [] }], volumes: [], variations: [] });
  const [ethData, setEthData] = useState<LineBarChartData>({ labels: [], datasets: [{ data: [] }], volumes: [], variations: [] });
  const [xrpData, setXrpData] = useState<LineBarChartData>({ labels: [], datasets: [{ data: [] }], volumes: [], variations: [] });
  const [ltcData, setLtcData] = useState<LineBarChartData>({ labels: [], datasets: [{ data: [] }], volumes: [], variations: [] });
  const [bchData, setBchData] = useState<LineBarChartData>({ labels: [], datasets: [{ data: [] }], volumes: [], variations: [] });
  const [eosData, setEosData] = useState<LineBarChartData>({ labels: [], datasets: [{ data: [] }], volumes: [], variations: [] });
  const [adaData, setAdaData] = useState<LineBarChartData>({ labels: [], datasets: [{ data: [] }], volumes: [], variations: [] });
  const [xlmData, setXlmData] = useState<LineBarChartData>({ labels: [], datasets: [{ data: [] }], volumes: [], variations: [] });
  const [trxData, setTrxData] = useState<LineBarChartData>({ labels: [], datasets: [{ data: [] }], volumes: [], variations: [] });
  const [iotData, setIotData] = useState<LineBarChartData>({ labels: [], datasets: [{ data: [] }], volumes: [], variations: [] });
  const [dasData, setDasData] = useState<LineBarChartData>({ labels: [], datasets: [{ data: [] }], volumes: [], variations: [] });
  const [neoData, setNeoData] = useState<LineBarChartData>({ labels: [], datasets: [{ data: [] }], volumes: [], variations: [] });
  const [xmrData, setXmrData] = useState<LineBarChartData>({ labels: [], datasets: [{ data: [] }], volumes: [], variations: [] });
  const [zecData, setZecData] = useState<LineBarChartData>({ labels: [], datasets: [{ data: [] }], volumes: [], variations: [] });
  const [dogData, setDogData] = useState<LineBarChartData>({ labels: [], datasets: [{ data: [] }], volumes: [], variations: [] });
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [timeFilter, setTimeFilter] = useState('5m');
  const [chartType, setChartType] = useState<'line' | 'area' | 'bar'>('area');
  const styles = stylesCollections();

  useEffect(() => {
    const symbols = [
      'BTCUSDT', 'ETHUSDT', 'XRPUSDT', 'LTCUSDT', 'BCHUSDT', 'EOSUSDT', 'ADAUSDT', 
      'XLMUSDT', 'TRXUSDT', 'IOTAUSDT', 'DASHUSDT', 'NEOUSDT', 'XMRUSDT', 'ZECUSDT', 'DOGEUSDT'
    ];

    const priceWs = connectWebSocket(PRICE_WS_URL!, (data) => {
      const formattedData = formatPriceData(data);
      const significantData = filterSignificantData(formattedData, symbols);
      setCryptoData(significantData);

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
        setLtcData(prevData => ({
          labels: [...prevData.labels, ...significantData.filter(item => item.name === 'LTCUSDT').map(item => item.timestamp)],
          datasets: [{ data: [...prevData.datasets[0].data, ...significantData.filter(item => item.name === 'LTCUSDT').map(item => item.price as number)] }],
          volumes: [...prevData.volumes, ...significantData.filter(item => item.name === 'LTCUSDT').map(item => item.volume as number)],
          variations: [...prevData.variations, ...significantData.filter(item => item.name === 'LTCUSDT').map(item => item.variation as number)]
        }));

        setBchData(prevData => ({
          labels: [...prevData.labels, ...significantData.filter(item => item.name === 'BCHUSDT').map(item => item.timestamp)],
          datasets: [{ data: [...prevData.datasets[0].data, ...significantData.filter(item => item.name === 'BCHUSDT').map(item => item.price as number)] }],
          volumes: [...prevData.volumes, ...significantData.filter(item => item.name === 'BCHUSDT').map(item => item.volume as number)],
          variations: [...prevData.variations, ...significantData.filter(item => item.name === 'BCHUSDT').map(item => item.variation as number)]
        }));

        setEosData(prevData => ({
          labels: [...prevData.labels, ...significantData.filter(item => item.name === 'EOSUSDT').map(item => item.timestamp)],
          datasets: [{ data: [...prevData.datasets[0].data, ...significantData.filter(item => item.name === 'EOSUSDT').map(item => item.price as number)] }],
          volumes: [...prevData.volumes, ...significantData.filter(item => item.name === 'EOSUSDT').map(item => item.volume as number)],
          variations: [...prevData.variations, ...significantData.filter(item => item.name === 'EOSUSDT').map(item => item.variation as number)]
        }));
        setAdaData(prevData => ({
          labels: [...prevData.labels, ...significantData.filter(item => item.name === 'ADAUSDT').map(item => item.timestamp)],
          datasets: [{ data: [...prevData.datasets[0].data, ...significantData.filter(item => item.name === 'ADAUSDT').map(item => item.price as number)] }],
          volumes: [...prevData.volumes, ...significantData.filter(item => item.name === 'ADAUSDT').map(item => item.volume as number)],
          variations: [...prevData.variations, ...significantData.filter(item => item.name === 'ADAUSDT').map(item => item.variation as number)]
        }));

        setTrxData(prevData => ({
          labels: [...prevData.labels, ...significantData.filter(item => item.name === 'TRXUSDT').map(item => item.timestamp)],
          datasets: [{ data: [...prevData.datasets[0].data, ...significantData.filter(item => item.name === 'TRXUSDT').map(item => item.price as number)] }],
          volumes: [...prevData.volumes, ...significantData.filter(item => item.name === 'TRXUSDT').map(item => item.volume as number)],
          variations: [...prevData.variations, ...significantData.filter(item => item.name === 'TRXUSDT').map(item => item.variation as number)]
        }));

        setIotData(prevData => ({
          labels: [...prevData.labels, ...significantData.filter(item => item.name === 'IOTAUSDT').map(item => item.timestamp)],
          datasets: [{ data: [...prevData.datasets[0].data, ...significantData.filter(item => item.name === 'IOTAUSDT').map(item => item.price as number)] }],
          volumes: [...prevData.volumes, ...significantData.filter(item => item.name === 'IOTAUSDT').map(item => item.volume as number)],
          variations: [...prevData.variations, ...significantData.filter(item => item.name === 'IOTAUSDT').map(item => item.variation as number)]
        }));
        setDasData(prevData => ({
          labels: [...prevData.labels, ...significantData.filter(item => item.name === 'DASUSDT').map(item => item.timestamp)],
          datasets: [{ data: [...prevData.datasets[0].data, ...significantData.filter(item => item.name === 'DASUSDT').map(item => item.price as number)] }],
          volumes: [...prevData.volumes, ...significantData.filter(item => item.name === 'DASUSDT').map(item => item.volume as number)],
          variations: [...prevData.variations, ...significantData.filter(item => item.name === 'DASUSDT').map(item => item.variation as number)]
        }));

        setNeoData(prevData => ({
          labels: [...prevData.labels, ...significantData.filter(item => item.name === 'NEOUSDT').map(item => item.timestamp)],
          datasets: [{ data: [...prevData.datasets[0].data, ...significantData.filter(item => item.name === 'NEOUSDT').map(item => item.price as number)] }],
          volumes: [...prevData.volumes, ...significantData.filter(item => item.name === 'NEOUSDT').map(item => item.volume as number)],
          variations: [...prevData.variations, ...significantData.filter(item => item.name === 'NEOUSDT').map(item => item.variation as number)]
        }));

        setXmrData(prevData => ({
          labels: [...prevData.labels, ...significantData.filter(item => item.name === 'XMRUSDT').map(item => item.timestamp)],
          datasets: [{ data: [...prevData.datasets[0].data, ...significantData.filter(item => item.name === 'XMRUSDT').map(item => item.price as number)] }],
          volumes: [...prevData.volumes, ...significantData.filter(item => item.name === 'XMRUSDT').map(item => item.volume as number)],
          variations: [...prevData.variations, ...significantData.filter(item => item.name === 'XMRUSDT').map(item => item.variation as number)]
        }));
        setZecData(prevData => ({
          labels: [...prevData.labels, ...significantData.filter(item => item.name === 'ZECUSDT').map(item => item.timestamp)],
          datasets: [{ data: [...prevData.datasets[0].data, ...significantData.filter(item => item.name === 'ZECUSDT').map(item => item.price as number)] }],
          volumes: [...prevData.volumes, ...significantData.filter(item => item.name === 'ZECUSDT').map(item => item.volume as number)],
          variations: [...prevData.variations, ...significantData.filter(item => item.name === 'ZECUSDT').map(item => item.variation as number)]
        }));

        setDogData(prevData => ({
          labels: [...prevData.labels, ...significantData.filter(item => item.name === 'DOGEUSDT').map(item => item.timestamp)],
          datasets: [{ data: [...prevData.datasets[0].data, ...significantData.filter(item => item.name === 'DOGEUSDT').map(item => item.price as number)] }],
          volumes: [...prevData.volumes, ...significantData.filter(item => item.name === 'DOGEUSDT').map(item => item.volume as number)],
          variations: [...prevData.variations, ...significantData.filter(item => item.name === 'DOGEUSDT').map(item => item.variation as number)]
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
        } else if (item.name === 'LTCUSDT') {
          setLtcData(prevData => ({
            labels: [...prevData.labels, item.timestamp],
            datasets: [{ data: [...prevData.datasets[0].data, item.price as number] }],
            volumes: [...prevData.volumes, item.volume as number],
            variations: [...prevData.variations, item.variation as number]
          }));
        } else if (item.name === 'BCHUSDT') {
          setBchData(prevData => ({
            labels: [...prevData.labels, item.timestamp],
            datasets: [{ data: [...prevData.datasets[0].data, item.price as number] }],
            volumes: [...prevData.volumes, item.volume as number],
            variations: [...prevData.variations, item.variation as number]
          }));
        } else if (item.name === 'EOSUSDT') {
          setEosData(prevData => ({
            labels: [...prevData.labels, item.timestamp],
            datasets: [{ data: [...prevData.datasets[0].data, item.price as number] }],
            volumes: [...prevData.volumes, item.volume as number],
            variations: [...prevData.variations, item.variation as number]
          }));
        } else if (item.name === 'ADAUSDT') {
          setAdaData(prevData => ({
            labels: [...prevData.labels, item.timestamp],
            datasets: [{ data: [...prevData.datasets[0].data, item.price as number] }],
            volumes: [...prevData.volumes, item.volume as number],
            variations: [...prevData.variations, item.variation as number]
          }));
        } else if (item.name === 'XLMUSDT') {
          setXlmData(prevData => ({
            labels: [...prevData.labels, item.timestamp],
            datasets: [{ data: [...prevData.datasets[0].data, item.price as number] }],
            volumes: [...prevData.volumes, item.volume as number],
            variations: [...prevData.variations, item.variation as number]
          }));
        } else if (item.name === 'TRXUSDT') {
          setTrxData(prevData => ({
            labels: [...prevData.labels, item.timestamp],
            datasets: [{ data: [...prevData.datasets[0].data, item.price as number] }],
            volumes: [...prevData.volumes, item.volume as number],
            variations: [...prevData.variations, item.variation as number]
          }));
        } else if (item.name === 'IOTAUSDT') {
          setIotData(prevData => ({
            labels: [...prevData.labels, item.timestamp],
            datasets: [{ data: [...prevData.datasets[0].data, item.price as number] }],
            volumes: [...prevData.volumes, item.volume as number],
            variations: [...prevData.variations, item.variation as number]
          }));
        } else if (item.name === 'DASHUSDT') {
          setDasData(prevData => ({
            labels: [...prevData.labels, item.timestamp],
            datasets: [{ data: [...prevData.datasets[0].data, item.price as number] }],
            volumes: [...prevData.volumes, item.volume as number],
            variations: [...prevData.variations, item.variation as number]
          }));
        } else if (item.name === 'NEOUSDT') {
          setNeoData(prevData => ({
            labels: [...prevData.labels, item.timestamp],
            datasets: [{ data: [...prevData.datasets[0].data, item.price as number] }],
            volumes: [...prevData.volumes, item.volume as number],
            variations: [...prevData.variations, item.variation as number]
          }));
        } else if (item.name === 'XMRUSDT') {
          setXmrData(prevData => ({
            labels: [...prevData.labels, item.timestamp],
            datasets: [{ data: [...prevData.datasets[0].data, item.price as number] }],
            volumes: [...prevData.volumes, item.volume as number],
            variations: [...prevData.variations, item.variation as number]
          }));
        } else if (item.name === 'ZECUSDT') {
          setZecData(prevData => ({
            labels: [...prevData.labels, item.timestamp],
            datasets: [{ data: [...prevData.datasets[0].data, item.price as number] }],
            volumes: [...prevData.volumes, item.volume as number],
            variations: [...prevData.variations, item.variation as number]
          }));
        } else if (item.name === 'DOGEUSDT') {
          setDogData(prevData => ({
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
      case 'LTCUSDT':
        return ltcData;
      case 'BCHUSDT':
        return bchData;
      case 'EOSUSDT':
      return eosData;
      case 'ADAUSDT':
        return adaData;
      case 'XLMUSDT':
        return xlmData;
      case 'TRXUSDT':
        return trxData;
      case 'IOTAUSDT':
        return iotData;
      case 'DASHUSDT':
        return ethData;
      case 'NEOUSDT':
        return neoData;
      case 'XMRUSDT':
        return xmrData;
      case 'ZECUSDT':
        return zecData;
      case 'DOGEUSDT':
        return dogData;
      default:
        return btcData;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView>
        <Text style={styles.header}>CryptoZen</Text>
        <View style={styles.buttonContainer}>
          <CurrencyList data={cryptoData} />
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
    </SafeAreaView>
  );
};
