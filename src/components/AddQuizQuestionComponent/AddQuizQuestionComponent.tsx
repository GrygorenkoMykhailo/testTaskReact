import { useEffect, useState, useRef } from "react";
import { QuizQuestionType, QuizType } from "../../types";

export const AddQuizQuestionComponent = (props: {quizData: QuizType, updateCallback: (newQuizData: QuizQuestionType) => void}) => {
    const [id, setId] = useState(0);
    const [answers, setAnswers] = useState<string[]>([""]);
    const [correctAnswerIndex, setCorrectAnswerIndex] = useState<number | null>(null);
    const questionRef = useRef<HTMLInputElement | null>(null);
    const answerRefs = useRef<(HTMLInputElement | null)[]>([]);
    const pointsRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        let maxId = 1;
        props.quizData.questions.forEach(q => {
            if (q.id > maxId) maxId = q.id;
        });
        setId(++maxId);
    }, [props.quizData.questions]);

    const handleAddAnswer = () => {
        setAnswers(prev => [...prev, ""]);
    };

    const handleSaveNewQuestion = () => {
        const newQuestionText = questionRef.current?.value;
        const newAnswers = answerRefs.current.map(ref => ref?.value || "");
        const correctAnswer = correctAnswerIndex !== null ? newAnswers[correctAnswerIndex] : null;
        const points = pointsRef.current?.value;
        
        if (newQuestionText && correctAnswer && points) {
            props.updateCallback({
                id: id,
                question: newQuestionText,
                answers: newAnswers,
                correctAnswer: correctAnswer,
                points: +points,
            });
        } 
    };

    return (
        <div className="mb-8 p-4 border rounded shadow-md bg-white">
            <label className="block font-semibold mb-2">New question:</label>
            <input 
                type="text" 
                name="question" 
                id="question" 
                ref={questionRef}
                className="w-full border rounded py-2 px-3 mb-2"
            />
            {answers.map((a, i) => (
                <div key={i} className="mb-4 flex items-center space-x-2">
                    <input 
                        type="text" 
                        name={`answer-${i}`} 
                        id={`answer-${i}`} 
                        defaultValue={a}
                        ref={el => answerRefs.current[i] = el}
                        className="w-full border rounded py-2 px-3"
                    />
                    <input 
                        type="radio" 
                        name="isCorrect"
                        id={`isCorrect-${i}`} 
                        onChange={() => setCorrectAnswerIndex(i)}
                        className="mr-2"
                    />
                    {i === answers.length - 1 && (
                        <button 
                            onClick={handleAddAnswer} 
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        >
                            +
                        </button>
                    )}
                </div>
            ))}
            <div className="mt-4">
                <label className="block font-semibold mb-2">Points:</label>
                <input 
                    type="number" 
                    name="points" 
                    id="points" 
                    ref={pointsRef}
                    className="w-full border rounded py-2 px-3 mb-2"
                />
                <button 
                    onClick={handleSaveNewQuestion} 
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Save
                </button>
            </div>
        </div>
    );
};