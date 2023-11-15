import { render, screen, within } from '@testing-library/react';
import Converter from '../components/Converter';
import { fireEvent } from '@testing-library/react';

describe('Converter component', () => {
    // it('should render the component', () => {
    //     render(<Converter />);

    //     const converterContainer = screen.getByTestId('converter-container');
    //     expect(converterContainer).toBeInTheDocument();
    // });

    it('should display the exchange indicator when the base currency and translated currency are different', () => {
        render(<Converter />);

        // expect(indicator).not.toBeInTheDocument();

        const baseCurrencyDropdown = screen.getByTestId('base-currency-dropdown');
        
        // const currencyInput = baseCurrencyDropdown.querySelector('input') as HTMLInputElement;

        // fireEvent.change(currencyInput, {target: {value: 'NOK'}});

        // console.log('currencyInput =', currencyInput.value)

        // const indicator = screen.getByTestId('exchange-indicator');
        // expect(indicator).toBeInTheDocument();

        // fireEvent.click(baseCurrencyDropdown);
        // const listbox = within(baseCurrencyDropdown).getByRole('listbox') as HTMLDivElement;



        // const nok = within(baseCurrencyDropdown).getAllByRole('option');
        // const dropdownOptions = baseCurrencyDropdown.getElementsByTagName('option')
        // // // // const t = nok.map((item: HTMLElement) => {console.log('map log = ',item.children[0].innerHTML); return item.children[0]});
        // console.log('nok = ', nok.length, dropdownOptions.length)

        // expect(nok).toBeInTheDocument();
        // // fireEvent.click(nok);

        // const indicator = screen.getByTestId('exchange-indicator');

        // expect(baseCurrencyDropdown).toBeInTheDocument();
    });

    // it('should update the translated input when the base input or base currency changes', () => {
    //     render(<Converter />);

    //     const baseInput = screen.getByTestId('changeCurrency');
    //     fireEvent.change(baseInput, { target: { value: '200' } });

    //     expect(screen.getByTestId('getCurrency')).toHaveValue('72.00');

    //     const baseCurrencyDropdown = screen.getByTestId('base-currency-dropdown');
    //     fireEvent.change(baseCurrencyDropdown, { target: { value: 'EUR' } });

    //     expect(screen.getByTestId('getCurrency')).toHaveValue('48.80');
    // });

    // it('should update the base input when the translated input or translated currency changes', () => {
    //     render(<Converter />);

    //     const translatedInput = screen.getByTestId('getCurrency');
    //     fireEvent.change(translatedInput, { target: { value: '200' } });

    //     expect(screen.getByTestId('changeCurrency')).toHaveValue('277.78');

    //     const translatedCurrencyDropdown = screen.getByTestId('translated-currency-dropdown');
    //     fireEvent.change(translatedCurrencyDropdown, { target: { value: 'JPY' } });

    //     expect(screen.getByTestId('changeCurrency')).toHaveValue('144.44');
    // });
});
