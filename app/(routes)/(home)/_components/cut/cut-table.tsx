"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
 
const invoices = [
  {
    index: 1,
    patoc: "Patoc 1",
    time: "10:00",
    type: "Kesim",
    action: "Düzenle",
  },
  {
    index: 2,
    patoc: "Patoc 2",
    time: "10:00",
    type: "Kesim",
    action: "Düzenle",
  },
  {
    index: 3,
    patoc: "Patoc 3",
    time: "10:00",
    type: "Kesim",
    action: "Düzenle",
  }  
]

const headings=[
  {
    title:"Kesim Sırası",
    key:"index",
    className:"w-[150px]"
  },
  {
    title:"Patok",
    key:"patoc",
    className:"w-[200px]"
  },
  {
    title:"Kesim Zamanı",
    key:"time",
    className:"w-[200px]"
  },
  {
    title:"Tipi",
    key:"type",
    className:"w-[200px]"
  },
  {
    title:"İşlem",
    key:"action",
    className:"w-[150px] text-right"
  }
]

const CutTable = () => {
  return (
    <div className="p-8">
      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="bg-green-700 hover:bg-green-700 border-b-0">
              {headings.map((heading) => (
                <TableHead 
                  key={heading.key} 
                  className={`text-white py-4 px-5 text-base font-medium ${heading.className || ''}`}
                >
                  {heading.title}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow 
                key={invoice.index}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <TableCell className="font-medium py-4 px-5 text-base">
                  <div className="flex items-center justify-center w-10 h-10 bg-green-700 text-white rounded-full font-bold text-base">
                    {invoice.index}
                  </div>
                </TableCell>
                <TableCell className="py-4 px-5 text-base">{invoice.patoc}</TableCell>
                <TableCell className="py-4 px-5 text-base">{invoice.time}</TableCell>
                <TableCell className="py-4 px-5 text-base">{invoice.type}</TableCell>
                <TableCell className="text-right py-4 px-5">
                  <Button 
                    variant="ghost" 
                    className="text-green-600 hover:text-green-700 hover:bg-green-50 font-medium text-base px-3 py-1"
                  >
                    {invoice.action}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow className="bg-gray-100 hover:bg-gray-100 border-t">
              <TableCell colSpan={4} className="py-4 px-5 font-medium text-base">
                Toplam Kesilecek Hayvan Sayısı
              </TableCell>
              <TableCell className="text-right py-4 px-5">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-700 text-white rounded-full font-bold text-lg">
                  {invoices.length}
                </div>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
};

export default CutTable;