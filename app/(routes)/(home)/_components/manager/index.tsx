"use client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Settings } from "lucide-react";
import Setting from "@/app/(routes)/(home)/_components/cut/setting";
import Cut from "@/app/(routes)/(home)/_components/cut";

interface AccordionItemProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

const Manager = () => {
  const accordionItems: AccordionItemProps[] = [
    {
      id: "ayarlar",
      title: "Kesim Ayarları",
      icon: <Settings className="h-5 w-5 text-blue-600" />,
      content: <Setting />,
    },
  ];

  return (
    <div className="mx-auto">
      <Accordion
        type="single"
        collapsible
        className="space-y-3"
        defaultValue={accordionItems[0].id}
      >
        {accordionItems.map((item) => (
          <AccordionItem
            key={item.id}
            value={item.id}
            className="border rounded-lg overflow-hidden transition-all shadow-md"
          >
            <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3">
                {item.icon}
                <span className="font-medium text-gray-800">{item.title}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-5 py-4 text-gray-600">
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <div className="mt-6">
        <Cut />
      </div>
    </div>
  );
};

export default Manager;
