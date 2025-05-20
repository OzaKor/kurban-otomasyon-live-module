import { apiUrl } from "@/lib/axios";
import { NextResponse } from "next/server";
import axios from "axios";
import useUserStore from "@/store/useUserStore";

export async function GET(request: Request) {
  try {
    const url = `${apiUrl}/live-cut-settings`;
    const { userToken } = useUserStore.getState();
    if (!userToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.log("error cut setting: ", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
