import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import { motion } from 'framer-motion';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 60px 20px;
`;

const Title = styled.h1`
  font-size: 48px;
  margin-bottom: 20px;
`;

const Subtitle = styled.p`
  font-size: 24px;
  margin-bottom: 40px;
  color: #666;
`;

const Home = () => (
  <div>
    <Header />
    <HomeContainer>
      <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
        <Title>Welcome to linX</Title>
        <Subtitle>The Ultimate Collaboration Platform</Subtitle>
      </motion.div>
    </HomeContainer>
  </div>
);

export default Home;