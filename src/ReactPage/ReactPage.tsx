/** @jsxImportSource @emotion/react */
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Helmet } from "react-helmet-async";
import { css } from "@emotion/react";
import { Navigation } from "../components/Navigation";
import { useNavigate } from "react-router-dom";
import { LISTITEM_COUNT } from "../constants";
import ListItem from "../components/ListItem/ListItem";
function ReactPage() {
  const navigate = useNavigate();
  const lists = Array.from({ length: LISTITEM_COUNT }, (_, i) => i);

  useGSAP(() => {
    gsap.fromTo(
      "#title",
      { y: 0, opacity: 0 },
      { y: -10, opacity: 1, duration: 0.5 },
    );
  }, []);
  return (
    <>
      <Helmet>
        <title>Hello React</title>
      </Helmet>
      <header css={headerStyle}>
        <h1 id="title" css={titleStyle}>
          Hello React
        </h1>
      </header>
      <Navigation />
      <section css={sectionStyle}>
        {lists.map((item) => (
          <ListItem
            key={item}
            title={`Item ${item}`}
            onClick={() => {
              console.log(`Item ${item} clicked`);
              navigate(`/react/${item}`);
            }}
          />
        ))}
      </section>
    </>
  );
}

export default ReactPage;

const headerStyle = css`
  margin-top: 30px;
  background-color: yellow;
`;

const titleStyle = css`
  font-size: 40px;
  font-family: "MoveSans-Bold";
  @font-face {
    font-family: "MoveSans-Bold";
    src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/2405-2@1.0/MoveSans-Bold.woff2")
      format("woff2");
    font-weight: 700;
    font-style: normal;
  }
`;

const sectionStyle = css`
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  @media (max-width: 768px) {
    gap: 20px;
  }
`;
