import type { GetServerSideProps } from 'next'
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

const New = () => {
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  // get new Board
  const resBoard = await fetch(`${publicRuntimeConfig.APP_URL}/api/boards/single`)
  const dataBoard = await resBoard.json()
  const { id: boardId } = dataBoard

  // get new Words
  const resWords = await fetch(`${publicRuntimeConfig.APP_URL}/api/words`)
  const dataWords = await resWords.json()
  const { id: wordsId } = dataWords

  // redirect to prepare
  const redirectUrl = new URL(`${publicRuntimeConfig.APP_URL}/game/single/prepare`)
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
