type LocalStorageToken = 'token' | 'refreshToken'

const getTokenFromLocalStorage = (
  selectedToken: LocalStorageToken
): string | null => {
  const token = localStorage.getItem(selectedToken)
  return token
}
export default getTokenFromLocalStorage
