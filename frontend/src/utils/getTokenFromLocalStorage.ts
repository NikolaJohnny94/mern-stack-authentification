type LocalStorageToken = 'token' | 'refreshToken'

export const getTokenFromLocalStorage = (
  selectedToken: LocalStorageToken
): string | null => {
  const token = localStorage.getItem(selectedToken)
  return token
}
