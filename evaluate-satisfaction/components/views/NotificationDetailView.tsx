"use client";

import React from "react";
import { ChevronLeft, Bell, Gift, Home, Building2, Settings2, Zap, User } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface NotificationDetail {
  id: string;
  type: "system" | "privilege";
  title: string;
  description: string;
  content: string;
  date: string;
}

const MOCK_DETAILS: Record<string, NotificationDetail> = {
  "1": {
    id: "1",
    type: "system",
    title: "ยืนยันการลงทะเบียนสำเร็จ",
    description: "ยินดีด้วย คุณได้ยืนยันตัวตนสำเร็จแล้ว",
    content:
      "คุณได้ดำเนินการยืนยันตัวตนในระบบ PEA Smart Plus สำเร็จแล้ว ขณะนี้คุณสามารถเข้าใช้งานฟีเจอร์ต่างๆ ได้อย่างครบถ้วน ไม่ว่าจะเป็นการเช็คยอดค่าไฟ ย้อนหลัง หรือการรับข่าวสารโปรโมชั่นต่างๆ",
    date: "14 ต.ค. 2568, 10:30 น.",
  },
  "2": {
    id: "2",
    type: "system",
    title: "แจ้งยอดค้างชำระ",
    description: "กรุณาชำระค่าไฟฟ้าภายในวันที่ 28 ก.ย. 2568",
    content:
      "หมายเลขผู้ใช้ไฟฟ้า 02000xxx6543 มียอดค้างชำระประจำเดือน กันยายน 2568 เป็นจำนวนเงิน 1,129.00 บาท กำหนดชำระภายในวันที่ 28 ก.ย. 2568 เพื่อป้องกันการถูกงดจ่ายกระแสไฟฟ้า กรุณาชำระเงินตามกำหนด",
    date: "10 ต.ค. 2568, 08:15 น.",
  },
  "3": {
    id: "3",
    type: "privilege",
    title: "สิทธิพิเศษสำหรับคุณ!",
    description: "รับส่วนลดค่าชาร์จรถไฟฟ้า PEA VOLTA 20 บาท",
    content:
      "สิทธิพิเศษสำหรับผู้ใช้แอป PEA Smart Plus รับส่วนลดทันที 20 บาท เมื่อใช้บริการชาร์จรถยนต์ไฟฟ้าที่สถานี PEA VOLTA ทั่วประเทศ (จำกัด 1 สิทธิ์ต่อเดือน) ตั้งแต่วันนี้ถึง 31 ธ.ค. 2568",
    date: "12 ต.ค. 2568, 14:00 น.",
  },
};

interface NotificationDetailViewProps {
  id: string;
  onBack: () => void;
}

export default function NotificationDetailView({ id, onBack }: NotificationDetailViewProps) {
  const detail = MOCK_DETAILS[id];

  if (!detail) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-white p-6 h-full">
        <p className="text-gray-500 font-['Kanit']">ไม่พบข้อมูลการแจ้งเตือน</p>
        <button onClick={onBack} className="mt-4 text-[#9B2677] font-bold font-['Kanit']">
          ย้อนกลับ
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden animate-slide-in-right h-full">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#9B2677] to-[#df338d] pt-12 pb-4 px-4 relative shrink-0">
        <div className="flex items-center justify-between text-white">
          <button onClick={onBack} className="p-1 hover:opacity-80 transition-opacity active:scale-90">
            <ChevronLeft className="w-7 h-7" />
          </button>
          <h1 className="text-[19px] font-bold font-['Kanit']">รายละเอียด</h1>
          <div className="w-7 h-7" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar bg-white p-6">
        <div className="flex flex-col items-center text-center mb-8">
          <div
            className={cn(
              "w-20 h-20 rounded-full flex items-center justify-center mb-4",
              detail.type === "system" ? "bg-purple-50 text-[#9B2677]" : "bg-pink-50 text-pink-500"
            )}
          >
            {detail.type === "privilege" ? <Gift className="w-10 h-10" /> : <Bell className="w-10 h-10" />}
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2 font-['Kanit']">{detail.title}</h2>
          <span className="text-[13px] text-gray-400 font-medium font-['Kanit']">{detail.date}</span>
        </div>

        <div className="border-t border-gray-100 pt-6">
          <p className="text-[15px] text-gray-600 leading-relaxed font-medium font-['Kanit']">{detail.content}</p>
        </div>
      </div>

      {/* Footer Nav */}
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
