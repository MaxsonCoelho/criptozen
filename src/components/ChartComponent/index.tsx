import React, { useState, useEffect, useRef } from 'react';
import { View, Text } from 'react-native';
import { CartesianChart, Line, Area, Bar, useChartPressState } from "victory-native";
import { Circle, LinearGradient, useFont, vec, Text as SKText } from "@shopify/react-native-skia";
import { stylesCollections } from './styles';
import { format } from 'date-fns';

type ChartType = 'line' | 'area' | 'bar';

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
  width: number;
  height: number;
  currency: string;
  timeFilter: string;  // Adicionando o filtro de tempo como prop
}

const ChartComponent: React.FC<ChartComponentProps> = ({ type, data, title, labels, width, height, currency, timeFilter }) => {
  const styles = stylesCollections();
  const [highestPrice, setHighestPrice] = useState<number | null>(null);
  const [highestPriceTime, setHighestPriceTime] = useState<string | null>(null);
  const [lowestPrice, setLowestPrice] = useState<number | null>(null);
  const [lowestPriceTime, setLowestPriceTime] = useState<string | null>(null);
  const [pressedPoint, setPressedPoint] = useState<{ date: string, price: string } | null>(null);

  const filterDataByTime = (timeFilter: string) => {
    const endTime = new Date().getTime();
    let startTime: number;

    switch (timeFilter) {
      case '5m':
        startTime = endTime - 5 * 60 * 1000;
        break;
      case '1h':
        startTime = endTime - 60 * 60 * 1000;
        break;
      case '1d':
        startTime = endTime - 24 * 60 * 60 * 1000;
        break;
      case '1m':
        startTime = endTime - 30 * 24 * 60 * 60 * 1000;
        break;
      default:
        startTime = endTime - 24 * 60 * 60 * 1000;
    }

    const filteredData = data.datasets[0].data.filter((_, i) => {
      const timestamp = new Date(labels[i]).getTime();
      return timestamp >= startTime && timestamp <= endTime;
    });

    return {
      labels: labels.filter((label, i) => {
        const timestamp = new Date(label).getTime();
        return timestamp >= startTime && timestamp <= endTime;
      }),
      datasets: [{ data: filteredData }],
      volumes: data.volumes.filter((_, i) => {
        const timestamp = new Date(labels[i]).getTime();
        return timestamp >= startTime && timestamp <= endTime;
      }),
      variations: data.variations.filter((_, i) => {
        const timestamp = new Date(labels[i]).getTime();
        return timestamp >= startTime && timestamp <= endTime;
      }),
    };
  };

  const filteredData = filterDataByTime(timeFilter);

  const chartData = filteredData.datasets[0].data.map((y, i) => ({
    x: filteredData.labels[i],
    y: y,
    volume: filteredData.volumes[i],
    variation: filteredData.variations[i]
  }));

  const { state, isActive } = useChartPressState<{ x: string, y: { y: number } }>({ x: '', y: { y: 0 } });

  const font = useFont(require("../../../assets/fonts/Roboto-Regular.ttf"), 12);
  const chartFont = useFont(require("../../../assets/fonts/Roboto-Bold.ttf"), 30);

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
  }, [data, timeFilter]);

  useEffect(() => {
    if (isActive) {
      const closestPoint = chartData.reduce((prev, curr) => (
        Math.abs(new Date(curr.x).getTime() - state.x.position.value) < Math.abs(new Date(prev.x).getTime() - state.x.position.value) ? curr : prev
      ));

      const formattedDate = format(new Date(closestPoint.x), 'dd/MM/yyyy HH:mm:ss');
      const formattedPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(closestPoint.y);
      setPressedPoint({ date: formattedDate, price: formattedPrice });
    } else {
      setPressedPoint(null);
    }
  }, [isActive, state.x.position.value]);

  if (!data || (data.datasets[0]?.data.length === 0)) {
    return <Text style={styles.dataText}>No data available</Text>;
  }

  const latestData = chartData[chartData.length - 1];
  const formattedDate = latestData ? format(new Date(latestData.x), 'dd/MM/yyyy HH:mm:ss') : '';
  const formattedPrice = latestData ? new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(latestData.y) : '';
  const isPriceDrop = latestData && latestData.variation < 0;
  const formattedLowestPriceTime = lowestPriceTime ? format(new Date(lowestPriceTime), 'dd/MM/yyyy HH:mm:ss') : '';
  const formattedHighestPriceTime = highestPriceTime ? format(new Date(highestPriceTime), 'dd/MM/yyyy HH:mm:ss') : '';
  const value = `$${state.y.y.value.value.toFixed(2)}`;
  const labelColor = 'white';
  const lineColor = 'lightgrey';

  return (
    <View style={[styles.chartContainer, { width, height }]}>
      <Text style={styles.title}>{title}</Text>
      <View style={{ height, width }}>
        <View style={styles.dataContainer}>
          {latestData && (
            <Text style={styles.dataText}>
              Preço em tempo real: {formattedPrice}{'\n'}
              Dia/Hora: {formattedDate}
            </Text>
          )}
          {highestPrice !== null && highestPriceTime && (
            <Text style={[styles.dataText, styles.highestPrice]}>
              Maior Preço do Dia: {new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(highestPrice)} {'\n'}
              Hora: {formattedHighestPriceTime}
            </Text>
          )}
        </View>
        <View style={styles.graphics}>
          <CartesianChart
            data={chartData}
            xKey="x"
            yKeys={["y"]}
            domainPadding={{ top: 30 }}
            axisOptions={{
              font,
              labelColor,
              lineColor,
            }}
            chartPressState={state}
          >
            {({ points, chartBounds }) => (
              <>
                <SKText
                  x={chartBounds.left + 10}
                  y={40}
                  font={chartFont}
                  text={value}
                  color={labelColor}
                  style={"fill"}
                />
                {type === 'line' && (
                  <Line
                    points={points.y}
                    color="red"
                    strokeWidth={3}
                    curveType="natural"
                    animate={{ type: "timing", duration: 300 }}
                    connectMissingData={true}
                  />
                )}
                {type === 'area' && (
                  <Area
                    points={points.y}
                    y0={chartBounds.bottom}
                    animate={{ type: "timing", duration: 500 }}
                  >
                    <LinearGradient
                      start={vec(chartBounds.bottom, 200)}
                      end={vec(chartBounds.bottom, chartBounds.bottom)}
                      colors={["green", "#90ee9050"]}
                    />
                  </Area>
                )}
                {type === 'bar' && (
                  <Bar
                    points={points.y}
                    chartBounds={chartBounds}
                    color="blue"
                    roundedCorners={{ topLeft: 10, topRight: 10 }}
                  />
                )}
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
