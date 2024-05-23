import { QuizType } from "../../types"
import { QuizList } from "../QuizList/QuizList";
import { Quiz } from "../Quiz";
import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import { EditQuizComponent } from "../EditQuizComponent";

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

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
          <Route path="/" element= {<QuizList/>}></Route>
          <Route path="/quiz/:name" element= {<Quiz/>}/>    
          <Route path="/edit/:name" element= {<EditQuizComponent/>}/>    
    </>
  )
)

export const App = () => {
  if(localStorage.length === 0){
    getStartQuizes();
  }
  return (
    <RouterProvider router={router}/>
  )
}
