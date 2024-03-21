import { memo } from 'react';
import './XAxis.css';

const XAxis: React.FC = () => {
  return (
    <ul className="wrapper-xaxis">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  );
};

export default memo(XAxis);
