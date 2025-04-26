/* eslint-disable no-unused-vars */
// src/components/AboutPage.jsx
import React from "react";
import styled from "styled-components";
import historyImage from "../assets/images/clock.png";
import missionImage from "../assets/images/scope.png";
import policiesImage from "../assets/images/gear.png";
import "../style/App.css";
import "../style/Home.css";

const AboutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: #333; /* Dark grey background */
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Section = styled.div`
  display: flex;
  align-items: center;
  margin: 2rem 0;
  position: relative;
  flex-direction: row;
  
  @media (max-width: 768px) {
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
  transform: perspective(1000px) rotateY(15deg);
  z-index: 2;

  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
    margin-right: 0;
    margin-bottom: 1rem;
  }
`;

const TextContainer = styled.div`
  position: relative;
  background-color: #ff8c00; /* Orange background */
  color: white;
  padding: 1rem;
  transform: skew(-9deg);
  max-width: 300px;
  z-index: 1;
  
  @media (max-width: 768px) {
    max-width: 100%;
    transform: skew(0deg);
    padding: 1rem;
  }
`;

const Heading = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  transform: skew(20deg);
  color: #ffff;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const Text = styled.p`
  font-size: 1rem;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const AboutPage = () => {
  return (
    <AboutContainer>
      <Section>
        <Image
          style={{
            backgroundImage: `url(${historyImage})`,
          }}
        />
        <TextContainer>
          <Heading>Our History</Heading>
          <Text>
            Founded in 2015, RouteMasterPro was created by a dedicated team to
            bridge the gap between people through efficient transportation.
            Motivated by the high demand for reliable package tracking, we have
            grown to move over 40 million packages annually, utilizing real-time
            live tracking technology. Over the years, we have improved our user
            experience with a simpler, better design. Looking ahead, we aim to
            ship over 100 million packages by 2030, continuing our commitment to
            exceptional service and reliability.
          </Text>
        </TextContainer>
      </Section>
      <Section>
        <Image
          style={{
            backgroundImage: `url(${missionImage})`,
          }}
        />
        <TextContainer>
          <Heading>Our Mission</Heading>
          <Text>
            RouteMasterPro aims to bridge the gap between people through reliable
            package transportation. We achieve this with superior customer
            service, guided by our core values of `no package is too small` and
            `package care.` Our 24/7 live chat and real-time tracking ensure
            customer satisfaction and reliability. We stand out through our
            transparency, exceptional customer service, and advanced live
            tracking technology, committed to connecting people and delivering
            every package safely and on time.
          </Text>
        </TextContainer>
      </Section>
      <Section>
        <Image
          style={{
            backgroundImage: `url(${policiesImage})`,
          }}
        />
        <TextContainer>
          <Heading>Policies</Heading>
          <Text>
            Package Handling: We ensure secure and careful handling of all
            packages with real-time tracking from pickup to delivery. Customer
            Support: Available 24/7 via live chat, we address issues promptly
            and offer a clear escalation process for unresolved concerns.
            Tracking and Updates: Receive real-time updates
            throughout the delivery process, including any delays. Delivery
            Times: We strive to meet delivery estimates, with immediate updates
            provided for any unexpected delays. Working Hours: Customer service
            is available 24/7 via live chat, with phone support from Monday to
            Saturday, 9 AM to 6 PM, and email responses within 24 hours.
          </Text>
        </TextContainer>
      </Section>
    </AboutContainer>
  );
};

export default AboutPage;
