"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import useCutListStore from "@/store/cuts/useCutListSrore";
import CutList from "@/types/cut-list";
import { Icon } from "@iconify/react";

const headings = [
  {
    title: "Kesim Sırası",
    key: "index",
    className: "w-[100px]",
  },
  {
    title: "Patok",
    key: "patoc",
    className: "w-[100px]",
  },
  {
    title: "Kesim Zamanı",
    key: "time",
    className: "w-[100px]",
  },
  {
    title: "Tipi",
    key: "type",
    className: "w-[100px]",
  },
  {
    title: "İşlem",
    key: "action",
    className: "w-[100px] text-right pr-10",
  },
];

const ActionBtns = ({ cutList }: { cutList: CutList }) => {
  console.log(cutList);
  return (
    <Button
      variant="empty"
      className="hover:cursor-pointer bg-transparent outline-none shadow-none group transition-colors"
    >
      <Icon icon="line-md:close-circle-twotone"
      className="group-hover:text-red-400 text-red-500 group-active:text-red-600"
       style={{width: "32px", height: "32px"}} />
    </Button>
  );
};

const CutTable = () => {
  const { cutLists } = useCutListStore();

  return (
    <div className="p-8">
      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="bg-green-700 hover:bg-green-700 border-b-0">
              {headings.map((heading) => (
                <TableHead
                  key={heading.key}
                  className={`text-white py-4 px-5 text-base font-medium ${
                    heading.className || ""
                  }`}
                >
                  {heading.title}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {cutLists.map((cutList) => (
              <TableRow
                key={cutList.index}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <TableCell className="font-medium py-4 px-5 text-base">
                  <div className="flex items-center justify-center w-10 h-10 bg-green-700 text-white rounded-full font-bold text-base">
                    {cutList.index}
                  </div>
                </TableCell>
                <TableCell className="py-4 px-5 text-base">
                  {cutList.patoc}
                </TableCell>
                <TableCell className="py-4 px-5 text-base">
                  {cutList.time}
                </TableCell>
                <TableCell className="py-4 px-5 text-base">
                  {cutList.type}
                </TableCell>
                <TableCell className="text-right py-4 px-5">
                  <ActionBtns cutList={cutList} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow className="bg-gray-100 hover:bg-gray-100 border-t">
              <TableCell
                colSpan={4}
                className="py-4 px-5 font-medium text-base"
              >
                Toplam Kesilecek Hayvan Sayısı
              </TableCell>
              <TableCell className="text-right py-4 px-5">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-700 text-white rounded-full font-bold text-lg">
                  {cutLists.length}
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
