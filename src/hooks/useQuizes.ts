import { useState, useEffect } from "react";
import { QuizType } from "../types";

export const useQuizes = (names: string[] | null) => {
    const [quizes, setQuizes] = useState<QuizType[] | null>(null); 

    useEffect(() => {
        const fetchedQuizes: QuizType[] = [];
            if(names){
            names.forEach(name => {
                if(name){
                    const quizJSON = localStorage[name];
                    if(quizJSON){
                        const quiz = JSON.parse(quizJSON) as QuizType;
                        if (quiz) {
                            fetchedQuizes.push(quiz);
                        }
                    }
                }
            });
            setQuizes(fetchedQuizes);
        }
    }, [names]);

    const updateQuizes = (newQuizes: QuizType[] | null) => {
        setQuizes(newQuizes);
    };

    return [quizes, updateQuizes] as [QuizType[] | null, (newQuizes: QuizType[] | null) => void];
};