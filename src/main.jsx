import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Projects from "./components/projects/Projects.jsx";
import Project from "./components/projects/Project.jsx"
import HomePage from "./components/HomePage.jsx";
import ProjectForm from "./components/projects/ProjectForm.jsx";
import Scene from "./components/scenes/Scene.jsx";
import SceneForm from "./components/scenes/SceneForm.jsx";

const $root = document.getElementById('root');
const root = createRoot($root);
root.render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App/>}>
                    <Route index element={<HomePage/>}/>
                    <Route path="projects">
                        <Route index element={<Projects/>}/>
                        <Route path=":projectId">
                            <Route index element={<Project/>}/>
                            <Route path="edit" element={<ProjectForm/>}/>
                        </Route>
                        <Route path="add" element={<ProjectForm/>}/>
                    </Route>
                    <Route path="scenes">
                        <Route path=":sceneId">
                            <Route index element={<Scene/>}/>
                            <Route path="edit" element={<SceneForm/>}/>
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    </StrictMode>,
)