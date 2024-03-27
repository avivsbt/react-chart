import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './XAxis.css';
import { chart } from '../../data';
import XAxisBorders from '../XAxisBorders/XAxisBorders';
import { useDimensionsElement } from '../../hooks/useDimensionsElement';

const XAxis: React.FC = () => {

  const { ref, width, height } = useDimensionsElement();

  const max = useMemo(() => Math.max(...chart.data.map((item) => item.value)), []);
  const min = useMemo(() => Math.min(...chart.data.map((item) => item.value)), []);

  const calcRatioHeight = useCallback((value: number) => {

    const relativeValue = (value - min) / (max - min);

    return relativeValue * height;

  }, [height]);

  const calcRatioWidth = useCallback((index: number) => (width / chart.data.length) * index, [width]);

  const calcHypotenuseAndAngle = useCallback((index: number) => {

    if (index === chart.data.length - 1) return [0, 0];

    /*Hypotenuse*/
    let opposite = calcRatioHeight(chart.data[index].value) - calcRatioHeight(chart.data[index + 1].value);

    let chartSpace = (width / chart.data.length) * 1;

    let oppositeSquared = Math.pow(opposite, 2);

    let chartSpaceSquared = Math.pow(chartSpace, 2);

    let sumOfSquares = oppositeSquared + chartSpaceSquared;

    let hypotenuse = Math.sqrt(sumOfSquares);

    /*Angle*/
    let angleRadians = Math.asin(opposite / hypotenuse);
    let angle = angleRadians * (180 / Math.PI);

    return [hypotenuse, angle]
  }, [width]);

  return (
    <>
      <XAxisBorders />
      <div ref={ref} className="wrapper-point">
        {chart.data.map((item, index) => {
          return (
            <div data-value={item.value} key={index}>
              <div
                style={{
                  bottom: calcRatioHeight(item.value) - 4,
                  left: calcRatioWidth(index) - 4.5
                }}
                className="point" >
                <span className="tooltip">
                  <div className='price'>{item.value}</div>
                </span>
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
