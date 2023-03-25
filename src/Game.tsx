import {Sprite as SpriteType, Ticker} from 'pixi.js';
import {Stage, Container, Text} from '@pixi/react';
import {useEffect, useRef} from 'react';
import {Character} from "./components/Character";
import useGameStore from "./store/store";
import {CoinBox} from "./components/CoinBox";
import load from "./loader/load";

export const Game = () => {
    let handleClick = () => {
    };

    const coinBoxSpriteRef = useRef<SpriteType>(null);
    const characterSpriteRef = useRef<SpriteType>(null);

    const coins = useGameStore((state) => state.coins);
    const loaded = useGameStore((state) => state.loaded);
    const confirmLoad = useGameStore((state) => state.confirmLoad);
    const addCoin = useGameStore((state) => state.addCoin);
    const setCoinFlying = useGameStore((state) => state.setCoinFlying);

    useEffect(() => {
        load()
            .then(() => {
                    confirmLoad()
                }
            );
    }, [confirmLoad])

    useEffect(() => {
        const checkCollision = () => {
            const coinBoxSprite = coinBoxSpriteRef.current;
            const characterSprite = characterSpriteRef.current;

            if (coinBoxSprite && characterSprite) {
                if (coinBoxSprite.getBounds().intersects(characterSprite.getBounds())) {
                    setCoinFlying(true);
                }
            }
        };

        const ticker = Ticker.shared;
        ticker.add(checkCollision);

        return () => {
            ticker.remove(checkCollision);
        };
    }, [addCoin, setCoinFlying]);

    return (
        <Stage options={{backgroundColor: 0xeef1f5}} onPointerDown={() => handleClick()}>
            {
                loaded &&
                <Container x={400} y={330}>
                    <CoinBox
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
            }
        </Stage>
    );
};