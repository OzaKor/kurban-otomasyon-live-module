import { apiUrl } from "@/lib/axios";
import { NextResponse } from "next/server";
import axios from "axios";
import CutList from "@/types/cut-list";

const url = `${apiUrl}/live/cuts/lists`;

interface SuccessResponse {
  process: true;
  message: string;
  data: Array<{
    tbody: {
      cutting_sequence: string;
      patoc: string;
      slaughter_date: string;
      cut_type: string;
    };
    modal: {
      cut_info: {
        id: number;
        cutting_sequence: string;
        patoc: string;
        cut_type: string;
        slaughter_date: string;
      };
      animal_info: {
        ear_tag: string;
        animal_type: string;
        patoc: string;
        weight: string;
        gender: string;
      };
      customers: Array<{
        full_name: string;
        share_count: number;
        share_price: string;
        price: string;
        payment_remaining: string;
        payment_status: string;
        sub_shareholders: Array<{
          full_name: string;
          share_count: string;
        }>;
      }>;
    };
  }>;
}

interface ErrorResponse {
  process: false;
  message: string;
  data: [] | null | undefined; 
}

type ApiResponse = SuccessResponse | ErrorResponse;

export async function GET() {
  try {
    const response = await axios.get<ApiResponse>(url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (response.status === 200) {
      if (response.data.process === true) {
        const successData = response.data as SuccessResponse;

        if (successData.data && successData.data.length > 0) {
          const cutDt: CutList[] = successData.data.map((item, index) => ({
            index: index + 1,
            patoc: item.tbody.patoc,
            time: item.tbody.slaughter_date,
            type: item.tbody.cut_type,
          }));

          return NextResponse.json(
            {
              data: cutDt,
            },
            { status: 200 }
          );
        } else {
          return NextResponse.json(
            { message: "Kesim listesi boş.", data: [] },
            { status: 200 }
          );
        }
      } else {
        return NextResponse.json(
          {
            message: response.data.message || "Kesim işlemi devam etmiyor",
            data: [],
          },
          { status: 200 } 
        );
      }
    } else {
      return NextResponse.json(
        { message: "API'den beklenmeyen yanıt kodu", data: [] },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error("Kesim ayarları hatası: ", error);

    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {
          message: error.response?.data?.message || "API bağlantı hatası",
          error: error.message,
          data: [],
        },
        { status: error.response?.status || 500 }
      );
    }

    return NextResponse.json(
      { message: "Sunucu hatası oluştu", data: [] },
      { status: 500 }
    );
  }
}
