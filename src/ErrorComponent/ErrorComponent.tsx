import { Link } from "react-router-dom"

export const ErrorComponent = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-red-500 text-white font-bold rounded-lg border shadow-lg p-10">
                <div className="mb-4">
                    <h2 className="text-2xl">Oops! Something went wrong.</h2>
                </div>
                <p className="text-lg">We apologize, but an unexpected error occurred.</p>
                <p className="text-lg">Probably you have wisited page with non-existent quiz.</p>
                <p className="text-lg">Please try again later.</p>
                <Link to={'/'} className="text-lg underline hover:text-blue-400">Go to home page</Link>
            </div>
        </div>
    )
}