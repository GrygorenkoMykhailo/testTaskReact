
import { useNavigate } from "react-router"

export const ResultComponent = (props: {score: number}) => {
    const navigate = useNavigate();
    return (
        <>
            Score: {props.score}
            <button onClick={() => navigate('/')}>Go to home page</button>
        </>
    )
}