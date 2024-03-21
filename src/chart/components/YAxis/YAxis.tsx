import { memo } from 'react';
import './YAxis.css';

const YAxis: React.FC = () => {
  return (
    <ul className="wrapper-yaxis">
      <li>10</li>
      <li>10</li>
      <li>10</li>
      <li>10</li>
      <li>10</li>
    </ul>
  );
};

export default memo(YAxis);
