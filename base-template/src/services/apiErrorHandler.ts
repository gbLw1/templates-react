import { AxiosError, isAxiosError } from "axios";
import { ServiceResult } from "../interfaces";

export default function ApiErrorHandler(error: Error | AxiosError): string {
  if (
    isAxiosError(error) &&
    error.response!.status >= 400 &&
    error.response!.status < 500
  ) {
    const result: ServiceResult = error.response?.data;

    return result.messages?.map((m: any) => "➡️ " + m.message).join("\n\n");
  }

  return "Ocorreu um erro inesperado. Tente novamente mais tarde.";
}
