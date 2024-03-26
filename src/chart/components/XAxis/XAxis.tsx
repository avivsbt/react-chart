import { Fragment, memo, useCallback, useMemo } from 'react';
import './XAxis.css';
import { chart } from '../../data';
import XAxisBorders from '../XAxisBorders/XAxisBorders';

type Props = {
  chartHeight: number;
  chartWidth: number;
}

const XAxis: React.FC<Props> = ({ chartHeight, chartWidth }) => {

  const max = useMemo(() => Math.max(...chart.map((item) => item.value)), [])
  const min = useMemo(() => Math.min(...chart.map((item) => item.value)), [])

  const calcRatioHeight = useCallback((value: number) => {

    const relativeValue = (value - min) / (max - min);

    let height = (chartHeight - (chartHeight / chart.length)) + 10;

    return relativeValue * height;

  }, [chartHeight]);

  const calcRatioWidth = useCallback((index: number) => (chartWidth / chart.length) * index, [chartHeight]);

  const calcHypotenuse = useCallback((value: number, index: number) => {

    // if(index === chart.length - 1) 

    let opposite = 0;

    if (index === 0) {
      opposite = 0 - 234.8
    }
    if (index === 1) {
      opposite = 234.8 - 99.79
    }
    if (index === 2) {
      opposite = 99.79 - 176.1
    }
    if (index === 3) {
      opposite = 176.1 - 58.7
    }

    let chartSpace = (chartWidth / chart.length) * 1;

    let oppositeSquared = Math.pow(opposite, 2);
    let chartSpaceSquared = Math.pow(chartSpace, 2);

    let sumOfSquares = oppositeSquared + chartSpaceSquared;

    let hypotenuse = Math.sqrt(sumOfSquares);

    let angleRadians = Math.asin(opposite / hypotenuse);
    let angle = angleRadians * (180 / Math.PI);
    const arr = [hypotenuse, angle]
    return arr
  }, [chartHeight]);


  return (
    <>
      <XAxisBorders />

      <div className="wrapper-point">
        {chart.map((item, index) => {

          return (
            <Fragment key={item.value}>
              <div
                className="point"
                data-value={item.value}
                style={{ bottom: calcRatioHeight(item.value), left: calcRatioWidth(index) - 4 }} />
              <div
                style={{
                  bottom: calcRatioHeight(item.value),
                  left: calcRatioWidth(index),
                  width: `${calcHypotenuse(item.value, index)[0]}px`,
                  transform: `rotate(calc(${calcHypotenuse(item.value, index)[1]} * 1deg))`
                }}
                className="line-segment" />
            </Fragment>


          )
        })}
      </div>

    </>

  );
};

export default memo(XAxis);
