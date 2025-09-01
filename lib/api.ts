import { ErrorResponse } from '@/types';

export class ApiError extends Error {
  body: ErrorResponse;

  constructor(body: ErrorResponse) {
    super(body.message);
    this.name = 'ApiError';
    this.body = body;
  }
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api';

async function apiRequest<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);

    if (!response.ok) {
      const errorBody: ErrorResponse = await response.json();
      throw new ApiError(errorBody);
    }

    if (response.status === 204) {
      return undefined as unknown as T;
    }

    return response.json() as Promise<T>;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    console.error(`Error de red o de parseo en la petición a ${url}:`, error);
    throw new Error('Error de conexión con el servidor.');
  }
}

export const api = {
  get: <T>(endpoint: string, options?: RequestInit) =>
    apiRequest<T>(endpoint, { ...options, method: 'GET' }),

  post: <T>(endpoint: string, body?: any, options?: RequestInit) =>
    apiRequest<T>(endpoint, { ...options, method: 'POST', body: JSON.stringify(body || {}) }),

  put: <T>(endpoint: string, body: any, options?: RequestInit) =>
    apiRequest<T>(endpoint, { ...options, method: 'PUT', body: JSON.stringify(body || {}) }),

  del: <T>(endpoint: string, options?: RequestInit) =>
    apiRequest<T>(endpoint, { ...options, method: 'DELETE' }),
};
