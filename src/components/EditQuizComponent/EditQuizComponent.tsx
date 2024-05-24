import { useParams } from "react-router";
import { useQuiz } from "../../hooks";
import { EditQuizQuestionComponent } from "../EditQuizQuestionComponent";
import { Link } from "react-router-dom";
import { AddQuizQuestionComponent } from "../AddQuizQuestionComponent";
import { useRef } from "react";
import { useNavigate } from "react-router";
import { QuizType } from "../../types";

export const EditQuizComponent = () => {
    const name = useParams().name;
    const [quizData, setQuizData] = useQuiz(name);
    const quizNameRef = useRef<HTMLInputElement | null>(null);
    const navigate = useNavigate();

    if (!name || !quizData) {
        return <>ErrorPage</>;
    }

    const handleChangeQuizName = () => {
        const newName = quizNameRef.current?.value;
        if (newName) {
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
    };

    const updateCallback = (newQuizData: QuizType) => {
        setQuizData(newQuizData);
    };

    return (
        <div className="max-w-2xl mx-auto p-4 bg-white rounded shadow-md">
            <div className="mb-4">
                <input
                    type="text"
                    defaultValue={quizData.name}
                    ref={quizNameRef}
                    className="w-full border rounded py-2 px-3 mb-2"
                />
                <button 
                    onClick={handleChangeQuizName}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Save
                </button>
                <Link 
                    to="/"
                    className="ml-4 text-blue-500 hover:underline"
                >
                    Go to home page
                </Link>
            </div>
            {quizData.questions.map((q, i) => (
                <EditQuizQuestionComponent 
                    questionData={q} 
                    key={i} 
                    testName={name} 
                    updateCallback={updateCallback}
                />
            ))}
            <AddQuizQuestionComponent quizData={quizData} updateCallback={updateCallback} />
        </div>
    );
};
