import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { LineChart, BarChart, PieChart } from 'react-native-svg-charts';
import { stylesCollections } from './styles';
import CustomGrid from './components/CustomGrids';

type ChartType = 'line' | 'bar' | 'pie';

interface LineBarChartData {
  labels: string[];
  datasets: {
    data: number[];
  }[];
}

export interface PieChartData {
  key: string;
  value: number;
  svg: {
    fill: string;
  };
  arc: {
    outerRadius: string;
    cornerRadius: number;
  };
}

interface ChartComponentProps {
  type: ChartType;
  data: LineBarChartData | PieChartData[];
  title: string;
  labels: string[];
}

const screenWidth = Dimensions.get('window').width;

const ChartComponent: React.FC<ChartComponentProps> = ({ type, data, title, labels }) => {
  const styles = stylesCollections();

  const renderChart = () => {
    switch (type) {
      case 'line':
        return (
          <LineChart
            style={{ height: 220, width: screenWidth }}
            data={(data as LineBarChartData).datasets[0].data}
            svg={{ stroke: 'rgb(134, 65, 244)' }}
            contentInset={{ top: 20, bottom: 20 }}
          >
            <CustomGrid svg={{ stroke: 'rgba(0,0,0,0.2)', strokeWidth: 1 }} />
          </LineChart>
        );
      case 'bar':
        return (
          <BarChart
            style={{ height: 220, width: screenWidth }}
            data={(data as LineBarChartData).datasets[0].data}
            svg={{ fill: 'rgb(134, 65, 244)' }}
            contentInset={{ top: 20, bottom: 20 }}
          >
            <CustomGrid svg={{ stroke: 'rgba(0,0,0,0.2)', strokeWidth: 1 }} />
          </BarChart>
        );
      case 'pie':
        return (
          <PieChart
            style={{ height: 220, width: screenWidth }}
            data={data as PieChartData[]}
            valueAccessor={({ item }) => item.value}
            outerRadius="95%"
            innerRadius="50%"
            labelRadius="100%"
            sort={(a, b) => b.value - a.value}
          />
        );
      default:
        return null;
    }
  };

  return (
    <View>
      <Text style={styles.container}>{title}</Text>
      {renderChart()}
    </View>
  );
};

export default ChartComponent;
