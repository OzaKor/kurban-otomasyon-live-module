"use client";
import { BadgeCheck } from "lucide-react";
import { toast } from "sonner";

const showToast = (
  id: string,
  message: string,
  action: "success" | "error" | "warning" | "info",
  icon?: string | React.ReactNode,
  duration?: number,
  position?: "top-center" | "top-right" | "bottom-center" | "bottom-right",
  onAutoClose?: () => void
) => {

    let iconValue = icon;
    if (icon===undefined) {
        if(action === "success"){
            iconValue = <BadgeCheck size={24} className="text-green-500" />;
        }
    } else {
        iconValue = icon;
    }

  toast(message, {
    id,
    action,
    icon: iconValue,
    duration,
    position,
    onAutoClose,
    closeButton: true,
  });
};

export default showToast;
