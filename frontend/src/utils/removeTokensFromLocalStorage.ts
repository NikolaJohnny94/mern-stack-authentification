const removeTokensFromLocalStorage = (): void => {
  localStorage.removeItem('token')
  localStorage.removeItem('refreshToken')
}

export default removeTokensFromLocalStorage
