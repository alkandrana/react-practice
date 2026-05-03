import {Link} from "react-router-dom";

export default function Card({seriesList}) {
    console.log("List of books: ", seriesList);
    return <div className="grid grid-cols-3 gap-20 m-3">
        {
            seriesList.map((book) => (
                <Link to={`/projects/${book.id}`} key={book.id} className="">
                    <div
                        className="bg-white dark:bg-gray-800 shadow-xl dark:shadow-gray-700/10 border rounded-md p-2">
                        <h5 className="text-xl font-semibold text-amber-600 tracking-tight hover:underline">
                            {book.title}
                        </h5>
                        <ul className="text-left text-sm text-amber-400">
                            <li className="">
                                <strong>ID:</strong> {book.code}
                            </li>
                            <li className="">
                                <strong>Series:</strong> {book.series_title}
                            </li>
                            <li className="">
                                <strong>Word Count Goal:</strong> {book.goal.toLocaleString()}
                            </li>
                        </ul>
                    </div>
                </Link>
            ))
        }
    </div>

}