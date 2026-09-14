import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  display: flex;
  background-color: #474747;
  color: white;
  justify-content: center;
  padding: 20px;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
`;

const NewPostButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;

  padding: 12px 24px;

  background: linear-gradient(
    135deg,
    #ed145b,
    #ff4b7d
  );

  color: white;
  text-decoration: none;

  font-size: 15px;
  font-weight: 700;

  border-radius: 25px;

  box-shadow:
    0 4px 10px rgba(0, 0, 0, 0.25);

  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);

    box-shadow:
      0 6px 16px rgba(0, 0, 0, 0.3);

    background: linear-gradient(
      135deg,
      #d90d50,
      #ff356b
    );
  }

  &:active {
    transform: translateY(0);
  }
`;

const PlusIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 24px;
  height: 24px;

  border-radius: 50%;

  background-color: rgba(255, 255, 255, 0.2);

  font-size: 20px;
  line-height: 1;
`;

const Header: React.FC = () => {
  const [tipoUsuario, setTipoUsuario] = useState<string | null>(
    localStorage.getItem('tipoUsuario')
  );

  useEffect(() => {
    const atualizarUsuario = () => {
      setTipoUsuario(localStorage.getItem('tipoUsuario'));
    };

    window.addEventListener('storage', atualizarUsuario);

    return () => {
      window.removeEventListener('storage', atualizarUsuario);
    };
  }, []);

  console.log('TIPO NO HEADER:', tipoUsuario);

  return (
    <HeaderContainer>
      <Nav>
        {tipoUsuario === 'professor' && (
          <NewPostButton to="/new-post">
            <PlusIcon>+</PlusIcon>
            Novo Post
          </NewPostButton>
        )}
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
