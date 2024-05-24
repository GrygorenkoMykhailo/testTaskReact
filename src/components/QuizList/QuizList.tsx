import { QuizType } from "../../types"
import { useNavigate } from "react-router";
import { useEffect, useState, useRef } from "react";

export const QuizList = () => {
    const [names, setNames] = useState<string []>([]);
    const navigate = useNavigate();
    const newQuizNameRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        const currentNames = JSON.parse(localStorage.names);
        setNames(currentNames)
    }, [])

    const handleDeleteClick = (name: string) => {
        localStorage.removeItem(name.replace(/\s/g, ""));
        const newNames = names.filter(k => k !== name.replace(/\s/g, ""));
        localStorage.names = JSON.stringify(newNames);
        setNames(newNames);
    }

    const handleCreateQuiz = () => {
        const quizName = newQuizNameRef.current?.value;  
        if(quizName){
            const newQuiz: QuizType = {
                name: quizName,  
                questions: []
            }
            localStorage.setItem(quizName.replace(/\s/g, ""), JSON.stringify(newQuiz));
            const newNames = [...names, quizName];
            localStorage.names = JSON.stringify(newNames);
            setNames(newNames);
        }
    }

    return (
        <div>
            {names.map((n, i) => {
                const quiz: QuizType | null = JSON.parse(localStorage[n]);

                if(quiz){
                    return (
                        <div key={i}>
                            <h2>{quiz.name}</h2>
                            <button onClick={() => navigate(`/quiz/${quiz.name}`.replace(/\s/g, ""))}>Pass Quiz</button>
                            <button onClick={() => navigate(`/edit/${quiz.name}`.replace(/\s/g, ""))}>Edit Quiz</button>
                            <button onClick={() => handleDeleteClick(quiz.name)}>Delete Quiz</button>
                        </div>
                    )
                }  
            })}
            <div>
                <input 
                    type="text" 
                    name="" id="" 
                    ref={newQuizNameRef}
                    />
                <button onClick={handleCreateQuiz}>Add new quiz</button>
            </div>
        </div>
    )
}