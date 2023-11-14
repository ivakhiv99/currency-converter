export type Store = {
    ratesData: Rate[];
    setRatesData: (rates: Rate[]) => void;
    updateRatesData: (updatedRate: Rate) => void;
}

export type Rate = {
    base_ccy:string;
    buy: number;
    ccy: string;
    sale: number;
}