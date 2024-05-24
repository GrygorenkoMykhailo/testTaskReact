import { QuizType } from "../../types"
import { QuizListComponent } from "../QuizListComponent/QuizListComponent";
import { QuizComponent } from "../QuizComponent";
import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import { EditQuizComponent } from "../EditQuizComponent";
import { ErrorComponent } from "../../ErrorComponent";

const getStartQuizes = () => {
    const names = ["HtmlCssQuiz", "JavascriptQuiz", "ReactQuiz"];
    localStorage.names = JSON.stringify(names);
  
    names.forEach(async (n) => {
      try{
        const response = await fetch(n + '.json');
  
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
          <Route path="/" element= {<QuizListComponent/>} errorElement={<ErrorComponent/>}></Route>
          <Route path="/quiz/:name" element= {<QuizComponent/>} errorElement={<ErrorComponent/>}/>    
          <Route path="/edit/:name" element= {<EditQuizComponent/>} errorElement={<ErrorComponent/>}/>    
    </>
  )
)

export const App = () => {
  if(!localStorage["HtmlCssQuiz"] || !localStorage["JavascriptQuiz"] || !localStorage["ReactQuiz"]){
    getStartQuizes();
  }
  return (
    <RouterProvider router={router}/>
  )
}
