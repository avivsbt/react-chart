import { memo } from 'react';
import './Chart.css';
import XAxis from './components/XAxis/XAxis';
import YAxis from './components/YAxis/YAxis';

const Chart: React.FC = () => {
  return (
    <div className="wrapper-chart">
      <YAxis />
      <XAxis />
    </div>
  );
};

export default memo(Chart);
