export interface SuccessResponse<T> {
  timestamp: Date
  data: T
}

export interface FailedResponse<T> {
  error: number
  message: T
}

export interface PaginatedData<T> {
  list: T[]
  totalItems: number
  totalPages: number
  currentPage: number
  perPage: number
}
