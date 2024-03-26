import { memo } from 'react';
import './XAxisBorders.css';

const XAxisBorders: React.FC = () => {
    return (
        <>
            <ul className="wrapper-xaxis-borders">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </>
    );
};

export default memo(XAxisBorders);
