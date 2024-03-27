import { memo } from 'react';
import './Tooltip.css';

type Props = {
    price: number;
};

const Tooltip: React.FC<Props> = ({ price }) => {
    return (
        <span className="tooltip">
            <div className='price'>{price}</div>
        </span>
    );
};

export default memo(Tooltip);
