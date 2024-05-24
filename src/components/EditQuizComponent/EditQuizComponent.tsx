import { useParams } from "react-router";
import { QuizType } from "../../types";
import { useQuiz } from "../../hooks";
import { EditQuizQuestionComponent } from "../EditQuizQuestionComponent";
import { Link } from "react-router-dom";
import { AddQuizQuestionComponent } from "../AddQuizQuestionComponent";
import { useRef } from "react";
import { useNavigate } from "react-router";

export const EditQuizComponent = () => {
    const name = useParams().name;
    const quizData: QuizType | null = useQuiz(name);
    const quizNameRef = useRef<HTMLInputElement | null>(null);
    const navigate = useNavigate();

    if (!name || !quizData) {
        return <>ErrorPage </>;
    }

    const handleChangeQuizName = () => {
        const newName = quizNameRef.current?.value;
        if(newName){
            const quiz = { ...quizData };
            localStorage.removeItem(quizData.name.replace(/\s/g, ""));
            let names: string[] = JSON.parse(localStorage.names);
            names = names.filter(n => n !== quiz.name.replace(/\s/g, ""));
            names.push(newName.replace(/\s/g, ""));
            localStorage.names = JSON.stringify(names);
            quiz.name = newName;
            localStorage.setItem(newName.replace(/\s/g, ""), JSON.stringify(quiz));   
            navigate("/edit/" + newName.replace(/\s/g, ""));
        }
    }

    return (
        <div>
            <input 
                type="text" 
                defaultValue={quizData.name}
                ref={quizNameRef}
                />
            <button onClick={handleChangeQuizName}>Save</button>
            <Link to="/">Go to home page</Link>
            {quizData.questions.map((q, i) => <EditQuizQuestionComponent questionData={q} key={i} testName={name}/>)}
            <AddQuizQuestionComponent quizData={quizData}/>
        </div>
    )
}   