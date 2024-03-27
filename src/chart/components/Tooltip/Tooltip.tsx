import { memo } from 'react';
import './Tooltip.css';

type Props = {
    price: number;
    x: number;
    y: number;
    shown: boolean;
};

const Tooltip: React.FC<Props> = ({ price, x, y, shown }) => {
    return (<>
        {shown && <span style={{ bottom: y + 2, left: x + 2 }} className="tooltip">
            <div className='price'>price: {price}</div>
        </span>}
    </>

    );
};

export default memo(Tooltip);
