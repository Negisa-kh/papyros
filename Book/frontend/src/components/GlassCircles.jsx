import React, { useEffect } from 'react';
import './GlassCircles.css';

const GlassCircles = () => {
  useEffect(() => {
    const circles = document.querySelectorAll('.glass-circle');
    circles.forEach(circle => {

      const randomX = Math.random() * (window.innerWidth - 100);
      const randomY = Math.random() * (window.innerHeight - 100);
      circle.style.left = `${randomX}px`;
      circle.style.top = `${randomY}px`;

      const randomColor = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.1)`;
      const borderColor = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.2)`;
      circle.style.background = randomColor;
      circle.style.borderColor = borderColor;

      const duration = 10 + Math.random() * 20;
      const delay = Math.random() * 5;
      circle.style.animation = `float ${duration}s linear ${delay}s infinite`;
    });
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[-10]">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="glass-circle absolute w-16 h-16 rounded-full backdrop-blur-sm shadow-lg"
        ></div>
      ))}
    </div>
  );
};

export default GlassCircles;