import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Logo from "@/components/layout/logo";

const fakeData = {
  cut_info: {
    id: 381,
    cutting_sequence: "26",
    patoc: "Patok-3",
    cut_type: "Hayvan Payı",
    slaughter_date: "25.05.2025 20:19",
  },
  animal_info: {
    ear_tag: "26",
    animal_type: "SIMMENTAL",
    patoc: "Patok-3",
    weight: "60KG",
    gender: "Dişi",
  },
  customers: [
    {
      full_name: "Hakan KORKMAZ",
      share_count: 2,
      share_price: "₺26.000,00",
      price: "₺52.000,00",
      payment_remaining: "₺2.000,00",
      payment_status: "Ödenmedi",
      sub_shareholders: [
        {
          full_name: "Baba Korkmaz",
          share_count: "1",
        },
      ],
    },
  ],
};

const ManagerDialog = () => {
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[75vw] max-w-[90%] h-[75vh] max-h-[90%] md:w-[90vw] md:max-w-[90%] md:h-[100vh] md:max-h-[75%] overflow-auto flex flex-col p-0 [&>button]:hidden">
        {/* Modal Header with Logo */}
        <DialogHeader>
          <DialogTitle className="flex flex-col sm:flex-row sm:justify-between items-center py-6 px-10 border-b border-gray-100 w-full">
            <div className="flex items-center mb-4 sm:mb-0">
              <Logo />
            </div>
            <div className="flex flex-col items-center gap-2">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-700 text-center">
                {fakeData.cut_info.slaughter_date}
              </h1>
              <span className="text-xs text-gray-400">Kesim Tarihi</span>
            </div>
          </DialogTitle>
        </DialogHeader>

        <DialogDescription asChild>
          <div className="p-6 lg:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Sol Taraf - Kesim Bilgileri */}
              <div className="space-y-6">
                {/* Kesim Sırası */}
                <div className="flex flex-col items-center border-2 border-green-200 px-6 py-4 text-center rounded-lg bg-green-50">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-green-700">
                    {fakeData.cut_info?.cutting_sequence}
                  </h1>
                  <span className="text-base font-semibold text-gray-600 mt-2">
                    Kesim Sırası
                  </span>
                </div>

                {/* Kesim Bilgileri Başlığı */}
                <h4 className="font-bold text-green-800 text-xl text-center border-b border-green-200 pb-3">
                  Kesim Bilgileri
                </h4>

                {/* Kesim Detayları */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <div
                    className={cn(
                      "grid gap-6",
                      fakeData.animal_info?.weight
                        ? "grid-cols-2 xl:grid-cols-4"
                        : "grid-cols-2 xl:grid-cols-3"
                    )}
                  >
                    <div className="text-center">
                      <span className="text-sm text-gray-500 block mb-1">
                        Patok
                      </span>
                      <p className="font-bold text-gray-800 text-lg">
                        {fakeData.cut_info?.patoc}
                      </p>
                    </div>
                    <div className="text-center">
                      <span className="text-sm text-gray-500 block mb-1">
                        Kesim Türü
                      </span>
                      <p className="font-bold text-gray-800 text-lg">
                        {fakeData.cut_info?.cut_type}
                      </p>
                    </div>
                    <div className="text-center">
                      <span className="text-sm text-gray-500 block mb-1">
                        Hayvan Türü
                      </span>
                      <p className="font-bold text-gray-800 text-lg">
                        {fakeData.animal_info?.animal_type}
                      </p>
                    </div>
                    {fakeData.animal_info?.weight && (
                      <div className="text-center">
                        <span className="text-sm text-gray-500 block mb-1">
                          Ağırlık
                        </span>
                        <p className="font-bold text-gray-800 text-lg">
                          {fakeData.animal_info?.weight}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Sağ Taraf - Hissedarlar */}
              <div className="space-y-6">
                <h4 className="font-bold text-green-700 text-xl text-center border-b border-green-200 pb-3">
                  Hissedarlar
                </h4>

                {/* Hissedarlar Listesi */}
                <div className="space-y-4">
                  {fakeData.customers.map((customer, index) => (
                    <div
                      key={index}
                      className="border-l-4 border-green-500 pl-4 bg-gray-50 rounded-r-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="bg-white rounded-full p-2 shadow-sm">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6 text-gray-600"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                              />
                            </svg>
                          </div>
                          <div>
                            <p className="font-bold text-gray-800 text-lg">
                              {customer.full_name}
                            </p>
                            <div className="flex items-center gap-3 mt-1">
                              <span className="text-sm font-semibold text-gray-600">
                                {customer.price}
                              </span>
                              <span
                                className={cn(
                                  "text-xs px-3 py-1 rounded-full font-medium",
                                  customer.payment_status === "Ödendi"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                )}
                              >
                                {customer.payment_status}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="bg-green-600 text-white text-sm px-4 py-2 rounded-full font-bold">
                          {customer.share_count} hisse
                        </div>
                      </div>

                      {/* Alt Hissedarlar */}
                      {customer.sub_shareholders &&
                        customer.sub_shareholders.length > 0 && (
                          <div className="ml-10 space-y-2 border-l border-gray-300 pl-4">
                            {customer.sub_shareholders.map(
                              (subShareholder, subIndex) => (
                                <div
                                  key={subIndex}
                                  className="flex items-center justify-between py-2"
                                >
                                  <div className="flex items-center gap-2">
                                    <div className="bg-gray-200 rounded-full p-1">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 text-gray-500"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                      </svg>
                                    </div>
                                    <p className="text-gray-700 font-medium">
                                      {subShareholder.full_name}
                                    </p>
                                  </div>
                                  <div className="bg-green-500 text-white text-xs px-3 py-1 rounded-full font-bold">
                                    {subShareholder.share_count} hisse
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Detaylı Ödeme Bilgileri Tablosu */}
            <div className="mt-10 border-t border-gray-200 pt-8">
              <h4 className="font-bold text-green-700 mb-6 text-center text-xl">
                Ödeme Durumları
              </h4>
              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Hissedar
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Hisse Adedi
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Hisse Fiyatı
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Toplam
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Kalan Ödeme
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Durum
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {fakeData.customers.map((customer, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-bold text-gray-900">
                            {customer.full_name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-semibold">
                          {customer.share_count}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-semibold">
                          {customer.share_price}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-semibold">
                          {customer.price}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-semibold">
                          {customer.payment_remaining}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={cn(
                              "px-3 py-1 text-xs font-bold rounded-full",
                              customer.payment_status === "Ödendi"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            )}
                          >
                            {customer.payment_status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </DialogDescription>

        {/* Modal Footer - Butonlar */}
        <DialogFooter className="px-6 lg:px-8 pb-6">
          <div className="flex justify-between w-full gap-4">
            <Button
              onClick={() => setLoading(true)}
              disabled={loading}
              variant="destructive"
              size="lg"
              className="flex items-center gap-3 hover:opacity-80 transition-all hover:scale-105 hover:shadow-lg hover:shadow-red-500 hover:cursor-pointer active:scale-100 active:shadow-none active:opacity-100"
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
              <span>{loading ? "İşleniyor..." : "Hayvanı Kes"}</span>
            </Button>

            <DialogClose asChild>
              <Button
                onClick={() => setOpen(false)}
                variant="outline"
                size="lg"
                className="bg-gray-50  hover:opacity-80 transition-all hover:scale-105 hover:cursor-pointer active:scale-100 active:opacity-100"
              >
                Kapat
              </Button>
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ManagerDialog;
