import { Card, Stack, RadioCard, IconButton, HStack, Container } from '@chakra-ui/react'
import { useQuestionsStore } from './store/questions'
import { type Question } from './types'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md'
import { Footer } from './Footer'

const getBackgroundColor = (info: Question, index: number) => {
  const { correctAnswer, userAnswer } = info
  if (userAnswer === undefined) return 'transparent'
  if (index !== correctAnswer && index !== userAnswer) return 'transparent'
  if (index === correctAnswer) return 'green.600'
  if (index === userAnswer) return 'red.600'
  return 'transparent'
}

const Question = ({ info }: { info: Question }) => {
  const selectAnswer = useQuestionsStore((state) => state.selectAnswer)
  const handleAnswer = (answerIndex: number) => () => {
    selectAnswer(info.id, answerIndex)
  }
  return (
    <Card.Root p={4} gap={2} mt={2} minW={350}>
      <Card.Title> {info.question} </Card.Title>
      {info.code && (
        <SyntaxHighlighter language="javascript" style={nightOwl}>
          {info.code}
        </SyntaxHighlighter>
      )}
      <RadioCard.Root orientation="vertical" variant="surface">
        <Stack mt={4}>
          {info.answers.map((answer, index) => (
            <RadioCard.Item
              value={answer}
              key={index}
              pointerEvents={info.userAnswer !== undefined ? 'none' : 'auto'}
              backgroundColor={getBackgroundColor(info, index)}
            >
              <RadioCard.ItemHiddenInput />
              <RadioCard.ItemControl onClick={handleAnswer(index)}>
                <RadioCard.ItemText>{answer}</RadioCard.ItemText>
              </RadioCard.ItemControl>
            </RadioCard.Item>
          ))}
        </Stack>
      </RadioCard.Root>
    </Card.Root>
  )
}

export const Game = () => {
  const questions = useQuestionsStore((state) => state.questions)
  const currentQuestion = useQuestionsStore((state) => state.currentQuestion)
  const goNextQuestion = useQuestionsStore((state) => state.goNextQuestion)
  const goPreviousQuestion = useQuestionsStore((state) => state.goPreviousQuestion)
  const questionInfo = questions[currentQuestion]
  return (
    <Container
      justifyContent="center"
      alignItems="center"
      mt={5}
      p={0}
      placeItems="center"
      maxW={350}
      minH={550}
    >
      <HStack>
        <IconButton
          variant="ghost"
          bgColor="transparent"
          borderRadius="full"
          onClick={goPreviousQuestion}
        >
          <MdArrowBackIosNew />
        </IconButton>
        {currentQuestion + 1}/{questions.length}
        <IconButton
          variant="ghost"
          bgColor="transparent"
          borderRadius="full"
          onClick={goNextQuestion}
        >
          <MdArrowForwardIos />
        </IconButton>
      </HStack>
      <Question info={questionInfo} />
      <Footer />
    </Container>
  )
}
