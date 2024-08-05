/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useRef, useCallback } from "react";

const useMouseEffect = () => {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    cardRefs.current.forEach((card) => {
      if (card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      }
    });
  }, []);

  return { cardRefs, handleMouseMove };
};

const CARD_COUNT = 4;
const GRID_COLUMNS = 2;

function HoverAnimation() {
  const lists = Array.from({ length: CARD_COUNT }, (_, i) => i);
  const { cardRefs, handleMouseMove } = useMouseEffect();

  return (
    <>
      <main css={WrapperStyle} onMouseMove={handleMouseMove}>
        <div css={CardContainerStyle}>
          {lists.map((item, index) => (
            <div
              key={item}
              css={CardStyle}
              className="card"
              ref={(el) => (cardRefs.current[index] = el)}
            >
              Item {item}
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export default HoverAnimation;

const WrapperStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  background-color: rgb(20, 20, 20);
  padding: 60px;
`;

const CardContainerStyle = css`
  display: grid;
  grid-template-columns: repeat(${GRID_COLUMNS}, 1fr);
  gap: 20px;
`;

const CardStyle = css`
  width: 200px;
  height: 200px;
  position: relative;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  cursor: pointer;
  color: white;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover::after {
    opacity: 1;
  }

  &:hover::before {
    opacity: 1;
  }

  &::before,
  &::after {
    border-radius: inherit;
    content: "";
    height: 100%;
    left: 0px;
    opacity: 0;
    position: absolute;
    top: 0px;
    transition: opacity 500ms;
    width: 100%;
  }

  &::before {
    background: radial-gradient(
      800px circle at var(--mouse-x) var(--mouse-y),
      rgba(255, 255, 255, 0.06),
      transparent 40%
    );
    z-index: 3;
  }

  &::after {
    background: radial-gradient(
      600px circle at var(--mouse-x) var(--mouse-y),
      rgba(255, 255, 255, 0.4),
      transparent 40%
    );
    z-index: 1;
  }
`;
