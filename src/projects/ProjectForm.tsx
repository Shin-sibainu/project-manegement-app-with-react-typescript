import React, { SyntheticEvent, useState } from "react";
import { Project } from "./Project";

interface ProjectFormProps {
  onCancel: () => void;
  onSave: (project: Project) => void;
  project: Project;
}

const ProjectForm = ({
  onCancel,
  onSave,
  project: initialProject,
}: ProjectFormProps) => {
  const [project, setProject] = useState(initialProject);
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    budget: "",
  });

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    // onSave(new Project({ name: "更新されたプロジェクト" }));
    if (!isValid()) return;
    onSave(project);
  };

  //新しく内容を更新する
  const handleChange = (event: any) => {
    const { type, name, value, checked } = event.target;
    let updatedValue = type === "checkbox" ? checked : value;

    if (type === "number") {
      updatedValue = Number(updatedValue);
    }

    const change = {
      [name]: updatedValue,
    };

    let updatedProject: Project;

    //ここで新しいプロジェクトに更新している(保存することになる)
    setProject((p) => {
      updatedProject = new Project({ ...p, ...change });
      return updatedProject;
    });

    setErrors(() => validate(updatedProject));
  };

  function validate(project: Project) {
    let errors: any = { name: "", description: "", budget: "" };
    if (project.name.length === 0) {
      errors.name = "名前が必要です";
    }
    if (project.name.length > 0 && project.name.length < 3) {
      errors.name = "3文字以上で入力してください";
    }
    if (project.description.length === 0) {
      errors.description = "詳細が必要です";
    }
    if (project.budget === 0) {
      errors.budget = "予算は0円以上で設定してください";
    }
    return errors;
  }

  function isValid() {
    return (
      errors.name.length === 0 &&
      errors.description.length === 0 &&
      errors.budget.length === 0
    );
  }

  return (
    <form className="input-group vertical" onSubmit={handleSubmit}>
      <label htmlFor="name">プロジェクト名</label>
      <input
        type="text"
        name="name"
        placeholder="名前を入力"
        value={project.name}
        onChange={handleChange}
      />
      {errors.name.length > 0 && (
        <div className="card error">
          <p>{errors.name}</p>
        </div>
      )}
      <label htmlFor="description">プロジェクト概要</label>
      <textarea
        name="description"
        placeholder="概要を入力"
        value={project.description}
        onChange={handleChange}
      ></textarea>
      {errors.description.length > 0 && (
        <div className="card error">
          <p>{errors.description}</p>
        </div>
      )}
      <label htmlFor="budget">プロジェクト予算</label>
      <input
        type="number"
        name="budget"
        placeholder="予算を入力"
        value={project.budget}
        onChange={handleChange}
      />
      <label htmlFor="isActive">決定/未決定</label>
      <input
        type="checkbox"
        name="isActive"
        checked={project.isActive}
        onChange={handleChange}
      />
      {errors.budget.length > 0 && (
        <div className="card error">
          <p>{errors.budget}</p>
        </div>
      )}
      <div className="input-group">
        <button className="primary bordered medium">保存</button>
        <button type="button" className="bordered medium" onClick={onCancel}>
          キャンセル
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;
