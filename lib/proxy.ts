import axios from "axios";
import { NextResponse } from "next/server";
import logger from "@/lib/logger";

/*
 * Vekil (proxy) uçlar için ortak yardımcılar — tespit J.
 *
 * Laravel'deki canlı kesim uçları (lists, dialog, slaughter-animal, slaughter-animal-skip,
 * cut-settings PUT) artık giriş jetonu + cuttings.live-operate izni istiyor.
 * - İstemcinin Bearer jetonu olduğu gibi Laravel'e iletilir.
 * - Jeton yoksa Laravel'e hiç gidilmeden 401 döner.
 * - Laravel'in durum kodu (401/403/422…) ve mesajı istemciye aynen geçirilir.
 */

export function getBearerToken(request: Request): string | null {
  const header = request.headers.get("Authorization");
  if (!header || !header.startsWith("Bearer ")) {
    return null;
  }

  const token = header.slice("Bearer ".length).trim();
  if (!token || token === "null" || token === "undefined") {
    return null;
  }

  return header;
}

export function unauthorizedResponse() {
  return NextResponse.json(
    { message: "Oturum bulunamadı, lütfen giriş yapın" },
    { status: 401 },
  );
}

export function backendHeaders(authorization?: string) {
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(authorization ? { Authorization: authorization } : {}),
  };
}

export function proxyErrorResponse(
  error: unknown,
  context: string,
  fallbackMessage = "Sunucu hatası oluştu",
) {
  if (axios.isAxiosError(error)) {
    // Jeton/kişisel veri loglanmaz: yalnız durum kodu ve hata metni.
    logger(`${context}:`, error.response?.status ?? error.code, error.message);

    if (error.response) {
      const data = error.response.data as
        | { message?: unknown; errors?: unknown }
        | undefined;
      const message =
        typeof data?.message === "string" && data.message.trim()
          ? data.message
          : fallbackMessage;

      return NextResponse.json(
        { message, errors: data?.errors },
        { status: error.response.status },
      );
    }

    return NextResponse.json(
      { message: "Sunucuya bağlanılamadı" },
      { status: 503 },
    );
  }

  logger(`${context}:`, error instanceof Error ? error.message : error);
  return NextResponse.json({ message: fallbackMessage }, { status: 500 });
}
