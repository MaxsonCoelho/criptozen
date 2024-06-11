import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { CryptoData } from '../../services/websocketService';
import { useCurrency } from '../../contexts/currency';
import { stylesCollections } from './styles';

interface CurrencyListProps {
  data: CryptoData[];
}

const CurrencyList: React.FC<CurrencyListProps> = ({ data }) => {
  const { selectedCurrency, setSelectedCurrency } = useCurrency();
  const styles = stylesCollections();

  const renderItem = ({ item }: { item: CryptoData }) => {
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
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.name}
      style={styles.list}
      showsHorizontalScrollIndicator={false}
    />
  );
};


export default CurrencyList;
