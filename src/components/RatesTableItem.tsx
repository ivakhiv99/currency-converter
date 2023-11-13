import { FC, useEffect, useState } from 'react';
import { Table } from 'semantic-ui-react';
import styled from 'styled-components';
import useDebounce from '../utils/useDebounce';

const StyledInput = styled.input`
    border: none;
    outline: none;
    padding-bottom: 5px;

    &:focus {
        border-bottom: 1px solid #666;
    }

`;

interface IRatesTableItem {
    value: string;
    handleChange: (value: string) => void
}

//TODO: Add debounce  
const RatesTableItem:FC<IRatesTableItem> = ({value, handleChange}) => {
    const [inputValue, setInputvalue] = useState<string>(value);

    const handleCellChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        value = value.replaceAll(/[^0-9\.]/gi, '');
        const dotIndex = value.lastIndexOf('.');
        if (dotIndex === -1 || value.length - 1 -dotIndex <= 2) {
            console.log({value})
            setInputvalue(value);
            handleChange(value);
        }
    }

    // TODO: add validation for +- 10% to the value
    // const validate = (value): boolean => {
    // }

    return (
        <StyledInput 
            value={inputValue} 
            onChange={handleCellChange}
        />
    );
};

export default RatesTableItem;
