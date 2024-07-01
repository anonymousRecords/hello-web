/**
 * 타이머, 스톱워치 구현
 * - 타이머와 스톱워치를 선택할 수 있는 버튼이 있음
 * **/
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Header } from "../../../components/Header";
import { useState } from "react";

const BUTTONS = [
  { id: "timer", text: "타이머" },
  { id: "stopwatch", text: "스톱워치" },
];

// 버튼 컴포넌트
interface ButtonProps {
  id: string;
  text: string;
  isActive: boolean;
  onClick: (id: string) => void;
}
const Button = ({ id, text, isActive, onClick }: ButtonProps) => (
  <button
    css={toggleButtonStyle}
    onClick={() => onClick(id)}
    style={{
      backgroundColor: isActive ? "pink" : "#333",
      opacity: isActive ? 1 : 0.1,
    }}
  >
    {text}
  </button>
);

// 셀 컴포넌트
interface CellProps {
  num: number;
}
const Cell = ({ num }: CellProps) => <div css={cellStyle}>{num}</div>;

// 타이머 컴포넌트

const Timer = () => (
  <div css={timerWrapperStyle}>
    <div css={cellContainerStyle}>
      <Cell num={0} />
      <Cell num={0} />
      <div>
        <button>up</button>
        <button>down</button>
      </div>
    </div>
    <span>:</span>
    <div css={cellContainerStyle}>
      <Cell num={0} />
      <Cell num={0} />
    </div>
    <span>:</span>
    <div css={cellContainerStyle}>
      <Cell num={0} />
      <Cell num={0} />
    </div>
    <div css={cellContainerStyle}>
      <button css={timerButtonStyle}>시작</button>
      <button css={timerButtonStyle}>리셋</button>
    </div>
  </div>
);

const Stopwatch = () => (
  <div>
    <h1>스톱워치</h1>
  </div>
);

function React0() {
  const [activeButton, setActiveButton] = useState(BUTTONS[0].id);

  const handleButtonClick = (clickedId: string) => {
    setActiveButton(clickedId);
  };

  return (
    <>
      <Header />
      <main>
        <nav>
          {BUTTONS.map((button) => (
            <Button
              key={button.id}
              {...button}
              isActive={activeButton === button.id}
              onClick={() => handleButtonClick(button.id)}
            />
          ))}
        </nav>
        <section>
          {activeButton === "timer" ? <Timer /> : <Stopwatch />}
        </section>
      </main>
    </>
  );
}

export default React0;

const toggleButtonStyle = css`
  background-color: #333;
  color: white;
  border: none;
  padding: 10px;
  margin: 10px;
  cursor: pointer;
  font-size: 1rem;
  border-radius: 5px;
  &:hover {
    background-color: #555;
  }
`;

const cellContainerStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;
`;

const cellStyle = css`
  width: 30px;
  height: 60px;
  border: 1px solid #333;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const timerWrapperStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const timerButton

const timerButtonStyle = css`
  background-color: #333;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  font-size: 1rem;
  border-radius: 5px;
  &:hover {
    background-color: #555;
  }
`;
