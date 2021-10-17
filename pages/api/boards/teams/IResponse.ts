import { EType } from 'src/interfaces/EType'

export type Data = {
  id: string
  decodedId: string
  starting: EType.Red | EType.Blue
  board: Array<EType[]>
}

export type DataError = {
  error: string
}
