import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import Logo from "@/components/layout/logo";
import { cn } from "@/lib/utils";

const fakeData = {
  cut_info: {
    id: 383,
    cutting_sequence: "1011100",
    patoc: "Patok-2",
    cut_type: "Satış",
    slaughter_date: "25.05.2025 20:18",
  },
  animal_info: {
    ear_tag: "1011100",
    animal_type: "SIMMENTAL",
    patoc: "Patok-2",
    weight: null,
    gender: "Erkek",
  },
  customers: [
    {
      full_name: "Hakan KORKMAZ",
      share_count: 1,
      share_price: "₺100.000,00",
      price: "₺105.650,00",
      payment_remaining: "₺105.090,00",
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
    <Dialog open={open} modal={true} onOpenChange={setOpen}>
      <DialogContent className="w-full max-w-full max-h-[90vh] bg-white rounded-lg shadow-xl overflow-auto">
        <DialogHeader>
          <DialogTitle className="flex flex-col sm:flex-row sm:justify-between items-center py-2 px-10 border-b border-gray-100 w-full">
            <div>
              <Logo className="h-28 mb-4" alt="Kurban Kesim Logo" />
            </div>
            <div className="flex flex-col items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-green-700 text-center">
                Kurban Kesim Kuralları
              </h1>
              <span className="text-sm font-semibold text-gray-500">
                {fakeData.cut_info.slaughter_date || ""}
              </span>
            </div>
          </DialogTitle>
        </DialogHeader>
        <DialogDescription asChild>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="col-span-full sm:col-span-1">
                <div className="flex flex-col items-center border border-green-200 px-4 py-2 text-center">
                  <h1 className="text-lg md:text-2xl 2xl:text-6xl font-semibold text-green-700">
                    {fakeData.cut_info?.cutting_sequence}
                  </h1>
                  <span className="text-sm font-semibold text-gray-500 w-full">
                    Kesim Sırası
                  </span>
                </div>
                <h4 className="font-medium text-green-800 my-3 text-lg w-full text-center">
                  Kesim Bilgileri
                </h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div
                    className={cn(
                      "grid gap-4",
                      fakeData.animal_info?.weight
                        ? "grid-cols-4"
                        : "grid-cols-3"
                    )}
                  >
                    <div>
                      <span className="text-sm text-gray-500">Patok</span>
                      <p className="font-medium text-gray-800">
                        {fakeData.cut_info?.patoc}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Kesim Türü</span>
                      <p className="font-medium text-gray-800">
                        {fakeData.cut_info?.cut_type}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Hayvan Türü</span>
                      <p className="font-medium text-gray-800">
                        {fakeData.animal_info?.animal_type}
                      </p>
                    </div>
                    <div
                      className={cn(
                        fakeData.animal_info?.weight ? "block" : "hidden"
                      )}
                    >
                      <span className="text-sm text-gray-500">Ağırlık</span>
                      <p className="font-medium text-gray-800">
                        {fakeData.animal_info?.weight}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-span-full sm:col-span-1">
                <h4 className="font-medium text-green-700 mb-4 text-center border-b border-green-100 pb-2 text-lg">
                  Hissedarlar
                </h4>
                {/* <!-- Hissedarlar Listesi --> */}
                <div className="space-y-4">
                  {fakeData.customers.map((customer, index) => (
                    <div
                      className="border-l-2 border-green-500 pl-4"
                      key={index}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="bg-gray-100 rounded-full p-1.5">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-gray-600"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                              />
                            </svg>
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">
                              {customer.full_name}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-sm text-gray-500">
                                {customer.price}
                              </span>
                              <span
                                className={cn(
                                  customer.payment_status === "Ödendi"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800",
                                  "text-xs px-2 py-0.5 rounded-full"
                                )}
                              >
                                {customer.payment_status}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="bg-green-600 text-white text-sm px-3 py-1 rounded-full">
                          <span>{customer.share_count}</span> hisse
                        </div>
                      </div>

                      {/*  Alt Hissedarlar */}
                      <div className="ml-8 space-y-2">
                        {customer.sub_shareholders.map(
                          (subShareholder, subIndex) => (
                            <div
                              className="flex items-center justify-between py-1 border-l border-gray-200 pl-4"
                              key={subIndex}
                            >
                              <div className="flex items-center gap-2">
                                <div className="bg-gray-100 rounded-full p-1">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 text-gray-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      stroke-width="2"
                                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                  </svg>
                                </div>
                                <p className="text-gray-700">
                                  {subShareholder.full_name}
                                </p>
                              </div>
                              <div className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                                <span>{subShareholder.share_count}</span> hisse
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

           
          </div>
        </DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <div className="mt-6 flex justify-between">
              <div>
                {/* Sol taraftaki buton  */}
                <button
                  onClick={() => setLoading(true)}
                  className="px-5 py-2.5 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 flex items-center disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <svg
                      className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
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
                        stroke-width="4"
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
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                  <span>{loading ? "İşleniyor..." : "Hayvanı Kes"}</span>
                </button>
              </div>

              <div>
                {/* Sağ taraftaki buton */}
                <button
                  onClick={() => setOpen(false)}
                  className="px-5 py-2.5 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Kapat
                </button>
              </div>
            </div>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ManagerDialog;
