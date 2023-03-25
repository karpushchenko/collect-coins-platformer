// Create object to store sprite sheet data
import {BaseTexture, Spritesheet} from "pixi.js";

export const characterLoad = () => {
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
                frame: {x: 0, y: 0, w: 105, h: 155},
                sourceSize: {w: 105, h: 155},
                spriteSourceSize: {x: 0, y: 0, w: 105, h: 155}
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

    spritesheet.parse();
}