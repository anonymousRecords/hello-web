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

interface ButtonProps {
  id: string;
  text: string;
  isActive: boolean;
  onClick: (id: string) => void;
}
const Button = ({ id, text, isActive, onClick }: ButtonProps) => (
  <button
    css={buttonStyle}
    onClick={() => onClick(id)}
    style={{ backgroundColor: isActive ? "pink" : "#333" }}
  >
    {text}
  </button>
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
          {activeButton === "timer" ? <div>타이머</div> : <div>스톱워치</div>}
        </section>
      </main>
    </>
  );
}

export default React0;

const buttonStyle = css`
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
