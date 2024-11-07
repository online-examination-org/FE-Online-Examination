export const formatDateTime = (isoString: string) => {
  const date = new Date(isoString)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0') // Months are zero-based
  const year = date.getFullYear()
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  return `${day}-${month}-${year} ${hours}:${minutes}`
}

export const toISOStringMinus7Hours = (dateString: string) => {
  const inputDate = new Date(dateString) // chuyển đổi string thành Date object
  console.log(inputDate)
  const adjustedDate = new Date(inputDate.getTime() - 7 * 60 * 60 * 1000) // trừ 7 giờ
  return adjustedDate.toISOString() // chuyển thành ISO string
}
