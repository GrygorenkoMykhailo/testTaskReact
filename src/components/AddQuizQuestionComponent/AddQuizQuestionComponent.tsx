import { useState } from "react"

export const AddQuizQuestionComponent = () => {
    const [id, setId] = useState(0);
    const [answers, setAnswers] = useState<string[]>(["",]);

    const handleAddAnswer = () => {

    }

    return (
        <div>
            New question:<input 
                type="text" 
                name="" 
                id="" 
                />
            <br />
            {answers.map((a,i) => {
                return (
                    <div key={i}>
                        <input 
                            type="text" 
                            name="" 
                            id="" 
                            defaultValue={a}
                            />
                        <input 
                            type="radio" 
                            name="" id="" 
                            />
                        <button onClick={handleAddAnswer}>+</button>
                    </div>
                )
            })}
        </div>
    )
}
/*
<input 
                type="text" 
                name="" 
                id="" 
                />
            <input 
                type="radio" 
                name="" id="" 
                />
            <button>+</button>
*/