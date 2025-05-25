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
          <div className="p-6 w-full">
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
                        "",
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
