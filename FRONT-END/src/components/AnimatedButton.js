// src/components/AnimatedButton.js
import React from 'react';
import { motion } from 'framer-motion';

const AnimatedButton = () => (
  <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    className="bg-blue-500 text-white p-2 rounded"
  >
    Click Me
  </motion.button>
);

export default AnimatedButton;