import { QuizType } from "../../types"
import { useNavigate } from "react-router";

export const QuizList = () => {
    const keys: string[] = JSON.parse(localStorage.names);
    const navigate = useNavigate();

    return (
        <>
            {keys.map(k => {
                const quiz: QuizType = JSON.parse(localStorage[k]);
                return (
                    <div key={quiz.id}>
                        <h2>{quiz.name}</h2>
                        <button onClick={() => navigate(`/quiz/${quiz.name}`.replace(/\s/g, ""))}>Pass Quiz</button>
                        <button onClick={() => navigate(`/edit/${quiz.name}`.replace(/\s/g, ""))}>Edit Quiz</button>
                        <button>Delete Quiz</button>
                    </div>
                )
            })}
        </>
    )
}