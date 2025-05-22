"use client";
import React from "react";

interface Invoice {
  index: number;
  patoc: string;
  time: string;
  type: string;
  status: string;
}

interface Heading {
  title: string;
  key: string;
  className?: string;
}

const CutTable = () => {
  const invoices: Invoice[] = [
    {
      index: 1,
      patoc: "Patoc 1",
      time: "10:00",
      type: "Kesim",
      status: "bekliyor",
    },
    {
      index: 2,
      patoc: "Patoc 2",
      time: "10:00",
      type: "Kesim",
      status: "bekliyor",
    },
    {
      index: 3,
      patoc: "Patoc 3",
      time: "10:00",
      type: "Kesim",
      status: "bekliyor",
    },
  ];

  const headings: Heading[] = [
    {
      title: "Kesim Sırası",
      key: "index",
      className: "w-32",
    },
    {
      title: "Patok",
      key: "patoc",
    },
    {
      title: "Kesim Zamanı",
      key: "time",
    },
    {
      title: "Tipi",
      key: "type",
    },
    {
      title: "İşlem",
      key: "action",
      className: "text-right",
    },
  ];

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-green-700 text-white">
              {headings.map((heading) => (
                <th
                  key={heading.key}
                  className={`py-2 px-4 text-left font-medium ${
                    heading.className || ""
                  }`
                }
                
                >
                  {heading.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr
                key={invoice.index}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="py-3 px-6 font-medium">{invoice.index}</td>
                <td className="py-3 px-6">{invoice.patoc}</td>
                <td className="py-3 px-6">{invoice.time}</td>
                <td className="py-3 px-6">{invoice.type}</td>
                <td className="py-3 px-6 text-right">
                  <button className="text-green-600 hover:text-green-700 font-medium">
                    Düzenle
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-gray-100">
              <td colSpan={4} className="py-3 px-6 font-medium">
                Toplam Kesilecek Hayvan Sayısı
              </td>
              <td className="py-3 px-6 text-right font-bold">
                {invoices.length}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default CutTable;
