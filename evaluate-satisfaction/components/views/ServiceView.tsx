"use client";

import React, { useState } from "react";
import InAppBrowser from "../InAppBrowser";

interface ServiceViewProps {
  onBack: () => void;
}

interface ServiceItem {
  label: string;
  icon: string;
  url?: string;
}

interface ServiceSection {
  section: string;
  items: ServiceItem[];
}

const SECTIONS: ServiceSection[] = [
  {
    section: "จัดการบัญชีและการใช้งาน",
    items: [
      { label: "ประวัติการใช้ไฟฟ้า", icon: "📊" },
      { label: "QR/บาร์โค้ด", icon: "📷" },
      { label: "แจ้งปัญหาไฟฟ้าดับ", icon: "📍" },
      { label: "ดูและจ่ายบิล", icon: "💳" },
      { label: "ดูการใช้ไฟฟ้าปัจจุบัน", icon: "⚡" },
      { label: "ประมาณการค่าไฟฟ้า", icon: "📈" },
      { label: "แก้ไขที่อยู่", icon: "👤" },
      { label: "ศูนย์ช่วยเหลือ", icon: "🎧" },
    ],
  },
  {
    section: "บริการด้านการใช้ไฟฟ้า",
    items: [
      { label: "เปลี่ยนขนาดมิเตอร์ (เพิ่ม/ลด)", icon: "🔌" },
      { label: "โอนเปลี่ยนเจ้าของ", icon: "🔄" },
      { label: "ระงับการใช้ไฟฟ้าชั่วคราว", icon: "🔋" },
      { label: "ยกเลิกการใช้ไฟฟ้า", icon: "⊘" },
    ],
  },
  {
    section: "บริการอื่น ๆ ที่คุณอาจสนใจ",
    items: [
      { label: "ติดตั้ง Solar Rooftop", icon: "☀️", url: "https://peasolar.pea.co.th" },
      { label: "Watt-D Point", icon: "⚡", url: "https://peavoltaev.pea.co.th" },
    ],
  },
];

function ServiceIcon({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2.5">
      <div
        className="flex h-[60px] w-[60px] items-center justify-center rounded-2xl"
        style={{
          background: "linear-gradient(135deg, #FF44DB 0%, #A80689 100%)",
          boxShadow: "0 6px 16px -4px rgba(168,6,137,0.35)",
        }}
      >
        <span className="text-[26px]">{icon}</span>
      </div>
      <span className="max-w-[72px] text-center text-[11px] font-medium leading-[1.35] text-[#1A1A2E]">
        {label}
      </span>
    </div>
  );
}

export default function ServiceView({ onBack }: ServiceViewProps) {
  const [browser, setBrowser] = useState<{ url: string; title: string } | null>(null);

  const handleItemClick = (item: ServiceItem) => {
    if (item.url) {
      setBrowser({ url: item.url, title: item.label });
    }
  };

  return (
    <div className="relative flex h-full flex-col bg-[#F8FAFC]">
      {/* Header */}
      <div className="flex flex-shrink-0 items-center gap-3 bg-white px-5 pb-4 pt-12 shadow-sm sm:px-6">
        <button
          onClick={onBack}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 transition active:scale-90"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <h1 className="text-lg font-bold text-slate-900">บริการทั้งหมด</h1>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-5 pb-10 sm:px-6">
        {SECTIONS.map((sec, si) => (
          <div key={sec.section}>
            {si > 0 && <div className="h-2 bg-[#F1F5F9]" />}
            <div className="bg-white py-6">
              <h2 className="mb-6 text-base font-bold text-[#1A1A2E]">{sec.section}</h2>
              <div className="grid grid-cols-4 gap-x-2 gap-y-6">
                {sec.items.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleItemClick(item)}
                    className="flex flex-col items-center transition active:scale-95"
                  >
                    <ServiceIcon icon={item.icon} label={item.label} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* In-app browser overlay */}
      {browser && (
        <InAppBrowser
          url={browser.url}
          title={browser.title}
          onClose={() => setBrowser(null)}
        />
      )}
    </div>
  );
}