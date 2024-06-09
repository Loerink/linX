import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const Logo = styled.h1`
  font-size: 24px;
  color: #333;
`;

const Nav = styled.nav`
  a {
    margin: 0 15px;
    font-size: 18px;
    color: #333;
  }
`;

const Header = () => (
  <HeaderContainer>
    <Logo>linX</Logo>
    <Nav>
      <a href="#features">Features</a>
      <a href="#pricing">Pricing</a>
      <a href="#contact">Contact</a>
    </Nav>
  </HeaderContainer>
);

export default Header;