/** @jsxImportSource @emotion/react */
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useNavigate } from "react-router-dom";

import { Helmet } from "react-helmet-async";
import { css } from "@emotion/react";

import { projects } from "../Projects/projectConfig";
import { ListItem } from "../components/ListItem";

function Main() {
  const navigate = useNavigate();


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
        <title>Hello Web</title>
      </Helmet>
      <header css={headerStyle}>
        <h1 id="title" css={titleStyle}>
          Hello Web
        </h1>
      </header>
      <section css={sectionStyle}>
        {projects.map((item: ProjectItem) => (
          <ListItem
            key={item.id}
            title={item.name}
            onClick={() => {
              navigate(`/projects/${item.id}`);
            }}
          />
        ))}
      </section>
    </>
  );
}

export default Main;

const headerStyle = css`
  margin: 30px 0px 30px 0px;
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
