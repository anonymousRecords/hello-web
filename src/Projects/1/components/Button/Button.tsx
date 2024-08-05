/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

interface ButtonProps {
  id: string ;
  text: string;
  isActive: boolean;
  onClick: (id: string) => void;
}
function Button({ id, text, isActive, onClick }: ButtonProps) {
  return (
    <button
      css={ButtonStyle}
      onClick={() => onClick(id)}
      style={{
        backgroundColor: isActive ? "pink" : "#333",
        opacity: isActive ? 1 : 0.1,
      }}
    >
      {text}
    </button>
  );
}

export default Button;

const ButtonStyle = css`
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
