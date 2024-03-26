import { memo, useCallback, useMemo } from 'react';
import './XAxis.css';
import { chart } from '../../data';
import XAxisBorders from '../XAxisBorders/XAxisBorders';

type Props = {
  chartHeight: number;
  chartWidth: number;
}

const XAxis: React.FC<Props> = ({ chartHeight, chartWidth }) => {

  const max = useMemo(() => Math.max(...chart.map((item) => item.value)), []);
  const min = useMemo(() => Math.min(...chart.map((item) => item.value)), []);

  const calcRatioHeight = useCallback((value: number) => {

    const relativeValue = (value - min) / (max - min);

    let height = (chartHeight - (chartHeight / chart.length)) - 40;

    return relativeValue * height;

  }, [chartHeight]);

  const calcRatioWidth = useCallback((index: number) => (chartWidth / chart.length) * index, [chartHeight]);

  const calcHypotenuseAndAngle = useCallback((index: number) => {

    if (index === chart.length - 1) return [0, 0];

    /*Hypotenuse*/
    let opposite = calcRatioHeight(chart[index].value) - calcRatioHeight(chart[index + 1].value);

    let chartSpace = (chartWidth / chart.length) * 1;

    let oppositeSquared = Math.pow(opposite, 2);

    let chartSpaceSquared = Math.pow(chartSpace, 2);

    let sumOfSquares = oppositeSquared + chartSpaceSquared;

    let hypotenuse = Math.sqrt(sumOfSquares);

    /*Angle*/
    let angleRadians = Math.asin(opposite / hypotenuse);
    let angle = angleRadians * (180 / Math.PI);

    return [hypotenuse, angle]
  }, [chartHeight]);


  return (
    <>
      <XAxisBorders />
      <div className="wrapper-point">
        {chart.map((item, index) => {
          return (
            <div data-value={item.value} key={item.value}>
              <div
                style={{
                  bottom: calcRatioHeight(item.value),
                  left: calcRatioWidth(index) - 5
                }}
                className="point" />
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
