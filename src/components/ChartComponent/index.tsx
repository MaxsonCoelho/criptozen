import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { View, Text, Alert } from 'react-native';
import { CartesianChart, Line, Area, Bar, useChartPressState } from "victory-native";
import { Circle, LinearGradient, useFont, vec, Text as SKText } from "@shopify/react-native-skia";
import { stylesCollections } from './styles';
import { format, isValid } from 'date-fns';

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
  title?: string;
  labels: string[];
  width: number;
  height?: number;
  currency: string;
  timeFilter: string;
}

const ChartComponent: React.FC<ChartComponentProps> = ({ type, data, title, labels, width, height, currency, timeFilter }) => {
  const styles = stylesCollections();
  const [highestPrice, setHighestPrice] = useState<number | null>(null);
  const [highestPriceTime, setHighestPriceTime] = useState<string | null>(null);
  const [lowestPrice, setLowestPrice] = useState<number | null>(null);
  const [showLatestPrice, setShowLatestPrice] = useState<boolean>(true);
  const { state, isActive } = useChartPressState<{ x: string, y: { y: number } }>({ x: '', y: { y: 0 } });

  const font = useFont(require("../../../assets/fonts/Roboto-Regular.ttf"), 12);
  const chartFont = useFont(require("../../../assets/fonts/Roboto-Bold.ttf"), 30);

  const filterDataByTime = useCallback((timeFilter: string) => {
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

    const filteredLabels: string[] = [];
    const filteredData: number[] = [];
    const filteredVolumes: number[] = [];
    const filteredVariations: number[] = [];

    labels.forEach((label, i) => {
      const date = new Date(label);
      if (isValid(date)) {
        const timestamp = date.getTime();
        if (timestamp >= startTime && timestamp <= endTime) {
          filteredLabels.push(format(date, 'HH:mm'));
          filteredData.push(data.datasets[0].data[i]);
          filteredVolumes.push(data.volumes[i]);
          filteredVariations.push(data.variations[i]);
        }
      } else {
        console.error(`Data inválida: ${label}`);
      }
    });

    return {
      labels: filteredLabels,
      datasets: [{ data: filteredData }],
      volumes: filteredVolumes,
      variations: filteredVariations,
    };
  }, [labels, data]);

  const filteredData = useMemo(() => filterDataByTime(timeFilter), [filterDataByTime, timeFilter, data, labels]);

  const chartData = useMemo(() => filteredData.datasets[0].data.map((y, i) => ({
    x: filteredData.labels[i],
    y: y,
    volume: filteredData.volumes[i],
    variation: filteredData.variations[i]
  })), [filteredData]);

  useEffect(() => {
    if (chartData.length > 0) {
      const maxPrice = Math.max(...chartData.map(d => d.y));
      const minPrice = Math.min(...chartData.map(d => d.y));
      const maxPriceTime = chartData.find(d => d.y === maxPrice)?.x || '';
      const minPriceTime = chartData.find(d => d.y === minPrice)?.x || '';

      setHighestPrice(maxPrice);
      setHighestPriceTime(maxPriceTime);
      setLowestPrice(minPrice);
    }
  }, [chartData]);

  useEffect(() => {
    if (!isActive) {
      const timeout = setTimeout(() => {
        setShowLatestPrice(true);
      }, 2000);
      return () => clearTimeout(timeout);
    } else {
      setShowLatestPrice(false);
    }
  }, [isActive]);

  const formatCurrency = useCallback((value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(value), [currency]);

  const latestFormattedDate = useMemo(() => new Date().toLocaleDateString('pt-BR'), []);
  const latestData = chartData[chartData.length - 1];
  const latestFormattedPrice = useMemo(() => latestData ? formatCurrency(latestData.y) : '', [latestData, formatCurrency]);
  const value = useMemo(() => `$${state.y.y.value.value.toFixed(2)}`, [state.y.y.value.value]);
  const labelColor = 'white';
  const lineColor = 'lightgrey';

  if (!data || (data.datasets[0]?.data.length === 0)) {
    return <Text style={styles.dataText}>Nenhum dado disponível</Text>;
  }

  return (
    <View style={[styles.chartContainer, { width, height }]}>
      <View style={{ height, width }}>
        <View style={styles.dataContainer}>
          {highestPrice !== null && highestPriceTime && (
            <View style={styles.coinValuesContainer}>
              <Text style={[styles.dataText, styles.highestPrice]}>
                Alta: {formatCurrency(highestPrice)}
              </Text>
              <Text style={[styles.dataText, styles.lowestPrice]}>
                Baixa: {formatCurrency(lowestPrice!)}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.graphics}>
          <CartesianChart
            data={chartData}
            xKey="x"
            yKeys={["y"]}
            domainPadding={{ top: 70, bottom: 70, right: 30 }}
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
                  text={showLatestPrice ? latestFormattedPrice : value}
                  color={labelColor}
                  style={"fill"}
                />
                <SKText
                  x={chartBounds.left + 10}
                  y={60}
                  font={font}
                  text={`Dia: ${latestFormattedDate}\nHora: ${highestPriceTime}`}
                  color={labelColor}
                  style={"fill"}
                />
                {type === 'line' && (
                  <Line
                    points={points.y}
                    color="red"
                    strokeWidth={2}
                    blendMode='softLight'
                    curveType="catmullRom"
                    animate={{ type: "timing", duration: 300 }}
                    connectMissingData={true}
                    antiAlias={true}
                  />
                )}
                {type === 'area' && (
                  <Area
                    points={points.y}
                    y0={chartBounds.bottom}
                    animate={{ type: "timing", duration: 500 }}
                    antiAlias={true}
                    blendMode='softLight'
                    curveType='catmullRom'
                  >
                    <LinearGradient
                      start={vec(chartBounds.bottom, 150)}
                      end={vec(chartBounds.bottom, chartBounds.bottom)}
                      colors={["green", "#58F75824"]}
                    />
                  </Area>
                )}
                {type === 'bar' && (
                  <Bar
                    points={points.y}
                    chartBounds={chartBounds}
                    color="blue"
                    roundedCorners={{ topLeft: 10, topRight: 10 }}
                    animate={{ type: "timing", duration: 500 }}
                  />
                )}
                {isActive && (
                  <Circle cx={state.x.position} cy={state.y.y.position} r={8} color="#00BFFF" />
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
