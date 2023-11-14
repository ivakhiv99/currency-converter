import { useEffect, createContext } from 'react';
import useSWR from 'swr';
import { Converter, RatesTable, Header, Footer } from './components'; 
import styled from 'styled-components';
import { create } from 'zustand';
import { Rate } from './types';

const ContentContainer = styled.div`
  max-width: 1366px;
  padding: 25px 0;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const mockData = [{"ccy":"CHF","base_ccy":"UAH","buy":"40.00670","sale":"40.00670"},{"ccy":"CZK","base_ccy":"UAH","buy":"1.56860","sale":"1.56860"},{"ccy":"GBP","base_ccy":"UAH","buy":"44.18370","sale":"44.18370"},{"ccy":"ILS","base_ccy":"UAH","buy":"9.37100","sale":"9.37100"},{"ccy":"JPY","base_ccy":"UAH","buy":"0.23848","sale":"0.23848"},{"ccy":"NOK","base_ccy":"UAH","buy":"3.22790","sale":"3.22790"},{"ccy":"PLZ","base_ccy":"UAH","buy":"8.65850","sale":"8.65850"},{"ccy":"SEK","base_ccy":"UAH","buy":"5","sale":"7"
}];

type Store = {
  ratesData: Rate[];
  setRatesData: (rates: Rate[]) => void;
  updateRatesData: (updatedRate: Rate) => void;
}

//TODO: move out
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


// export const ExchangeRates = createContext<any[]>([]);

function App() {
  const fetcher = () => fetch(process.env.REACT_APP_ENDPINT!).then(res => res);

  //TODO: immitate delay for mockFetcher with Promice
  const mockFetcher = () => mockData;
  const { data, error, isLoading } = useSWR(process.env.REACT_APP_ENDPINT!, mockFetcher);

  const setRatesData = useStore((state) => state.setRatesData);

  useEffect(() => {
    if (data) {
      //TODO: Refactor this:
      let typeChangedData = data.map((item) => ({
        base_ccy: item.base_ccy,
        buy: +item.buy,
        ccy: item.ccy,
        sale: +item.sale,
      }))
      setRatesData(typeChangedData);
    }
  }, [data]);


  // TODO: Replace context with zustand
  return (
    // <ExchangeRates.Provider value={data || []}>
    <>
      <Header/>
      <ContentContainer>
        <RatesTable />
        <Converter/>
      </ContentContainer>
      <Footer/>
      </>
    // </ExchangeRates.Provider>
  );
}

export default App;
