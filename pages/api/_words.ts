// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  words: string[][]
}

export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
  res.status(200).json(
    {
      words: [
        ['twardy', 'auto', 'lampka', 'trąbka', 'syrena'],
        ['ponton', 'targ', 'torba', 'warszawa', 'bieg'],
        ['festiwal', 'osa', 'kogut', 'funkcja', 'cytryna'],
        ['warsztat', 'dzwonek', 'fajka', 'warunek', 'magia'],
        ['węgiel', 'kreda', 'słowo', 'miesiąc', 'łabędź']
      ]
    }
  )
}
