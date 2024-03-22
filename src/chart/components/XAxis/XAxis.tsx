import { memo, useCallback, useMemo } from 'react';
import './XAxis.css';
import { chart } from '../../data';

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
        {chart.map((item, index) => {
          return (
            <div
              key={item.value}
              className="point"
              data-value={item.value}
              style={{ bottom: calcRatioHeight(item.value), left: calcRatioWidth(index) }} />
          )
        })}
      </div>

    </>

  );
};

export default memo(XAxis);
