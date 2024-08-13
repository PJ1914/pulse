import React from 'react';
import styled from 'styled-components';

// Styled Footer component
const StyledFooter = styled.footer`
  background-color: #121212;
  color: #fff;
  text-align: center;
  padding: 10px 0;
  width: 100%;
  font-size: 16px;

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px 0;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    padding: 6px 0;
  }
`;

const FooterText = styled.p`
  margin: 0;
`;

const Footer = () => {
  return (
    <StyledFooter>
      <FooterText>© 2024 Pulse AI. All rights reserved.</FooterText>
    </StyledFooter>
  );
};

export default Footer;
