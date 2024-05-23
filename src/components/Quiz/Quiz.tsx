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
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [secondsIntervalId, setSecondsIntervalId] = useState(0);
    const [minutesIntervalId, setMinutesIntervalId] = useState(0);
    

    useEffect(() => {
        const quizes: string[] = JSON.parse(localStorage.names);
        if (name && quizes.find(q => q.replace(/\s/g, "").toLowerCase() === name.toLowerCase())) {
            const data: QuizType = JSON.parse(localStorage[name]);
            setQuizData(data);
        }     
    }, [name]);

    useEffect(() => {
        setSecondsIntervalId(setInterval(() => {
            setSeconds(s => s + 1);
        }, 1000));
    
        setMinutesIntervalId(setInterval(() => {
            setSeconds(0);
            setMinutes(m => m + 1);
        }, 1000 * 60));
    }, []);

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
                <div>
                    Your time: {(minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds)}
                </div>
                <button onClick={() => handleNextQuestion(quizData.questions[currentQuestionIndex])}>
                    Next
                </button>
            </>
        );
    } else {
        clearInterval(secondsIntervalId);
        clearInterval(minutesIntervalId);
        return <ResultComponent score={score} answers={chosenAnswers} quizData={quizData} timeSpent={(minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds)}/>;
    }
};