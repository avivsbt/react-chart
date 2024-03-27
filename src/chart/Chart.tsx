import { memo } from 'react';
import './Chart.css';
import XAxis from './components/XAxis/XAxis';
import YAxis from './components/YAxis/YAxis';
import { chart } from './data';

const Chart: React.FC = () => {
  return (
    <div className="wrapper">
      <h1>{chart.symbol}</h1>
      <div className="wrapper-chart">
        <YAxis />
        <XAxis />
      </div>
    </div>
  );
};

export default memo(Chart);
