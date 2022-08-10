import React, { useState } from "react";
import { Project } from "./Project";
import ProjectCard from "./ProjectCard";
import ProjectForm from "./ProjectForm";

interface ProjectListProps {
  projects: Project[];
  onSave: (project: Project) => void;
}

const ProjectList = ({ projects, onSave }: ProjectListProps) => {
  const [projectBeingEdited, setProjectBeingEdited] = useState({});

  const handleEdit = (project: Project) => {
    console.log(project);
    setProjectBeingEdited(project);
  };

  const cancelEditing = () => {
    setProjectBeingEdited({});
  };
  //   return <pre>{JSON.stringify(projects, null, " ")}</pre>;
  return (
    // <ul className="row">
    //   {projects.map((project) => (
    //     <li key={project.id}>{project.name}</li>
    //   ))}
    // </ul>
    <ul className="row">
      {projects.map((project) => (
        <div key={project.id} className="cols-sm">
          {/* <div className="card">
            <img src={project.imageUrl} alt={project.name} />
            <section className="section dark">
              <h5 className="strong">
                <strong>{project.name}</strong>
              </h5>
              <p>{project.description}</p>
              <p>予算：{project.budget.toLocaleString()}</p>
            </section>
          </div> */}
          {/* <ProjectCard project={project} onEdit={handleEdit}></ProjectCard> */}
          {/* <ProjectForm /> */}
          {project === projectBeingEdited ? (
            <ProjectForm
              onCancel={cancelEditing}
              onSave={onSave}
              project={project}
            />
          ) : (
            <ProjectCard project={project} onEdit={handleEdit} />
          )}
        </div>
      ))}
    </ul>
  );
};

export default ProjectList;
