import { apiUrl } from "@/lib/axios";
import { NextResponse } from "next/server";
import axios from "axios";
import {
  backendHeaders,
  getBearerToken,
  proxyErrorResponse,
  unauthorizedResponse,
} from "@/lib/proxy";

const url = `${apiUrl}/live/cut-settings`;

// Ayar okuma herkese açık (ad/borç döndürmez) — jeton istenmez.
export async function GET() {
  try {
    const response = await axios.get(url, {
      headers: backendHeaders(),
    });

    return NextResponse.json(response.data);
  } catch (error) {
    return proxyErrorResponse(error, "Kesim ayarları alınamadı");
  }
}

// Ayar güncelleme: jeton + cuttings.live-operate izni (Laravel denetler).
export async function PUT(request: Request) {
  const authorization = getBearerToken(request);
  if (!authorization) {
    return unauthorizedResponse();
  }

  try {
    const body = await request.json();
    const response = await axios.put(url, body, {
      headers: backendHeaders(authorization),
    });

    return NextResponse.json(response.data);
  } catch (error) {
    return proxyErrorResponse(error, "Kesim ayarları güncellenemedi");
  }
}
