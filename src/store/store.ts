import {create} from 'zustand'

interface GameState {
    coins: number,
    addCoin: () => void,
    resetCoins: () => void,
    loaded: boolean,
    confirmLoad: () => void,
    coinFlying: boolean,
    setCoinFlying: (value: GameState['coinFlying']) => void,
}

const useGameStore = create<GameState>(set => ({
    loaded: false,
    coins: 0,
    addCoin: () => set((state: GameState) => ({coins: state.coins + 1})),
    resetCoins: () => set({coins: 0}),
    confirmLoad: () => set({loaded: true}),
    coinFlying: false,
    setCoinFlying: (value: GameState['coinFlying']) => set({coinFlying: value}),
}))

export default useGameStore