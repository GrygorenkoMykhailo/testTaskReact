import { useState, useEffect } from "react";

export const useQuizNames = () => {
    const [names, setNames] = useState<string[] | null>([]);

    useEffect(() => {
        const currentNames = JSON.parse(localStorage.names) as string[];
        setNames(currentNames);
    }, [])
        
    const updateNames = (newNames: string[] | null) => {
        setNames(newNames);
    }
    return [names, updateNames] as [string[] | null, (newNames: string[] | null) => void];
}