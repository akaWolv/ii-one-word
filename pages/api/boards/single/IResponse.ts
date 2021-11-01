import { EType } from 'src/interfaces/EType'

export type Data = {
  id: string
  decodedId: string
  board: Array<EType[]>
}

export type DataError = {
  error: string
}
