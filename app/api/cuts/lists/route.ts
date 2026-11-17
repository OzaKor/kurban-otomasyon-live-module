import { apiUrl } from "@/lib/axios";
import { NextResponse, NextRequest } from "next/server";
import axios from "axios";
import {
  backendHeaders,
  getBearerToken,
  proxyErrorResponse,
  unauthorizedResponse,
} from "@/lib/proxy";

const url = `${apiUrl}/live/cuts/lists`;

const emptyList = {
  message: "Veri bulunamadı",
  data: {
    process: false,
    cutLists: [],
    total_count: 0,
  },
};

export async function GET(request: NextRequest) {
  const authorization = getBearerToken(request);
  if (!authorization) {
    return unauthorizedResponse();
  }

  try {
    const limit = request.nextUrl.searchParams.get("limit") || 20;
    const response = await axios.get(url, {
      params: {
        limit,
      },
      headers: backendHeaders(authorization),
    });

    const dt = response.data;
    if (response.status === 200 && dt.process) {
      return NextResponse.json({
        data: {
          cutLists: dt.data,
          total_count: dt.total_count,
        },
      });
    }

    return NextResponse.json(emptyList, { status: 200 });
  } catch (error) {
    return proxyErrorResponse(error, "Kesim listesi alınamadı");
  }
}
