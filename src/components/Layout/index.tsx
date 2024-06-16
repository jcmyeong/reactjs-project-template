import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Header = styled.header`
  background: #282c34;
  padding: 20px;
  color: white;
  text-align: center;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
`;

const Main = styled.main`
  flex: 1;
  padding: 20px;
  background: #f0f0f0;
`;

const Footer = styled.footer`
  background: #282c34;
  padding: 10px;
  color: white;
  text-align: center;
`;

const LinkItem = styled(Link)`
  color: white;
  font-size: 15px;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    color: gray;
  }
`

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Container>
      <Header>
        <h1>My Application</h1>
        <Nav>
          <LinkItem to="/">Home</LinkItem>
          <LinkItem to="/about">About</LinkItem>
        </Nav>
      </Header>
      <Main>{children}</Main>
      <Footer>&copy; 2023 My Application</Footer>
    </Container>
  );
};

export default Layout