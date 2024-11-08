export const formatDateTime = (isoString: string) => {
  const date = new Date(isoString)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0') // Months are zero-based
  const year = date.getFullYear()
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  return `${day}-${month}-${year} ${hours}:${minutes}`
}

// export const toUTC = () => {
//   const localDate = new Date('2024-11-08T21:58:00+07:00')
//   const utcDate = new Date(localDate.getTime() - 7 * 60 * 60 * 1000)
//   return utcDate.toISOString()
// }
