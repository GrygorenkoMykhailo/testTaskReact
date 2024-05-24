import { QuizType } from "../types";
import { useState, useEffect } from "react";

export const useQuiz = (name: string | null | undefined) => {
    const [quizData, setQuizData] = useState<QuizType | null>(null);

    useEffect(() => {
        const quizes: string[] = JSON.parse(localStorage.names);
        if (name && quizes.find(q => q.replace(/\s/g, "").toLowerCase() === name.toLowerCase())) {
            const data: QuizType = JSON.parse(localStorage[name]);
            setQuizData(data);
        }     
    }, [name]);

    const updateQuizData = (newQuiz: QuizType | null) => {
        setQuizData(newQuiz);
    }
    return [quizData, updateQuizData] as [QuizType | null, (newQuiz: QuizType | null) => void];
}