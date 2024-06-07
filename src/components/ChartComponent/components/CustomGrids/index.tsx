// components/CustomGrid.tsx
import React from 'react';
import { G, Line, LineProps } from 'react-native-svg';
import { GridProps } from 'react-native-svg-charts';

const CustomGrid: React.FC<GridProps<number>> = ({
  x = () => 0,
  y = () => 0,
  ticks = [],
  svg = { stroke: 'rgba(0,0,0,0.2)', strokeWidth: 1 },
  direction = 'both',
  belowChart = false,
}) => {
  const horizontal = direction === 'both' || direction === 'horizontal';
  const vertical = direction === 'both' || direction === 'vertical';

  return (
    <G>
      {horizontal &&
        ticks.map((tick, index) => (
          <Line
            key={index}
            x1="0%"
            x2="100%"
            y1={y(tick)}
            y2={y(tick)}
            stroke={svg.stroke}
            strokeWidth={svg.strokeWidth}
          />
        ))}
      {vertical &&
        ticks.map((tick, index) => (
          <Line
            key={index}
            y1="0%"
            y2="100%"
            x1={x(tick)}
            x2={x(tick)}
            stroke={svg.stroke}
            strokeWidth={svg.strokeWidth}
          />
        ))}
    </G>
  );
};

export default CustomGrid;
