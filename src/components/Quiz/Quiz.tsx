import { QuizType } from "../../types"
import { useParams } from "react-router"
import { QuizQuestion } from "../QuizQuestion";
import { useState } from "react";

export const Quiz = () => {
    const quizName: string | undefined = useParams().name;
    const quizes: string[] = JSON.parse(localStorage.names);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

    if(!quizName || !quizes.find(q => q === quizName)){
        return (
            <>
                ErrorPage
            </>
        )
    }else{
        const quizData: QuizType = JSON.parse(localStorage[quizName]);
        const questionIndex = currentQuestionIndex;
        () => setCurrentQuestionIndex(prev => prev++);
        return (
            <>
                <h1>{quizData.name}</h1>
                <QuizQuestion questionData={quizData.questions[questionIndex]}/>
            </>
        )
    } 
}