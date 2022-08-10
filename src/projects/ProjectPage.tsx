import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Project } from "./Project";
import { projectAPI } from "./ProjectAPI";
import ProjectDetail from "./ProjectDetail";

const ProjectPage = (props: any) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [project, setProject] = useState<Project | null>(null);
  const params = useParams();
  const id = Number(params.id);

  useEffect(() => {
    setLoading(true);
    projectAPI
      .find(id)
      .then((data) => {
        setProject(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [id]);

  return (
    <div>
      <>
        <h1>
          プロジェクト詳細
          {loading && (
            <div className="center-page">
              <span className="spinner primary"></span>
              <p>ロード中・・・</p>
            </div>
          )}
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
          {project && <ProjectDetail project={project} />}
        </h1>
      </>
    </div>
  );
};

export default ProjectPage;
