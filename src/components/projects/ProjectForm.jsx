import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {BASE_URL, PROJECT_ENDPOINT} from "../../utils/config.js";
import {useNavigate} from "react-router-dom";

export default function ProjectForm() {
    let {projectId} = useParams();
    const [id, setId] = useState(projectId);
    const [Project, setProject] = useState({});
    const [errors, setErrors] = useState(null);
    const navigate = useNavigate();

    function validate(recordToUpdate) {
        const err = {
            code: [],
            title: [],
            series_title: [],
            goal: []
        };
        if (!recordToUpdate.code) {
            err.code.push(`Code field cannot be empty.`);
        }
        if (!recordToUpdate.title) {
            err.title.push(`Title field cannot be empty.`);
        }
        if (isNaN(Number(recordToUpdate.goal)) || Number(recordToUpdate.goal) < 0) {
            err.goal.push(`Goal field must be a non-negative integer.`);
        }
        if (recordToUpdate.series_title.length > 255) {
            err.series_title.push("Series title length cannot exceed 255 characters.");
        }
        if (recordToUpdate.title.length > 255) {
            err.title.push("Title length cannot exceed 255 characters.");
        }
        return err;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const target = e.target;
        let formData = new FormData(target);
        let projectRecord = Object.fromEntries(formData.entries());
        const err = validate(projectRecord);
        console.log(errors);
        // submit request
        console.log("Stringified: ", JSON.stringify(projectRecord));
        let url = BASE_URL + PROJECT_ENDPOINT, method = "";
        if (id) {
            url += `/${id}`;
            method = "PATCH";
        } else {
            method = "POST";
        }
        console.log(url, method, JSON.stringify(projectRecord));
        const response = await fetch(url, {
            method: method,
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(projectRecord)
        });
        let result = await response.json();
        if (!response.ok) {
            console.log("Error occurred: ", response.status, result);
            return;
        }
        navigate(`/projects/${result.id}`);
    }

    useEffect(() => {
        if (!projectId) {
            return;
        }

        async function getProject() {
            const response = await fetch(`${BASE_URL}/projects/${id}`);
            let result = await response.json();
            if (response.ok) {
                setProject(result);
                console.log("Fetch result: ", result);
            } else {
                console.log(`Error: ${response.status}`, result);
            }
        }

        getProject()

    }, [projectId]);

    console.log("Current value of id state: ", id);
    console.log("State object: ", Project);

    return (<div className="mx-auto border border-gray-400 w-1/2 p-2 text-amber-500">
            <h3 className="text-start pb-3 text-pink-600">Project Update</h3>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-row mb-1 text-xs">
                    <label htmlFor="code" className="basis-1/3 text-amber-500">Project ID</label>
                    <input type="text" id="code" name="code" defaultValue={Project.code} className="basis-2/3"/>
                </div>
                {errors ? (<div className="text-red-500 text-xs">{errors.code}</div>) : null}
                <div className="flex flex-row mb-1 text-xs">
                    <label htmlFor="title" className="basis-1/3">Title: </label>
                    <input type="text" id="title" name="title" defaultValue={Project.title} className="basis-2/3"/>
                </div>
                {errors ? (<div className="text-red-500 text-xs">{errors.title}</div>) : null}
                <div className="flex flex-row mb-1 text-xs">
                    <label htmlFor="series" className="basis-1/3">Series: </label>
                    <input type="text" id="series" name="series_title" defaultValue={Project.series_title}
                           className="basis-2/3"/>
                </div>
                {errors ? (<div className="text-red-500 text-xs">{errors.series_title}</div>) : null}
                <div className="flex flex-row mb-1 text-xs">
                    <label htmlFor="goal" className="basis-1/3">Word Count Goal: </label>
                    <input type="number" id="goal" name="goal" defaultValue={Project.goal} className="basis-2/3"/>
                </div>
                {errors ? (<div className="text-red-500 text-xs">{errors.goal}</div>) : null}
                <button type="submit"
                        className="bg-blue-600 text-white text-xs rounded-xl border-solid p-2 hover:bg-blue-700">
                    Submit
                </button>
                <Link to={`/projects/${projectId ? id : ""}`}
                      className="bg-gray-700 text-white text-xs rounded-xl border-solid p-2 hover:bg-gray-400">Cancel</Link>
            </form>
        </div>
    )
}