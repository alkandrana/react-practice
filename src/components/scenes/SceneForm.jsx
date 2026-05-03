import {useEffect, useState} from "react";
import {Link, useParams, useNavigate} from "react-router-dom";
import Projects from "../projects/Projects.jsx";
import {BASE_URL} from "../../utils/config.js";

export default function SceneForm() {
    const navigate = useNavigate();
    const {sceneId} = useParams();
    const [Scene, setScene] = useState(null);
    const [Status, setStatus] = useState([]);
    const [projects, setProjects] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const target = e.target;
        let formData = new FormData(target);
        let sceneRecord = Object.fromEntries(formData.entries());
        if (!sceneRecord.code || !sceneRecord.name) {
            console.log(`Code and Name fields cannot be empty.`);
        }

        // submit request;
        let url, method;
        if (sceneId) {
            url = `${BASE_URL}/scenes/${sceneId}`;
            method = "PATCH";
        } else {
            url = `${BASE_URL}/scenes`;
            method = "POST";
        }
        const response = await fetch(url, {
            method: method,
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(sceneRecord)
        });
        let result = await response.json();
        console.log(result);

        if (response.ok) {
            navigate(`/projects/${sceneRecord.project_id}`)
        }
    }

    useEffect(() => {
        async function getScene() {
            const response = await fetch(`${BASE_URL}/scenes/${sceneId}`);
            let result = await response.json();
            if (response.ok) {
                setScene(result);
            } else {
                console.log(`Scene Error: ${response.status}`, result);
            }
        }

        if (sceneId) {
            getScene();
        }

    }, []);

    useEffect(() => {
        async function getStatuses() {
            const response = await fetch(`${BASE_URL}/scenes/metadata`);
            let result = await response.json();
            if (response.ok) {
                setStatus(result.find(f => f.name === "status")?.valueList)
            } else {
                console.log(`Status Error: ${response.status}`, result);
            }
        }

        getStatuses();
    }, []);

    useEffect(() => {
        async function getProjects() {
            const response = await fetch(`${BASE_URL}/projects`);
            let result = await response.json();
            if (response.ok) {
                setProjects(result);
            } else {
                console.log(`Project List Error: ${response.status}`, result);
            }
        }

        getProjects();
    }, []);

    return Status && (<div className="mx-auto border border-gray-400 w-1/2 p-2 text-amber-500">
            <h3 className="text-start pb-3 text-pink-600">Scene Update</h3>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-row mb-1 text-xs">
                    <label htmlFor="code" className="basis-1/3 text-amber-500">Scene ID</label>
                    <input type="text" id="code" name="code" defaultValue={Scene?.code} className="basis-2/3"/>
                </div>
                <div className="flex flex-row mb-1 text-xs">
                    <label htmlFor="name" className="basis-1/3">Scene Name: </label>
                    <input type="text" id="name" name="sceneName" defaultValue={Scene?.name} className="basis-2/3"/>
                </div>
                <div className="flex flex-row mb-1 text-xs">
                    <label htmlFor="sequence" className="basis-1/3">Sequence in Story: </label>
                    <input type="number" id="sequence" name="sequence" defaultValue={Scene?.sequence}
                           className="basis-2/3"/>
                </div>
                <div className="flex flex-row mb-1 text-xs">
                    <label htmlFor="wc" className="basis-1/3">Word Count: </label>
                    <input type="number" id="wc" name="words" defaultValue={Scene?.words} className="basis-2/3"/>
                </div>
                <div className="flex flex-row mb-1 text-xs">
                    <label htmlFor="status" className="basis-1/3">Status: </label>
                    <select name="status" defaultValue={Scene?.status}>
                        <option value="">--Select a Status--</option>
                        {Status.map((s) => (
                            <option key={s} value={s} className="bg-purple-600">{s}</option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-row mb-1 text-xs">
                    <label htmlFor="project" className="basis-1/3">Project: </label>
                    <select name="project_id" defaultValue={Scene?.project.bookCode}>
                        <option value="">--Select a Project--</option>
                        {projects.map((p) => (
                            <option key={p.id} value={p.id}>{p.title}</option>
                        ))}
                    </select>
                </div>
                <button type="submit"
                        className="bg-blue-600 text-white text-xs rounded-xl border-solid p-2 hover:bg-blue-700">
                    Submit
                </button>
                <Link to={`/scenes/${sceneId}`}
                      className="bg-gray-700 text-white text-xs rounded-xl border-solid p-2 hover:bg-gray-400">Cancel</Link>
            </form>
        </div>
    )
}