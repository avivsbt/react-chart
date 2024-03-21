import { memo, useMemo } from 'react';
import './YAxis.css';
import { chart } from '../../data';

const YAxis: React.FC = () => {
  const values = useMemo(() => chart.sort((a, b) => b.value - a.value), []);
  console.log(values);

  return (
    <ul className="wrapper-yaxis">
      {values.map((y) => <li key={y.value}>{y.value}</li>)}
    </ul>
  );
};

export default memo(YAxis);
