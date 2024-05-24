import { Link } from "react-router-dom";
import { QuizType } from "../../types";

export const ResultComponent = (props: { score: number, answers: string[], quizData: QuizType, timeSpent: string }) => {
    let maxScore = 0;

    props.quizData.questions.forEach(q => {
        maxScore += q.points;
    });

    return (
        <div className="max-w-2xl mx-auto p-4 bg-white rounded shadow-md">
            <p className="text-lg mb-2">You spent <span className="font-semibold">{props.timeSpent}</span></p>
            <p className="text-lg mb-4">Score: <span className="font-semibold">{props.score}</span>/<span className="font-semibold">{maxScore}</span></p>
            <Link to="/" className="text-blue-500 hover:underline">Go to home page</Link>
            <h3 className="text-xl font-semibold mt-4 mb-2">Your answers:</h3>
            {props.quizData.questions.map((q, i) => {
                return (
                    <div key={i} className="mb-4">
                        <p className="font-semibold">{q.question}</p>
                        {q.answers.map((a, ii) => {
                            const isCorrectAnswer = props.answers[i] === q.correctAnswer;
                            const isChosenAnswer = props.answers[i] === a;
                            let style = '';

                            if(isChosenAnswer && isCorrectAnswer){
                                style = 'text-green-500';
                            }else if(isChosenAnswer && !isCorrectAnswer){
                                style = 'text-red-500';
                            }else{
                                style = 'text-gray-800';
                            }

                            return (
                                <div
                                    key={ii}
                                    className={`pl-4 ${style}`}
                                >
                                    {a}
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
};