import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './XAxis.css';
import { chart } from '../../data';
import XAxisBorders from '../XAxisBorders/XAxisBorders';

const XAxis: React.FC = () => {

  const chartRef = useRef<HTMLDivElement>(null);
  const [chartWidth, setChartWidth] = useState(0);
  const [chartHeight, setChartHeight] = useState(0);

  useEffect(() => {
    const updateSize = () => {
      if (chartRef.current) {
        setChartWidth(chartRef.current.clientWidth);
        setChartHeight(chartRef.current.clientHeight);
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const max = useMemo(() => Math.max(...chart.data.map((item) => item.value)), []);
  const min = useMemo(() => Math.min(...chart.data.map((item) => item.value)), []);

  const calcRatioHeight = useCallback((value: number) => {

    const relativeValue = (value - min) / (max - min);

    let height = (chartHeight - (chartHeight / chart.data.length)) - 50;

    return relativeValue * height;

  }, [chartHeight]);

  const calcRatioWidth = useCallback((index: number) => (chartWidth / chart.data.length) * index, [chartWidth]);

  const calcHypotenuseAndAngle = useCallback((index: number) => {

    if (index === chart.data.length - 1) return [0, 0];

    /*Hypotenuse*/
    let opposite = calcRatioHeight(chart.data[index].value) - calcRatioHeight(chart.data[index + 1].value);

    let chartSpace = (chartWidth / chart.data.length) * 1;

    let oppositeSquared = Math.pow(opposite, 2);

    let chartSpaceSquared = Math.pow(chartSpace, 2);

    let sumOfSquares = oppositeSquared + chartSpaceSquared;

    let hypotenuse = Math.sqrt(sumOfSquares);

    /*Angle*/
    let angleRadians = Math.asin(opposite / hypotenuse);
    let angle = angleRadians * (180 / Math.PI);

    return [hypotenuse, angle]
  }, [chartWidth]);


  return (
    <>
      <XAxisBorders />
      <div ref={chartRef} className="wrapper-point">
        {chart.data.map((item, index) => {
          return (
            <div data-value={item.value} key={item.value}>
              <div
                style={{
                  bottom: calcRatioHeight(item.value) - 2,
                  left: calcRatioWidth(index) - 5
                }}
                className="point" >
                <span className="tooltip">{item.value}</span>
              </div>
              <div
                style={{
                  bottom: calcRatioHeight(item.value),
                  left: calcRatioWidth(index),
                  width: `${calcHypotenuseAndAngle(index)[0]}px`,
                  transform: `rotate(calc(${calcHypotenuseAndAngle(index)[1]} * 1deg))`
                }}
                className="line-segment" />
            </div>
          )
        })}
      </div>
    </>

  );
};

export default memo(XAxis);
