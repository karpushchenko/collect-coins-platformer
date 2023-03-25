import {Container, Sprite, useTick} from "@pixi/react";
import {Sprite as SpriteType} from "pixi.js"
import {useState, useEffect, forwardRef, Ref} from "react";
import {Coin} from "./Coin";
import useGameStore from "../store/store";

const
    direction = -1, //to Top
    gravity = 1,
    power = 20;

interface CoinBoxPropType {
    position?: {
        x?: number,
        y?: number
    }
}

export const CoinBox = forwardRef(({position}: CoinBoxPropType, ref: Ref<SpriteType>) => {

    const yPosition = position?.y || 0;
    const xPosition = position?.x || 0;

    const coinFlying = useGameStore((state) => state.coinFlying);
    const setCoinFlying = useGameStore((state) => state.setCoinFlying);
    const addCoin = useGameStore((state) => state.addCoin);

    const [jumpTime, setJumpTime] = useState(0);
    const [y, setY] = useState(0);

    useEffect((): void => {
        if (coinFlying) {
            addCoin();
        }
        // eslint-disable-next-line
    }, [coinFlying]);

    useTick(delta => {
        if (coinFlying) {
            const jumpHeight = (-gravity / 2) * Math.pow(jumpTime, 2) + power * jumpTime;
            if (jumpHeight < 0) {
                setCoinFlying(false)
                setY(0);
                setJumpTime(0);
                return;
            }
            setY((jumpHeight * direction));
            setJumpTime(jumpTime + delta);
        }
    });

    return (
        <Container x={xPosition} y={yPosition} ref={ref}>
            <Coin position={{y: y}}/>
            <Sprite
                image="../assets/box.png"
                anchor={0.5}
            />
        </Container>
    );
});