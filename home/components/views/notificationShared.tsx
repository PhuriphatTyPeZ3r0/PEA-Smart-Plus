"use client";

import React from "react";
import Image from "next/image";
import { ChevronLeft, FileCheck2, Newspaper, ReceiptText, TriangleAlert, type LucideIcon } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { NotificationCategory } from "./notificationData";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const CATEGORY_META: Record<
  NotificationCategory,
  {
    icon: LucideIcon;
    bgClassName: string;
    iconClassName: string;
  }
> = {
  bill: {
    icon: ReceiptText,
    bgClassName: "bg-[#FEF0C7]",
    iconClassName: "text-[#DC6803]",
  },
  service: {
    icon: FileCheck2,
    bgClassName: "bg-[#DCFAE6]",
    iconClassName: "text-[#069454]",
  },
  outage: {
    icon: TriangleAlert,
    bgClassName: "bg-[#FEE4E2]",
    iconClassName: "text-[#D92C20]",
  },
  news: {
    icon: Newspaper,
    bgClassName: "bg-[#FEEBFB]",
    iconClassName: "text-[#A80689]",
  },
};

export function NotificationStatusBar() {
  return (
    <div className="mx-auto flex w-full max-w-[1080px] items-center justify-end px-6 pt-safe-top pt-3 text-[#101828]">
      <div className="flex items-center gap-2">
        <Image
          src="/asset/icons/home-icon/Cellular Connection.svg"
          alt="Cellular connection"
          width={19}
          height={12}
          className="h-3 w-auto"
        />
        <Image src="/asset/icons/home-icon/Wifi.svg" alt="Wi-Fi" width={17} height={12} className="h-3 w-auto" />
        <Image src="/asset/icons/home-icon/Battery.svg" alt="Battery" width={27} height={13} className="h-[13px] w-auto" />
      </div>
    </div>
  );
}

interface NotificationHeaderProps {
  title: string;
  onBack: () => void;
  rightActions?: React.ReactNode;
}

export function NotificationHeader({ title, onBack, rightActions }: NotificationHeaderProps) {
  return (
    <div className="mx-auto w-full max-w-[1080px] px-2 pb-4 pt-1">
      <div className="relative flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="flex h-11 w-11 items-center justify-center rounded-full text-[#101828] transition hover:bg-[#F9FAFB] active:scale-95"
          aria-label="ย้อนกลับ"
        >
          <ChevronLeft className="h-5 w-5" strokeWidth={2.2} />
        </button>

        <h1 className="pointer-events-none absolute inset-x-0 mx-auto w-fit text-xl font-medium leading-7 text-[#101828]">
          {title}
        </h1>

        <div className="flex min-w-11 items-center justify-end gap-1">{rightActions}</div>
      </div>
    </div>
  );
}

interface NotificationContentContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function NotificationContentContainer({ children, className }: NotificationContentContainerProps) {
  return <div className={cn("mx-auto w-full max-w-[980px]", className)}>{children}</div>;
}

interface NotificationTypeIconProps {
  category: NotificationCategory;
  unread?: boolean;
  size?: "md" | "lg";
}

export function NotificationTypeIcon({ category, unread = false, size = "md" }: NotificationTypeIconProps) {
  const meta = CATEGORY_META[category];
  const Icon = meta.icon;
  const circleSize = size === "lg" ? "h-14 w-14" : "h-9 w-9";
  const iconSize = size === "lg" ? "h-6 w-6" : "h-4 w-4";
  const dotOffset = size === "lg" ? "-right-0.5 -top-0.5 h-3 w-3" : "-right-0.5 -top-0.5 h-2.5 w-2.5";

  return (
    <div className={cn("relative flex shrink-0 items-center justify-center rounded-full", circleSize, meta.bgClassName)}>
      <Icon className={cn(iconSize, meta.iconClassName)} strokeWidth={1.8} />
      {unread && <span className={cn("absolute rounded-full border-2 border-white bg-[#F04437]", dotOffset)} />}
    </div>
  );
}

interface NotificationToggleProps {
  checked: boolean;
  disabled?: boolean;
  onToggle?: () => void;
  ariaLabel: string;
}

export function NotificationToggle({ checked, disabled = false, onToggle, ariaLabel }: NotificationToggleProps) {
  return (
    <button
      type="button"
      onClick={disabled ? undefined : onToggle}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-pressed={checked}
      className={cn(
        "flex h-6 w-11 shrink-0 items-center rounded-full p-0.5 transition duration-200",
        disabled ? "bg-[#F2F4F7] justify-end" : checked ? "bg-[#A80689] justify-end" : "bg-[#D0D5DD] justify-start"
      )}
    >
      <span
        className={cn(
          "h-5 w-5 rounded-full shadow-[0px_1px_2px_rgba(16,24,40,0.06),0px_1px_3px_rgba(16,24,40,0.1)]",
          disabled ? "bg-[#F9FAFB]" : "bg-white"
        )}
      />
    </button>
  );
}
