import styled from "styled-components";

const FooterPlaceholder = styled.div`
  position: fixed;
  bottom: 0;
  height: 100px;
  width: 100vw;
  background-color: #999;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 100px
  p {
    margin: 0;
    font-size: 22px;
  }
`;

const Footer = () => (
    <FooterPlaceholder>
        <p>Your typical footer message</p> 
    </FooterPlaceholder>
);

export default Footer;
    