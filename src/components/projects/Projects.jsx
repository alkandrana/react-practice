import {useState, useEffect} from 'react';
import {Link} from "react-router-dom";

export default function Projects() {
    let [projects, setProjects] = useState([]);

    useEffect(function () {
        async function fetchProjects() {
            try {
                const response = await fetch('http://localhost:8081/api/projects');
                let data = await response.json();
                setProjects(data);
                let sortedData = data.sort((a, b,) => (a.seriesTitle ?? "").localeCompare(b.seriesTitle ?? ""));
                console.log("Sorted state object: ", sortedData);
            } catch (error) {
                console.log(error);
            }
        }

        fetchProjects();
    }, []);
    console.log("Projects: ", projects);
    return projects.length > 0 ? (
        <>
            <Link to="/projects/add" className="text-sm text-blue-700 hover:text-blue-500">Create New</Link>
            <div className="grid grid-cols-3 gap-20 m-3">
                {
                    projects.map((project) => (
                        <Link to={`/projects/${project.id}`} key={project.id} className="">
                            <div
                                className="bg-white dark:bg-gray-800 shadow-xl dark:shadow-gray-700/10 border rounded-md p-2">
                                <h5 className="text-xl font-semibold text-amber-600 tracking-tight hover:underline">
                                    {project.title}
                                </h5>
                                <ul className="text-left text-sm text-amber-400">
                                    <li className="">
                                        <strong>ID:</strong> {project.code}
                                    </li>
                                    <li className="">
                                        <strong>Series:</strong> {project.seriesTitle}
                                    </li>
                                    <li className="">
                                        <strong>Word Count Goal:</strong> {project.goal.toLocaleString()}
                                    </li>
                                </ul>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </>
    ) : (
        <div className="mx-auto">
            <h3 className="m-5 text-xl font-semibold text-yellow-300 tracking-tight">
                No Projects Found.
            </h3>
            <Link to="/projects/add"
                  className="m-5 px-4 py-2 bg-purple-600 rounded-lg text-red-400 hover:bg-purple-400">Create
                One</Link>
        </div>
    )
}