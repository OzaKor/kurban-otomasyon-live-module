import { apiUrl } from "@/lib/axios";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import {
  backendHeaders,
  getBearerToken,
  proxyErrorResponse,
  unauthorizedResponse,
} from "@/lib/proxy";

const url = `${apiUrl}/live/cuts/slaughter-animal-skip`;

export async function POST(request: NextRequest) {
  const authorization = getBearerToken(request);
  if (!authorization) {
    return unauthorizedResponse();
  }

  try {
    const body = await request.json();
    const response = await axios.post(url, body, {
      headers: backendHeaders(authorization),
    });

    return NextResponse.json({
      cut: response.data,
    });
  } catch (error) {
    return proxyErrorResponse(error, "Kesim atlama işlemi başarısız");
  }
}
