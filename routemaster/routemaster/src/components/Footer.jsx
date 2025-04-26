/* eslint-disable no-unused-vars */
// src/components/Footer.jsx
import React from 'react';
import styled from 'styled-components';
import { FaFacebook, FaPaypal, FaBitcoin, FaApplePay, FaUniversity, FaFedex, FaUps } from 'react-icons/fa';
import { SiZelle, SiCashapp } from 'react-icons/si';
import interacLogo from '../assets/images/interaclogo.png';
import pixLogo from '../assets/images/pix.png';
import uspsLogo from '../assets/images/United-States-Postal-Service-Logo.png';

const FooterContainer = styled.footer`
  background-color: #333; /* Dark grey background */
  color: white;
  padding: 2rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 55px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 1rem;
    flex-direction: column;
    align-items: center;
  }
`;

const Column = styled.div`
  flex: 1;
  margin: 0 1rem;
  max-width: 33%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    max-width: 100%;
    margin: 0.5rem 0;
    text-align: center;
  }
`;

const ColumnHeading = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const FooterText = styled.p`
  font-size: 0.9rem;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const IconContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem; /* Space between items */
  justify-content: center;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const IconLink = styled.a`
  display: inline-block;
  margin: 0.5rem;
  font-size: 30px;
  color: orange;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
  }

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const CustomIcon = styled.img`
  width: 30px;
  height: 30px;
  margin: 0.5rem;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
  }

  @media (max-width: 768px) {
    width: 25px;
    height: 25px;
  }
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: 2rem;
  font-size: 0.8rem;
  width: 100%; /* Ensure the copyright text spans the full width */

  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <Column>
        <h1 className='name'>RouteMasterPro</h1>
        <FooterText>
          RouteMasterPro is your trusted partner in package tracking. We provide real-time updates and comprehensive insights to ensure your shipments arrive on time, every time. With RouteMaster, you can track your packages with ease and confidence, knowing that we are committed to delivering exceptional service and reliability.
        </FooterText>
      </Column>

      <Column>
        <ColumnHeading>Follow Us</ColumnHeading>
        <IconContainer>
          <IconLink href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook />
          </IconLink>
        </IconContainer>
      </Column>

      <Column>
        <ColumnHeading>We Accept</ColumnHeading>
        <IconContainer>
          <IconLink target="_blank" rel="noopener noreferrer">
            <FaPaypal />
          </IconLink>
          <IconLink target="_blank" rel="noopener noreferrer">
            <SiZelle />
          </IconLink>
          <IconLink target="_blank" rel="noopener noreferrer">
            <SiCashapp />
          </IconLink>
          <IconLink target="_blank" rel="noopener noreferrer">
            <FaBitcoin />
          </IconLink>
          <IconLink target="_blank" rel="noopener noreferrer">
            <FaApplePay />
          </IconLink>
          <IconLink target="_blank" rel="noopener noreferrer">
            <CustomIcon src={interacLogo} alt="Interac" />
          </IconLink>
          <IconLink target="_blank" rel="noopener noreferrer">
            <CustomIcon src={pixLogo} alt="Pix" style={{height:'40px', width:'50px'}}/>
          </IconLink>
          <IconLink target="_blank" rel="noopener noreferrer">
            <FaUniversity />
          </IconLink>
        </IconContainer>
      </Column>

      <Column>
        <ColumnHeading>Our Partnerships</ColumnHeading>
        <IconContainer>
          <IconLink target="_blank" rel="noopener noreferrer">
            <FaFedex />
          </IconLink>
          <IconLink target="_blank" rel="noopener noreferrer">
            <FaUps />
          </IconLink>
          <IconLink target="_blank" rel="noopener noreferrer">
            <CustomIcon src={uspsLogo} alt="USPS" style={{height:'70px', width:'70px'}}/>
          </IconLink>
        </IconContainer>
      </Column>

      <Copyright>
        &copy; {new Date().getFullYear()} <span className='name'>RouteMasterPro</span>. All rights reserved.
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;
