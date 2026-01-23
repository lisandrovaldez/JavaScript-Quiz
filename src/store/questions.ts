import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { type Question } from '../types'

interface QuestionsState {
  questions: Question[]
  currentQuestion: number
  fetchQuestions: (limit: number) => void
  selectAnswer: (questionId: number, answerIndex: number) => void
  goNextQuestion: () => void
  goPreviousQuestion: () => void
  reset: () => void
}

export const useQuestionsStore = create<QuestionsState>()(
  persist(
    (set, get) => ({
      questions: [],
      currentQuestion: 0,

      fetchQuestions: async (limit: number) => {
        const res = await fetch('http://localhost:5173/data.json')
        const json = await res.json()

        const questions = json.sort(() => Math.random() - 0.5).slice(0, limit)

        set({ questions, currentQuestion: 0 })
      },

      selectAnswer: (questionId: number, answerIndex: number) => {
        const { questions } = get()
        const newQuestions = structuredClone(questions)
        const questionIndex = newQuestions.findIndex((q) => q.id === questionId)

        const questionInfo = newQuestions[questionIndex]
        const isCorrectUserAnswer = answerIndex === questionInfo.correctAnswer

        newQuestions[questionIndex] = {
          ...questionInfo,
          isCorrect: isCorrectUserAnswer,
          userAnswer: answerIndex,
        }

        set({ questions: newQuestions })
      },

      goNextQuestion: () => {
        const { questions, currentQuestion } = get()
        const nextQuestion = currentQuestion + 1

        if (nextQuestion < questions.length) {
          set({ currentQuestion: nextQuestion })
        }
      },

      goPreviousQuestion: () => {
        const { currentQuestion } = get()
        const previousQuestion = currentQuestion - 1

        if (previousQuestion >= 0) {
          set({ currentQuestion: previousQuestion })
        }
      },
      reset: () => {
        set({ questions: [], currentQuestion: 0 })
      },
    }),
    {
      name: 'questions',
    }
  )
)
