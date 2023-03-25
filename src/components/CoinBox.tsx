import {Container, Sprite, useApp, useTick} from "@pixi/react";
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
    const [blockSpeed, setBlockSpeed] = useState(3);
    const [y, setY] = useState(0);

    const [boxX, setBoxX] = useState(xPosition);

    const app = useApp();

    useEffect((): void => {
        if (coinFlying) {
            addCoin();
        }
        // eslint-disable-next-line
    }, [coinFlying]);

    useTick(delta => {
        animate();
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

    const animate = () => {
        let newX = boxX - blockSpeed;
        const halfScreen = app.screen.width;
        // check if the rectangle has reached the edge of the screen
        if (newX < - app.screen.width) {
            newX = halfScreen;
            setBlockSpeed(Math.floor(Math.random() * 4) + 1)
        }

        setBoxX(newX);
    };

    return (
        <Container x={boxX} y={yPosition} ref={ref}>
            <Coin position={{y: y}}/>
            <Sprite
                image="../assets/box.png"

                anchor={0.5}
            />
        </Container>
    );
});