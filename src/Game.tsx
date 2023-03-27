import {Sprite as SpriteType, TextStyle, Texture, Ticker} from 'pixi.js';
import {Stage, Container, Text, Sprite} from '@pixi/react';
import {useEffect, useRef} from 'react';
import {Character} from "./components/Character";
import useGameStore from "./store/store";
import {CoinBox} from "./components/CoinBox";
import load from "./loader/load";
import {Background} from "./components/Background";
import {Timer} from "./components/Timer";

export const Game = () => {
    let handleClick = () => {
    };

    const coinBoxSpriteRef = useRef<SpriteType>(null);
    const characterSpriteRef = useRef<SpriteType>(null);

    const coins = useGameStore((state) => state.coins);
    const loaded = useGameStore((state) => state.loaded);
    const maxCoins = useGameStore((state) => state.maxCoins);
    const setMaxCoins = useGameStore((state) => state.setMaxCoins);
    const confirmLoad = useGameStore((state) => state.confirmLoad);
    const gameStarted = useGameStore((state) => state.gameStarted);
    const startGame = useGameStore((state) => state.startGame);
    const addCoin = useGameStore((state) => state.addCoin);
    const resetCoins = useGameStore((state) => state.resetCoins);
    const setCoinFlying = useGameStore((state) => state.setCoinFlying);
    const timer = useGameStore((state) => state.timer);
    const setTimer = useGameStore((state) => state.setTimer);
    const gameDuration = 60;
    const canvasWidth = window.innerWidth > 800 ? 800 : window.innerWidth;

    useEffect(() => {
        load()
            .then(() => {
                    confirmLoad()
                }
            );
    }, [confirmLoad])

    useEffect(() => {
        if(timer === 0 && coins > maxCoins){
            setMaxCoins(coins);
        }
    }, [timer, coins, maxCoins, setMaxCoins])

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
        <Stage width={canvasWidth} options={{backgroundColor: 0xeef1f5}}>
            {
                <Container x={canvasWidth / 2} y={330}>
                    {
                        loaded && gameStarted ?
                            <>
                                <Background onpointerdown={() => handleClick()}/>
                                {
                                    timer > 0 ?
                                        <>
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
                                            <Text text={`Coins: ${coins}`} y={-300} x={canvasWidth/2 - 10} anchor={{x: 1, y: 0.5}}/>
                                            <Timer position={{x: canvasWidth/2 - 10, y: -270}}/>
                                        </>
                                        :
                                        <>
                                            <Text text={`Time is up!`} y={-50} x={0} anchor={{x: 0.5, y: 0.5}}/>
                                            <Text text={`Coins: ${coins}`} y={0} x={0} anchor={{x: 0.5, y: 0.5}}/>
                                            <Text text={`Max coins: ${maxCoins}`} y={50} x={0} anchor={{x: 0.5, y: 0.5}}/>
                                            <Container position={[0, 100]}>
                                                <Sprite
                                                    texture={Texture.WHITE}
                                                    width={100}
                                                    height={50}
                                                    anchor={0.5}
                                                    interactive
                                                    pointerdown={() => {
                                                        resetCoins();
                                                        setTimer(gameDuration);
                                                    }}
                                                />
                                                <Text text="Restart" anchor={0.5}/>
                                            </Container>
                                        </>
                                }
                            </>
                            :
                            <>
                                <Text
                                    text="Collect the coins"
                                    anchor={0.5}
                                    x={0}
                                    y={-100}
                                    style={
                                        new TextStyle({
                                            align: 'center',
                                            fontFamily: '"Source Sans Pro", Helvetica, sans-serif',
                                            fontSize: 40,
                                            fontWeight: '400',
                                            fill: ['#ffffff', '#00ff99'], // gradient
                                            stroke: '#01d27e',
                                            strokeThickness: 5,
                                            letterSpacing: 10,
                                            dropShadow: true,
                                            dropShadowColor: '#ccced2',
                                            dropShadowBlur: 4,
                                            dropShadowAngle: Math.PI / 6,
                                            dropShadowDistance: 6,
                                            wordWrap: true,
                                            wordWrapWidth: 300,
                                        })
                                    }
                                />
                                <Container position={[0, 50]}>
                                    <Sprite
                                        texture={Texture.WHITE}
                                        width={100}
                                        height={50}
                                        anchor={0.5}
                                        interactive
                                        pointerdown={(event) => {
                                            event.stopPropagation();
                                            startGame();
                                            setTimer(gameDuration);
                                        }}
                                    />
                                    <Text text="Start" anchor={0.5}/>
                                </Container>
                            </>
                    }
                </Container>
            }
        </Stage>
    );
};