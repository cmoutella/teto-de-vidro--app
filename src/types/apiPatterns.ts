export interface SuccessResponse<T> {
  timestamp: Date;
  data: T;
}

export interface FailedResponse<T> {
  error: number;
  message: T;
}
