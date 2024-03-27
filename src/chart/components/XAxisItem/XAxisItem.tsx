import { memo, useState } from 'react';
import './XAxisItem.css';
import Tooltip from '../Tooltip/Tooltip';

type Props = {
    x: number;
    y: number;
    hypotenuseAndAngle: number[];
    price: number;
};

const XAxisItem: React.FC<Props> = ({ x, y, hypotenuseAndAngle, price }) => {
    const [isShown, setIsShown] = useState(false);

    return (
        <div data-value={price}>
            <Tooltip shown={isShown} x={x} y={y} price={price} />
            <div
                onMouseEnter={() => setIsShown(true)}
                onMouseLeave={() => setIsShown(false)}
                className="point"
                style={{ bottom: y - 2.5, left: x - 2.5 }}>
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
