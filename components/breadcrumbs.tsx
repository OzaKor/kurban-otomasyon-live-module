"use client";
import React, { useEffect } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import useUserStore from "@/store/useUserStore";

interface BreadcrumbsProps {
    items: {
        href: string|null;
        label: string;
    }[];
}

const Breadcrumbs = ({items}: BreadcrumbsProps) => {
  const {userToken} = useUserStore();
const [isBreadcrumbs, setIsBreadcrumbs] = React.useState(false);

useEffect(() => {
    if(userToken){
        setIsBreadcrumbs(true);
    }
}, [userToken]);


  return (
    isBreadcrumbs && (
      <Breadcrumb className="mb-6 p-6 rounded-md">
      <BreadcrumbList className="flex items-center gap-2">
        {items.map((item, index) => (
            <React.Fragment key={index}>
            <BreadcrumbItem>
                {item.href ? (
                    <BreadcrumbLink href={item.href} className="text-primary hover:text-primary/80 transition-colors">{item.label}</BreadcrumbLink>
                ) : (
                    <BreadcrumbPage className="text-primary font-semibold">{item.label}</BreadcrumbPage>
                )}
            </BreadcrumbItem>
            {index < items.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
    )
  );
};

export default Breadcrumbs;
