import {ParticleContainer, Sprite} from "@pixi/react";
import {useEffect, useRef, useState} from "react";

interface CoinsCollectionPropType {
    coins: number,
}

interface Coin {
    x: number,
    y: number,
}

export const CoinsCollection = ({coins}: CoinsCollectionPropType) => {
    const [coinsList, updateCoinsList] = useState<Coin[]>([]);
    const containerWidth = 200;
    const coinX = useRef(-containerWidth / 2 - 20);
    const coinY = useRef(0);

    useEffect(() => {
        if(coinsList.length < coins){
            const interval = setInterval(() => {
                coinX.current = coinX.current + 20;
                if(coinX.current >= containerWidth / 2){
                    coinX.current = -containerWidth / 2;
                    coinY.current = coinY.current + 20
                }
                updateCoinsList(coins => [...coins, {x: coinX.current, y: coinY.current}]);
            }, 150);

            return () => clearInterval(interval);
        }
    }, [coinsList, coins]);


    return <ParticleContainer position={[0, -150]} anchor={{x: 0, y: 0.5}} properties={{rotation: true, position: true}}>
        {coinsList.map((coin: Coin, index: number) => {
                return <Sprite anchor={0.5} key={`coin-${index}`} width={15} height={15} x={coin.x} y={coin.y} image="./assets/coin.png"/>
            }
        )}
    </ParticleContainer>
}