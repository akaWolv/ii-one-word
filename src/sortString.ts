const sortString = (str: string) => str.split('').sort((a, b) => a.localeCompare(b)).join('')
export default sortString
