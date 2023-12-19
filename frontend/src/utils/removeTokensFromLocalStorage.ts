export const removeTokensFromLocalStorage = (): void => {
  localStorage.removeItem('token')
  localStorage.removeItem('refreshToken')
}
