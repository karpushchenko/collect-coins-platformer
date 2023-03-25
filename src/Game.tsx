import {Sprite as SpriteType, Ticker} from 'pixi.js';
import {Stage, Container, Text} from '@pixi/react';
import {useEffect, useRef} from 'react';
import {Character} from "./components/Character";
import useGameStore from "./store/store";
import {CoinBox} from "./components/CoinBox";

export const Game = () => {
    let handleClick = () => {
    };
    let handleCoin = () => {
    };

    const coinBoxSpriteRef = useRef<SpriteType>(null);
    const characterSpriteRef = useRef<SpriteType>(null);

    const coins = useGameStore((state) => state.coins)

    useEffect(() => {
        const checkCollision = () => {
            const coinBoxSprite = coinBoxSpriteRef.current;
            const characterSprite = characterSpriteRef.current;

            if (coinBoxSprite && characterSprite) {
                if (coinBoxSprite.getBounds().intersects(characterSprite.getBounds())) {
                    handleCoin()
                }
            }
        };

        const ticker = Ticker.shared;
        ticker.add(checkCollision);

        return () => {
            ticker.remove(checkCollision);
        };
    }, []);

    return (
        <Stage options={{backgroundColor: 0xeef1f5}} onPointerDown={() => handleClick()}>
            <Container x={400} y={330}>
                <CoinBox
                    toggle={(toggle: () => void) => {
                        handleCoin = toggle;
                    }}
                    position={{y: -165}}
                    ref={coinBoxSpriteRef}

                />
                <Character
                    toggle={(toggle: () => void) => {
                        handleClick = toggle;
                    }}
                    position={{y: 150}}
                    ref={characterSpriteRef}
                />
                <Text text={`Coins: ${coins}`} y={-300} x={200} anchor={{x: 0.5, y: 0.5}}/>
            </Container>
        </Stage>
    );
};