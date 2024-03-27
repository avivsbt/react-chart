import { memo, useMemo } from 'react';
import './YAxis.css';
import { chart } from '../../data';

const YAxis: React.FC = () => {

  const max = useMemo(() => (Math.max(...chart.data.map((item) => item.value)) / 5) * 4, []);
  const min = useMemo(() => Math.min(...chart.data.map((item) => item.value)), []);
  const middle = useMemo(() => (max + min) / 2, [max, min]);
  const middleMin = useMemo(() => (middle + min) / 2, [middle, min]);
  const middleMax = useMemo(() => (middle + max) / 2, [middle, max]);

  return (
    <ul className="wrapper-yaxis">
      <li>{max.toFixed(2)}</li>
      <li>{middleMax.toFixed(2)}</li>
      <li>{middle.toFixed(2)}</li>
      <li>{middleMin.toFixed(2)}</li>
      <li>{min.toFixed(2)}</li>
    </ul>
  );
};

export default memo(YAxis);
