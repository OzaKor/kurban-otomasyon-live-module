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
import CutList, { Modal } from "@/types/cut-list";
import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion"; // motion ve AnimatePresence import edildi
import useUserStore from "@/store/useUserStore";
import useCutDialogStore from "@/store/cuts/useCutDialogStore";
import { TypeAnimation } from "react-type-animation";

// TableRow componentini motion.create() ile sarmalayarak animasyon yetenekleri kazandırıyoruz.
const MotionTableRow = motion.create(TableRow);

const CutTable = () => {
  const { cutLists } = useCutListStore();
  const { setCutDialog, setIsModalOpen } = useCutDialogStore();

  const { user } = useUserStore();

  const headings = [
    {
      title: "Kesim Sırası",
      key: "index",
      className: "w-[100px]",
    },
    {
      title: "Adı Soyadı",
      key: "name",
      className: "w-[100px]",
    },
    {
      title: "Tipi",
      key: "type",
      className: "w-[100px]",
    },
  ];
  const openModal = (cutList: CutList) => {
    const modal: Modal = cutList.modal;
    setCutDialog(modal);
    setIsModalOpen(true);
  };

  const ActionBtns = ({ cutList }: { cutList: CutList }) => {
    return (
      <Button
        variant="empty"
        className="hover:cursor-pointer bg-transparent outline-none shadow-none group transition-colors"
        onClick={() => openModal(cutList)}
      >
        <Icon
          icon="line-md:close-circle-twotone"
          className="group-hover:text-red-400 text-red-500 group-active:text-red-600"
          style={{ width: "32px", height: "32px" }}
        />
      </Button>
    );
  };

  if (user && user.role == "super_admin") {
    headings.push({
      title: "İşlem",
      key: "action",
      className: "w-[100px] text-right pr-10",
    });
  }

  console.log(cutLists);

  const quotations = [
    "Kurban, Allah'a gönülden bir yöneliştir.",
    750,
    "Takva ile sunulan kurban, Allah katında değerlidir.",
    1250,
    "Kurban, paylaşmaktır; paylaştıkça bereketlenir.",
    1750,
    "Bayramda gönüller birleşir, kurbanla yakınlık artar.",
    2250,
    "Kurban bereketi her eve ulaşsın, yüzler gülsün.",
    2750,
    "Niyetin özü samimiyet, kurbanın ruhu teslimiyettir.",
    3250,
    "Her kurban, İbrahim'in sadakati, İsmail'in sabrıdır.",
    3750,
    "Kurban, şükrün ve itaatin en içten halidir.",
    4250,
    "Samimi bir niyetle kesilen kurban, en makbul olanıdır.",
    4750,
    "Kurban, Allah rızası için yapılan en güzel fedakarlıktır.",
    5250,
    "Bayramda gönüller birleşir, kurbanla yakınlık artar.",
    5750,
    "Kurban bereketi her eve ulaşsın, yüzler gülsün.",
    6250,
    "Niyetin özü samimiyet, kurbanın ruhu teslimiyettir.",
    6750,
    "Her kurban, İbrahim'in sadakati, İsmail'in sabrıdır.",
    7250,
    "Kurban, şükrün ve itaatin en içten halidir.",
    7750,
    "Samimi bir niyetle kesilen kurban, en makbul olanıdır.",
    8250,
    "Kurban, Allah rızası için yapılan en güzel fedakarlıktır.",
    8750,
    "Her kurban, İbrahim'in sadakati, İsmail'in sabrıdır.",
    9250,
    "Kurban, şükrün ve itaatin en içten halidir.",
    9750,
    "Samimi bir niyetle kesilen kurban, en makbul olanıdır.",
    10250,
    "Kurban, Allah rızası için yapılan en güzel fedakarlıktır.",
    10750,
  ];

  return (
    <div className="p-0.5">
      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
        {cutLists.length > 0 ? (
          <Table className="w-full">
            <TableHeader>
              <TableRow className="bg-green-700 hover:bg-green-700 border-b-0">
                {headings.map((heading) => (
                  <TableHead
                    key={heading.key}
                    className={`text-white py-4 px-5 text-base font-bold  ${
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
                {cutLists.slice(0, 10).map((cutItem) => (
                  <MotionTableRow
                    key={cutItem.tbody.id}
                    layout
                    initial={{ opacity: 0, y: -20, height: 0 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      height: "auto",
                      transition: { duration: 0.3, ease: "easeInOut" },
                    }}
                    exit={{
                      opacity: 0,
                      y: -20,
                      height: 0,
                      overflow: "hidden",
                      transition: { duration: 0.3, ease: "easeInOut" },
                    }}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <TableCell className="font-medium py-4 px-5 text-base">
                      <div className="flex items-center justify-center w-10 h-10 bg-green-700 text-white rounded-full font-bold text-base">
                        {cutItem.tbody.cutting_sequence}
                      </div>
                    </TableCell>
                    <TableCell className="py-4 px-5 text-base">
                      {cutItem.tbody.customer}
                    </TableCell>

                    <TableCell className="py-4 px-5 text-base">
                      {cutItem.tbody.cut_type}
                    </TableCell>
                    {user && user.role == "super_admin" && (
                      <TableCell className="text-right py-4 px-5">
                        <ActionBtns cutList={cutItem} />
                      </TableCell>
                    )}
                  </MotionTableRow>
                ))}
              </AnimatePresence>
            </TableBody>
            <TableFooter>
              <TableRow className="bg-gray-100 hover:bg-gray-100 border-t">
                <TableCell
                  colSpan={4}
                  className="py-4 px-5 font-medium text-base w-full text-center"
                >
                  <TypeAnimation
                    sequence={[
                      ...quotations,
                      () => {
                        console.log("Sequence completed");
                      },
                    ]}
                    wrapper="span"
                    cursor={true}
                    repeat={Infinity}
                    className="text-green-700 text-2xl font-extrabold"
                  />
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        ) : (
          <div className="flex items-center justify-center py-10">
            <div className="h-5 w-5 border-b-2 border-green-700 animate-spin rounded-full mr-3" />
            <p className="text-lg font-medium text-gray-800">
              Kesim listesi çekilirken lütfen bekleyiniz
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CutTable;
