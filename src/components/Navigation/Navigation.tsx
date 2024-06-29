/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { navList } from "../../constants";
import { useNavigate } from "react-router-dom";

function Navigation() {
  const navigate = useNavigate();
  console.log("params", window.location.pathname);
  const isActiveNav = (path: string) => {
    return window.location.pathname === path;
  };
  return (
    <nav css={navigationStyle}>
      {navList.map((item) => (
        <button
          style={{
            backgroundColor: isActiveNav(item.url) ? "yellow" : "white",
          }}
          css={buttonStyle}
          key={item.id}
          onClick={() => {
            navigate(`${item.url}`);
          }}
        >
          {item.name}
        </button>
      ))}
    </nav>
  );
}

export default Navigation;

const navigationStyle = css`
  display: flex;
  gap: 10px;
  margin: 30px 0;
`;

const buttonStyle = css`
  width: 100px;
  height: 30px;
  border: 2px solid black;
  border-radius: 3px;
  color: black;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background-color: yellow;
  }
`;
