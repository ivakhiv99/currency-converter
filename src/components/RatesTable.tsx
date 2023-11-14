import { useContext } from 'react';
import { Table } from 'semantic-ui-react';
import styled from 'styled-components';
import RatesTableItem from './RatesTableItem';
import { useStore } from '../App';
import { Rate } from '../types';


const TableWrapper = styled.div`
    width: 100%;
    margin-bottom: 150px;
`;

const StyledTable = styled(Table)`
    /* width: 500px; */
`;

const StyledCCYcell = styled(Table.Cell)`
    width: 120px;

`;

const ValueCell = styled(Table.Cell)`
    /* display: flex;
    align-items: center; */
`;

const MiddleCell = styled(Table.Cell)`
    border-right: 1px solid #e3e5e5;
`;

const MiddleHeaderCell = styled(Table.HeaderCell)`
    border-right: 1px solid #e3e5e5;
`;

const RatesTable = () => {
    const [ratesData, updateRatesData] = useStore(state => [state.ratesData, state.updateRatesData]);

    const handleUpdateRate = ({ccy, newValue, type}:{ccy: string, newValue: string, type: string}) => {
        const oldRate = ratesData.find((rate) => rate.ccy === ccy);
        if(oldRate) {
            const newRate: Rate = { ...oldRate, [type === 'buy' ? 'buy' : 'sale']: +newValue }
            console.log({newRate});
            updateRatesData(newRate);
        }
    }

    return (
        <TableWrapper>
            <StyledTable definition>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell />
                        <MiddleHeaderCell>Buy</MiddleHeaderCell>
                        <Table.HeaderCell>Sell</Table.HeaderCell>
                    </Table.Row>
                </Table.Header> 
                <Table.Body>
                    {
                        ratesData.map(({ccy, base_ccy, buy, sale}) => (
                            <Table.Row>
                                <StyledCCYcell>{`${base_ccy} to ${ccy}`}</StyledCCYcell>
                                <MiddleCell>
                                    <RatesTableItem
                                        defaultValue={Number(buy).toFixed(2)}
                                        handleChange={(value) => handleUpdateRate({
                                            ccy,
                                            newValue: value,
                                            type: 'buy',
                                        })}
                                    />
                                </MiddleCell>
                                <ValueCell>
                                    <RatesTableItem
                                        defaultValue={Number(sale).toFixed(2)}
                                        handleChange={(value) => handleUpdateRate({
                                            ccy,
                                            newValue: value,
                                            type: 'sell',
                                        })}
                                    />
                                </ValueCell>
                            </Table.Row>
                        ))
                    }
                </Table.Body>
            </StyledTable>
        </TableWrapper> 
    );
};

export default RatesTable;
