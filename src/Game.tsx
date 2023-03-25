import { BlurFilter } from 'pixi.js';
import { Stage, Container, Text } from '@pixi/react';
import {useMemo} from 'react';
import {Coin} from "./components/Coin";
import {Character} from "./components/Character";

export const Game = () =>
{
    const blurFilter = useMemo(() => new BlurFilter(4), []);
    let handleClick = () => { };

    return (
        <Stage options={{backgroundColor: 0xeef1f5}} onPointerDown={() => handleClick()}>
            <Container x={400} y={330}>
                <Coin></Coin>
                <Character toggle={ (toggle: () => void) => {
                    handleClick = toggle;
                } } />
                <Text text="Hello World" anchor={{ x: 0.5, y: 0.5 }} filters={[blurFilter]} />
            </Container>
        </Stage>
    );
};