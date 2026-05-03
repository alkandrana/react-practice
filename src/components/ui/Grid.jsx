import Card from "./Card.jsx";

export default function Grid({series, color}) {
    console.log("In grid: ", color, series);
    return (
        <div className={`border rounded ${color}`}>
            <h3 className="text-lg w-1/4">
                {series[0].series_title}
            </h3>
            <Card seriesList={series}/>
        </div>
    )
}