export const formatDate = (date) => {
  if (!date) return 'N/A'
  
  const d = new Date(date)
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const year = String(d.getFullYear()).slice(-2)
  
  return `${month}/${day}/${year}`
}