import { FC, useState } from 'react';
import { Table } from 'semantic-ui-react';
import styled from 'styled-components';

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

//TODO: Add throttle  
const RatesTableItem:FC<IRatesTableItem> = ({value, handleChange}) => {
    const [inputValue, setInputvalue] = useState<string>(value);

    const handleCellChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputvalue(value);
        handleChange(value);
    }

    return (
        <StyledInput 
            value={inputValue} 
            onChange={handleCellChange}
        />
    );
};

export default RatesTableItem;
