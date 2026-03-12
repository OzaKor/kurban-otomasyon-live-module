import axios from "axios";

type ErrorPayload = {
  message?: string;
};

export default function getApiErrorMessage(
  error: unknown,
  fallbackMessage: string
): string {
  if (axios.isAxiosError(error)) {
    const responseData = error.response?.data as ErrorPayload | undefined;
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
