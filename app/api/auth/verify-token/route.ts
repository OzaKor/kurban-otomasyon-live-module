import { apiUrl } from "@/lib/axios";
import { NextResponse } from "next/server";
import axios from "axios";
import useUserStore from "@/store/useUserStore";

export async function GET() {
  try {
    const { userToken } = useUserStore.getState();

    if (!userToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const response = await axios.get(`${apiUrl}/verify-token`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error(
      "Token verification error:",
      error instanceof Error ? error.message : "Unknown error"
    );

    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }

      return NextResponse.json(
        {
          message: error.response?.data?.message || "Internal server error",
          errors: error.response?.data?.errors,
        },
        { status: error.response?.status || 500 }
      );
    }

    // For non-Axios errors
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
