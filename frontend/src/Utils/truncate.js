export const truncateString = (str, maxLength) => {
  if (!str) return '';  // Handle undefined/null
  return str.length > maxLength 
    ? str.slice(0, maxLength) + "..." 
    : str;
}