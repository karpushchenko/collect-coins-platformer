import {Container, AnimatedSprite} from "@pixi/react";
import {Assets, Spritesheet, Texture, Sprite as SpriteType} from "pixi.js"
import {useState, useEffect, forwardRef, Ref} from "react";


export const Coin = forwardRef((props, ref: Ref<SpriteType>) => {
    const spritesheet = "./assets/gold_anim.json";
    const [frames, setFrames] = useState<Texture[]>([]);

    useEffect(() => {
        Assets.load(spritesheet).then((data : Spritesheet) => {
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
        <Container x={0} y={0} ref={ref}>
            <AnimatedSprite
                animationSpeed={0.25}
                isPlaying={true}
                textures={frames}
                anchor={0.5}
            />
        </Container>
    );
});