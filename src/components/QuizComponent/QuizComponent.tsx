import { QuizQuestionType } from "../../types";
import { useParams } from "react-router";
import { QuizQuestionComponent } from "../QuizQuestionComponent";
import { useState, useEffect } from "react";
import { ResultComponent } from "../ResultComponent";
import { useQuiz } from "../../hooks";

export const QuizComponent = () => {
    const name = useParams().name;

    if(!name || !JSON.parse(localStorage.names).find((n: string) => n === name)){
        throw new Error();
    }

    const [quizData] = useQuiz(name);

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentAnswer, setCurrentAnswer] = useState("");

    const [chosenAnswers, setChosenAnswers] = useState<string[]>([]);
    const [score, setScore] = useState(0);

    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [secondsIntervalId, setSecondsIntervalId] = useState(0);
    const [minutesIntervalId, setMinutesIntervalId] = useState(0);

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
    if(quizData === null){
        return <>Loading...</>
    }
    else{
        const questionsAmount = quizData.questions.length;

    if (currentQuestionIndex < questionsAmount) {
        return (
            <div className="max-w-4xl mx-auto p-4 bg-white rounded shadow-md">
                <h1 className="text-3xl font-bold mb-4">{quizData.name}</h1>
                <p className="text-lg mb-4">Question {currentQuestionIndex + 1} of {questionsAmount}</p>
                <QuizQuestionComponent
                    questionData={quizData.questions[currentQuestionIndex]}
                    callback={setCurrentAnswer}
                />
                <div className="mt-4 mb-4">
                    <p className="text-lg">Your time: {(minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds)}</p>
                </div>
                <button 
                    className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                    onClick={() => handleNextQuestion(quizData.questions[currentQuestionIndex])}
                >
                    Next
                </button>
            </div>
        );
    } else {
        clearInterval(secondsIntervalId);
        clearInterval(minutesIntervalId);
        return (
            <ResultComponent 
                score={score} 
                answers={chosenAnswers} 
                quizData={quizData} 
                timeSpent={(minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds)}
            />
        );
    }
    }
};