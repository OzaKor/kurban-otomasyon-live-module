import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";


interface BreadcrumbsProps {
    items: {
        href: string|null;
        label: string;
    }[];
}

const Breadcrumbs = ({items}: BreadcrumbsProps) => {
  return (
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
  );
};

export default Breadcrumbs;
