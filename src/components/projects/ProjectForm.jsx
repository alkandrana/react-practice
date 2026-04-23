import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";

export default function Form() {
    // const [Project, setProject] = useState({});
    const {projectId} = useParams();
    const [Project, setProject] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        const target = e.target;
        let formData = new FormData(target);
        let projectRecord = Object.fromEntries(formData.entries());
        if (!projectRecord.code || !projectRecord.title) {
            console.log(`Code and Title fields cannot be empty.`);
        }
        console.log("Constructed object to update: ", projectRecord);

        // submit request
        const projectId = Project.id;
        console.log("Stringified: ", JSON.stringify(projectRecord));
        const response = await fetch(`http://localhost:8081/api/projects/${projectId}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(formData)
        });
        let result = await response.json();
        console.log(result);
    }

    useEffect(() => {
        async function getProject() {
            const response = await fetch(`http://localhost:8081/api/projects/${projectId}`);
            let result = await response.json();
            if (response.ok) {
                setProject(result);
                console.log("Fetch result: ", result);
            } else {
                console.log(`Error: ${response.status}`, result);
            }
        }

        getProject()

    }, []);

    console.log("State object: ", Project);

    return (<div className="mx-auto border border-gray-400 w-1/2 p-2 text-amber-500">
            <h3 className="text-start pb-3 text-pink-600">Session Update</h3>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-row mb-1 text-xs">
                    <label htmlFor="code" className="basis-1/3 text-amber-500">Project ID</label>
                    <input type="text" id="code" name="code" defaultValue={Project.code} className="basis-2/3"/>
                </div>
                <div className="flex flex-row mb-1 text-xs">
                    <label htmlFor="title" className="basis-1/3">Title: </label>
                    <input type="text" id="title" name="title" defaultValue={Project.title} className="basis-2/3"/>
                </div>
                <div className="flex flex-row mb-1 text-xs">
                    <label htmlFor="series" className="basis-1/3">Series: </label>
                    <input type="text" id="series" name="seriesTitle" defaultValue={Project.seriesTitle}
                           className="basis-2/3"/>
                </div>
                <div className="flex flex-row mb-1 text-xs">
                    <label htmlFor="goal" className="basis-1/3">Word Count Goal: </label>
                    <input type="number" id="goal" name="goal" defaultValue={Project.goal} className="basis-2/3"/>
                </div>
                <button type="submit"
                        className="bg-blue-600 text-white text-xs rounded-xl border-solid p-2 hover:bg-blue-700">
                    Submit
                </button>
                <Link to={`/projects/${projectId}`}
                      className="bg-gray-700 text-white text-xs rounded-xl border-solid p-2 hover:bg-gray-400">Cancel</Link>
            </form>
        </div>
    )
}