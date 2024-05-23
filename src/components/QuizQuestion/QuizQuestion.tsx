import { QuizQuestionType } from "../../types"
import { useEffect } from "react";

export const QuizQuestion = (props: { questionData: QuizQuestionType, callback: (answer: string) => void }) => {

    useEffect(() => {
        const defaultAnswer = document.querySelector('input[name="answer"]:checked') as HTMLInputElement;
        if (defaultAnswer) {
            props.callback(defaultAnswer.value);
        }
    }, [props]); 

    return (
        <div>
          <p>{props.questionData.question}</p>
          <ul>
            {props.questionData.answers.map((answer, index) => (
              <li key={index}>
                <input type="radio" name="answer" value={answer} onChange={(e) => props.callback(e.target.value)}/>
                <label htmlFor={`answer${index}`}>{answer}</label>
              </li>
            ))}
          </ul>
        </div>
      );
}