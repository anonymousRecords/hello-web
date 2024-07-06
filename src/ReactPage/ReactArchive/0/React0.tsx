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

// 넘버 인풋 컴포넌트
interface NumberInputProps {
  label: string;
  min: number;
  max: number;
}

const NumberInput = ({ label, min, max }: NumberInputProps) => (
  <div css={numberInputStyle}>
    <input type="number" min={min} max={max} />
    <span>{label}</span>
  </div>
);

// 시작, 리셋 버튼 컴포넌트
interface ActionButtonProps {
  text: string;
  onClick: () => void;
}

const ActionButton = ({ text, onClick }: ActionButtonProps) => (
  <button css={timerButtonStyle} onClick={onClick}>
    {text}
  </button>
);

// 리셋 동작
const handleReset = () => {
  console.log("리셋");
}

// 시작 동작
const handleStart = () => {
  console.log("시작");
}

const Timer = () => (
  <div css={timerWrapperStyle}>
    <NumberInput label="시" min={0} max={60} />
    <NumberInput label="분" min={0} max={60} />
    <NumberInput label="초" min={0} max={60} />
    <div css={buttonContainerStyle}>
      <ActionButton text="시작" onClick={() => handleStart()} />
      <ActionButton text="리셋" onClick={() => handleReset()} />
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

const buttonContainerStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;
`;

const numberInputStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

const timerWrapperStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

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
