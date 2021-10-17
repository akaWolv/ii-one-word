import { EType } from 'src/interfaces/EType'

export type Data = {
  id: string
  decodedId: string
  boardPlayerA: Array<EType[]>
  boardPlayerB: Array<EType[]>
}

export type DataError = {
  error: string
}
