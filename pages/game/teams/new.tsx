import type { GetServerSideProps } from 'next'

const New = () => {
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  // get new Board
  const resBoard = await fetch(`${process.env.APP_URL}/api/boards/teams`)
  const dataBoard = await resBoard.json()
  const { id: boardId } = dataBoard

  // get new Words
  const resWords = await fetch(`${process.env.APP_URL}/api/words`)
  const dataWords = await resWords.json()
  const { id: wordsId } = dataWords

  console.log(boardId, wordsId)

  // redirect to prepare
  const redirectUrl = new URL(`${process.env.APP_URL}/game/teams/prepare`)
  redirectUrl.searchParams.set('board', boardId)
  redirectUrl.searchParams.set('words', wordsId)

  console.log(redirectUrl.toString())
  res.writeHead(307, { Location: redirectUrl.toString() })
  res.end()

  return {
    props: {}
  }
}

export default New
