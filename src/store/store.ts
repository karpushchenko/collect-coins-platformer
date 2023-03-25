import {create} from 'zustand'

interface GameState {
    coins: number,
    addCoin: () => void,
    resetCoins: () => void
}

const useGameStore = create<GameState>(set => ({
    coins: 0,
    addCoin: () => set((state: GameState) => ({coins: state.coins + 1})),
    resetCoins: () => set({coins: 0}),
}))

export default useGameStore