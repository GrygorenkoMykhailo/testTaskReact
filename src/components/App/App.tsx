import { QuizType } from "../../types"
import { QuizListComponent } from "../QuizListComponent/QuizListComponent";
import { QuizComponent } from "../QuizComponent";
import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import { EditQuizComponent } from "../EditQuizComponent";
import { ErrorComponent } from "../../ErrorComponent";

const getStartQuizes = () => {
    const ids = [1, 2, 3];
    localStorage.ids = JSON.stringify(ids);
  
    ids.forEach(async (n) => {
      try{
        const response = await fetch(n + '.json');
  
        if(!response.ok) 
          throw new Error("failed to fetch local files");
  
        const data: QuizType = await response.json();
        localStorage.setItem(n + '', JSON.stringify(data));
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
          <Route path="/quiz/:id" element= {<QuizComponent/>} errorElement={<ErrorComponent/>}/>    
          <Route path="/edit/:id" element= {<EditQuizComponent/>} errorElement={<ErrorComponent/>}/>      
    </>
  )
)

export const App = () => {
  if(!localStorage["1"]){
    getStartQuizes();
  }
  return (
    <RouterProvider router={router}/>
  )
}
