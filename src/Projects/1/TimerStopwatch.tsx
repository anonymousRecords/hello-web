/**
 * 타이머, 스톱워치 구현
 * - 타이머와 스톱워치를 선택할 수 있는 버튼이 있음
 * **/
import { useState } from "react";
import { Stopwatch } from "./components/Stopwatch";
import { Timer } from "./components/Timer";
import { Button } from "./components/Button";

const BUTTONS = [
  { id: "timer", text: "타이머" },
  { id: "stopwatch", text: "스톱워치" },
];

function TimerStopwatch() {
  const [activeButton, setActiveButton] = useState(BUTTONS[0].id);

  const handleButtonClick = (clickedId: string) => {
    setActiveButton(clickedId);
  };

  return (
    <>
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

export default TimerStopwatch;
