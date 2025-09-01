export interface SuccessResponse<T> {
  status: 'success';
  statusCode: number;
  message: string;
  data: T;
}

export interface ErrorResponse {
  status: 'error';
  statusCode: number;
  path: string;
  timestamp: string;
  errorCode: string;
  message: string;
  fields?: string[];
}

export interface Menu {
  id: string;
  name: string;
  icon: string;
  parent: string | null;
}
