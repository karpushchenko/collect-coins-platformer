import {Sprite, useTick, AnimatedSprite, Container} from '@pixi/react';
import {Texture, Sprite as SpriteType} from 'pixi.js';
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
        if (!isJumping) {
            setIsJumping(true);
            setJumpTime(0);
        }
    }, [isJumping]);

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

    return (
        <>
            {
                isJumping ?
                    <Sprite
                        ref={ref}
                        texture={Texture.from('jump')}
                        anchor={0.5}
                        x={x}
                        y={y}
                    />
                    :
                    <Container x={x} y={y}>
                        <AnimatedSprite
                            animationSpeed={0.05}
                            isPlaying={true}
                            textures={[Texture.from('walk1'), Texture.from('walk2')]}
                            anchor={0.5}
                        />
                    </Container>
            }
        </>
    );
});
