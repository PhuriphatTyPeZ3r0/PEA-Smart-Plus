"use client";

import React, { useState } from "react";
import { ChevronLeft, Settings, CheckCheck, Bell, Gift, Trash2, Home, Building2, Settings2, Zap, User } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Notification {
  id: string;
  type: "system" | "privilege";
  title: string;
  description: string;
  date: string;
  isRead: boolean;
  icon: string;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    type: "system",
    title: "ยืนยันการลงทะเบียนสำเร็จ",
    description: "ยินดีด้วย คุณได้ยืนยันตัวตนสำเร็จแล้ว",
    date: "14 ต.ค. 2568, 10:30 น.",
    isRead: false,
    icon: "bell",
  },
  {
    id: "2",
    type: "system",
    title: "แจ้งยอดค้างชำระ",
    description: "กรุณาชำระค่าไฟฟ้าภายในวันที่ 28 ก.ย. 2568",
    date: "10 ต.ค. 2568, 08:15 น.",
    isRead: true,
    icon: "bell",
  },
  {
    id: "3",
    type: "privilege",
    title: "สิทธิพิเศษสำหรับคุณ!",
    description: "รับส่วนลดค่าชาร์จรถไฟฟ้า PEA VOLTA 20 บาท",
    date: "12 ต.ค. 2568, 14:00 น.",
    isRead: false,
    icon: "gift",
  },
];

interface NotificationViewProps {
  onBack: () => void;
  onGoToSettings: () => void;
  onGoToDetail: (id: string) => void;
}

export default function NotificationView({ onBack, onGoToSettings, onGoToDetail }: NotificationViewProps) {
  const [activeTab, setActiveTab] = useState<"system" | "privilege">("system");
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showReadAllModal, setShowReadAllModal] = useState(false);
  const [selectedNoti, setSelectedNoti] = useState<string | null>(null);

  const filteredNotifications = notifications.filter((n) => n.type === activeTab);
  const hasUnreadSystem = notifications.some((n) => n.type === "system" && !n.isRead);
  const hasUnreadPrivilege = notifications.some((n) => n.type === "privilege" && !n.isRead);

  const handleReadAll = () => {
    setShowReadAllModal(true);
  };

  const confirmReadAll = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    setShowReadAllModal(false);
  };

  const handleDelete = (id: string) => {
    setSelectedNoti(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (selectedNoti) {
      setNotifications((prev) => prev.filter((n) => n.id !== selectedNoti));
      setShowDeleteModal(false);
      setSelectedNoti(null);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden animate-slide-in-right h-full">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#9B2677] to-[#df338d] pt-12 pb-4 px-4 relative shrink-0">
        <div className="flex items-center justify-between text-white">
          <button onClick={onBack} className="p-1 hover:opacity-80 transition-opacity active:scale-90">
            <ChevronLeft className="w-7 h-7" />
          </button>
          <h1 className="text-[19px] font-bold font-['Kanit']">การแจ้งเตือน</h1>
          <div className="flex items-center gap-2">
            <button onClick={handleReadAll} className="p-1 hover:opacity-80 transition-opacity active:scale-90">
              <CheckCheck className="w-[22px] h-[22px]" />
            </button>
            <button onClick={onGoToSettings} className="p-1 hover:opacity-80 transition-opacity active:scale-90">
              <Settings className="w-[22px] h-[22px]" />
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-100 bg-white shrink-0">
        <button
          onClick={() => setActiveTab("system")}
          className={cn(
            "flex-1 py-4 text-[15px] font-bold relative transition-colors font-['Kanit']",
            activeTab === "system" ? "text-[#9B2677]" : "text-gray-400"
          )}
        >
          ทั่วไป
          {hasUnreadSystem && (
            <span className="absolute top-4 ml-1 w-2 h-2 bg-pink-500 rounded-full border border-white" />
          )}
          {activeTab === "system" && <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#9B2677]" />}
        </button>
        <button
          onClick={() => setActiveTab("privilege")}
          className={cn(
            "flex-1 py-4 text-[15px] font-bold relative transition-colors font-['Kanit']",
            activeTab === "privilege" ? "text-[#9B2677]" : "text-gray-400"
          )}
        >
          สิทธิพิเศษ
          {hasUnreadPrivilege && (
            <span className="absolute top-4 ml-1 w-2 h-2 bg-pink-500 rounded-full border border-white" />
          )}
          {activeTab === "privilege" && <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#9B2677]" />}
        </button>
      </div>

      {/* Notification List */}
      <div className="flex-1 overflow-y-auto no-scrollbar bg-gray-50/50">
        {filteredNotifications.length > 0 ? (
          <div className="divide-y divide-gray-100 pb-20">
            {filteredNotifications.map((noti) => (
              <div
                key={noti.id}
                className={cn(
                  "p-4 flex gap-4 transition-colors relative group",
                  !noti.isRead ? "bg-white" : "bg-transparent"
                )}
              >
                <div onClick={() => onGoToDetail(noti.id)} className="flex gap-4 flex-1 min-w-0 cursor-pointer">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-full shrink-0 flex items-center justify-center",
                      noti.type === "system" ? "bg-purple-50 text-[#9B2677]" : "bg-pink-50 text-pink-500"
                    )}
                  >
                    {noti.icon === "gift" ? <Gift className="w-6 h-6" /> : <Bell className="w-6 h-6" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <h4
                        className={cn(
                          "text-[15px] leading-tight truncate pr-4 font-['Kanit']",
                          !noti.isRead ? "font-bold text-gray-900" : "font-medium text-gray-600"
                        )}
                      >
                        {noti.title}
                      </h4>
                      {!noti.isRead && <div className="w-2.5 h-2.5 bg-pink-500 rounded-full mt-1 shrink-0" />}
                    </div>
                    <p className="text-[13px] text-gray-500 leading-snug line-clamp-2 mb-2 font-['Kanit']">
                      {noti.description}
                    </p>
                    <span className="text-[11px] text-gray-400 font-medium font-['Kanit']">{noti.date}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(noti.id)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[60%] px-10 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <Bell className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2 font-['Kanit']">ยังไม่มีการแจ้งเตือน</h3>
            <p className="text-sm text-gray-500 leading-relaxed font-['Kanit']">
              เราจะแจ้งให้คุณทราบเมื่อมีข่าวสาร
              <br />
              หรือการอัปเดตใหม่ๆ
            </p>
          </div>
        )}
      </div>

      {/* Footer Nav - Shared with main app */}
      <div className="bg-white border-t border-gray-100 px-4 pt-3 pb-safe flex justify-between items-center z-40 shrink-0">
        <div onClick={onBack} className="flex flex-col items-center justify-center w-[64px] cursor-pointer">
          <div className="mb-1 text-gray-400">
            <Home className="w-[26px] h-[26px]" />
          </div>
          <span className="text-[10px] font-bold text-gray-500 font-['Kanit']">หน้าหลัก</span>
        </div>
        <div className="flex flex-col items-center justify-center w-[64px] cursor-pointer">
          <div className="mb-1 text-gray-400">
            <Building2 className="w-[26px] h-[26px]" />
          </div>
          <span className="text-[10px] font-bold text-gray-500 font-['Kanit']">สถานที่ใช้ไฟ</span>
        </div>
        <div className="flex flex-col items-center justify-center w-[64px] cursor-pointer">
          <div className="mb-1 text-gray-400">
            <Settings2 className="w-[26px] h-[26px]" />
          </div>
          <span className="text-[10px] font-bold text-gray-500 font-['Kanit']">บริการ</span>
        </div>
        <div className="flex flex-col items-center justify-center w-[64px] cursor-pointer">
          <div className="mb-1 text-gray-400">
            <Zap className="w-[26px] h-[26px]" />
          </div>
          <span className="text-[10px] font-bold text-gray-500 font-['Kanit']">พอยต์</span>
        </div>
        <div className="flex flex-col items-center justify-center w-[64px] cursor-pointer">
          <div className="mb-1 text-gray-400">
            <User className="w-[26px] h-[26px]" />
          </div>
          <span className="text-[10px] font-bold text-gray-500 font-['Kanit']">โปรไฟล์</span>
        </div>
      </div>

      {/* Modals */}
      {showDeleteModal && (
        <div className="absolute inset-0 z-[200] flex items-center justify-center bg-black/40 px-6 backdrop-blur-sm">
          <div className="bg-white rounded-[24px] w-full max-w-[300px] p-6 shadow-xl animate-in zoom-in-95 duration-200">
            <h3 className="text-[17px] font-bold text-gray-900 text-center mb-2 font-['Kanit']">ยืนยันการลบ?</h3>
            <p className="text-sm text-gray-500 text-center mb-6 font-['Kanit']">คุณต้องการลบการแจ้งเตือนนี้ใช่หรือไม่?</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-3 text-[15px] font-semibold text-gray-500 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors font-['Kanit']"
              >
                ยกเลิก
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 py-3 text-[15px] font-semibold text-white bg-red-500 rounded-full hover:bg-red-600 transition-colors font-['Kanit']"
              >
                ลบออก
              </button>
            </div>
          </div>
        </div>
      )}

      {showReadAllModal && (
        <div className="absolute inset-0 z-[200] flex items-center justify-center bg-black/40 px-6 backdrop-blur-sm">
          <div className="bg-white rounded-[24px] w-full max-w-[300px] p-6 shadow-xl animate-in zoom-in-95 duration-200">
            <h3 className="text-[17px] font-bold text-gray-900 text-center mb-2 font-['Kanit']">อ่านทั้งหมด?</h3>
            <p className="text-sm text-gray-500 text-center mb-6 font-['Kanit']">
              ต้องการทำเครื่องหมายว่าอ่านแล้วทั้งหมดใช่หรือไม่?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowReadAllModal(false)}
                className="flex-1 py-3 text-[15px] font-semibold text-gray-500 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors font-['Kanit']"
              >
                ยกเลิก
              </button>
              <button
                onClick={confirmReadAll}
                className="flex-1 py-3 text-[15px] font-semibold text-white bg-[#9B2677] rounded-full hover:bg-[#851e65] transition-colors font-['Kanit']"
              >
                ยืนยัน
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .pb-safe {
          padding-bottom: max(env(safe-area-inset-bottom, 16px), 16px);
        }
      `}</style>
    </div>
  );
}
