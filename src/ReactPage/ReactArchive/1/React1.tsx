/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";
import { useEffect, useState } from "react";
import FlashlightEffect from "./components/FlashLightEffect";

function React1() {
  const [leftPosition, setLeftPosition] = useState(0);
  const [rightPosition, setRightPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setLeftPosition(-scrollPosition);
      setRightPosition(scrollPosition);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* 글자 좌 우 이동 */}
      <section style={{ height: "2000px" }}>
        <h1 style={{ fontSize: "80px", fontWeight: "800" }}>
          글자 좌 우 이동 입니다
        </h1>
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: `calc(50% + ${leftPosition}px)`,
            transform: "translate(-50%, -50%)",
            whiteSpace: "nowrap",
          }}
        >
          왼쪽으로 이동
        </div>
        <div
          style={{
            position: "fixed",
            top: "60%",
            left: `calc(50% + ${rightPosition}px)`,
            transform: "translate(-50%, -50%)",
            whiteSpace: "nowrap",
          }}
        >
          오른쪽으로 이동
        </div>
      </section>
      {/* 배경 일렁거림 1*/}
      <section css={wavySection}>
        <h1 style={{ fontSize: "80px", fontWeight: "800" }}>울렁거림 1</h1>
      </section>
      {/* 배경 일렁거림 2 */}
      <section
        style={{
          backgroundColor: "blue",
          width: "100%",
          height: "1000px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1 style={{ fontSize: "80px", fontWeight: "800" }}>울렁거림 2</h1>
        <div css={rippleContainer}>
          <div css={ripple}></div>
          <div css={ripple}></div>
          <div css={ripple}></div>
        </div>
      </section>
      {/* 손전등 */}
      <FlashlightEffect />
    </>
  );
}

export default React1;

const wavyAnimation = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(20px);
  }
`;

const wavySection = css`
  width: 100%;
  height: 100vh;
  background-color: pink;
  position: relative;
  overflow: hidden;

  &::before,
  &::after {
    content: "";
    position: absolute;
    left: -50%;
    width: 200%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 100%;
  }

  &::before {
    top: -75%;
    animation: ${wavyAnimation} 7s ease-in-out infinite;
  }

  &::after {
    top: -80%;
    animation: ${wavyAnimation} 9s ease-in-out infinite;
  }
`;

const rippleAnimation1 = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
`;

const rippleAnimation2 = keyframes`
  0%, 100% {
    transform: scale(1.05);
  }
  50% {
    transform: scale(0.95);
  }
`;

const rippleAnimation3 = keyframes`
  0%, 100% {
    transform: scale(1.1);
  }
  50% {
    transform: scale(1);
  }
`;

const rippleContainer = css`
  position: relative;
  width: 300px;
  height: 300px;
`;

const ripple = css`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.5);

  &:nth-of-type(1) {
    animation: ${rippleAnimation1} 6s ease-in-out infinite;
  }

  &:nth-of-type(2) {
    animation: ${rippleAnimation2} 8s ease-in-out infinite;
  }

  &:nth-of-type(3) {
    animation: ${rippleAnimation3} 10s ease-in-out infinite;
  }
`;
