import { useContext } from 'react';
import { Table } from 'semantic-ui-react';
import styled from 'styled-components';
import { ExchangeRates } from '../App';
import RatesTableItem from './RatesTableItem';


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
    const data = useContext(ExchangeRates);

    console.log({data})

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
                        data.map(({ccy, base_ccy, buy, sale}) => (
                            <Table.Row>
                                <StyledCCYcell>{`${base_ccy} to ${ccy}`}</StyledCCYcell>
                                <MiddleCell>
                                    <RatesTableItem value={Number(buy).toFixed(2)} handleChange={(value) => console.log('new value', value)}/>
                                </MiddleCell>
                                <ValueCell>
                                    <RatesTableItem value={Number(sale).toFixed(2)} handleChange={(value) => console.log('new value', value)}/>
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
