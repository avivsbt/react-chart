import { memo } from 'react';
import './XAxisItem.css';

type Props = {
    x: number;
    y: number;
    hypotenuseAndAngle: number[];
    price: number;
};

const XAxisItem: React.FC<Props> = ({ x, y, hypotenuseAndAngle, price }) => {
    return (
        <div data-value={price}>
            <div
                style={{
                    bottom: y - 4,
                    left: x - 4
                }}
                className="point" >
                <span className="tooltip">
                    <div className='price'>{price}</div>
                </span>
            </div>
            <div
                style={{
                    bottom: y,
                    left: x,
                    width: `${hypotenuseAndAngle[0]}px`,
                    transform: `rotate(calc(${hypotenuseAndAngle[1]} * 1deg))`
                }}
                className="line-segment" />
        </div>
    );
};

export default memo(XAxisItem);
