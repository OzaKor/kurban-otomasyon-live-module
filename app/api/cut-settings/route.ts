import { apiUrl } from "@/lib/axios";
import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  try {
    const url = `${apiUrl}/live-cut-settings`;
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