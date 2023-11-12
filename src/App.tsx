import { useEffect, createContext } from 'react';
import useSWR from 'swr'
import { Converter } from './components'; 

const mockData = [{"ccy":"CHF","base_ccy":"UAH","buy":"40.00670","sale":"40.00670"},{"ccy":"CZK","base_ccy":"UAH","buy":"1.56860","sale":"1.56860"},{"ccy":"GBP","base_ccy":"UAH","buy":"44.18370","sale":"44.18370"},{"ccy":"ILS","base_ccy":"UAH","buy":"9.37100","sale":"9.37100"},{"ccy":"JPY","base_ccy":"UAH","buy":"0.23848","sale":"0.23848"},{"ccy":"NOK","base_ccy":"UAH","buy":"3.22790","sale":"3.22790"},{"ccy":"PLZ","base_ccy":"UAH","buy":"8.65850","sale":"8.65850"},{"ccy":"SEK","base_ccy":"UAH","buy":"3.31180","sale":"3.31180"
}];


const ExchangeRates = createContext<any[]>([]);

function App() {
  const endpoint = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=4';
  const fetcher = () => fetch(process.env.REACT_APP_ENDPINT!).then(res => res);
  const mockFetcher = () => mockData;
  
  const { data, error, isLoading } = useSWR(process.env.REACT_APP_ENDPINT!, mockFetcher);

  useEffect(()=>console.log({data}), [data]);

  return (
    <ExchangeRates.Provider value={data || []}>
      <div>
        <Converter/>
      </div>
    </ExchangeRates.Provider>
  );
}

export default App;
