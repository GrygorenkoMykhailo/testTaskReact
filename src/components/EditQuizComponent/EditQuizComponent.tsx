import { useParams } from "react-router";
import { EditQuizQuestionComponent } from "../EditQuizQuestionComponent";
import { Link } from "react-router-dom";
import { AddQuizQuestionComponent } from "../AddQuizQuestionComponent";
import { useRef } from "react";
import { QuizQuestionType } from "../../types";
import { useQuiz } from "../../hooks";

export const EditQuizComponent = () => {
    const id = useParams().id;

    if (!id || !JSON.parse(localStorage.ids).find((i: number) => i === +id)) {
        throw new Error();
    }

    const [quizData, setQuizData] = useQuiz(+id);
    const quizNameRef = useRef<HTMLInputElement | null>(null);

    const handleChangeQuizName = () => {
        const newName = quizNameRef.current?.value;
        if (newName && quizData) {
            const updatedQuiz = { ...quizData, name: newName };
            localStorage.setItem(quizData.id.toString(), JSON.stringify(updatedQuiz));
            setQuizData(updatedQuiz);
        }
    };

    const handleUpdateQuestion = (updatedQuestion: QuizQuestionType) => {
        if (quizData) {
            const updatedQuestions = quizData.questions.map(q =>
                q.id === updatedQuestion.id ? updatedQuestion : q
            );
            const updatedQuiz = { ...quizData, questions: updatedQuestions };
            localStorage.setItem(quizData.id.toString(), JSON.stringify(updatedQuiz));
            setQuizData(updatedQuiz);
        }
    };

    const handleDeleteQuestion = (questionId: number) => {
        if (quizData) {
            const updatedQuestions = quizData.questions.filter(q => q.id !== questionId);
            const updatedQuiz = { ...quizData, questions: updatedQuestions };
            localStorage.setItem(quizData.id.toString(), JSON.stringify(updatedQuiz));
            setQuizData(updatedQuiz);
        }
    };

    const handleAddQuestion = (newQuestion: QuizQuestionType) => {
        if (quizData) {
            const updatedQuiz = {
                ...quizData,
                questions: [...quizData.questions, newQuestion]
            };
            localStorage.setItem(quizData.id.toString(), JSON.stringify(updatedQuiz));
            setQuizData(updatedQuiz);
        }
    };

    if (!quizData) {
        return <>Loading...</>;
    }

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
            {quizData.questions.map((q) => (
                <EditQuizQuestionComponent 
                    questionData={q} 
                    key={q.id} 
                    updateCallback={handleUpdateQuestion}
                    deleteCallback={handleDeleteQuestion}
                />
            ))}
            <AddQuizQuestionComponent quizData={quizData} updateCallback={handleAddQuestion} />
        </div>
    );
};