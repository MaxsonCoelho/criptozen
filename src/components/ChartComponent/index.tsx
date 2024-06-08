import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { CartesianChart, Line, useChartPressState } from "victory-native";
import { Circle } from "@shopify/react-native-skia";
import type { SharedValue } from "react-native-reanimated";
import { stylesCollections } from './styles';
import { format } from 'date-fns';

type ChartType = 'line';

export interface LineBarChartData {
  labels: string[];
  datasets: {
    data: number[];
  }[];
  volumes: number[];
  variations: number[];
}

interface ChartComponentProps {
  type: ChartType;
  data: LineBarChartData;
  title: string;
  labels: string[];
}

const screenWidth = Dimensions.get('window').width;

const ChartComponent: React.FC<ChartComponentProps> = ({ data, title, labels }) => {
  const styles = stylesCollections();
  const [highestPrice, setHighestPrice] = useState<number | null>(null);
  const [highestPriceTime, setHighestPriceTime] = useState<string | null>(null);
  const [lowestPrice, setLowestPrice] = useState<number | null>(null);
  const [lowestPriceTime, setLowestPriceTime] = useState<string | null>(null);
  const [pressedPoint, setPressedPoint] = useState<{ date: string, price: string } | null>(null);

  const chartData = data.datasets[0].data.map((y, i) => ({
    x: labels[i],
    y: y,
    volume: data.volumes[i],
    variation: data.variations[i]
  }));

  const { state, isActive } = useChartPressState<{ x: string, y: { y: number } }>({ x: '', y: { y: 0 } });

  useEffect(() => {
    if (chartData.length > 0) {
      const maxPrice = Math.max(...chartData.map(d => d.y));
      const minPrice = Math.min(...chartData.map(d => d.y));
      const maxPriceTime = chartData.find(d => d.y === maxPrice)?.x || '';
      const minPriceTime = chartData.find(d => d.y === minPrice)?.x || '';
      setHighestPrice(maxPrice);
      setHighestPriceTime(maxPriceTime);
      setLowestPrice(minPrice);
      setLowestPriceTime(minPriceTime);
    }
  }, [data]);

  useEffect(() => {
    if (isActive) {
      const closestPoint = chartData.reduce((prev, curr) => (
        Math.abs(new Date(curr.x).getTime() - state.x.position.value) < Math.abs(new Date(prev.x).getTime() - state.x.position.value) ? curr : prev
      ));

      const formattedDate = format(new Date(closestPoint.x), 'dd/MM/yyyy HH:mm:ss');
      const formattedPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(closestPoint.y);
      setPressedPoint({ date: formattedDate, price: formattedPrice });
    } else {
      setPressedPoint(null);
    }
  }, [isActive, state.x.position.value]);

  if (!data || (data.datasets[0]?.data.length === 0)) {
    return <Text style={styles.dataText}>No data available</Text>;
  }

  // Get the latest price data
  const latestData = chartData[chartData.length - 1];

  // Format the date and price
  const formattedDate = latestData ? format(new Date(latestData.x), 'dd/MM/yyyy HH:mm:ss') : '';
  const formattedPrice = latestData ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(latestData.y) : '';
  const isPriceDrop = latestData && latestData.variation < 0;

  // Format the lowest and highest price date and time
  const formattedLowestPriceTime = lowestPriceTime ? format(new Date(lowestPriceTime), 'dd/MM/yyyy HH:mm:ss') : '';
  const formattedHighestPriceTime = highestPriceTime ? format(new Date(highestPriceTime), 'dd/MM/yyyy HH:mm:ss') : '';

  return (
    <View style={styles.chartContainer}>
      <Text style={styles.title}>{title}</Text>
      <View style={{ height: 300, width: screenWidth }}>
        <View style={styles.dataContainer}>
          {latestData && (
            <Text style={styles.dataText}>
              Preço em tempo real: {formattedPrice}{'\n'}
              Dia/Hora: {formattedDate}
            </Text>
          )}
          {highestPrice !== null && highestPriceTime && (
            <Text style={[styles.dataText, styles.highestPrice]}>
              Maior Preço do Dia: {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(highestPrice)} {'\n'}
              Hora: {formattedHighestPriceTime}
            </Text>
          )}
        </View>
        <View style={styles.graphics}>
            <CartesianChart data={chartData} xKey="x" yKeys={["y"]} chartPressState={state}>
            {({ points }) => (
                <>
                <Line
                    points={points.y}
                    color="red"
                    strokeWidth={3}
                    curveType="natural"
                    animate={{ type: "timing", duration: 300 }}
                    connectMissingData={true}
                />
                {isActive && (
                    <Circle cx={state.x.position} cy={state.y.y.position} r={10} color="#00FF00" />
                )}
                </>
            )}
            </CartesianChart>
        </View>
      </View>
    </View>
  );
};

export default ChartComponent;
