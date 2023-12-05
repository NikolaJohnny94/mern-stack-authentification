const getTokenFromLocalStorage = (): string | null => {
  const token = localStorage.getItem('token')
  return token
}
export default getTokenFromLocalStorage
