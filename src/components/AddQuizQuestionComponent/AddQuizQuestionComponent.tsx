import { useEffect, useState, useRef } from "react";
import { QuizType } from "../../types";

export const AddQuizQuestionComponent = (props: {quizData: QuizType}) => {
    const [id, setId] = useState(0);
    const [answers, setAnswers] = useState<string[]>(["",]);
    const [correctAnswerIndex, setCorrectAnswerIndex] = useState<number | null>(null);
    const questionRef = useRef<HTMLInputElement | null>(null);
    const answerRefs = useRef<(HTMLInputElement | null)[]>([]);
    const pointsRef = useRef<(HTMLInputElement | null)>(null);

    useEffect(() => {
        let maxId = 1;
        props.quizData.questions.forEach(q => {
            if(q.id > maxId)
                maxId = q.id;
        });
        setId(++maxId);
    }, [props.quizData.questions]);

    const handleAddAnswer = () => {
        setAnswers(prev => [...prev, ""]);
    }

    const handleSaveNewQuestion = () => {
        const newQuestion = questionRef.current?.value;
        const newAnswers = answerRefs.current.map(ref => ref?.value || "");
        const correctAnswer = correctAnswerIndex !== null ? newAnswers[correctAnswerIndex] : null;
        const points = pointsRef.current?.value;

        console.log("New Question:", newQuestion);
        console.log("Answers:", newAnswers);
        console.log("Correct Answer:", correctAnswer);
        console.log("Points: ", points);
    }

    return (
        <div>
            New question:
            <input 
                type="text" 
                name="question" 
                id="question" 
                ref={questionRef}
            />
            <br />
            {answers.map((a, i) => (
                <div key={i}>
                    <input 
                        type="text" 
                        name={`answer-${i}`} 
                        id={`answer-${i}`} 
                        defaultValue={a}
                        ref={el => answerRefs.current[i] = el}
                    />
                    <input 
                        type="radio" 
                        name="isCorrect"
                        id={`isCorrect-${i}`} 
                        onChange={() => setCorrectAnswerIndex(i)}
                    />
                    {i === answers.length - 1 && (
                        <button onClick={handleAddAnswer}>+</button>
                    )}
                </div>
            ))}
            Points:
                    <input 
                        type="text" 
                        name="question" 
                        id="question" 
                        ref={pointsRef}
                    />
            <button onClick={handleSaveNewQuestion}>Save</button>
        </div>
    );
}