import {Sprite, useTick, AnimatedSprite} from '@pixi/react';
import {BaseTexture, Rectangle, Spritesheet, Texture} from 'pixi.js';
import {useCallback, useEffect, useState} from "react";

let i = 0;
interface CharacterPropType {
    toggle: (callback: () => void) => void;
}
export const Character = ({toggle} : CharacterPropType) => {
    const toggleJump = useCallback((): void => {
        setIsJumping(true);
        setTimeout(() => {
            setIsJumping(false);
        }, 1000);
    }, []);

    useEffect(() => {
        toggle && toggle(toggleJump);
    }, [toggle, toggleJump]);

    // states
    const [isJumping, setIsJumping] = useState(false);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [rotation, setRotation] = useState(0);

    // custom ticker
    useTick(delta => {
        if(isJumping){
            i += 0.05 * delta;
            setX(Math.sin(i) * 100);
            setY(Math.sin(i/1.5) * 100);
            setRotation(-10 + Math.sin(i/10 + Math.PI * 2) * 10);
        }
    });

    // Create object to store sprite sheet data
    const characterData = {
        frames: {
            walk1: {
                frame: {x: 105, y: 0, w: 125, h: 155},
                sourceSize: {w: 115, h: 155},
                spriteSourceSize: {x: 0, y: 0, w: 115, h: 155}
            },
            walk2: {
                frame: {x: 231, y: 0, w: 115, h: 155},
                sourceSize: {w: 115, h: 155},
                spriteSourceSize: {x: 0, y: 0, w: 115, h: 155}
            },
            jump: {
                frame: {x: 0, y: 0, w: 115, h: 155},
                sourceSize: {w: 105, h: 155},
                spriteSourceSize: {x: 0, y: 0, w: 115, h: 155}
            },
        },
        meta: {
            image: '../assets/character.png',
            format: 'RGBA8888',
            size: {w: 347, h: 155},
            scale: '1'
        },
        animations: {
            walk: ['walk1', 'walk2'],
            jump: ['jump'],
        }
    }


// Create the SpriteSheet from data and image
    const spritesheet = new Spritesheet(
        BaseTexture.from(characterData.meta.image),
        characterData
    );

    const jumpFrame = new Rectangle(0,0, 105, spritesheet.baseTexture.height);
    const jumpTexture = new Texture(spritesheet.baseTexture, jumpFrame);

    spritesheet.parse();

    console.log(spritesheet)

    return (
        <>
            {
                isJumping ?
                    <Sprite
                        texture={jumpTexture}
                        anchor={0.5}
                        x={x}
                        y={y}
                        rotation={rotation}
                    />
                    :
                    <AnimatedSprite
                        animationSpeed={0.05}
                        isPlaying={true}
                        textures={spritesheet.animations.walk}
                        anchor={0.5}
                    />
            }
        </>
    );
};
