export const showToast = (message: string, type: 'error' | 'success' | 'info' = 'error') => {
  alert(`${type.toUpperCase()}: ${message}`)
}
