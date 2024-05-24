
import { Link } from "react-router-dom";
import { QuizType } from "../../types";

export const ResultComponent = (props: {score: number, answers: string[], quizData: QuizType, timeSpent: string}) => {
    let maxScore = 0;

    props.quizData.questions.forEach(q => {
        maxScore += q.points;
    })

    return (
        <>
            <p>You spent {props.timeSpent}</p>
            <p>Score: {props.score}/{maxScore}</p> 
            <Link to="/">Go to home page</Link>
            <h3>Your answers: </h3>
            {props.quizData.questions.map((q, i) => {
                return( 
                    <div key={i}>
                        <p>{q.question}</p>
                        {q.answers.map((a, ii) => {
                            const isCorrectAnswer = props.answers[i] === q.correctAnswer;
                            
                            if(isCorrectAnswer && a === props.answers[i]){
                                return (
                                    <div style={{color: 'green' }} key={ii}>{a}</div>
                                )
                            }
                            return (
                                <div style={{color: 'black' }} key={ii}>{a}</div>
                            )
                        })}
                    </div>
                )
            })}
        </>
    )
}