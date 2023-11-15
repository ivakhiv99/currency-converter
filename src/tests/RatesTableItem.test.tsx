import { fireEvent, render, screen } from "@testing-library/react";
import RatesTableItem from "../components/RatesTableItem";

describe ('Table cell', () => {
    it('should render the component', () => {
        render(<RatesTableItem defaultValue="5" handleChange={() => {}}/>);

        const input = screen.getByTestId('cell-input');
        expect(input).toBeInTheDocument();
    });

    it('should show popup when value is below 10% of default value', () => {
        render(<RatesTableItem defaultValue="5" handleChange={() => {}}/>);

        const input = screen.getByTestId('cell-input');
        fireEvent.change(input, {target: { value: '4'}});
        
        const popup = screen.getByText('New value must not stray away from 10% of original value');
        expect(popup).toBeInTheDocument();
    });

    it('should show popup when value is above 10% of default value', () => {
        render(<RatesTableItem defaultValue="5" handleChange={() => {}}/>);

        const input = screen.getByTestId('cell-input');
        fireEvent.change(input, {target: { value: '6'}});
        
        const popup = screen.getByText('New value must not stray away from 10% of original value');
        expect(popup).toBeInTheDocument();
    });

    it('shouldn`t show popup when value is within 10% of default value', () => {
        render(<RatesTableItem defaultValue="5" handleChange={() => {}}/>);

        const input = screen.getByTestId('cell-input');
        fireEvent.change(input, {target: { value: '5.3'}});
        
        const popup = screen.queryAllByText('New value must not stray away from 10% of original value');
        expect(popup).toHaveLength(0);
    });

    it('shoul update when value is within 10% of default value', () => {
        render(<RatesTableItem defaultValue="5" handleChange={() => {}}/>);

        const input = screen.getByTestId('cell-input') as HTMLInputElement;
        fireEvent.change(input, {target: { value: '5.3'}});

        const inputValue = input.value;
        expect(inputValue).toBe('5.3');
    });

});