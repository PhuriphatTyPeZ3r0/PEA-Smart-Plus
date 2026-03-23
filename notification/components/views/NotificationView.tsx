"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CheckCheck, ChevronRight, Pencil, Trash2 } from "lucide-react";
import type { NotificationCategory, NotificationItem } from "./notificationData";
import { NOTIFICATION_CATEGORY_LABELS } from "./notificationData";
import {
  NotificationContentContainer,
  NotificationHeader,
  NotificationStatusBar,
  NotificationTypeIcon,
  cn,
} from "./notificationShared";

type NotificationFilter = "all" | NotificationCategory;

const FILTERS: Array<{ key: NotificationFilter; label: string }> = [
  { key: "all", label: "ทั้งหมด" },
  { key: "bill", label: "ค่าไฟฟ้า" },
  { key: "service", label: "บริการ" },
  { key: "outage", label: "ไฟฟ้าขัดข้อง" },
  { key: "news", label: "ข่าวสาร" },
];

interface NotificationViewProps {
  notifications: NotificationItem[];
  onBack: () => void;
  onGoToSettings: () => void;
  onGoToDetail: (id: string) => void;
  onMarkAllAsRead: () => void;
  onMarkNotificationsAsRead: (ids: string[]) => void;
  onDeleteNotifications: (ids: string[]) => void;
}

export default function NotificationView({
  notifications,
  onBack,
  onGoToSettings,
  onGoToDetail,
  onMarkAllAsRead,
  onMarkNotificationsAsRead,
  onDeleteNotifications,
}: NotificationViewProps) {
  const [activeFilter, setActiveFilter] = useState<NotificationFilter>("all");
  const [showEditMenu, setShowEditMenu] = useState(false);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectionAction, setSelectionAction] = useState<"read" | "delete" | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const filteredNotifications =
    activeFilter === "all"
      ? notifications
      : notifications.filter((notification) => notification.category === activeFilter);

  const hasUnreadNotifications = notifications.some((notification) => !notification.isRead);

  const handleEnterReadMode = () => {
    setIsSelectionMode(true);
    setSelectionAction("read");
    setShowEditMenu(false);
    setSelectedIds(new Set());
  };

  const handleEnterDeleteMode = () => {
    setIsSelectionMode(true);
    setSelectionAction("delete");
    setShowEditMenu(false);
    setSelectedIds(new Set());
  };

  const handleToggleSelection = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const handleConfirmSelection = () => {
    if (selectionAction === "delete") {
      onDeleteNotifications(Array.from(selectedIds));
    } else if (selectionAction === "read") {
      onMarkNotificationsAsRead(Array.from(selectedIds));
    }
    setIsSelectionMode(false);
    setSelectionAction(null);
    setSelectedIds(new Set());
  };

  const handleCancelSelection = () => {
    setIsSelectionMode(false);
    setSelectionAction(null);
    setSelectedIds(new Set());
  };

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-white animate-slide-in-right">
      <NotificationStatusBar />
      <NotificationHeader
        title={isSelectionMode ? `เลือกรายการ (${selectedIds.size})` : "การแจ้งเตือน"}
        onBack={isSelectionMode ? handleCancelSelection : onBack}
        rightActions={
          !isSelectionMode ? (
            <>
              <button
                type="button"
                onClick={() => setShowEditMenu(!showEditMenu)}
                aria-label="แก้ไข"
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full transition active:scale-95",
                  showEditMenu
                    ? "bg-[#FEEBFB] text-[#A80689]"
                    : "text-[#A80689] hover:bg-[#FEEBFB]"
                )}
              >
                <Pencil className="h-5 w-5" strokeWidth={2} />
              </button>
              <button
                type="button"
                onClick={onGoToSettings}
                aria-label="ตั้งค่าการแจ้งเตือน"
                className="flex h-10 w-10 items-center justify-center rounded-full text-[#A80689] transition hover:bg-[#FEEBFB] active:scale-95"
              >
                <Image src="/images/setting.svg" alt="Settings" width={20} height={20} className="h-5 w-5" />
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={handleCancelSelection}
              className="text-base font-medium text-[#A80689] hover:underline"
            >
              ยกเลิก
            </button>
          )
        }
      />
      {showEditMenu && !isSelectionMode && (
        <div className="absolute bottom-0 left-0 z-50 inline-flex w-full flex-col items-start justify-center gap-8 bg-white pb-12 pt-6 shadow-[0px_12px_24px_-4px_rgba(145,158,171,0.12)] shadow-[0px_0px_2px_0px_rgba(145,158,171,0.20)] animate-slide-in-bottom">
          <div className="inline-flex items-center justify-start gap-5 self-stretch px-5">
            <button
              onClick={handleEnterReadMode}
              className="flex flex-1 items-center justify-center gap-2.5 overflow-hidden rounded-full bg-[#FEEBFB] px-5 py-4 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] shadow-[inset_0px_-2px_0px_0px_rgba(16,24,40,0.05)] shadow-[inset_0px_0px_0px_1px_rgba(16,24,40,0.18)] outline outline-2 outline-offset-[-2px] outline-[#A80689]"
            >
              <div className="flex items-center justify-center px-0.5">
                <div className="justify-start text-xl font-medium leading-7 text-[#A80689]">อ่าน</div>
              </div>
            </button>
            <button
              onClick={handleEnterDeleteMode}
              className="flex flex-1 items-center justify-center gap-2.5 overflow-hidden rounded-full bg-[#A80689] px-5 py-4 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] shadow-[inset_0px_-2px_0px_0px_rgba(16,24,40,0.05)] shadow-[inset_0px_0px_0px_1px_rgba(16,24,40,0.18)] outline outline-2 outline-offset-[-2px] outline-white/10"
            >
              <div className="flex items-center justify-center px-0.5">
                <div className="justify-start text-xl font-medium leading-7 text-white">ลบ</div>
              </div>
            </button>
          </div>

          {hasUnreadNotifications && (
            <div className="self-stretch px-5">
              <button
                type="button"
                onClick={() => {
                  onMarkAllAsRead();
                  setShowEditMenu(false);
                }}
                className="w-full rounded-full border border-[#A80689] px-4 py-2 text-sm font-medium text-[#A80689] transition hover:bg-[#FEEBFB]"
              >
                อ่านทั้งหมด
              </button>
            </div>
          )}
        </div>
      )}

      {!isSelectionMode && (
        <NotificationContentContainer className="overflow-x-auto no-scrollbar px-5 pb-4">
          <div className="flex w-max items-center gap-2">
            {FILTERS.map((filter) => {
              const isActive = filter.key === activeFilter;

              return (
                <button
                  key={filter.key}
                  type="button"
                  onClick={() => setActiveFilter(filter.key)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-base font-semibold leading-6 transition active:scale-95",
                    isActive
                      ? "border-[#FED8F6] bg-[#A80689] text-white shadow-[0px_8px_20px_rgba(168,6,137,0.16)]"
                      : "border-[#E4E7EC] bg-white text-[#344054] hover:border-[#D0D5DD]"
                  )}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        </NotificationContentContainer>
      )}
      <div className="flex-1 overflow-y-auto bg-white pb-20 no-scrollbar">
        <NotificationContentContainer>
          {filteredNotifications.length > 0 ? (
            <div>
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    "flex w-full items-center gap-3 border-b border-[#E4E7EC] px-5 py-4 text-left transition",
                    !isSelectionMode && "cursor-pointer hover:bg-[#F9FAFB] active:scale-[0.995]"
                  )}
                  onClick={() => {
                    if (isSelectionMode) {
                      handleToggleSelection(notification.id);
                    } else {
                      onGoToDetail(notification.id);
                    }
                  }}
                >
                  {isSelectionMode && (
                    <div className="shrink-0 pr-2">
                      <div
                        className={cn(
                          "flex h-5 w-5 items-center justify-center rounded border transition-colors",
                          selectedIds.has(notification.id)
                            ? "border-[#A80689] bg-[#A80689]"
                            : "border-[#D0D5DD] bg-white"
                        )}
                      >
                        {selectedIds.has(notification.id) && <CheckCheck className="h-3.5 w-3.5 text-white" />}
                      </div>
                    </div>
                  )}

                  <NotificationTypeIcon category={notification.category} unread={!notification.isRead} />

                  <div className="min-w-0 flex-1">
                    <div className="mb-2 flex items-start justify-between gap-3">
                      <span className="text-xs font-medium leading-4 text-[#101828]">
                        {NOTIFICATION_CATEGORY_LABELS[notification.category]}
                      </span>
                      <span className="shrink-0 text-[10px] font-normal leading-4 text-[#667085]">
                        {notification.date}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div
                        className="text-sm font-semibold leading-4 text-[#101828]"
                        style={{
                          display: "-webkit-box",
                          overflow: "hidden",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 2,
                        }}
                      >
                        {notification.title}
                      </div>
                      <p
                        className="text-xs font-normal leading-4 text-[#667085]"
                        style={{
                          display: "-webkit-box",
                          overflow: "hidden",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 2,
                        }}
                      >
                        {notification.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center text-sm text-[#667085]">ไม่มีข้อมูลการแจ้งเตือน</div>
          )}
        </NotificationContentContainer>
      </div>

      {isSelectionMode && selectedIds.size > 0 && (
        <div className="absolute bottom-0 left-0 right-0 z-40 bg-white p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] animate-slide-in-bottom">
          <button
            onClick={handleConfirmSelection}
            className={cn(
              "flex w-full items-center justify-center gap-2 rounded-full py-3 text-white shadow-sm transition active:scale-95",
              selectionAction === "delete"
                ? "bg-[#D92C20] hover:bg-[#B42318]"
                : "bg-[#A80689] hover:bg-[#8B0571]"
            )}
          >
            {selectionAction === "delete" ? <Trash2 className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
            <span className="text-lg font-medium">
              {selectionAction === "delete" ? "ลบ" : "อ่าน"} ({selectedIds.size}) รายการ
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
