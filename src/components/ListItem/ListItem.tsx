/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

type ListItemProps = {
  title?: string;
  onClick?: () => void;
};

function ListItem({ title, onClick }: ListItemProps) {
  useGSAP(() => {
    gsap.to(".list-item", { rotate: 10, duration: 0.05, ease: "power4.inOut" });
  }, []);

  return (
    <div className="list-item" css={listItemStyle} onClick={onClick}>
      {title}
    </div>
  );
}

const listItemStyle = css`
  width: 200px;
  height: 200px;
  border: 1px solid black;
  border-radius: 8px;
  padding: 3px;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  font-family: "Ownglyph_UNZ-Rg";
  font-size: 20px;

  &:hover {
    background-color: yellow;
  }

  @media (max-width: 768px) {
    width: 150px;
    height: 150px;
  }
`;

export default ListItem;
