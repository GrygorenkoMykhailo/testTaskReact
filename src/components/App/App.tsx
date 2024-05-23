import { QuizType } from "../../types"

const getStartQuizes = () => {
  if(localStorage.length === 0){
    const names = ["HtmlCssQuiz", "JavascriptQuiz, ReactQuiz"];
    localStorage.names = names;
  
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
}

export const App = () => {
  getStartQuizes();
  return (
    <>
        
    </>
  )
}

