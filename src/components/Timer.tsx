import {Text} from "@pixi/react";
import useGameStore from "../store/store";
import {useEffect} from "react";

interface TimerPropType {
    position?: {
        x?: number,
        y?: number
    }
}
export const Timer = ({position} : TimerPropType) => {

    const yPosition = position?.y || 0;
    const xPosition = position?.x || 0;

    const timer = useGameStore((state) => state.timer);
    const setTimer = useGameStore((state) => state.setTimer);

    useEffect(() => {
        if(timer > 0){
            const interval = setInterval(() => {
                setTimer(timer - 1);
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [timer, setTimer]);

    return (
        <Text text={`Timer: ${timer}`} y={yPosition} x={xPosition} anchor={{x: 1, y: 0.5}}/>
    );
};