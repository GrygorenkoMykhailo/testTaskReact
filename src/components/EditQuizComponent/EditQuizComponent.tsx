import { useParams } from "react-router";
import { QuizType } from "../../types";
import { useQuiz } from "../../hooks";
import { EditQuizQuestionComponent } from "../EditQuizQuestionComponent";
import { Link } from "react-router-dom";

export const EditQuizComponent = () => {
    const name = useParams().name;
    const quizData: QuizType | null = useQuiz(name);

    if (!name || !quizData) {
        return <>ErrorPage </>;
    }

    return (
        <>
            <h1>{quizData.name}</h1>
            <Link to="/">Go to home page</Link>
            {quizData.questions.map((q, i) => <EditQuizQuestionComponent questionData={q} key={i} testName={name}/>)}
        </>
    )
}   