import { QuizQuestionType, QuizType } from "../../types"
import { useParams } from "react-router"
import { QuizQuestion } from "../QuizQuestion";
import { useState } from "react";
import { ResultComponent } from "../ResultComponent";

export const Quiz = () => {
    const quizName: string | undefined = useParams().name;
    const quizes: string[] = JSON.parse(localStorage.names);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentAnswer, setCurrentAnswer] = useState("");
    const [score, setScore] = useState(0);

    if(!quizName || !quizes.find(q => q.replace(/\s/g, "").toLowerCase() === quizName.toLowerCase())){
        return (
            <>
                ErrorPage
            </>
        )
    }else{
        const quizData: QuizType = JSON.parse(localStorage[quizName]);     
        const questionsAmount = quizData.questions.length;

        if(currentQuestionIndex < questionsAmount){
            return (
                <>
                    <h1>{quizData.name}</h1>
                    <QuizQuestion questionData={quizData.questions[currentQuestionIndex]} callback={setCurrentAnswer}/>
                    <button onClick={() => handleClick(quizData.questions[currentQuestionIndex])}>Next</button>
                </>   
            )
        }
        else{
            return <ResultComponent score={score}/>
        }    
    } 

    function handleClick(currentQuestion: QuizQuestionType){
        setCurrentQuestionIndex(prev => prev + 1);

        console.log(currentAnswer, " ", currentQuestion.correctAnswer)
        
        if(currentAnswer === currentQuestion.correctAnswer){
            setScore(prev => prev + 1);
        }
    } 
}