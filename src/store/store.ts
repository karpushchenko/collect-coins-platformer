import {create} from 'zustand'

interface GameState {
    coins: number,
    addCoin: () => void,
    resetCoins: () => void,
    maxCoins: number,
    setMaxCoins: (value: GameState['maxCoins']) => void,
    loaded: boolean,
    confirmLoad: () => void,
    gameStarted: boolean,
    startGame: () => void,
    coinFlying: boolean,
    setCoinFlying: (value: GameState['coinFlying']) => void,
    timer: number,
    setTimer: (value: GameState['timer']) => void,
}

const useGameStore = create<GameState>(set => ({
    loaded: false,
    gameStarted: false,
    coins: 0,
    maxCoins: 0,
    addCoin: () => set((state: GameState) => ({coins: state.coins + 1})),
    setMaxCoins: (value: GameState['maxCoins']) => set({maxCoins: value}),
    resetCoins: () => set({coins: 0}),
    confirmLoad: () => set({loaded: true}),
    startGame: () => set({gameStarted: true}),
    coinFlying: false,
    setCoinFlying: (value: GameState['coinFlying']) => set({coinFlying: value}),
    timer: 0,
    setTimer: (value: GameState['timer']) => set({timer: value}),
}))

export default useGameStore