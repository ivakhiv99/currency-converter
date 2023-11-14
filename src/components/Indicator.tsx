import { FC } from "react";
import styled from "styled-components";


const Wrapper = styled.div`
    width: 100%;

    display: flex;
    flex-direction: row;
    justify-content: space-between;

    padding-bottom: 3px;
    border-bottom: 1px solid #e3e5e5;
`

const Block = styled.p`
    font-size: 22px;
    margin: 0;
`

interface IIndicator {
    operationType: string;
    leftSideValue: number;
    leftSideCurrency: string;
    rightSideValue: number;
    rightSideCurrency: string;
}

const Indicator:FC<IIndicator> = ({operationType, leftSideValue, leftSideCurrency, rightSideValue, rightSideCurrency}) => {

    const action = operationType === 'sell' ? 'SELL' : 'BUY';
    const result = operationType === 'sell' ? 'GET' : 'FOR';
    
    return (
        <Wrapper>
            <Block>{`${action} ${leftSideValue} ${leftSideCurrency}`}</Block>
            <Block>{`${result} ${rightSideValue} ${rightSideCurrency}`}</Block>
        </Wrapper>
    );
};

export default Indicator;
