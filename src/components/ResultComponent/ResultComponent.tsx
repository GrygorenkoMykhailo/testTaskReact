
import { useNavigate } from "react-router"
import { QuizType } from "../../types";

export const ResultComponent = (props: {score: number, answers: string[], quizData: QuizType}) => {
    const navigate = useNavigate();
    return (
        <>
            Score: {props.score}
            <button onClick={() => navigate('/')}>Go to home page</button>
            <h3>Your answers: </h3>
            {props.quizData.questions.map((q, i) => {
                return( 
                    <div key={i}>
                        {q.question}
                        
                        

                        {q.answers.map(a => {

                            const isCorrectAnswer = props.answers[i] === q.correctAnswer;
                            
                            if(isCorrectAnswer && a === props.answers[i]){
                                return (
                                    <div style={{color: 'green' }}>{a}</div>
                                )
                            }

                            return (
                                <div style={{color: 'black' }}>{a}</div>
                            )
                        })}
                    </div>
                )
            })}
        </>
    )
}