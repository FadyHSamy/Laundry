import { HttpHeaders } from '@capacitor/core';

export interface errorResponse {
  error: {
    success: boolean;
    responseData: any | null;
    message: string;
    errorDetails: any | null;
  };
  headers?: HttpHeaders;
  status?: number;
  statusText?: string;
  url?: string;
}
