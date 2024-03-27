import { useEffect, useRef, useState } from "react";

type TDimensionsElement = {
    ref: any;
    width: number;
    height: number;
}

export const useDimensionsElement = (): TDimensionsElement => {
    const ref = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        const updateSize = () => {
            if (ref.current) {
                setWidth(ref.current.clientWidth);
                setHeight(ref.current.clientHeight);
            }
        };
        updateSize();
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    return { ref, width, height }
}