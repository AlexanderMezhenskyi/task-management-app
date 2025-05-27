export const showToast = (message: string, type: 'error' | 'success' = 'error') => {
  alert(`${type.toUpperCase()}: ${message}`)
}
