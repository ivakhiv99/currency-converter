import { FC, useContext, useEffect, useState } from "react";
import styled from "styled-components";
// import Dropdown from './Dropdown';
import {ExchangeRates} from '../App';

const FlexRow = styled.div`
    display: flex;
    flex-direction: row;
`
const ConverterContainer = styled(FlexRow)`
    background-color: red;
`;

const Converter:FC = () => {
    const [baseInput, setBaseInput] = useState<number>(100);
    const [translatedInput, setTranslatedInput] = useState<string>('');

    const data = useContext(ExchangeRates);

    console.log({data});


    //TODO: move out
    const convert = (value: number, currency: string, action: string) => {
        const rate = data.find((rateItem) => rateItem.ccy === currency);
        console.log({rate})
        return action === 'sell' ? value / rate.sale : value / rate.buy;
    };

    useEffect(() => {
        if(baseInput) {
            const newTranslatedInput = convert(baseInput, 'PLZ', 'sell');
            console.log({newTranslatedInput});
            setTranslatedInput(newTranslatedInput.toFixed(2).toString()); 
        }
    }, [baseInput, data]);


    return (
        <ConverterContainer>
            <div>
                <label htmlFor="">
                    <input type="text" value={baseInput} onChange={(value) => setBaseInput(+value) }/>
                </label>
                {/* <Dropdown></Dropdown> */}
            </div>
            <div>
                <label htmlFor="">
                    <input type="text" value={translatedInput}/>
                </label>
                {/* <Dropdown></Dropdown> */}
            </div>
        </ConverterContainer>
    );
};

export default Converter;
