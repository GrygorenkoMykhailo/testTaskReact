import { QuizType } from "../../types"

export const QuizList = () => {
    const keys: string[] = JSON.parse(localStorage.names);

    return (
        <>
            {keys.map(k => {
                const quiz: QuizType = JSON.parse(localStorage[k]);
                return <h1 key={quiz.id}>{quiz.name}</h1>
            })}
        </>
    )
}