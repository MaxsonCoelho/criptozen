import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { CryptoData } from '../../services/websocketService';
import { useCurrency } from '../../contexts/currency';
import { stylesCollections } from './styles';

interface CurrencyListProps {
  data: CryptoData[];
}

interface ExtendedCryptoData extends CryptoData {
  zeroTimeout?: NodeJS.Timeout;
}

const CurrencyList: React.FC<CurrencyListProps> = ({ data }) => {
  const { selectedCurrency, setSelectedCurrency } = useCurrency();
  const styles = stylesCollections();
  const [lastNonZeroData, setLastNonZeroData] = useState<Map<string, ExtendedCryptoData>>(new Map());

  useEffect(() => {
    const updatedData = new Map(lastNonZeroData);

    data.forEach(item => {
      if (item.price !== 0 || item.variation !== 0 || item.volume !== 0) {
        clearTimeout(updatedData.get(item.name)?.zeroTimeout);
        updatedData.set(item.name, item);
      } else if (updatedData.has(item.name)) {
        const existingItem = updatedData.get(item.name);
        const zeroTimeout = setTimeout(() => {
          updatedData.delete(item.name);
          setLastNonZeroData(new Map(updatedData));
        }, 3000);

        updatedData.set(item.name, { ...existingItem, zeroTimeout } as ExtendedCryptoData);
      }
    });

    setLastNonZeroData(updatedData);
  }, [data]);

  // Lista fixa de símbolos na ordem desejada
  const symbols = [
    'BTCUSDT', 'ETHUSDT', 'XRPUSDT', 'LTCUSDT', 'BCHUSDT', 'EOSUSDT', 'ADAUSDT',
    'XLMUSDT', 'TRXUSDT', 'IOTAUSDT', 'DASHUSDT', 'NEOUSDT', 'XMRUSDT', 'ZECUSDT', 'DOGEUSDT'
  ];

  // Reorganize os dados com base na lista fixa de símbolos, garantindo que os dados corretos estejam no lugar certo
  const sortedData: ExtendedCryptoData[] = symbols.map(symbol => {
    const crypto = lastNonZeroData.get(symbol);
    return crypto ? crypto : { name: symbol, price: 0, variation: 0, volume: 0, timestamp: new Date().toISOString() };
  }).filter(item => item.price !== 0 || item.variation !== 0 || item.volume !== 0);

  const renderItem = ({ item }: { item: ExtendedCryptoData }) => {
    const isSelected = item.name === selectedCurrency;
    const textColor = item.variation >= 0 ? 'green' : 'red';

    return (
      <TouchableOpacity 
        onPress={() => setSelectedCurrency(item.name)} 
        style={[styles.card, isSelected && styles.selectedCard]}
        activeOpacity={0.8}
      >
        <Text style={styles.name}>{item.name}</Text>
        <Text style={[styles.variation, { color: textColor }]}>{item.variation.toFixed(2)}%</Text>
        <Text style={styles.price}>{item.price.toFixed(2)}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      horizontal
      data={sortedData}
      renderItem={renderItem}
      keyExtractor={(item) => item.name}
      style={styles.list}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default CurrencyList;
