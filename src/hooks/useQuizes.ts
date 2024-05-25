import { useEffect, useState } from "react"
import { QuizType } from "../types"

export const useQuizes = () => {
    const [quizes, setQuizes] = useState<QuizType[] | null>([]);

    useEffect(() => {
        const quizIdsJSON = localStorage.ids;
        if(quizIdsJSON){
            const quizesTemp: QuizType[] = [];
            const quizIds = JSON.parse(quizIdsJSON) as number[];

            quizIds.forEach(id => {
                const quizJSON = localStorage[id];
                if(quizJSON){
                    const quiz = JSON.parse(quizJSON);
                    quizesTemp.push(quiz);
                }
            });       
            setQuizes(quizesTemp);
        }
    }, [])

    const updateQuizes = (newQuizes: QuizType[]) => {
        setQuizes(newQuizes);
    }

    return [quizes, updateQuizes] as [(QuizType[] | null), (newQuizes: QuizType[]) => void];
}