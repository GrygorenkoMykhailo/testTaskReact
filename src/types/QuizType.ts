import { QuizQuestionType } from "./QuizQuestionType"

export type QuizType = {
    name: string,
    questions: QuizQuestionType[],
}