/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import '../style/Home.css'

const BannerContainer = styled.div`
  position: relative;
  height: 80vh;
  width: 100%;
  background-color: #333; /* Dark grey */
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  @media (max-width: 768px) {
    height: 60vh;
  }
`;

const Plane = styled.div`
  position: absolute;
  bottom: 20%;
  width: 1100px;
  height: 260px;
  background: url('/images/plane.png') no-repeat center center;
  background-size: cover;
  transform: rotateX(15deg) rotateZ(-10deg);
  box-shadow: 0 0px 0px rgba(0, 0, 0, 0.5);
  z-index: 1;

  @media (max-width: 768px) {
    width: 800px;
    height: 180px;
    bottom: 10%;
  }
`;

const BannerText = styled.div`
  position: absolute;
  bottom: 20%;
  color: white;
  font-size: 2rem;
  text-align: center;
  z-index: 2;
  width: 80%;
  max-width: 800px;
  opacity: 0;
  animation: slideUp .9s forwards;

  @keyframes slideUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
    bottom: 10%;
  }
`;

const TruckBannerContainer = styled.div`
  margin-top: 50px;
  padding-top: 30px;
  position: relative;
  height: 60vh;
  width: 100%;
  background-color: #444; /* Slightly lighter grey */
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  @media (max-width: 768px) {
    height: 50vh;
  }
`;

const Truck = styled.div`
  position: absolute;
  bottom: 2%;
  right: 38%;
  width: 500px;
  height: 320px;
  background: url('/images/truck.png') no-repeat center center;
  background-size: cover;
  z-index: 2;

  @media (max-width: 768px) {
    width: 170px;
    height: 70px;
    right: 67%;
  }

  @media (max-width: 838px){
    width: 250px;
    height:220px;
    right:427px;
    bottom:14px;
  }
`;

const TruckContent = styled.div`
  position: absolute;
  bottom: 20%;
  right: 19%;
  text-align: center;
  z-index: 1;
  width: 50%;
  max-width: 300px;
  color: white;

  @media (max-width: 768px) {
    bottom: 10%;
    right: 10%;
    width: 70%;
  }
`;

const Label = styled.div`
  font-size: 1.5rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const InputField = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: none;
  border-radius: 4px;
  margin-bottom: 1rem;
  font-size: 1rem;
  outline: none;

  @media (max-width: 768px) {
    padding: 0.6rem;
    font-size: 0.9rem;
  }
`;

const TrackButton = styled.button`
  background-color: orange;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.8rem 2rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff8c00;
  }

  @media (max-width: 768px) {
    padding: 0.6rem 1.5rem;
    font-size: 0.9rem;
  }
`;

const HomePage = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const navigate = useNavigate();

  const handleTrack = () => {
    if (trackingNumber.trim()) {
      navigate(`/track/${trackingNumber}`);
    } else {
      alert('Please enter a tracking number.');
    }
  };

  return (
    <>
      <BannerContainer>
        <Plane />
        <BannerText>
          <h1 className='name'>Welcome to <span className='name'>RouteMasterPro</span></h1>
          <p>Innovative solutions to keep you on track.</p>
        </BannerText>
      </BannerContainer>

      <TruckBannerContainer>
        <Truck />
        <TruckContent>
          <Label>Track your order</Label>
          <InputField
            type="text"
            placeholder="Enter your tracking number"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
          />
          <TrackButton onClick={handleTrack}>Track</TrackButton>
        </TruckContent>
      </TruckBannerContainer>
    </>
  );
};

export default HomePage;
