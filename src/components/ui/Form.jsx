import {useState, useEffect} from "react";
import {BASE_URL} from "../../utils/config.js";

export default function Form({recordType, record, endpoint}) {
    const [metadata, setMetadata] = useState({});
    useEffect(() => {
        const fetchMetadata = async () => {
            const response = await fetch(`${BASE_URL}/${recordType}/metadata`);
            const content = await response.json();
            if (response.ok) {
                console.log(content);
                setMetadata(content);
            } else {
                console.log("Error fetching metadata: ", response.status, content);
            }
        }

        fetchMetadata();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const target = e.target;
        let formData = new FormData(target);
        let record = Object.fromEntries(formData.entries());
        let url = BASE_URL + endpoint;
        
    }

    function buildForm(record) {
        let components = [];
        for (let key in record) {
            let value = record[key];
            let metadata = metadata.find(r => r.name === key);
            let type = metadata.datatype;
            if (type == "string") {
                components.push(<TextInput label={metadata.name} apiName={metadata.name} currentValue={value}/>)
            } else if (type == "int") {
                components.push(<NumberInput label={metadata.name} apiName={metadata.name} currentValue={value}/>);
            } else if (type == "enum") {
                components.push(<SelectList label={metadata.name} apiName={metadata.name} currentValue={value}/>);
            }
        }
        return components;
    }

    return (
        <form onSubmit={handleSubmit}>
            {buildForm(record).map(component => component)}
        </form>
    )

}