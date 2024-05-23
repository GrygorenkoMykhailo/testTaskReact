import { QuizType } from "../../types"

export const Quiz = (props: { quizData: QuizType } ) => {
    return (
        <>
            <h1>{props.quizData.name}</h1>
            {props.quizData.questions.map(q => {
                return <div key={q.id}>
                    <h3>{q.question}</h3>
                    {q.answers.map(a => a)}
                </div>
            })}
        </>
    )
}