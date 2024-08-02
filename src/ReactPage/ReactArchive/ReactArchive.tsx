import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import React0 from "./0/React0";
import React1 from "./1/React1";

function ReactArchive() {
  const { id } = useParams();

  // id에 따라 다른 프로젝트를 렌더링
  const renderProject = () => {
    switch (id) {
      case "0":
        return <React0 />;
      case "1":
        return <React1 />;
      case "2":
        return <div>React Project 2</div>;
      default:
        return <div>React 프로젝트 모음집</div>;
    }
  };

  return (
    <>
      <Helmet>
        <title>Hello React</title>
      </Helmet>
      {renderProject()}
    </>
  );
}

export default ReactArchive;
