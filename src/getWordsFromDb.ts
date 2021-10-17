const getWordsFromDb = (db: string[], idList: number[]): string[] => {
  const result: string[] = []
  idList.forEach(i => {
    result.push(db[i])
  })
  return result
}

export default getWordsFromDb
