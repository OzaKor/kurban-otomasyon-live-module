import { apiUrl } from "@/lib/axios";
import { NextResponse } from "next/server";
import axios from "axios";

const url = `${apiUrl}/live/cuts/counter`;

export async function GET() {
  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    console.log("response.data: ", response.data);

    if (response.data.process) {
      return NextResponse.json({
        data: response.data.data
      });
    }

    return NextResponse.json(
      { message: "Sunucu hatası oluştu" },
      { status: 500 }
    );
  } catch (error) {
    console.error("Error fetching counter:", error);
    return NextResponse.json(
      { message: "Sunucu hatası oluştu" },
      { status: 500 }
    );
  }
}
