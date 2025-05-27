export type SortField = 'priority' | 'status' | ''
export type SortDirection = 'asc' | 'desc'

export type SortOption = {
  field: SortField
  direction: SortDirection
}
