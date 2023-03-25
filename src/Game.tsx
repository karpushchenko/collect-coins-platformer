import {BlurFilter, Sprite as SpriteType, Ticker} from 'pixi.js';
import {Stage, Container, Text} from '@pixi/react';
import {useEffect, useMemo, useRef} from 'react';
import {Coin} from "./components/Coin";
import {Character} from "./components/Character";

export const Game = () => {
    const blurFilter = useMemo(() => new BlurFilter(4), []);
    let handleClick = () => {
    };

    const coinBoxSpriteRef = useRef<SpriteType>(null);
    const characterSpriteRef = useRef<SpriteType>(null);

    useEffect(() => {
        const handleCollision = () => {
            console.log('collision detected')
        };

        const checkCollision = () => {
            const coinBoxSprite = coinBoxSpriteRef.current;
            const characterSprite = characterSpriteRef.current;

            if (coinBoxSprite && characterSprite) {
                if (coinBoxSprite.getBounds().intersects(characterSprite.getBounds())) {
                    handleCollision();
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
                <Coin ref={coinBoxSpriteRef}></Coin>
                <Character
                    toggle={(toggle: () => void) => {
                        handleClick = toggle;
                    }}
                    position={{y: 150}}
                    ref={characterSpriteRef}
                />
                <Text text="Hello World" anchor={{x: 0.5, y: 0.5}} filters={[blurFilter]}/>
            </Container>
        </Stage>
    );
};