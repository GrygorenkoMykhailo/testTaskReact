import { QuizQuestionType } from "../../types"

export const QuizQuestion = (props: { questionData: QuizQuestionType }) => {
    return (
        <>
            {props.questionData.question}
            <ul>
                {props.questionData.answers.map(a => {
                    return (
                        <li key={a}>
                            {a}
                        </li> 
                    )
                })}
            </ul>
        </>
    )
}