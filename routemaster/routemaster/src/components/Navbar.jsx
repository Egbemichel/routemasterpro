/* eslint-disable no-unused-vars */
// src/components/Navbar.jsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { FaHome, FaInfoCircle, FaServicestack, FaBars, FaTimes } from 'react-icons/fa';

const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  width: 96%;
  background-color: #333; /* Dark grey background */
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem; /* Reduced padding for responsiveness */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding: 1rem;
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    flex-direction: column;
    width: 100%;
    margin-top: 1rem;
  }
`;

const StyledNavLink = styled(NavLink)`
  color: white;
  text-decoration: none;
  margin: 0 1rem;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  position: relative;

  &:hover {
    color: #ff8c00; /* Orange hover color */
  }

  &.active {
    font-weight: bold;
    &::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 50%;
      transform: translateX(-50%);
      width: 8px;
      height: 8px;
      background-color: #ff8c00; /* Orange color */
      border-radius: 50%;
    }
  }

  @media (max-width: 768px) {
    margin: 0.5rem 0;
    font-size: 1rem;
  }
`;

const NavIcon = styled.span`
  margin-right: 0.5rem;

  @media (max-width: 768px) {
    margin-right: 0.3rem;
  }
`;

const HamburgerIcon = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    cursor: pointer;
    font-size: 1.5rem;
  }
`;

const CloseIcon = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    cursor: pointer;
    font-size: 1.5rem;
    position: absolute;
    top: 1rem;
    right: 1rem;
  }
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <NavbarContainer>
      <Logo className='name'>RouteMasterPro</Logo>
      <HamburgerIcon onClick={toggleMenu}>
        <FaBars />
      </HamburgerIcon>
      <NavLinks isOpen={isOpen}>
        <CloseIcon onClick={toggleMenu}>
          <FaTimes />
        </CloseIcon>
        <StyledNavLink to="/" exact='true' onClick={() => setIsOpen(false)}>
          <NavIcon><FaHome /></NavIcon>
          Home
        </StyledNavLink>
        <StyledNavLink to="/about" onClick={() => setIsOpen(false)}>
          <NavIcon><FaInfoCircle /></NavIcon>
          About
        </StyledNavLink>
        <StyledNavLink to="/services" onClick={() => setIsOpen(false)}>
          <NavIcon><FaServicestack /></NavIcon>
          Services
        </StyledNavLink>
      </NavLinks>
    </NavbarContainer>
  );
};

export default Navbar;
