import {Container, Sprite, useApp} from "@pixi/react";

interface BackgroundPropType {
    onpointerdown: (callback: () => void) => void;
}
export const Background = ({onpointerdown}:BackgroundPropType) => {

    const app = useApp();

    return (
        <Container x={0} y={app.screen.height / 2}>
            <Sprite
                image="../assets/background.png"
                anchor={{x: 0.5, y: 1}}
                pointerdown={onpointerdown}
                interactive
            />
        </Container>
    );
};