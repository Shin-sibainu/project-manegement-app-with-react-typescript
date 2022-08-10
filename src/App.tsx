import "./App.css";
import ProjectsPage from "./projects/ProjectsPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import HomePage from "./home/HomePage";
import ProjectPage from "./projects/ProjectPage";

const App = () => {
  return (
    // <>
    //   <div className="container">
    //     <ProjectsPage />
    //   </div>
    //   {/* <blockquote cite="shincode">a</blockquote> */}
    // </>
    <Router>
      <header className="sticky">
        <span>
          <h3>プロジェクト管理アプリケーション</h3>
        </span>
        <NavLink to="/" className="button rounded">
          <span className="icon-home"></span>
          ホーム
        </NavLink>
        <NavLink to="/projects" className="button rounded">
          プロジェクト
        </NavLink>
      </header>
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/projects" element={<ProjectsPage />}></Route>
          <Route path="/projects/:id" element={<ProjectPage />}></Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
