import { Button, Stack } from '@chakra-ui/react'
import { useQuestionsData } from './hooks/useQuestionsData'
import { useQuestionsStore } from './store/questions'

export const Footer = () => {
  const { correct, incorrect, unanswered } = useQuestionsData()
  const reset = useQuestionsStore((state) => state.reset)

  const handleReset = () => {
    reset()
  }

  return (
    <footer style={{ marginTop: '0.5rem' }}>
      <Stack>
        <strong style={{ fontSize: '0.8rem' }}>
          ✅{correct} correctas - ❌{incorrect} incorrectas - ❓{unanswered} sin respuesta
        </strong>
        <Button onClick={handleReset} variant="surface" colorPalette={'yellow'} size="sm" mt={2}>
          Volver a empezar
        </Button>
      </Stack>
    </footer>
  )
}
