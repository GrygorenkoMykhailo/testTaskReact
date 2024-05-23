import { QuizType } from "../../types"
import { useNavigate } from "react-router";

export const QuizList = () => {
    const keys: string[] = JSON.parse(localStorage.names);
    const navigate = useNavigate();

    return (
        <>
            {keys.map(k => {
                const quiz: QuizType = JSON.parse(localStorage[k]);
                return <h1 key={quiz.id} onClick={() => navigate(`/quiz/${quiz.name}`.replace(/\s/g, ""))}>{quiz.name}</h1>
            })}
        </>
    )
}