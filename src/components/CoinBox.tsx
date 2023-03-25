import {Container, Sprite, useTick} from "@pixi/react";
import {Sprite as SpriteType} from "pixi.js"
import {useState, useEffect, forwardRef, Ref, useCallback} from "react";
import {Coin} from "./Coin";
import useGameStore from "../store/store";

const
    direction = -1, //to Top
    gravity = 1,
    power = 20;
interface CoinBoxPropType {
    toggle: (callback: () => void) => void;
    position?: {
        x?: number,
        y?: number
    }
}
export const CoinBox = forwardRef(({toggle, position}: CoinBoxPropType, ref: Ref<SpriteType>) => {

    const yPosition = position?.y || 0;
    const xPosition = position?.x || 0;

    const addCoin = useGameStore((state) => state.addCoin)

    const [isJumping, setIsJumping] = useState(false);
    const [jumpTime, setJumpTime] = useState(0);
    const [y, setY] = useState(0);
    const toggleJump = useCallback((): void => {
        if(!isJumping){
            setIsJumping(true);
            setJumpTime(0);
        }
    },[isJumping]);

    useEffect(() => {
        toggle && toggle(toggleJump);
    }, [toggle, toggleJump]);

    useTick(delta => {
        if (isJumping) {
            const jumpHeight = (-gravity / 2) * Math.pow(jumpTime, 2) + power * jumpTime;
            if (jumpHeight < 0) {
                setIsJumping(false)
                setY(0);
                addCoin();
                return;
            }
            setY((jumpHeight * direction));
            setJumpTime(jumpTime + delta);
        }
    });

    return (
        <Container x={xPosition} y={yPosition} ref={ref}>
            <Coin position={{y: y}} />
            <Sprite
                image="../assets/box.png"
                anchor={0.5}
            />
        </Container>
    );
});