export interface Notification {
  type: number;
  field: string | null;
  message: string | null;
}

export interface ApiResponse<T = unknown> {
  content: T | null;
  notifications: Notification[] | null;
  traceId: string | null;
  transactionDate: string;
}
