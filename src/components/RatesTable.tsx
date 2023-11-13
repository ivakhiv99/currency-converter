import { useContext } from 'react';
import { Table } from 'semantic-ui-react';
import styled from 'styled-components';
import { ExchangeRates } from '../App';
import RatesTableItem from './RatesTableItem';


const TableWrapper = styled(Table)`
    width: 200px;
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

const RatesTable = () => {
    const data = useContext(ExchangeRates);

    // const []

    console.log({data})
    

 return (
    <TableWrapper>
        <StyledTable definition>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell />
                    <Table.HeaderCell>Buy</Table.HeaderCell>
                    <Table.HeaderCell>Sell</Table.HeaderCell>
                </Table.Row>
            </Table.Header> 
            <Table.Body>
                {
                    data.map(({ccy, base_ccy, buy, sale}) => (
                        <Table.Row>
                            <StyledCCYcell>{`${base_ccy} to ${ccy}`}</StyledCCYcell>
                            <ValueCell>
                                <RatesTableItem value={Number(buy).toFixed(2)} handleChange={(value) => console.log('new value', value)}/>
                            </ValueCell>
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
 }
export default RatesTable;
