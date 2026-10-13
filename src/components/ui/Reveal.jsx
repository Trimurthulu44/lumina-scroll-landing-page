import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp, fadeLeft, fadeRight, scaleUp, fadeIn } from '../../utils/animations';

const variantsMap = {
  'fade-up': fadeUp,
  'fade-left': fadeLeft,
  'fade-right': fadeRight,
  'scale': scaleUp,
  'fade-in': fadeIn,
};

export const Reveal = ({
  children,
  variant = 'fade-up',
  delay = 0,
  duration = 0.65,
  className = '',
  once = true,
  amount = 0.2,
  ...props
}) => {
  const selectedVariant = variantsMap[variant] || fadeUp;

  // Clone and augment variant with custom delay/duration
  const customVariant = {
    hidden: selectedVariant.hidden,
    visible: {
      ...selectedVariant.visible,
      transition: {
        ...(selectedVariant.visible.transition || {}),
        delay,
        duration,
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={customVariant}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};
