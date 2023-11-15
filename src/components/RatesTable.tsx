import { Table } from 'semantic-ui-react';
import styled from 'styled-components';
import RatesTableItem from './RatesTableItem';
import { useStore } from '../store';
import { Rate } from '../types';

const TableWrapper = styled.div`
    width: 100%;
    margin-bottom: 150px;
`;

const ValueCell = styled(Table.Cell)`
    text-align: center !important;
`;

const StyledCCYcell = styled(ValueCell)`
    width: 120px;
`;

const MiddleCell = styled(ValueCell)`
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
            updateRatesData(newRate);
        }
    }

    return (
        <TableWrapper>
            <Table definition>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell />
                        <MiddleHeaderCell textAlign='center'>Buy</MiddleHeaderCell>
                        <Table.HeaderCell textAlign='center'>Sell</Table.HeaderCell>
                    </Table.Row>
                </Table.Header> 
                <Table.Body>
                    {
                        ratesData.map(({ccy, base_ccy, buy, sale}) => (
                            <Table.Row key={ccy}>
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
            </Table>
        </TableWrapper> 
    );
};

export default RatesTable;
