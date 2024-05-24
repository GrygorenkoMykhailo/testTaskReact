import { QuizQuestionType } from "../../types";
import { useRef, useState, useEffect } from "react";
import { useQuiz } from "../../hooks";

export const EditQuizQuestionComponent = (props: { questionData: QuizQuestionType, testName: string }) => {
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const questionRef = useRef<HTMLInputElement | null>(null);
    const pointsRef = useRef<HTMLInputElement | null>(null);
    const [correctAnswerIndex, setCorrectAnswerIndex] = useState<number | null>(null);
    const [quizData, setQuizData] = useQuiz(props.testName.replace(/\s/g, ""));

    useEffect(() => {
        const index = props.questionData.answers.findIndex(
            answer => answer === props.questionData.correctAnswer
        );
        setCorrectAnswerIndex(index);
    }, [props.questionData]);

    if(!quizData){
        return( 
            <>
                ErrorComponent
            </>
        )
    }

    const handleChangeAnswerText = (index: number) => {
        const newAnswer = inputRefs.current[index]?.value;
        if (newAnswer) {
            const updatedQuiz = { ...quizData };
            const indexOfQuestion = updatedQuiz.questions.findIndex((q) => q.id === props.questionData.id);
            updatedQuiz.questions[indexOfQuestion].answers[index] = newAnswer;
            localStorage.setItem(props.testName.replace(/\s/g, ""), JSON.stringify(updatedQuiz));
        }   
    };

    const handleChangeCorrectAnswer = (index: number) => {
        setCorrectAnswerIndex(index);
        const updatedQuiz = { ...quizData }; 
        const indexOfQuestion = updatedQuiz.questions.findIndex((q) => q.id === props.questionData.id);
        updatedQuiz.questions[indexOfQuestion].correctAnswer = inputRefs.current[index]?.value || "";
        localStorage.setItem(props.testName.replace(/\s/g, ""), JSON.stringify(updatedQuiz));
    };

    const handleChangeQuestion = () => {
        const newQuestion = questionRef.current?.value;
            if (newQuestion) {
                const updatedQuiz = { ...quizData };
                const indexOfQuestion = updatedQuiz.questions.findIndex((q) => q.id === props.questionData.id);
                updatedQuiz.questions[indexOfQuestion].question = newQuestion;
                localStorage.setItem(props.testName.replace(/\s/g, ""), JSON.stringify(updatedQuiz));
        }
    };

    const handlePointsChange = () => {
        const newPoints = pointsRef.current?.value;
        if(newPoints){
            const updatedQuiz = { ... quizData};
            const indexOfQuestion = updatedQuiz.questions.findIndex((q) => q.id === props.questionData.id);
            updatedQuiz.questions[indexOfQuestion].points = +newPoints;
            localStorage.setItem(props.testName.replace(/\s/g, ""), JSON.stringify(updatedQuiz));
        }
    }

    return (
        <>
            <div>Question: 
                <input 
                    type="text" 
                    defaultValue={props.questionData.question} 
                    ref={questionRef}
                    /> 
                <button onClick={handleChangeQuestion}>Save</button>
            </div>
            {props.questionData.answers.map((a, i) => (
                <div key={i}>
                    <input
                        type="text"
                        defaultValue={a}
                        ref={el => (inputRefs.current[i] = el)}
                    />
                    <input
                        type="radio"
                        name={`isCorrect-${props.questionData.id}`}
                        checked={correctAnswerIndex === i}
                        onChange={() => handleChangeCorrectAnswer(i)}
                    />
                    <button onClick={() =>  {
                            handleChangeAnswerText(i);
                        }
                    }>Save</button>
                </div>
            ))}
                <div>Points for correct answer: 
                    <input 
                        type="number" 
                        defaultValue={props.questionData.points}
                        ref={pointsRef}
                        />
                    <button onClick={handlePointsChange}>Save</button>
                </div>
        </>
    );
};