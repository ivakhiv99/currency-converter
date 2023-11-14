import { FC, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useStore} from '../App';
import { Button, Dropdown } from 'semantic-ui-react';
import { Rate } from "../types";

const FlexRow = styled.div`
    display: flex;
    flex-direction: row;
`
const ConverterContainer = styled(FlexRow)`
    justify-content: space-around;
    align-items: flex-end;
`;

const SectionWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-end;
`;

const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-right: 10px;

    label {
        margin-left: 3px;
    }
`;

const StyledInput = styled.input`
    width: 150px;
    padding: 9.5px 14px;
    border: solid 1px #dededf;
    border-radius: 5px;
`;

const StyledDropdown = styled(Dropdown)`
    min-width: 55px !important;
    max-width: 75px !important;
`;

const SwapButton = styled(Button)`
    margin: 0 20px !important;
    height: 37px;
`;

const Converter:FC = () => {
    const [baseInput, setBaseInput] = useState<number>(100);
    const [baseCcy, setBaseCcy] = useState<string>('UAH');

    const [translatedInput, setTranslatedInput] = useState<string>('');
    const [translateToCcy, setTranslateToCcy] = useState<string>('');

    const ratesData = useStore(state => state.ratesData);

    useEffect(()=>console.log({ratesData}), [ratesData]);

    //TODO: move out & refactor
    const convert = (value: number, baseCurrency:string, currency: string, action: string) => {
        if(baseCurrency === currency) {
            return value;
        }

        if (baseCurrency === 'UAH' && currency !== 'UAH') {
            const rate = ratesData.find((rateItem) => rateItem.ccy === currency);
            if (!rate) {
                return null;
            }
            return action === 'sell' ? value / rate.sale : value / rate.buy;
        }

        if (currency === 'UAH' && baseCurrency !== 'UAH' ) {
            const rate = ratesData.find((rateItem) => rateItem.ccy === baseCurrency);
            if (!rate) {
                return null;
            }
            return action === 'sell' ? value * rate.sale : value * rate.buy;
        }

        if (currency !== 'UAH' && baseCurrency !== 'UAH' ) {
            const baseCcyToUAH: Rate = ratesData.find((rateItem) => rateItem.ccy === baseCurrency)!;
            const translatedCcyToUAH: Rate = ratesData.find((rateItem) => rateItem.ccy === currency)!;

            if (!baseCcyToUAH || !translatedCcyToUAH) {
                return null;
            }
            
            const rate: Rate = {
                base_ccy: baseCurrency,
                ccy: currency,
                sale: baseCcyToUAH.sale / translatedCcyToUAH.sale,
                buy: baseCcyToUAH.buy / translatedCcyToUAH.buy
            }
            return action === 'sell' ? value * rate.sale : value * rate.buy;
        }

    };

    useEffect(() => {
        if(baseCcy.length && translateToCcy.length) {
            const newTranslatedInput = convert(baseInput, baseCcy, translateToCcy, 'sell');
            if (newTranslatedInput) {
                setTranslatedInput(newTranslatedInput.toFixed(2).toString()); 
            }
            //  else alert('rate is undefined')
        }
    }, [baseInput, ratesData, baseCcy, translateToCcy]);

    // TODO: unify this functions?
    const handleBaseInputChange = (e: React.FormEvent<HTMLInputElement>) => {
        if(e.currentTarget?.value) {
            setBaseInput(+e.currentTarget?.value)
        } else setBaseInput(0);
    }

    const handleTranslatedInputChange = (e: React.FormEvent<HTMLInputElement>) => {
        if(e.currentTarget?.value) {
            setTranslatedInput(e.currentTarget?.value)
        }
    }

    const stateOptions = ratesData.map(({ccy}) => ({
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


    // style={{width: "20px !important", backgroundColor: 'red' }}
    return (
        <ConverterContainer>
            <SectionWrapper>
                <InputWrapper>
                    <label htmlFor="changeCurrency">Change</label>
                    <StyledInput type="text" id="changeCurrency" value={baseInput} onChange={handleBaseInputChange}/>
                </InputWrapper>
                <StyledDropdown 
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
            <SwapButton icon='exchange' onClick={switchValues}/>
            <SectionWrapper>
                <InputWrapper>
                    <label htmlFor="getCurrency">Get</label>
                    <StyledInput type="text" id="getCurrency" value={translatedInput} onChange={handleTranslatedInputChange}/>
                </InputWrapper>
                <StyledDropdown 
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
