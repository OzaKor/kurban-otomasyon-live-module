import { apiUrl } from "@/lib/axios";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import logger from "@/lib/logger";

const url = `${apiUrl}/live/cuts/slaughter-animal-skip`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    logger("body: ", body);

    const response = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    return NextResponse.json({
      cut: response.data,
    });
  } catch (error) {
    logger(`error ${apiUrl}: `, error);

    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {
          message: error.response?.data?.message || "Internal server error",
          errors: error.response?.data?.errors,
        },
        { status: error.response?.status || 500 },
      );
    }
  }
}
