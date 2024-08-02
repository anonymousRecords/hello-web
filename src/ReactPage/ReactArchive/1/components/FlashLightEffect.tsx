/** @jsxImportSource @emotion/react */
import React, { useState, useEffect, useRef } from 'react';
import { css } from '@emotion/react';

const FlashlightEffect: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const containerStyle = css`
    width: 100vw;
    height: 100vh;
    background: black;
    position: relative;
    overflow: hidden;
    cursor: none;
  `;

  const flashlightStyle = css`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      circle 150px at ${mousePosition.x}px ${mousePosition.y}px,
      rgba(255, 255, 255, 0.4) 0%,
      rgba(255, 255, 255, 0.1) 50%,
      transparent 100%
    );
    pointer-events: none;
  `;

  const textStyle = css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 24px;
    font-weight: bold;
    mix-blend-mode: overlay;
  `;

  return (
    <div css={containerStyle} ref={containerRef}>
      <div css={flashlightStyle} />
      <div css={textStyle}>이거 보이세요?</div>
    </div>
  );
};

export default FlashlightEffect;