export const useDueDateStatus = (dueDateStr: string): string => {
  const dueDate = new Date(dueDateStr)
  const today = new Date()

  dueDate.setHours(0, 0, 0, 0)
  today.setHours(0, 0, 0, 0)

  if (dueDate < today) return 'due-past'
  if (dueDate.getTime() === today.getTime()) return 'due-today'
  return ''
}
