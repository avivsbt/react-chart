import { memo, useMemo } from 'react';
import './YAxis.css';
import { chart } from '../../data';

const YAxis: React.FC = () => {
  const max = useMemo(() => Math.max(...chart.data.map((item) => item.value)), []);
  const min = useMemo(() => Math.min(...chart.data.map((item) => item.value)), []);
  const middle = useMemo(() => Math.floor((max + min) / 2), [max, min]);
  const middleMin = useMemo(() => Math.floor((middle + min) / 2), [middle, min]);
  const middleMax = useMemo(() => Math.floor((middle + max) / 2), [middle, max]);

  return (
    <ul className="wrapper-yaxis">
      <li>{max}</li>
      <li>{middleMax}</li>
      <li>{middle}</li>
      <li>{middleMin}</li>
      <li>{min}</li>
    </ul>
  );
};

export default memo(YAxis);
