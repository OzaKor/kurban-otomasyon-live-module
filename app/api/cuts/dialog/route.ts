import { apiUrl } from "@/lib/axios";
import { NextResponse } from "next/server";
import axios from "axios";

const url = `${apiUrl}/live/cuts/dialog`;

export async function GET() {
    try {
        const response = await axios.get(url,{
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });

        return NextResponse.json(response.data);
    } catch (error) {
        console.error("Kesim dialog bilgileri alınırken hata oluştu:", error);
        return NextResponse.json(
            { message: "Sunucu hatası oluştu" },
            { status: 500 }
        );
    }
}