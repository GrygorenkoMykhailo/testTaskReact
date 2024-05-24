import { QuizType } from "../../types";
import { useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";
import { useQuizNames } from "../../hooks";

export const QuizListComponent = () => {
    const [searchName, setSearchName] = useState('');
    const navigate = useNavigate();
    const newQuizNameRef = useRef<HTMLInputElement | null>(null);
    const [names, setNames] = useQuizNames();

    useEffect(() => {
        if (searchName === "") {
            setNames(JSON.parse(localStorage.names) as string[]);
        } else {
            const filteredNames = names?.filter(n => n.toLowerCase().match("^" + searchName));
            if (filteredNames) {
                setNames(filteredNames);
            }
        }
    }, [searchName]);

    if (!names) {
        return <>Loading...</>;
    }

    const handleDeleteClick = (name: string) => {
        localStorage.removeItem(name.replace(/\s/g, ""));
        const newNames = names?.filter(k => k !== name.replace(/\s/g, "")) || [];
        localStorage.names = JSON.stringify(newNames);
        setNames(newNames);
    }

    const handleCreateQuiz = () => {
        const quizName = newQuizNameRef.current?.value;
        if (quizName) {
            const newQuiz: QuizType = {
                name: quizName,
                questions: []
            }
            localStorage.setItem(quizName.replace(/\s/g, ""), JSON.stringify(newQuiz));
            const newNames = [...(names || []), quizName];
            localStorage.names = JSON.stringify(newNames);
            setNames(newNames);
        }
    }

    return (
        <div className="container mx-auto p-4">
            <div className="mb-4">
                <p className="text-lg font-semibold">Search Quiz:</p>
                <input
                    type="text"
                    className="w-full border rounded py-2 px-3"
                    onChange={(e) => setSearchName(e.target.value.toLowerCase())}
                />
            </div>
            {names.map((name, i) => (
                <div key={i} className="border rounded p-4 mb-4">
                    <h2 className="text-xl font-semibold">{name}</h2>
                    <div className="mt-2">
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                            onClick={() => navigate(`/quiz/${name.replace(/\s/g, "")}`)}
                        >
                            Pass Quiz
                        </button>
                        <button
                            className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                            onClick={() => navigate(`/edit/${name.replace(/\s/g, "")}`)}
                        >
                            Edit Quiz
                        </button>
                        <button
                            className="bg-red-500 text-white px-4 py-2 rounded"
                            onClick={() => handleDeleteClick(name)}
                        >
                            Delete Quiz
                        </button>
                    </div>
                </div>
            ))}
            <div className="flex items-center mb-4">
                <input
                    type="text"
                    className="border rounded py-2 px-3 mr-2"
                    ref={newQuizNameRef}
                />
                <button
                    className="bg-green-500 text-white px-4 py-2 rounded"
                    onClick={handleCreateQuiz}
                >
                    Add new quiz
                </button>
            </div>
        </div>
    );
}
