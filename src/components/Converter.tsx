import { FC, useContext, useEffect, useState } from "react";
import styled from "styled-components";
// import Dropdown from './Dropdown';
import {ExchangeRates} from '../App';
import { Button, Dropdown } from 'semantic-ui-react';

const FlexRow = styled.div`
    display: flex;
    flex-direction: row;
`
const ConverterContainer = styled(FlexRow)`
    background-color: red;
    justify-content: space-around;
`;

const SectionWrapper = styled.div`
    width: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const StyledInput = styled.input`
    width: 150px;
`;

const StyledDropdown = styled(Dropdown)`
    .search {
        width: 50px;
    }
`;

const Converter:FC = () => {
    const [baseInput, setBaseInput] = useState<number>(100);
    const [baseCcy, setBaseCcy] = useState<string>('UAH');

    const [translatedInput, setTranslatedInput] = useState<string>('');
    const [translateToCcy, setTranslateToCcy] = useState<string>('');

    const data = useContext(ExchangeRates);

    //TODO: move out
    const convert = (value: number, baseCurrency:string, currency: string, action: string) => {


        const rate = data.find((rateItem) => rateItem.ccy === currency);
        if (!rate) {
            return null;
        }
        return action === 'sell' ? value / rate.sale : value / rate.buy;
    };

    useEffect(() => {
        // if(baseCcy.length && translateToCcy.length) {
        //     console.log('calling convert')
        //     const newTranslatedInput = convert(baseInput, 'UAH', 'PLZ', 'sell');
        //     if (newTranslatedInput) {
        //         setTranslatedInput(newTranslatedInput.toFixed(2).toString()); 
        //     }
        //     //  else alert('rate is undefined')
        // }
    }, [baseInput, data, baseCcy, translateToCcy]);

    // TODO: unify this functions?
    const handleBaseInputChange = (e: React.FormEvent<HTMLInputElement>) => {
        console.log('handleBaseInputChange',e.currentTarget?.value)
        if(e.currentTarget?.value) {
            setBaseInput(+e.currentTarget?.value)
        } else setBaseInput(0);
    }

    const handleTranslatedInputChange = (e: React.FormEvent<HTMLInputElement>) => {
        console.log('handleBaseInputChange',e.currentTarget?.value)
        if(e.currentTarget?.value) {
            setTranslatedInput(e.currentTarget?.value)
        }
    }

    const stateOptions = data.map(({ccy}) => ({
        key: ccy,
        text: ccy,
        value: ccy,
    }));

    const switchValues = () => {
        let temp: number | string = baseCcy;
        setBaseCcy(translateToCcy);
        setTranslateToCcy(temp);

        temp = baseInput;
        setBaseInput(+translatedInput);
        setTranslatedInput(temp.toString());
    };

    return (
        <ConverterContainer>
            <SectionWrapper>
                <label htmlFor="changeCurrency">Change</label>
                <StyledInput type="text" id="changeCurrency" value={baseInput} onChange={handleBaseInputChange}/>
                <StyledDropdown 
                    placeholder='currency' 
                    search 
                    selection 
                    options={[...stateOptions, {
                        key: 'UAH',
                        text: 'UAH',
                        value: 'UAH',
                    }]} 
                    value={baseCcy}
                    onChange={(_, data) => setBaseCcy(data.value as string)}
                />
            </SectionWrapper>
            <Button icon='exchange' onClick={switchValues}/>
            <SectionWrapper>
                <label htmlFor="getCurrency">Get</label>
                <StyledInput type="text" id="getCurrency" value={translatedInput} onChange={handleTranslatedInputChange}/>
                <StyledDropdown 
                    placeholder='currency' 
                    search 
                    selection 
                    options={[...stateOptions, {
                        key: 'UAH',
                        text: 'UAH',
                        value: 'UAH',
                    }]}
                    value={translateToCcy}
                    onChange={(_, data) => setTranslateToCcy(data.value as string)}
                />
            </SectionWrapper>
        </ConverterContainer>
    );
};

export default Converter;
