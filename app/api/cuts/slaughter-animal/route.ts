import { apiUrl } from "@/lib/axios";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const url = `${apiUrl}/live/cuts/slaughter-animal`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("body: ", body);
    
    const response = await axios.post(url, body,{
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });   

    return NextResponse.json({
      cut: response.data,
    });
  } catch (error) {
    console.log(`error ${apiUrl}: `,error);
    
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {
          message: error.response?.data?.message || "Internal server error",
          errors: error.response?.data?.errors,
        },
        { status: error.response?.status || 500 }
      );
    }
  }
}

