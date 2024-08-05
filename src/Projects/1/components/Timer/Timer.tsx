/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { NumberInput } from "../NumberInput";
import { ToggleButton } from "../ToggleButton";
import { useState, useEffect, useRef } from "react";
import { Button } from "../Button";

function Timer() {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number| null>(null);

  useEffect(() => {
    if (isRunning && time > 0) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(intervalRef.current!);
            setIsRunning(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (time === 0 || !isRunning) {
      clearInterval(intervalRef.current!);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, time]);

  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  const handleToggle = () => {
    if (time > 0) {
      setIsRunning(!isRunning);
      console.log("버튼 상태:", !isRunning ? "중지" : "시작");
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    console.log("타이머 초기화");
  };

  const handleTimeChange = (
    unit: "hours" | "minutes" | "seconds",
    value: number,
  ) => {
    let newTime = time;
    if (unit === "hours") newTime = value * 3600 + minutes * 60 + seconds;
    if (unit === "minutes") newTime = hours * 3600 + value * 60 + seconds;
    if (unit === "seconds") newTime = hours * 3600 + minutes * 60 + value;
    setTime(newTime);
  };

  return (
    <div css={timerWrapperStyle}>
      <NumberInput
        label="시"
        min={0}
        max={23}
        value={hours}
        onChange={(value) => handleTimeChange("hours", value)}
      />
      <NumberInput
        label="분"
        min={0}
        max={59}
        value={minutes}
        onChange={(value) => handleTimeChange("minutes", value)}
      />
      <NumberInput
        label="초"
        min={0}
        max={59}
        value={seconds}
        onChange={(value) => handleTimeChange("seconds", value)}
      />
      <div css={actionButtonContainerStyle}>
        <ToggleButton
          isActive={isRunning}
          activeText="중지"
          inactiveText="시작"
          onClick={handleToggle}
        />
        <Button id="2" text="초기화" isActive onClick={handleReset} />
      </div>
    </div>
  );
}

export default Timer;

const actionButtonContainerStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;
`;

const timerWrapperStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
