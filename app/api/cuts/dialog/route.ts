import { apiUrl } from "@/lib/axios";
import { NextResponse } from "next/server";
import axios from "axios";
import {
  backendHeaders,
  getBearerToken,
  proxyErrorResponse,
  unauthorizedResponse,
} from "@/lib/proxy";

const url = `${apiUrl}/live/cuts/dialog`;

export async function GET(request: Request) {
  const authorization = getBearerToken(request);
  if (!authorization) {
    return unauthorizedResponse();
  }

  try {
    const response = await axios.get(url, {
      headers: backendHeaders(authorization),
    });

    return NextResponse.json(response.data);
  } catch (error) {
    return proxyErrorResponse(
      error,
      "Kesim dialog bilgileri alınırken hata oluştu",
    );
  }
}
