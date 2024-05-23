import { QuizType } from "../../types"
import { QuizList } from "../QuizList/QuizList";

const getStartQuizes = () => {
    const names = ["HtmlCssQuiz", "JavascriptQuiz", "ReactQuiz"];
    localStorage.names = JSON.stringify(names);
  
    names.forEach(async (n) => {
      try{
        const response = await fetch('/public/' + n + '.json');
  
        if(!response.ok) 
          throw new Error("failed to fetch local files");
  
        const data: QuizType = await response.json();
        localStorage.setItem(n, JSON.stringify(data));
      }
      catch(ex){
        throw new Error("failed to fetch local files");
      }
    });
}

export const App = () => {
  getStartQuizes();
  return (
    <>
        <QuizList/>
    </>
  )
}
