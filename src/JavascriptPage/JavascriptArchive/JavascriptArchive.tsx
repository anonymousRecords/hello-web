import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

function CssArchive() {
  // useParams를 사용하여 현재 선택된 프로젝트의 id를 가져오기
  const { id } = useParams();

  // id에 따라 다른 프로젝트를 렌더링
  const renderProject = () => {
    switch (id) {
      case "0":
        return <div>JS</div>;
      case "1":
        return <div>JS Project 1</div>;
      case "2":
        return <div>JS Project 2</div>;
      default:
        return <div>JS 프로젝트 모음집</div>;
    }
  };
  return (
    <>
      <Helmet>
        <title>Hello JS</title>
      </Helmet>
      {renderProject()}
    </>
  );
}

export default CssArchive;
