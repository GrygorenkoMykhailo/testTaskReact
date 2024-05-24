import { useEffect } from "react";
import { QuizQuestionType } from "../../types";

export const QuizQuestionComponent = (props: { questionData: QuizQuestionType, callback: (answer: string) => void }) => {

    useEffect(() => {
        const defaultAnswer = document.querySelector('input[name="answer"]:checked') as HTMLInputElement;
        if (defaultAnswer) {
            props.callback(defaultAnswer.value);
        }
    }, [props]); 

    return (
        <div className="mb-4">
            <p className="text-xl font-semibold mb-2">{props.questionData.question}</p>
            <ul className="space-y-1">
                {props.questionData.answers.map((answer, index) => (
                    <li key={index} className="flex items-center bg-gray-200 p-2">
                        <input 
                            type="radio" 
                            name="answer" 
                            value={answer} 
                            id={`answer${index}`}
                            onChange={(e) => props.callback(e.target.value)}
                            className="mr-2"
                        />
                        <label htmlFor={`answer${index}`} className="text-lg">{answer}</label>
                    </li>
                ))}
            </ul>
        </div>
    );
};