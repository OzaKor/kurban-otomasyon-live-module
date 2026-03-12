import axios from "axios";

export type ApiErrorShape = {
  status: number;
  message: string;
  errors?: unknown;
};

type ApiErrorPayload = {
  message?: string;
  errors?: unknown;
};

export function extractApiErrorMessage(
  error: unknown,
  fallbackMessage: string
): string {
  if (axios.isAxiosError(error)) {
    const responseData = error.response?.data as ApiErrorPayload | undefined;
    if (typeof responseData?.message === "string" && responseData.message.trim()) {
      return responseData.message;
    }

    if (error.message.trim()) {
      return error.message;
    }
  }

  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }

  return fallbackMessage;
}

export function normalizeApiError(
  error: unknown,
  fallbackMessage: string,
  fallbackStatus = 500
): ApiErrorShape {
  if (axios.isAxiosError(error)) {
    const responseData = error.response?.data as ApiErrorPayload | undefined;

    return {
      status: error.response?.status ?? fallbackStatus,
      message: extractApiErrorMessage(error, fallbackMessage),
      errors: responseData?.errors,
    };
  }

  return {
    status: fallbackStatus,
    message: extractApiErrorMessage(error, fallbackMessage),
  };
}

