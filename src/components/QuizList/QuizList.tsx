import { QuizType } from "../../types"
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

export const QuizList = () => {
    const [names, setNames] = useState<string []>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const currentKeys = JSON.parse(localStorage.names);
        setNames(currentKeys)
    }, [])

    const handleDeleteClick = (name: string) => {
        localStorage.removeItem(name.replace(/\s/g, ""));
        const newKeys = names.filter(k => k !== name.replace(/\s/g, ""));
        localStorage.names = JSON.stringify(newKeys);
        setNames(newKeys);
    }

    return (
        <>
            {names.map(n => {
                const quiz: QuizType = JSON.parse(localStorage[n]);
                return (
                    <div key={quiz.id}>
                        <h2>{quiz.name}</h2>
                        <button onClick={() => navigate(`/quiz/${quiz.name}`.replace(/\s/g, ""))}>Pass Quiz</button>
                        <button onClick={() => navigate(`/edit/${quiz.name}`.replace(/\s/g, ""))}>Edit Quiz</button>
                        <button onClick={() => handleDeleteClick(quiz.name)}>Delete Quiz</button>
                    </div>
                )
            })}
        </>
    )
}