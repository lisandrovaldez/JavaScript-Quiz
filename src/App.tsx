import { Container, HStack } from '@chakra-ui/react'
import './App.css'
import { JavaScriptLogo } from './assets/JavaScriptLogo'
import { Start } from './Start'
import { Game } from './Game'
import { useQuestionsStore } from './store/questions'
// import { Final } from './Final'
// import { useQuestionsData } from './hooks/useQuestionsData'

function App() {
  const questions = useQuestionsStore((state) => state.questions)
  // const { unanswered } = useQuestionsData()
  return (
    <main>
      <Container placeContent="center" placeItems="center" w="100vw" h="100vh" p={0}>
        <HStack>
          <JavaScriptLogo />
          <h1 style={{ fontSize: '2rem' }}>JavaScript Quiz</h1>
        </HStack>

        {questions.length === 0 && <Start />}
        {questions.length > 0 && <Game />}
        {/* {questions.length > 0 && unanswered === 0 && <Final />} */}
      </Container>
    </main>
  )
}

export default App
