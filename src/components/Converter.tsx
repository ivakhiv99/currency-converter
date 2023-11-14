import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { useStore} from '../App';
import { Button, Dropdown } from 'semantic-ui-react';
import { Rate } from "../types";
import Indicator from './Indicator';

const FlexRow = styled.div`
    display: flex;
    flex-direction: row;
`
const ConverterContainer = styled(FlexRow)`
    justify-content: space-around;
    align-items: flex-end;

    margin-bottom: 20px;
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
    //TODO: use enums for sell/buy
    const [currentAction, setCurrentAction] = useState<string>('sell');
    const [baseInput, setBaseInput] = useState<number>(100);
    const [baseCcy, setBaseCcy] = useState<string>('UAH');
    const [translatedInput, setTranslatedInput] = useState<number>(100);
    const [translateToCcy, setTranslateToCcy] = useState<string>('UAH');

    const ratesData = useStore(state => state.ratesData);
    const stateOptions = ratesData.map(({ccy}) => ({
        key: ccy,
        text: ccy,
        value: ccy,
    }));
    //TODO: move out & refactor
    const convert = (value: number, baseCurrency:string, currency: string) => {
        if(baseCurrency === currency) {
            return value;
        }

        if (baseCurrency === 'UAH' && currency !== 'UAH') {
            const rate = ratesData.find((rateItem) => rateItem.ccy === currency);
            if (!rate) {
                return null;
            }
            return currentAction === 'sell' ? value / rate.sale : value / rate.buy;
        }

        if (currency === 'UAH' && baseCurrency !== 'UAH' ) {
            const rate = ratesData.find((rateItem) => rateItem.ccy === baseCurrency);
            if (!rate) {
                return null;
            }
            return currentAction === 'sell' ? value * rate.sale : value * rate.buy;
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
            return currentAction === 'sell' ? value * rate.sale : value * rate.buy;
        }

    };

    const triggerConvert = () => {
        if(baseCcy.length && translateToCcy.length) {
            if(currentAction === 'sell') {
                const newTranslatedInput = convert(baseInput, baseCcy, translateToCcy);
                if (newTranslatedInput) {
                    setTranslatedInput(+newTranslatedInput.toFixed(2)); 
                }
            } else {
                const newBaseInput = convert(translatedInput, translateToCcy, baseCcy);
                if (newBaseInput) {
                    setBaseInput(+newBaseInput.toFixed(2)); 
                }
            }
        }
    };

    // useEffect(() => console.log({currentAction}), [currentAction]);

    useEffect(() => triggerConvert(), [ratesData, baseInput, translatedInput, baseCcy, translateToCcy, currentAction]);

    // TODO: unify this functions?
    const handleBaseInputChange = (e: React.FormEvent<HTMLInputElement>) => {
        if(e.currentTarget?.value) {
            setBaseInput(+e.currentTarget?.value);
        } else setBaseInput(0);
    }

    const handleTranslatedInputChange = (e: React.FormEvent<HTMLInputElement>) => {
        if(e.currentTarget?.value) {
            setTranslatedInput(+e.currentTarget?.value)
        } else setBaseInput(0);
    }

    const switchValues = () => {
        let temp: number | string = baseCcy;
        setBaseCcy(translateToCcy);
        setTranslateToCcy(temp);

        temp = baseInput;
        setBaseInput(+translatedInput);
        setTranslatedInput(temp);

        setCurrentAction((prev) => prev === 'sell' ? 'buy' : 'sell')
    };

    return (
        <div>
            <ConverterContainer>
                <SectionWrapper>
                    <InputWrapper>
                        <label htmlFor="changeCurrency">Change</label>
                        <StyledInput type="text" id="changeCurrency" value={baseInput} onChange={handleBaseInputChange} onFocus={() => setCurrentAction('sell')}/>
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
                        onFocus={() => setCurrentAction('sell')}
                        onChange={(_, data) => setBaseCcy(data.value as string)}
                    />
                </SectionWrapper>
                <SwapButton icon='exchange' onClick={switchValues}/>
                <SectionWrapper>
                    <InputWrapper>
                        <label htmlFor="getCurrency">Get</label>
                        <StyledInput type="text" id="getCurrency" value={translatedInput} onChange={handleTranslatedInputChange} onFocus={() => setCurrentAction('buy')}/>
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
                        onFocus={() => setCurrentAction('buy')}
                        onChange={(_, data) => setTranslateToCcy(data.value as string)}
                    />
                </SectionWrapper>
            </ConverterContainer>
            <Indicator 
                operationType={currentAction}
                leftSideValue={baseInput}
                leftSideCurrency={baseCcy}
                rightSideValue={translatedInput}
                rightSideCurrency={translateToCcy}
            />
        </div>
    );
};

export default Converter;
