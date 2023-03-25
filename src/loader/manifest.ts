import type { ResolverManifest } from "pixi.js";

export const manifest:ResolverManifest = {
    bundles: [
        {
            name : "game",
            assets:
                {
                    "box" : "./assets/box.png",
                    "cloud" : "./assets/cloud.png",
                    "character": "./assets/character.png"
                }
        },
    ]
}
