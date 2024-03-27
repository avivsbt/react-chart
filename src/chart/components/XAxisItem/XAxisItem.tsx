import { memo } from 'react';
import './XAxisItem.css';
import Tooltip from '../Tooltip/Tooltip';

type Props = {
    x: number;
    y: number;
    hypotenuseAndAngle: number[];
    price: number;
};

const XAxisItem: React.FC<Props> = ({ x, y, hypotenuseAndAngle, price }) => {
    return (
        <div data-value={price}>

            <div className="point" style={{ bottom: y - 4, left: x - 4 }}>
                <Tooltip price={price} />
            </div>

            <div className="line-segment"
                style={{
                    bottom: y,
                    left: x,
                    width: `${hypotenuseAndAngle[0]}px`,
                    transform: `rotate(calc(${hypotenuseAndAngle[1]} * 1deg))`
                }} />
        </div>
    );
};

export default memo(XAxisItem);
