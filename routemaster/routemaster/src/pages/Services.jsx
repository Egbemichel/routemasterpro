/* eslint-disable no-unused-vars */
// src/components/ServicesPage.jsx
import React from 'react';
import styled from 'styled-components';
import service1Image from '../assets/images/aircargo.png';
import service2Image from '../assets/images/boxes.png';
import service3Image from '../assets/images/ship.png';
import service4Image from '../assets/images/truck2.png';
import '../style/App.css';
import '../style/Home.css';

const ServicesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: #333; /* Dark grey background */

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Banner = styled.div`
  display: flex;
  align-items: center;
  margin: 2rem 0;
  padding: 2rem;
  width: 80%;
  background-color: white;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  transform: perspective(1000px) rotateY(10deg);
  background-color: #434242;
  margin-top: 78px;
  flex-direction: column; /* Stack image and text vertically on small screens */

  @media (max-width: 768px) {
    width: 100%;
    padding: 1rem;
    flex-direction: column;
    text-align: center;
  }
`;

const Image = styled.div`
  width: 300px;
  height: 300px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin-right: 2rem;
  background-color: #434242; /* Dark grey background */ 

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    margin-right: 0;
    margin-bottom: 1rem;
  }
`;

const TextContainer = styled.div`
  flex: 1;
  background-color: #434242;

  @media (max-width: 768px) {
    padding: 1rem;
    text-align: center;
  }
`;

const Heading = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

const Text = styled.p`
  font-size: 1.2rem;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ServicesPage = () => {
  return (
    <ServicesContainer>
      <Banner>
        <Image style={{ backgroundImage: `url(${service1Image})` }} />
        <TextContainer>
          <Heading className='name'>Wide Range Transport</Heading>
          <Text>Experience unparalleled convenience with our wide range shipping service. Whether you’re sending a small package or a large shipment, our robust logistics network ensures timely and secure delivery. From local to international destinations, we cover it all, providing seamless shipping solutions tailored to your needs.</Text>
        </TextContainer>
      </Banner>
      <Banner>
        <Image style={{ backgroundImage: `url(${service2Image})` }} />
        <TextContainer>
          <Heading className='name'>All Sizes</Heading>
          <Text>Our all sizes shipping service is designed to accommodate shipments of any size with ease. Whether its a single envelope or a bulky freight, our system is equipped to handle packages of all dimensions efficiently. Enjoy peace of mind knowing that your items are in capable hands, no matter how large or small.</Text>
        </TextContainer>
      </Banner>
      <Banner>
        <Image style={{ backgroundImage: `url(${service3Image})` }} />
        <TextContainer>
          <Heading className='name'>All Cargo</Heading>
          <Text>From delicate items to heavy cargo, our all cargo service ensures that every shipment is managed with the utmost care. We specialize in handling diverse types of cargo, providing tailored solutions for different requirements. Our dedicated team ensures that your goods are transported safely and efficiently, regardless of their nature.</Text>
        </TextContainer>
      </Banner>
      <Banner>
        <Image style={{ backgroundImage: `url(${service4Image})` }} />
        <TextContainer>
          <Heading className='name'>All Shipment</Heading>
          <Text>Whether its a standard parcel, an urgent shipment, or a complex logistical challenge, our all shipments service has got you covered. We offer versatile shipping solutions to meet any requirement, providing flexibility and reliability for every type of shipment. Trust us to manage your deliveries with precision and care.</Text>
        </TextContainer>
      </Banner>
    </ServicesContainer>
  );
};

export default ServicesPage;
