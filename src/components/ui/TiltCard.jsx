import React, { useRef, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';

export const TiltCard = ({
  children,
  className = '',
  glare = true,
  scale = 1.02,
  tiltMax = 12,
  ...props
}) => {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse coords for 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for rotation
  const mouseXSpring = useSpring(x, { stiffness: 250, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 250, damping: 20 });

  // Cursor glow relative coordinates
  const glowX = useMotionValue(-100);
  const glowY = useMotionValue(-100);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = (mouseX / width - 0.5) * 2;
    const yPct = (mouseY / height - 0.5) * 2;

    x.set(yPct * -tiltMax); // rotateX
    y.set(xPct * tiltMax);  // rotateY

    glowX.set(mouseX);
    glowY.set(mouseY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const backgroundGradient = useMotionTemplate`
    radial-gradient(
      320px circle at ${glowX}px ${glowY}px,
      rgba(99, 102, 241, 0.18),
      transparent 80%
    )
  `;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        rotateX: mouseXSpring,
        rotateY: mouseYSpring,
      }}
      whileHover={{ scale }}
      transition={{ duration: 0.2 }}
      className={`relative overflow-hidden rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-dark-card/60 backdrop-blur-md shadow-lg hover:shadow-2xl hover:shadow-lumina-500/10 transition-shadow duration-300 ${className}`}
      {...props}
    >
      {glare && (
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300"
          style={{
            background: backgroundGradient,
            opacity: isHovered ? 1 : 0,
          }}
        />
      )}
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
};
