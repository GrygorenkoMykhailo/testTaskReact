import { QuizQuestionType } from "./QuizQuestionType"

export type QuizType = {
    id: number
    name: string,
    questions: QuizQuestionType[],
}