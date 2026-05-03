import {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import {BASE_URL} from "../../utils/config.js";
import Grid from "../ui/Grid.jsx";
import colors from "./colors.js";

export default function Projects() {
    let [projects, setProjects] = useState([]);
    let [seriesList, setSeriesList] = useState(null);

    useEffect(function () {
        async function fetchProjects() {
            try {
                const response = await fetch(`${BASE_URL}/projects`);
                let data = await response.json();
                setProjects(data);
                let sortedData = data.sort((a, b,) => (a.series_title ?? "").localeCompare(b.series_title ?? ""));
                console.log("Sorted state object: ", sortedData);
            } catch (error) {
                console.log(error);
            }
        }

        fetchProjects();
    }, []);

    useEffect(function () {
        function getSeriesList() {
            console.log("Projects: ", projects);
            const seriesList = Object.groupBy(projects, ({series_title}) => series_title);
            // const titles = new Set(projects.map(project => project.series_title));
            // const books = [];
            // for (let v of titles) {
            //     books.push({
            //         title: v,
            //         books: projects.filter(p => p.series_title === v)
            //     });
            // }
            setSeriesList(seriesList);
            console.log(seriesList);
        }

        if (projects.length > 0) {
            getSeriesList();
        }
    }, [projects]);
    if (seriesList) {
        Object.keys(seriesList).map((series) => {
            console.log(`Title: ${series}`);
            console.log("Books: ", seriesList[series].length);
        })
        console.log(seriesList);
    }

    return seriesList ? (
        <>
            <Link to="/projects/add" className="text-sm text-blue-700 hover:text-blue-500">Create New</Link>
            <div className="text-lg text-red-500">
                {
                    Object.keys(seriesList).map((series, i) => (
                        <Grid key={i} series={seriesList[series]} color={colors[i]}/>
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