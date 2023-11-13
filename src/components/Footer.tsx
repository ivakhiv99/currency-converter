import styled from "styled-components";

const FooterPlaceholder = styled.div`
  height: 100px;
  width: 100vw;
  background-color: #999;
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;

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
    