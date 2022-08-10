import React from "react";
import { Project } from "./Project";

interface ProjectDetailProps {
  project: Project;
}

const ProjectDetail = ({ project }: ProjectDetailProps) => {
  return (
    <div className="row">
      <div className="col-sm-6">
        <div className="card large">
          <img src={project.imageUrl} alt={project.name} className="rounded" />
          <section className="section dark">
            <h3 className="strong">
              <strong>{project.name}</strong>
            </h3>
            <p>{project.description}</p>
            <p>予算：{project.budget}</p>

            <p>Singed: {project.contractSignedOn.toLocaleDateString()}</p>
            <p>
              <mark className="active">
                {project.isActive ? "active" : "inactive"}
              </mark>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
