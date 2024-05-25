import { useEffect, useState } from "react"
import { QuizType } from "../types"

export const useQuiz = (id: number) => {
    const [quiz, setQuiz] = useState<QuizType | null>();

    useEffect(() => {
        const quizJSON = localStorage[id];
        if(quizJSON){
            const quiz = JSON.parse(quizJSON);
            setQuiz(quiz);
        }             
    }, [id])

    const updateQuiz = (newQuiz: QuizType) => {
        setQuiz(newQuiz);
    }

    return [quiz, updateQuiz] as [(QuizType | null), (newQuiz: QuizType) => void];
}