import { useParams } from "react-router-dom";
import { projects } from "./projectConfig";
import { Header } from "../components/Header";

function ProjectPage() {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return <div>프로젝트를 찾을 수 없습니다.</div>;
  }

  const ProjectComponent = project.component;

  return (
    <>
      <Header />
      <ProjectComponent />
    </>
  );
}

export default ProjectPage;
