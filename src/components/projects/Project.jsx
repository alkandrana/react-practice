import {useState, useEffect} from "react";
import {Link, useParams} from "react-router-dom";

export default function Project() {
    let [project, setProject] = useState(null);
    let [scenes, setScenes] = useState([]);
    let {projectId} = useParams();

    useEffect(function () {
        console.log("In Use Effect:");

        async function fetchProject() {
            try {
                const response = await fetch(`http://localhost:8081/api/projects/${projectId}`);
                if (response.ok) {
                    const data = await response.json();
                    setProject(data);
                    console.log("Fetched Project: ", data);
                } else {
                    console.log("Error fetching project");
                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchProject();
    }, []);

    useEffect(() => {

        async function fetchScenes() {
            try {
                console.log("Fetching Scenes By Project Code: ", Project.code);
                const response = await fetch(`http://localhost:8081/api/scenes/project/${projectId}`);
                if (response.ok) {
                    const data = await response.json();
                    setScenes(data);
                    console.log("Fetched object: ", data);
                } else {
                    console.log("Error fetching scenes");
                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchScenes();
    }, []);

    console.log("State object: ", project);
    console.log("Dependencies: ", scenes);
    if (project) {
        return (
            <div className="mx-auto">
                <Link to={`/projects/${projectId}/edit`}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Edit
                    Project</Link>
                <div key={project.id}
                     className="w-1/3 mx-auto my-5 bg-white dark:bg-gray-800 shadow-xl dark:shadow-gray-700/10 border rounded-md p-5">
                    <h5 className="text-xl font-semibold text-amber-600 pb-5 tracking-tight">
                        {project.title}
                    </h5>
                    <ul className="text-left text-sm text-amber-400">
                        <li className="p-2">
                            <strong>ID:</strong> {project.code}
                        </li>
                        <li className="p-2">
                            <strong>Series:</strong> {project.seriesTitle}
                        </li>
                        <li className="p-2">
                            <strong>Word Count Goal:</strong> {project.goal.toLocaleString()}
                        </li>
                    </ul>
                </div>
                <div className="grid grid-cols-4 gap-4">
                    {scenes.map((scene) => (
                            <div key={scene.id} className="p-3 border rounded-md bg-purple-800">
                                <h3 className="text-amber-600 text-xl font-bold text-center">{`Scene ${scene.sequence || ""}`}</h3>
                                <ul className="text-left text-sm text-amber-500">
                                    <li className="">
                                        <strong>ID:</strong> {scene.code}
                                    </li>
                                    <li className="">
                                        <strong>Name:</strong> {scene.sceneName}
                                    </li>
                                    <li className="">
                                        <strong>Word Count:</strong> {scene.words ? scene.words.toLocaleString() : 0}
                                    </li>
                                    <li>
                                        <strong>Status:</strong> {scene.status}
                                    </li>
                                </ul>
                                <Link to={`/scenes/${scene.id}/edit`}
                                      className="text-xs text-blue-600 underline">Edit</Link>
                            </div>
                        )
                    )}
                </div>
            </div>
        )
    }

}