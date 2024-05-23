
import { useNavigate } from "react-router"
import { QuizType } from "../../types";

export const ResultComponent = (props: {score: number, answers: string[], quizData: QuizType, timeSpent: string}) => {
    const navigate = useNavigate();
    return (
        <>
            <p>You spent {props.timeSpent}</p>
            <p>Score: {props.score}</p> 
            <button onClick={() => navigate('/')}>Go to home page</button>
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