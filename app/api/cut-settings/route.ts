import { apiUrl } from "@/lib/axios";
import { NextResponse } from "next/server";
import axios from "axios";
const url=`${apiUrl}/live/cut-settings`;
export async function GET() {
  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Kesim ayarları hatası: ", error);
    return NextResponse.json(
      { message: "Sunucu hatası oluştu" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const token= request.headers.get("Authorization");
    if (!token || !token.startsWith("Bearer")) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const body = await request.json();
    const response = await axios.put(url, body, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: token,
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Kesim ayarları hatası: ", error);
    return NextResponse.json(
      { message: "Sunucu hatası oluştu" },
      { status: 500 }
    );
  }
}