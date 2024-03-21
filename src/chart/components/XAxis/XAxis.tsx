import { memo } from 'react';
import './XAxis.css';
import { chart } from '../../data';

const XAxis: React.FC = () => {
  return (
    <>
      <ul className="wrapper-xaxis">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>

      <div className="wrapper-point">
        {chart.map((item) => {
          return <div className="point">*</div>
        })}
      </div>

    </>

  );
};

export default memo(XAxis);
