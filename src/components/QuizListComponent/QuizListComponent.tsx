import { QuizType } from "../../types";
import { useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";
import { useQuizes } from "../../hooks";

export const QuizListComponent = () => {
    const [searchName, setSearchName] = useState('');
    const navigate = useNavigate();
    const newQuizNameRef = useRef<HTMLInputElement | null>(null);
    const [quizes, setQuizes] = useQuizes();
    const [id, setId] = useState(2);

    useEffect(() => {
        let maxId = id;
        quizes?.forEach(q => {
            if(q.id > maxId){
                maxId = q.id;
            }
        })
        setId(++maxId);
    }, [quizes])

    useEffect(() => {
        if (searchName === "") {
            const quizIdsJSON = localStorage.ids;
            if(quizIdsJSON){
                const quizesTemp: QuizType[] = [];
                const quizIds = JSON.parse(quizIdsJSON) as number[];

                quizIds.forEach(id => {
                    const quizJSON = localStorage[id];
                    if(quizJSON){
                        const quiz = JSON.parse(quizJSON);
                        quizesTemp.push(quiz);
                    }
                });       
                setQuizes(quizesTemp);
        }
        } else {
            if(quizes){
                let filteredQuizes = [ ...quizes ];
                filteredQuizes = filteredQuizes.filter(q => q.name.toLowerCase().match("^" + searchName));
                setQuizes(filteredQuizes);
            } 
        }
    }, [searchName]);

    if (!quizes) {
        return <>Loading...</>;
    }

    const handleDeleteClick = (id: number) => {
        localStorage.removeItem(id + '');
        let newQuizes = [...quizes];
        newQuizes = newQuizes.filter(q => q.id !== id);

        const idsJSON = localStorage.ids;
            if(idsJSON){
                let ids = JSON.parse(idsJSON) as number[];
                ids = ids.filter(i => i !== id);
                localStorage.ids = JSON.stringify(ids);
            }

        setQuizes(newQuizes);
    }

    const handleCreateQuiz = () => {
        const quizName = newQuizNameRef.current?.value;
        if (quizName) {
            const newQuiz: QuizType = {
                id: id,
                name: quizName,
                questions: []
            }
            localStorage.setItem(newQuiz.id + '', JSON.stringify(newQuiz));

            const idsJSON = localStorage.ids;
            if(idsJSON){
                const ids = JSON.parse(idsJSON) as number[];
                ids.push(id);
                localStorage.ids = JSON.stringify(ids);
            }

            const newQuizes = [...quizes, newQuiz];
            setQuizes(newQuizes);
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
            {quizes.map((q) => (
                <div key={q.id} className="border rounded p-4 mb-4">
                    <h2 className="text-xl font-semibold">{q.name}</h2>
                    <div className="mt-2">
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                            onClick={() => navigate(`/quiz/${q.id}`)}
                        >
                            Pass Quiz
                        </button>
                        <button
                            className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                            onClick={() => navigate(`/edit/${q.id}`)}
                        >
                            Edit Quiz
                        </button>
                        <button
                            className="bg-red-500 text-white px-4 py-2 rounded"
                            onClick={() => handleDeleteClick(q.id)}
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
