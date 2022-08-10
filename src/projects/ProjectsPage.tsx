import React, { useEffect, useState } from "react";
import { MOCK_PROJECTS } from "./MockProjects";
import { Project } from "./Project";
import { projectAPI } from "./ProjectAPI";
import ProjectList from "./ProjectList";

const ProjectsPage = () => {
  // const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);

  const handleMoreClick = () => {
    setCurrentPage((currentPage) => currentPage + 1);
  };

  const saveProject = (project: Project) => {
    // console.log(project, "が保存されました。");
    // let updatedProjects = projects.map((p: Project) => {
    //   return p.id === project.id ? project : p;
    // });

    // setProjects(updatedProjects);

    projectAPI
      .put(project)
      .then((updatedProject) => {
        let updatedProjects = projects.map((p: Project) => {
          return p.id === project.id ? new Project(updatedProject) : p;
        });
        setProjects(updatedProjects);
      })
      .catch((e) => {
        if (e instanceof Error) {
          setError(e.message);
        }
      });
  };

  //fetch API
  useEffect(() => {
    async function loadProject() {
      setLoading(true);
      try {
        // const data = await projectAPI.get(1);
        const data = await projectAPI.get(currentPage);
        setError("");
        // setProjects(data);
        if (currentPage === 1) {
          setProjects(data);
        } else {
          //以前のプロジェクトと合わせてデータを追加する。
          setProjects((projects) => [...projects, ...data]);
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }
    loadProject();
  }, [currentPage]);

  return (
    <>
      <h1>プロジェクト</h1>
      {/* <pre>{JSON.stringify(MOCK_PROJECTS, null, " ")}</pre> */}
      {/* <ProjectList projects={MOCK_PROJECTS} onSave={saveProject} /> */}
      {error && (
        <div className="row">
          <div className="card large error">
            <section>
              <p>
                <span className="icon-alert inverse"></span>
                {error}
              </p>
            </section>
          </div>
        </div>
      )}
      <ProjectList projects={projects} onSave={saveProject} />
      {!loading && !error && (
        <div className="row">
          <div className="col-sm-12">
            <div className="button-group fluid">
              <button className="button default" onClick={handleMoreClick}>
                もっと見る
              </button>
            </div>
          </div>
        </div>
      )}
      {loading && (
        <div className="center-page">
          <span className="spinner primary">
            <p>ロード中・・・</p>
          </span>
        </div>
      )}
    </>
  );
};

export default ProjectsPage;
