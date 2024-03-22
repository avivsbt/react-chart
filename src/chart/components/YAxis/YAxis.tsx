import { memo } from 'react';
import './YAxis.css';

const YAxis: React.FC = () => {

  return (
    <ul className="wrapper-yaxis">
      <li>60</li>
      <li>50</li>
      <li>40</li>
      <li>30</li>
      <li>20</li>
    </ul>
  );
};

export default memo(YAxis);
