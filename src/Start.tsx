import { Button } from '@chakra-ui/react'
import { useQuestionsStore } from './store/questions'
import { LIMIT_QUESTIONS } from './constants/limit'

export const Start = () => {
  const fetchQuestions = useQuestionsStore((state) => state.fetchQuestions)

  const handleStart = () => {
    fetchQuestions(LIMIT_QUESTIONS)
  }
  return (
    <Button onClick={handleStart} variant="surface" colorPalette={'yellow'} size="lg" mt={5}>
      ¡Empezar!
    </Button>
  )
}
