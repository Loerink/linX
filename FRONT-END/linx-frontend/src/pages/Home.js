import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import { motion } from 'framer-motion';
import backgroundImage from '../assets/images/background.jpg'; // Ensure you have an image here

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100vh;
  padding: 60px 20px;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  color: white;
`;

const Title = styled.h1`
  font-size: 64px;
  margin-bottom: 20px;
`;

const Subtitle = styled.p`
  font-size: 24px;
  margin-bottom: 40px;
`;

const Button = styled.a`
  display: inline-block;
  padding: 10px 20px;
  font-size: 18px;
  color: #fff;
  background-color: #007BFF;
  border-radius: 5px;
  text-transform: uppercase;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const Home = () => (
  <div>
    <Header />
    <HomeContainer>
      <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
        <Title>Welcome to linX</Title>
        <Subtitle>The Ultimate Collaboration Platform</Subtitle>
        <Button href="#learn-more">Learn More</Button>
      </motion.div>
    </HomeContainer>
  </div>
);

export default Home;