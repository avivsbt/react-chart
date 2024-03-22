import { memo, useEffect, useRef, useState } from 'react';
import './Chart.css';
import XAxis from './components/XAxis/XAxis';
import YAxis from './components/YAxis/YAxis';

const Chart: React.FC = () => {

  const chartRef = useRef<HTMLDivElement>(null);
  const [clientWidth, setClientWidth] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);

  useEffect(() => {
    const updateSize = () => {
      if (chartRef.current) {
        setClientWidth(chartRef.current.clientWidth);
        setClientHeight(chartRef.current.clientHeight);
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <div ref={chartRef} className="wrapper-chart">
      <YAxis />
      <XAxis chartWidth={clientWidth} chartHeight={clientHeight} />
    </div>
  );
};

export default memo(Chart);
