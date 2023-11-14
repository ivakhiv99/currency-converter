import { FC, useEffect, useState } from 'react';
import { Popup, Table } from 'semantic-ui-react';
import styled from 'styled-components';
import useDebounce from '../utils/useDebounce';

const StyledInput = styled.input`
    border: none;
    outline: none;
    padding-bottom: 5px;
    text-align: center;
    max-width: 100px;
    &:focus {
        border-bottom: 1px solid #999999;
    }

`;

interface IRatesTableItem {
    defaultValue: string;
    handleChange: (value: string) => void
}

//TODO: Add debounce  
const RatesTableItem:FC<IRatesTableItem> = ({defaultValue, handleChange}) => {
    const [inputValue, setInputvalue] = useState<string>(defaultValue);
    const [popupIsOpen, setPopupIsOpen] = useState<boolean>(false);

    const handleCellChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        value = value.replaceAll(/[^0-9\.]/gi, '');
        const dotIndex = value.lastIndexOf('.');
        if (dotIndex === -1 || value.length - 1 - dotIndex <= 2) {
            setInputvalue(value);
            validate(value);
        }
    }

    useEffect(() => setInputvalue(defaultValue), [defaultValue]);

    const validate = (value: string) => {
        const number = +value;
        const baseNumber = +defaultValue
        const lessThanMinimal = number <= baseNumber - (baseNumber * 0.1);
        const moreThanMaximal = number >= baseNumber + (baseNumber * 0.1);
        if (lessThanMinimal || moreThanMaximal) {
            setPopupIsOpen(true);
        } else {
            handleChange(value);
        }
    }

    const handlePopupClose = () => {
        setPopupIsOpen(false);
        setInputvalue(defaultValue);
    }

    return (
        <Popup
            content='New value must not stray away from 10% of original value'
            inverted
            onClose={handlePopupClose}
            trigger={
                <StyledInput
                    value={inputValue} 
                    onChange={handleCellChange}
                />
            }
            on={'click'}
            open={popupIsOpen}
        />
    );
};

export default RatesTableItem;
