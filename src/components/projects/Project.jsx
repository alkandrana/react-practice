import {useState, useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import {BASE_URL} from "../../utils/config.js";
import {useNavigate} from "react-router-dom";

export default function Project() {
    let [project, setProject] = useState(null);
    let [scenes, setScenes] = useState([]);
    let [metadata, setMetadata] = useState([]);
    let {projectId} = useParams();
    let navigate = useNavigate();

    useEffect(function () {
        console.log("In Use Effect:");

        async function fetchProject() {
            try {
                const response = await fetch(`${BASE_URL}/projects/${projectId}`);
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
                const response = await fetch(`${BASE_URL}/scenes/project/${projectId}`);
                const content = await response.json();
                if (response.ok) {
                    setScenes(content);
                    console.log("Fetched object: ", content);
                } else {
                    console.log("Error fetching scenes");
                    console.log(content);
                }
            } catch (error) {
                console.error(error);
            }
        }

        async function fetchSceneMetada() {
            try {
                const response = await fetch(`${BASE_URL}/scenes/metadata`);
                const content = await response.json();
                if (response.ok) {
                    setMetadata(content);
                    console.log("Metadata: ", content);
                } else {
                    console.log("Error fetching scenes");
                    console.log("Error: ", content);
                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchScenes();
        fetchSceneMetada();
    }, []);

    function groupScenesByStatus(scenes) {
        Object.groupBy(scenes, ({status}) => status)
    }

    console.log("State object: ", project);
    console.log("Dependencies: ", scenes);

    function handleDelete() {
        async function sendDeleteRequest() {
            const response = await fetch(`${BASE_URL}/projects/${projectId}`, {
                method: "DELETE"
            });
            const result = await response.json();
            if (response.ok) {
                console.log(result);
                navigate('/projects');
            } else {
                console.log("Error deleting project ", response.status, result);
            }


        }

        sendDeleteRequest();


    }

    const scenesByStatus = Object.groupBy(scenes, ({status}) => status);

    if (project) {
        return (
            <div className="mx-auto">
                <Link to={`/projects/${projectId}/edit`}
                      className="m-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    Edit Project
                </Link>
                <Link to={`/projects`}
                      className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition">
                    Back
                </Link>
                <button type="button" onClick={handleDelete}
                        className="m-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-800 transition">
                    Delete
                </button>
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
                            <strong>Series:</strong> {project.series_title}
                        </li>
                        <li className="p-2">
                            <strong>Word Count Goal:</strong> {project.goal.toLocaleString()}
                        </li>
                        <li className="p-2">
                            <strong>Total Word Count: </strong>
                            {scenes.reduce((total, current) => total + current.words, 0).toLocaleString()}
                        </li>
                        <li className="p-2">
                            <strong>Percentage: </strong>
                            {((scenes.reduce((total, current) => total + current.words, 0) / project.goal) * 100).toFixed(2)}%
                        </li>
                    </ul>
                </div>
                <Link to={`/scenes/${projectId}/add`}
                      className="m-5 px-4 py-2 bg-purple-600 rounded-lg text-red-100 hover:bg-purple-400">
                    Create New
                </Link>
                <div className="pt-3 grid grid-cols-4 gap-4">
                    {scenes.length > 0 ? scenes.map((scene) => (
                            <div key={scene.id} className="p-3 border rounded-md bg-purple-800">
                                <h3 className="text-green-500 text-xl font-bold text-center">{`Scene ${scene.sequence || ""}`}</h3>
                                <ul className="text-left text-sm text-green-500">
                                    <li className="">
                                        <strong>ID:</strong> {scene.code}
                                    </li>
                                    <li className="">
                                        <strong>Name:</strong> {scene.name}
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
                    ) : (
                        <>
                            <h3 className="text-lg font-bold">No Scenes Found.</h3>
                            <Link to={`/scenes/${projectId}/add`}
                                  className="m-5 px-4 py-2 bg-purple-600 rounded-lg text-red-400 hover:bg-purple-400">
                                Create New
                            </Link>
                        </>
                    )}
                </div>
            </div>
        )
    }

}