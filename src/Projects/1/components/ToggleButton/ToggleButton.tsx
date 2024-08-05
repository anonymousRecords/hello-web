/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

interface ToggleButtonProps {
  isActive: boolean;
  activeText: string;
  inactiveText: string;
  onClick: () => void;
}

function ToggleButton({
  isActive,
  activeText,
  inactiveText,
  onClick,
}: ToggleButtonProps) {
  return (
    <button onClick={onClick} css={toggleButtonStyle}>
      {isActive ? activeText : inactiveText}
    </button>
  );
}

export default ToggleButton;

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
