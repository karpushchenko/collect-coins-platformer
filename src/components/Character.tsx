import {Sprite, useTick, AnimatedSprite, Container} from '@pixi/react';
import {BaseTexture, Rectangle, Spritesheet, Texture, Sprite as SpriteType} from 'pixi.js';
import {forwardRef, Ref, useCallback, useEffect, useState} from "react";

const
direction = -1, //to Top
gravity = 1,
power = 20;

interface CharacterPropType {
    toggle: (callback: () => void) => void;
    position?: {
        x?: number,
        y?: number
    }
}

export const Character = forwardRef(({toggle, position}: CharacterPropType, ref: Ref<SpriteType> | undefined) => {

    const yPosition = position?.y || 0;
    const xPosition = position?.x || 0;

    // states
    const [isJumping, setIsJumping] = useState(false);
    const [jumpTime, setJumpTime] = useState(0);
    const x = xPosition;
    const [y, setY] = useState(yPosition);

    const toggleJump = useCallback((): void => {
        if(!isJumping){
            setIsJumping(true);
            setJumpTime(0);
        }
    },[isJumping]);

    useEffect(() => {
        toggle && toggle(toggleJump);
    }, [toggle, toggleJump]);

    // custom ticker
    useTick(delta => {
        if (isJumping) {
            const jumpHeight = (-gravity / 2) * Math.pow(jumpTime, 2) + power * jumpTime;
            if (jumpHeight < 0) {
                setIsJumping(false)
                setY(yPosition);
                return;
            }
            setY(yPosition + (jumpHeight * direction));
            setJumpTime(jumpTime + delta);
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

    const jumpFrame = new Rectangle(0, 0, 105, spritesheet.baseTexture.height);
    const jumpTexture = new Texture(spritesheet.baseTexture, jumpFrame);

    spritesheet.parse();

    return (
        <>
            {
                isJumping ?
                    <Sprite
                        ref={ref}
                        texture={jumpTexture}
                        anchor={0.5}
                        x={x}
                        y={y}
                    />
                    :
                    <Container x={x} y={y}>
                    <AnimatedSprite
                        animationSpeed={0.05}
                        isPlaying={true}
                        textures={spritesheet.animations.walk}
                        anchor={0.5}
                    />
                    </Container>
            }
        </>
    );
});
