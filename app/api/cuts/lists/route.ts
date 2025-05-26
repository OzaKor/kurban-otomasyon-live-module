import { apiUrl } from "@/lib/axios";
import { NextResponse, NextRequest } from "next/server";
import axios from "axios";

const url = `${apiUrl}/live/cuts/lists`;

export async function GET(request: NextRequest) {
  try {
    const limit = request.nextUrl.searchParams.get("limit") || 20;
    const response = await axios.get(url, {
      params: {
        limit,
      },
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (response.status === 200) {
      const dt = response.data;
      if (dt.process) {
        console.log("response data: ", dt.data);
        return NextResponse.json(dt.data);
      }

      return NextResponse.json(
        {
          message: "Sunucu hatası oluştu",
          data: [],
          total_count: 0,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "Sunucu hatası oluştu",
        data: [],
        total_count: 0,
      },
      { status: 500 }
    );
  } catch (error) {
    console.error("Kesim ayarları hatası: ", error);

    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {
          message: error.response?.data?.message || "API bağlantı hatası",
          error: error.message,
          data: [],
          total_count: 0,
        },
        { status: error.response?.status || 500 }
      );
    }

    return NextResponse.json(
      {
        message: "Sunucu hatası oluştu",
        data: [],
        total_count: 0,
      },
      { status: 500 }
    );
  }
}
