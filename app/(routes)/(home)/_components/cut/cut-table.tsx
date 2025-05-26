"use client";
import React from "react";
import {
  Table,
  TableBody, // TableBody import edilmiş
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow, // Orijinal TableRow'u import ediyoruz
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import useCutListStore from "@/store/cuts/useCutListSrore";
import CutList, { Modal } from "@/types/cut-list";
import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion"; // motion ve AnimatePresence import edildi

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

// TableRow componentini motion.create() ile sarmalayarak animasyon yetenekleri kazandırıyoruz.
const MotionTableRow = motion.create(TableRow);

const CutTable = () => {
  const { cutLists, setCutLists } = useCutListStore();

  const removeCutList = (removeIndex: number) => {
    const newCutLists = cutLists.filter((_, index) => index !== removeIndex);
    setCutLists(newCutLists);
  };

  const openModal = (cutList: CutList, removeIndex: number) => {
    const modal: Modal = cutList.modal;
    removeCutList(removeIndex);
    console.log("modal: ", modal); // buraya yapılacak işlemler gelecek
  };

  const ActionBtns = ({
    cutList,
    removeIndex,
  }: {
    cutList: CutList;
    removeIndex: number;
  }) => {
    return (
      <Button
        variant="empty"
        className="hover:cursor-pointer bg-transparent outline-none shadow-none group transition-colors"
        onClick={() => openModal(cutList, removeIndex)}
      >
        <Icon
          icon="line-md:close-circle-twotone"
          className="group-hover:text-red-400 text-red-500 group-active:text-red-600"
          style={{ width: "32px", height: "32px" }}
        />
      </Button>
    );
  };

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
          {/* TableBody component'i eklendi */}
          <TableBody>
            {/* cutLists map'ini AnimatePresence ile sarmalıyoruz */}
            <AnimatePresence initial={false}>
              {cutLists.map((cutList, index) => (
                <MotionTableRow
                  key={cutList.index}
                  layout
                  initial={{ opacity: 0, y: -20, height: 0 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    height: 'auto',
                    transition: { duration: 0.3, ease: "easeInOut" }
                  }}
                  exit={{
                    opacity: 0,
                    y: -20,
                    height: 0,
                    overflow: 'hidden',
                    transition: { duration: 0.3, ease: "easeInOut" }
                  }}
                  className="border-b border-gray-100 hover:bg-gray-50"
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
                    <ActionBtns cutList={cutList} removeIndex={index} />
                  </TableCell>
                </MotionTableRow>
              ))}
            </AnimatePresence>
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
