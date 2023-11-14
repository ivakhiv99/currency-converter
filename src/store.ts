import { create } from "zustand";
import { Store } from "./types";

export const useStore = create<Store>((set) => ({
    ratesData: [],
    setRatesData: (rates) => set((state) => ({
        ...state,
        ratesData: rates
    })),
    updateRatesData: (updatedRate) => set((state) => {
        const copyOfRates = [...state.ratesData];
        const oldRate = state.ratesData.find(rate => rate.ccy === updatedRate.ccy);
        const index = state.ratesData.indexOf(oldRate!);
        copyOfRates.splice(index, 1, updatedRate);
        return ({
          ...state,
          ratesData: [...copyOfRates]
        });
    }),
}));
