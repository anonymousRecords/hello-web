/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";

interface NumberInputProps {
  label: string;
  min: number;
  max: number;
  value: number;
  onChange: (newValue: number) => void;
}

function NumberInput({ label, min, max, value, onChange }: NumberInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.replace(/[^0-9]/g, "");
    const numberValue = parseInt(newValue, 10);

    if (!isNaN(numberValue)) {
      if (numberValue < min) {
        onChange(min);
      } else if (numberValue > max) {
        onChange(max);
      } else {
        onChange(numberValue);
      }
    }
  };

  const handleBlur = () => {
    if (value < min) onChange(min);
    if (value > max) onChange(max);
  };

  return (
    <div css={numberInputStyle}>
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <span>{label}</span>
    </div>
  );
}

export default NumberInput;

const numberInputStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;

  input {
    width: 40px;
    text-align: center;
    font-size: 1.2em;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  span {
    font-size: 0.9em;
  }
`;
