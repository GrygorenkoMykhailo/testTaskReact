import { QuizQuestionType, QuizType } from "../../types";
import { useParams } from "react-router";
import { QuizQuestion } from "../QuizQuestion";
import { useState, useEffect } from "react";
import { ResultComponent } from "../ResultComponent";

export const Quiz = () => {
    const name = useParams().name;
    const [quizData, setQuizData] = useState<QuizType | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentAnswer, setCurrentAnswer] = useState("");
    const [chosenAnswers, setChosenAnswers] = useState<string[]>([]);
    const [score, setScore] = useState(0);

    useEffect(() => {
        const quizes: string[] = JSON.parse(localStorage.names);
        if (name && quizes.find(q => q.replace(/\s/g, "").toLowerCase() === name.toLowerCase())) {
            const data: QuizType = JSON.parse(localStorage[name]);
            setQuizData(data);
        }
    }, [name]);

    const handleNextQuestion = (currentQuestion: QuizQuestionType) => {
        setCurrentQuestionIndex(prev => prev + 1);
        if (currentAnswer === currentQuestion.correctAnswer) {
            setScore(prev => prev + currentQuestion.points);
        }
        setChosenAnswers(prev => [...prev, currentAnswer]);
    };

    if (!quizData) {
        return <>ErrorPage </>;
    }

    const questionsAmount = quizData.questions.length;

    if (currentQuestionIndex < questionsAmount) {
        return (
            <>
                <h1>{quizData.name}</h1>
                <p>Question {currentQuestionIndex + 1} of {questionsAmount}</p>
                <QuizQuestion
                    questionData={quizData.questions[currentQuestionIndex]}
                    callback={setCurrentAnswer}
                />
                <button onClick={() => handleNextQuestion(quizData.questions[currentQuestionIndex])}>
                    Next
                </button>
            </>
        );
    } else {
        return <ResultComponent score={score} answers={chosenAnswers} quizData={quizData} />;
    }
};