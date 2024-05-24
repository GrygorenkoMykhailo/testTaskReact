import { useRef, useState, useEffect } from "react";
import { QuizQuestionType, QuizType } from "../../types";
import { useQuiz } from "../../hooks";

export const EditQuizQuestionComponent = (props: { questionData: QuizQuestionType, testName: string, updateCallback: (newQuizData: QuizType) => void }) => {
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const questionRef = useRef<HTMLInputElement | null>(null);
    const pointsRef = useRef<HTMLInputElement | null>(null);
    const [correctAnswerIndex, setCorrectAnswerIndex] = useState<number | null>(null);
    const [quizData] = useQuiz(props.testName.replace(/\s/g, ""));
    const [answers, setAnswers] = useState<string[]>(props.questionData.answers);

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
        if(newPoints){
            const updatedQuiz = { ...quizData};
            const indexOfQuestion = updatedQuiz.questions.findIndex((q) => q.id === props.questionData.id);
            updatedQuiz.questions[indexOfQuestion].points = +newPoints;
            localStorage.setItem(props.testName.replace(/\s/g, ""), JSON.stringify(updatedQuiz));
            props.updateCallback(updatedQuiz);
        }
    }

    const handleDeleteQuestion = () => {
        const updatedQuiz = {...quizData};
        updatedQuiz.questions = updatedQuiz.questions.filter((q) => q.id !== props.questionData.id);
        localStorage.setItem(props.testName.replace(/\s/g, ""), JSON.stringify(updatedQuiz));
        props.updateCallback(updatedQuiz);
    }

    const handleAddAnswer = () => {
        const updatedQuiz = { ...quizData };
        const indexOfQuestion = updatedQuiz.questions.findIndex((q) => q.id === props.questionData.id);
        updatedQuiz.questions[indexOfQuestion].answers.push("");
        setAnswers(prevAnswers => [...prevAnswers, ""]);
        localStorage.setItem(props.testName.replace(/\s/g, ""), JSON.stringify(updatedQuiz));
    };

    const handleDeleteAnswer = (index: number) => {
        const updatedQuiz = { ...quizData };
        const indexOfQuestion = updatedQuiz.questions.findIndex((q) => q.id === props.questionData.id);
        updatedQuiz.questions[indexOfQuestion].answers = updatedQuiz.questions[indexOfQuestion].answers.filter((a,i) => i !== index);
        setAnswers(prevAnswers => prevAnswers.filter((_, i) => i !== index));
        localStorage.setItem(props.testName.replace(/\s/g, ""), JSON.stringify(updatedQuiz));
    };

    return (
        <>
            <div>Question: 
                <input 
                    type="text" 
                    defaultValue={props.questionData.question} 
                    ref={questionRef}
                /> 
                <button onClick={handleChangeQuestion}>Save</button>
                <button onClick={handleDeleteQuestion}>Delete</button>
            </div>
            {answers.map((a, i) => (
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
                    <button onClick={() => handleChangeAnswerText(i)}>Save</button>
                    <button onClick={() => handleDeleteAnswer(i)}>Delete</button>
                </div>
            ))}
            <button onClick={handleAddAnswer}>Add Answer</button>
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