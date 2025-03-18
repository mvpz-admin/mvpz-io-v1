import { create } from "zustand";

type StoreState = {
  cardId: String;
  setCardId: (id : any) => void;
};

export const useCardDetailsStore = create<StoreState>()((set) => ({
    cardId: null,
    setCardId: (id) => set({ cardId: id }),
}));
