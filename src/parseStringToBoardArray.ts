import { EType } from 'src/interfaces/EType'
import parseListToBoardArray from './parseListToBoardArray'

const parseStringToBoardArray = (tilesString: string): Array<EType[]> => {
  // @ts-ignore
  const tilesList: EType[] = Array.from(tilesString)
  return parseListToBoardArray(tilesList)
}

export default parseStringToBoardArray
