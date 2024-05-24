import { useRef, useState, useEffect } from "react";
import { QuizQuestionType, QuizType } from "../../types";
import { useQuiz } from "../../hooks";

export const EditQuizQuestionComponent = (props: { questionData: QuizQuestionType, testName: string, updateCallback: (newQuizData: QuizType) => void }) => {
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const questionRef = useRef<HTMLInputElement | null>(null);
    const pointsRef = useRef<HTMLInputElement | null>(null);
    const [correctAnswerIndex, setCorrectAnswerIndex] = useState<number | null>(null);
    const [quizData, setQuizData] = useQuiz(props.testName.replace(/\s/g, ""));
    const [answers, setAnswers] = useState<string[]>(props.questionData.answers);

    useEffect(() => {
        const index = props.questionData.answers.findIndex(
            answer => answer === props.questionData.correctAnswer
        );
        setCorrectAnswerIndex(index);
    }, [props.questionData]);

    if (!quizData) {
        return <>Loading...</>;
    }

    const handleChangeAnswerText = (index: number) => {
        const newAnswer = inputRefs.current[index]?.value;
        if (newAnswer) {
            const updatedAnswers = [...answers];
            updatedAnswers[index] = newAnswer;
            setAnswers(updatedAnswers);

            const updatedQuiz = { ...quizData };
            const indexOfQuestion = updatedQuiz.questions.findIndex((q) => q.id === props.questionData.id);
            updatedQuiz.questions[indexOfQuestion].answers = updatedAnswers;
            localStorage.setItem(props.testName.replace(/\s/g, ""), JSON.stringify(updatedQuiz));
            props.updateCallback(updatedQuiz);
        }
    };

    const handleChangeCorrectAnswer = (index: number) => {
        setCorrectAnswerIndex(index);

        const updatedQuiz = { ...quizData };
        const indexOfQuestion = updatedQuiz.questions.findIndex((q) => q.id === props.questionData.id);
        updatedQuiz.questions[indexOfQuestion].correctAnswer = answers[index] || "";
        localStorage.setItem(props.testName.replace(/\s/g, ""), JSON.stringify(updatedQuiz));
        props.updateCallback(updatedQuiz);
    };

    const handleChangeQuestion = () => {
        const newQuestion = questionRef.current?.value;
        if (newQuestion) {
            const updatedQuiz = { ...quizData };
            const indexOfQuestion = updatedQuiz.questions.findIndex((q) => q.id === props.questionData.id);
            updatedQuiz.questions[indexOfQuestion].question = newQuestion;
            localStorage.setItem(props.testName.replace(/\s/g, ""), JSON.stringify(updatedQuiz));
            props.updateCallback(updatedQuiz);
        }
    };

    const handlePointsChange = () => {
        const newPoints = pointsRef.current?.value;
        if (newPoints) {
            const updatedQuiz = { ...quizData };
            const indexOfQuestion = updatedQuiz.questions.findIndex((q) => q.id === props.questionData.id);
            updatedQuiz.questions[indexOfQuestion].points = +newPoints;
            localStorage.setItem(props.testName.replace(/\s/g, ""), JSON.stringify(updatedQuiz));
            props.updateCallback(updatedQuiz);
        }
    };

    const handleDeleteQuestion = () => {
        const updatedQuiz = { ...quizData };
        updatedQuiz.questions = updatedQuiz.questions.filter(q => q.id !== props.questionData.id);
        localStorage.setItem(props.testName.replace(/\s/g, ""), JSON.stringify(updatedQuiz));
        setQuizData(updatedQuiz);
        props.updateCallback(updatedQuiz);
    };

    const handleAddAnswer = () => {
        const updatedQuiz = { ...quizData };
        const indexOfQuestion = updatedQuiz.questions.findIndex(q => q.id === props.questionData.id);
        updatedQuiz.questions[indexOfQuestion].answers.push("");
        setAnswers(prevAnswers => [...prevAnswers, ""]);
        localStorage.setItem(props.testName.replace(/\s/g, ""), JSON.stringify(updatedQuiz));
    };

    const handleDeleteAnswer = (index: number) => {
        const updatedQuiz = { ...quizData };
        const indexOfQuestion = updatedQuiz.questions.findIndex((q) => q.id === props.questionData.id);
        updatedQuiz.questions[indexOfQuestion].answers = updatedQuiz.questions[indexOfQuestion].answers.filter((_, i) => i !== index);
        setAnswers(prevAnswers => prevAnswers.filter((_, i) => i !== index));
        localStorage.setItem(props.testName.replace(/\s/g, ""), JSON.stringify(updatedQuiz));
    };
    console.log('in children');
    console.log(props.questionData)
    return (
        <div className="mb-8 p-4 border rounded shadow-md bg-white">
            <div className="mb-4">
                <label className="block font-semibold mb-2">Question:</label>
                <input 
                    type="text" 
                    defaultValue={props.questionData.question} 
                    ref={questionRef}
                    className="w-full border rounded py-2 px-3 mb-2"
                />
                <div className="flex space-x-2">
                    <button 
                        onClick={handleChangeQuestion} 
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Save
                    </button>
                    <button 
                        onClick={handleDeleteQuestion} 
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                        Delete
                    </button>
                </div>
            </div>
            {answers.map((a, i) => (
                <div key={i} className="mb-4 flex items-center space-x-2">
                    <input
                        type="text"
                        defaultValue={a}
                        ref={el => (inputRefs.current[i] = el)}
                        className="w-full border rounded py-2 px-3"
                    />
                    <input
                        type="radio"
                        name={`isCorrect-${props.questionData.id}`}
                        checked={correctAnswerIndex === i}
                        onChange={() => handleChangeCorrectAnswer(i)}
                        className="mr-2"
                    />
                    <button 
                        onClick={() => handleChangeAnswerText(i)} 
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        Save
                    </button>
                    <button 
                        onClick={() => handleDeleteAnswer(i)} 
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                        Delete
                    </button>
                </div>
            ))}
            <button 
                onClick={handleAddAnswer} 
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
                +
            </button>
            <div className="mt-4">
                <label className="block font-semibold mb-2">Points for correct answer:</label>
                <input 
                    type="number" 
                    defaultValue={props.questionData.points}
                    ref={pointsRef}
                    className="w-full border rounded py-2 px-3 mb-2"
                />
                <button 
                    onClick={handlePointsChange} 
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Save
                </button>
            </div>
        </div>
    );
};