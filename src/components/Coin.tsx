import {Container, AnimatedSprite} from "@pixi/react";
import {Assets, Spritesheet, Texture} from "pixi.js"
import {useState, useEffect} from "react";

const [width, height] = [500, 500];
const spritesheet = "./assets/gold_anim.json";


export const Coin = () => {
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
        <Container x={width / 2} y={height / 2}>
            <AnimatedSprite
                animationSpeed={0.25}
                isPlaying={true}
                textures={frames}
                anchor={0.5}
            />
        </Container>
    );
};