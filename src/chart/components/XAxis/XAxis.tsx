import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './XAxis.css';
import { chart } from '../../data';
import XAxisBorders from '../XAxisBorders/XAxisBorders';
import { useDimensionsElement } from '../../hooks/useDimensionsElement';
import XAxisItem from '../XAxisItem/XAxisItem';

const XAxis: React.FC = () => {

  const { ref, width, height } = useDimensionsElement();

  const max = useMemo(() => Math.max(...chart.data.map((item) => item.value)), []);
  const min = useMemo(() => Math.min(...chart.data.map((item) => item.value)), []);

  const YRatioValue = useCallback((value: number) => {

    const relativeValue = (value - min) / (max - min);

    return relativeValue * height;

  }, [height]);

  const XRatioValue = useCallback((index: number) => (width / chart.data.length) * index, [width]);

  const hypotenuseAndAngle = useCallback((index: number) => {

    if (index === chart.data.length - 1) return [0, 0];

    /*Hypotenuse calculation*/
    let opposite = YRatioValue(chart.data[index].value) - YRatioValue(chart.data[index + 1].value);

    let chartSpace = (width / chart.data.length) * 1;

    let oppositeSquared = Math.pow(opposite, 2);

    let chartSpaceSquared = Math.pow(chartSpace, 2);

    let sumOfSquares = oppositeSquared + chartSpaceSquared;

    let hypotenuse = Math.sqrt(sumOfSquares);

    /*Angle calculation*/
    let angleRadians = Math.asin(opposite / hypotenuse);
    let angle = angleRadians * (180 / Math.PI);

    return [hypotenuse, angle]
  }, [width]);

  return (
    <>
      <XAxisBorders />
      <div ref={ref} className="wrapper-point">
        {chart.data.map((item, index) =>
          <XAxisItem
            x={XRatioValue(index)}
            y={YRatioValue(item.value)}
            hypotenuseAndAngle={hypotenuseAndAngle(index)}
            price={item.value}
            key={index} />
        )}
      </div>
    </>
  );
};

export default memo(XAxis);
