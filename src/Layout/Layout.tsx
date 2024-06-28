/** @jsxImportSource @emotion/react */
import { HelmetProvider } from "react-helmet-async";
import { Outlet } from "react-router-dom";
import { css } from "@emotion/react";

export default function Layout() {
  const helmetContext = {};
  return (
    <HelmetProvider context={helmetContext}>
      <div css={LayoutStyle}>
        <Outlet />
      </div>
    </HelmetProvider>
  );
}

const LayoutStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
