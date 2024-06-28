/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import ArrowBack from "../../../public/svg/back-arrow.svg?react";
import { useNavigate } from "react-router-dom";
function Header() {
  const navigate = useNavigate();
  return (
    <header css={HeaderStyle}>
      <button css={ButtonStyle} onClick={() => navigate(-1)}>
        <ArrowBack />
      </button>
    </header>
  );
}

export default Header;

const HeaderStyle = css`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
`;

const ButtonStyle = css`
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 10px;
  svg {
    width: 20px;
    height: 20px;
  }
`;