import styled from "styled-components";

const HeaderPlaceholder = styled.div`
  height: 100px;
  width: 100vw;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
  background-color: #999;
  margin-bottom: 30px;
`;


const Header = () => (
    <HeaderPlaceholder>
        <h1>UAH Converter</h1>
    </HeaderPlaceholder>
);

export default Header;
