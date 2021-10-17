const parseListToBoardArray = (list: any[]): Array<any[]> => {
  const board: Array<any[]> = []
  for (let i = 0; i < 5; i++) {
    board.push(list.slice(i * 5, (i + 1) * 5))
  }
  return board
}

export default parseListToBoardArray
