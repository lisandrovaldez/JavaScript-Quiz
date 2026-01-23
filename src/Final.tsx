import { Button, Container, Stack } from '@chakra-ui/react'
import { useQuestionsData } from './hooks/useQuestionsData'
import { LIMIT_QUESTIONS } from './constants/limit'
import { useQuestionsStore } from './store/questions'

export const Final = () => {
  const { correct } = useQuestionsData()
  const reset = useQuestionsStore((state) => state.reset)

  const handleReset = () => {
    reset()
  }
  return (
    <Container
      position="absolute"
      top={0}
      placeContent="center"
      display="flex"
      w="100vw"
      h="100vh"
      backdropFilter="blur(1px)"
      background="blackAlpha.500"
    >
      <Stack
        w="fit-content"
        placeSelf="center"
        placeItems="center"
        p={4}
        bgColor="colorPalette.900"
        borderRadius="md"
      >
        <h2>Has completado el quiz de JavaScript</h2>
        <p>
          Tu calificación es de {correct} / {LIMIT_QUESTIONS}
        </p>
        <Button onClick={handleReset} variant="surface" colorPalette={'yellow'} size="sm" mt={2}>
          Volver a empezar
        </Button>
      </Stack>
    </Container>
  )
}
