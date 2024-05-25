import { useRef, useState, useEffect } from "react";
import { QuizQuestionType } from "../../types";

export const EditQuizQuestionComponent = (props: { questionData: QuizQuestionType, updateCallback: (updatedQuestion: QuizQuestionType) => void, deleteCallback: (questionId: number) => void }) => {
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const questionRef = useRef<HTMLInputElement | null>(null);
    const pointsRef = useRef<HTMLInputElement | null>(null);
    const [correctAnswerIndex, setCorrectAnswerIndex] = useState<number | null>(null);
    const [answers, setAnswers] = useState<string[]>(props.questionData.answers);

    useEffect(() => {
        const index = props.questionData.answers.findIndex(
            answer => answer === props.questionData.correctAnswer
        );
        setCorrectAnswerIndex(index);
    }, [props.questionData]);

    const handleChangeAnswerText = (index: number) => {
        const newAnswer = inputRefs.current[index]?.value;
        if (newAnswer !== undefined) {
            const updatedAnswers = [...answers];
            updatedAnswers[index] = newAnswer;
            setAnswers(updatedAnswers);

            const updatedQuestion = {
                ...props.questionData,
                answers: updatedAnswers,
            };
            props.updateCallback(updatedQuestion);
        }
    };

    const handleChangeCorrectAnswer = (index: number) => {
        setCorrectAnswerIndex(index);

        const updatedQuestion = {
            ...props.questionData,
            correctAnswer: answers[index] || "",
        };
        props.updateCallback(updatedQuestion);
    };

    const handleChangeQuestion = () => {
        const newQuestion = questionRef.current?.value;
        if (newQuestion) {
            const updatedQuestion = {
                ...props.questionData,
                question: newQuestion,
            };
            props.updateCallback(updatedQuestion);
        }
    };

    const handlePointsChange = () => {
        const newPoints = pointsRef.current?.value;
        if (newPoints) {
            const updatedQuestion = {
                ...props.questionData,
                points: +newPoints,
            };
            props.updateCallback(updatedQuestion);
        }
    };

    const handleDeleteQuestion = () => {
        props.deleteCallback(props.questionData.id);
    };

    const handleAddAnswer = () => {
        const updatedAnswers = [...answers, ""];
        setAnswers(updatedAnswers);

        const updatedQuestion = {
            ...props.questionData,
            answers: updatedAnswers,
        };
        props.updateCallback(updatedQuestion);
    };

    const handleDeleteAnswer = (index: number) => {
        const updatedAnswers = answers.filter((_, i) => i !== index);
        setAnswers(updatedAnswers);

        const updatedQuestion = {
            ...props.questionData,
            answers: updatedAnswers,
        };
        props.updateCallback(updatedQuestion);
    };

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