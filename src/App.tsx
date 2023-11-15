import { useEffect } from 'react';
import useSWR from 'swr';
import { Converter, RatesTable, Header, Footer, ApiErrorModal } from './components'; 
import styled from 'styled-components';
import { Rate } from './types';
import mockFetcher from './apiSimulation';
import { Dimmer, Loader } from 'semantic-ui-react';
import { useStore } from './store';

const ContentContainer = styled.div`
  max-width: 1366px;
  padding: 25px 0;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function App() {
  const { data, error, isLoading } = useSWR(process.env.REACT_APP_ENDPINT!, mockFetcher);
  const setRatesData = useStore((state) => state.setRatesData);

  useEffect(() => {
    if (!isLoading && !error) {
      let typeChangedData = (data as Rate[]).map((item) => ({
        base_ccy: item.base_ccy,
        buy: +item.buy,
        ccy: item.ccy,
        sale: +item.sale,
      }))
      setRatesData(typeChangedData);
    }
  }, [data, error, isLoading]);

  useEffect(()=> {
    if(error) {
      console.error(error);
    }
  }, [error]);

  useEffect(()=>localStorage.setItem('request-counter', '0'), []);
  const handleAPIModalClose = () => {window.location.reload(); }

  return (
    <>
      <Header/>
      <ContentContainer>
        <RatesTable />
        <Converter/>
      </ContentContainer>
      <Dimmer active={isLoading}>
          <Loader>Loading</Loader>
      </Dimmer>
      <ApiErrorModal isOpen={!!error} handleClose={handleAPIModalClose}/>
      <Footer/>
    </>
  );
}

export default App;
