import {Container, AnimatedSprite} from "@pixi/react";
import {Assets, Spritesheet, Texture, Sprite as SpriteType} from "pixi.js"
import {useState, useEffect, forwardRef, Ref} from "react";

interface CoinPropType {
    position?: {
        x?: number,
        y?: number
    }
}

export const Coin = forwardRef(({position}: CoinPropType, ref: Ref<SpriteType>) => {
    const spritesheet = "./assets/gold_anim.json";
    const [frames, setFrames] = useState<Texture[]>([]);

    const yPosition = position?.y || 0;
    const xPosition = position?.x || 0;

    useEffect(() => {
        Assets.load(spritesheet).then((data: Spritesheet) => {
            if (data.data && data.data.frames) {
                const framesList = Object.keys(data.data.frames).map(
                    frame => {
                        return Texture.from(frame);
                    }
                )
                setFrames(framesList);
            }
        });
    }, []);

    if (frames.length === 0) {
        return null;
    }


    return (
        <Container x={xPosition} y={yPosition} ref={ref}>
            <AnimatedSprite
                animationSpeed={0.35}
                isPlaying={true}
                textures={frames}
                anchor={0.5}
            />
        </Container>
    );
});