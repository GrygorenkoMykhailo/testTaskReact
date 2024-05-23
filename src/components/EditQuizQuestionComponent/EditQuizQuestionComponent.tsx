import { QuizQuestionType, QuizType } from "../../types";
import { useRef, useState, useEffect } from "react";

export const EditQuizQuestionComponent = (props: { questionData: QuizQuestionType, testName: string }) => {
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const questionRef = useRef<HTMLInputElement | null>(null);
    const [correctAnswerIndex, setCorrectAnswerIndex] = useState<number | null>(null);

    useEffect(() => {
        const index = props.questionData.answers.findIndex(
            answer => answer === props.questionData.correctAnswer
        );
        setCorrectAnswerIndex(index);
    }, [props.questionData]);

    const handleChangeAnswerText = (index: number) => {
        const localStorageQuizJSON = localStorage.getItem(props.testName.replace(/\s/g, ""));
        if (localStorageQuizJSON) {
            const localStorageQuiz = JSON.parse(localStorageQuizJSON) as QuizType;
            const newAnswer = inputRefs.current[index]?.value;
            if (newAnswer) {
                localStorageQuiz.questions[props.questionData.id - 1].answers[index] = newAnswer;
            }
            localStorage.setItem(props.testName.replace(/\s/g, ""), JSON.stringify(localStorageQuiz));
        }
    };

    const handleChangeCorrectAnswer = (index: number) => {
        setCorrectAnswerIndex(index);
        const localStorageQuizJSON = localStorage.getItem(props.testName.replace(/\s/g, ""));
        if (localStorageQuizJSON) {
            const localStorageQuiz = JSON.parse(localStorageQuizJSON) as QuizType;
            localStorageQuiz.questions[props.questionData.id - 1].correctAnswer = inputRefs.current[index]?.value || "";
            localStorage.setItem(props.testName.replace(/\s/g, ""), JSON.stringify(localStorageQuiz));
        }
    };

    const handleChangeQuestion = () => {
        const localStorageQuizJSON = localStorage.getItem(props.testName.replace(/\s/g, ""));
        if (localStorageQuizJSON) {
            const localStorageQuiz = JSON.parse(localStorageQuizJSON) as QuizType;
            const newQuestion = questionRef.current?.value;
            if (newQuestion) {
                localStorageQuiz.questions[props.questionData.id - 1].question = newQuestion;
            }
            localStorage.setItem(props.testName.replace(/\s/g, ""), JSON.stringify(localStorageQuiz));
        }
    }

    return (
        <>
            <div>Question: <input type="text" defaultValue={props.questionData.question} ref={questionRef}/> <button onClick={() => handleChangeQuestion()}>Save</button> </div>
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
                        defaultChecked={correctAnswerIndex === i}
                    />
                    <button onClick={() =>  {
                            handleChangeCorrectAnswer(i)
                            handleChangeAnswerText(i)
                        }
                    }>Save</button>
                </div>
            ))}
            <p>Points for correct answer: {props.questionData.points}</p>
        </>
    );
};