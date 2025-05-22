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
    className:"w-[100px]"
  },
  {
    title:"Patok",
    key:"patoc"
  },
  {
    title:"Kesim Zamanı",
    key:"time"
  },
  {
    title:"Tipi",
    key:"type",
  },
  {
    title:"İşlem",
    key:"action",
    className:"text-right"
  }
]

const CutTable = () => {
  return (
    <Table className="w-full border border-gray-200 rounded-lg">
    <TableCaption>Kesim Listesi</TableCaption>
    <TableHeader>
      <TableRow>
        {headings.map((heading) => (
          <TableHead key={heading.key} className={heading.className}>
            {heading.title}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
    <TableBody>
      {invoices.map((invoice) => (
        <TableRow key={invoice.index}>
          <TableCell className="font-medium">{invoice.index}</TableCell>
          <TableCell>{invoice.patoc}</TableCell>
          <TableCell>{invoice.time}</TableCell>
          <TableCell className="text-right">{invoice.type}</TableCell>
          <TableCell className="text-right">{invoice.action}</TableCell>
        </TableRow>
      ))}
    </TableBody>
    <TableFooter className="bg-gray-50 border-t">
      <TableRow className="border-b border-gray-200 px-20 py-20">
        <TableCell colSpan={4}>Toplam Kesilecek Hayvan Sayısı</TableCell>
        <TableCell className="text-right">3</TableCell>
      </TableRow>
    </TableFooter>
  </Table>
  );
};

export default CutTable;