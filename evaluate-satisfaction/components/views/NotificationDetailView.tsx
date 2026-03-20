"use client";

import React from "react";
import type { NotificationItem } from "./notificationData";
import { NOTIFICATION_CATEGORY_LABELS } from "./notificationData";
import {
  NotificationContentContainer,
  NotificationHeader,
  NotificationStatusBar,
  NotificationTypeIcon,
} from "./notificationShared";

interface NotificationDetailViewProps {
  notification: NotificationItem | null;
  onBack: () => void;
}

export default function NotificationDetailView({ notification, onBack }: NotificationDetailViewProps) {
  if (!notification) {
    return (
      <div className="flex h-full flex-col overflow-hidden bg-[#F9FAFB] animate-slide-in-right">
        <NotificationStatusBar />
        <NotificationHeader title="รายละเอียด" onBack={onBack} />

        <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
          <h2 className="text-lg font-semibold text-[#101828]">ไม่พบข้อมูลการแจ้งเตือน</h2>
          <p className="mt-2 text-sm leading-6 text-[#667085]">รายการนี้อาจถูกลบหรือยังไม่มีข้อมูลสำหรับแสดงผล</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col overflow-hidden bg-[#F9FAFB] animate-slide-in-right">
      <NotificationStatusBar />
      <NotificationHeader title="รายละเอียด" onBack={onBack} />

      <div className="flex-1 overflow-y-auto pb-8 no-scrollbar">
        <NotificationContentContainer className="px-5">
          <div className="rounded-[28px] bg-white px-5 py-6 shadow-[0px_20px_40px_rgba(16,24,40,0.06)]">
            <div className="flex flex-col items-center text-center">
              <NotificationTypeIcon category={notification.category} unread={!notification.isRead} size="lg" />
              <p className="mt-4 text-xs font-medium leading-4 text-[#667085]">
                {NOTIFICATION_CATEGORY_LABELS[notification.category]}
              </p>
              <h2 className="mt-2 text-xl font-semibold leading-7 text-[#101828]">{notification.title}</h2>
              <p className="mt-2 text-xs font-normal leading-4 text-[#667085]">{notification.date}</p>
            </div>

            <div className="mt-6 rounded-[20px] bg-[#F9FAFB] px-4 py-4">
              <p className="whitespace-pre-line text-sm leading-6 text-[#344054]">{notification.detail}</p>
            </div>
          </div>
        </NotificationContentContainer>
      </div>
    </div>
  );
}
