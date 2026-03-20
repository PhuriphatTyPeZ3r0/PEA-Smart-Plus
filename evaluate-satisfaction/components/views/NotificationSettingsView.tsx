"use client";

import React, { useState } from "react";
import { ChevronLeft, Home, Building2, Settings2, Zap, User } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface NotificationSettingsViewProps {
  onBack: () => void;
}

export default function NotificationSettingsView({ onBack }: NotificationSettingsViewProps) {
  const [settings, setSettings] = useState({
    general: true,
    privilege: true,
    news: false,
    update: true,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden animate-slide-in-right h-full">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#9B2677] to-[#df338d] pt-12 pb-4 px-4 relative shrink-0">
        <div className="flex items-center justify-between text-white">
          <button onClick={onBack} className="p-1 hover:opacity-80 transition-opacity active:scale-90">
            <ChevronLeft className="w-7 h-7" />
          </button>
          <h1 className="text-[19px] font-bold font-['Kanit']">ตั้งค่าการแจ้งเตือน</h1>
          <div className="w-7 h-7" /> {/* Placeholder for balance */}
        </div>
      </div>

      {/* Settings List */}
      <div className="flex-1 overflow-y-auto no-scrollbar py-2 bg-gray-50/30">
        <div className="bg-white px-4">
          <SettingItem
            label="แจ้งเตือนทั่วไป"
            active={settings.general}
            onToggle={() => toggleSetting("general")}
          />
          <SettingItem
            label="แจ้งเตือนสิทธิพิเศษ"
            active={settings.privilege}
            onToggle={() => toggleSetting("privilege")}
          />
          <SettingItem
            label="แจ้งเตือนข่าวสาร"
            active={settings.news}
            onToggle={() => toggleSetting("news")}
          />
          <SettingItem
            label="แจ้งเตือนการอัปเดต"
            active={settings.update}
            onToggle={() => toggleSetting("update")}
          />
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

function SettingItem({ label, active, onToggle }: { label: string; active: boolean; onToggle: () => void }) {
  return (
    <div className="flex items-center justify-between py-5 border-b border-gray-50 last:border-0">
      <span className="text-[16px] font-semibold text-gray-800 font-['Kanit']">{label}</span>
      <button
        onClick={onToggle}
        className={cn(
          "w-12 h-6 rounded-full relative transition-colors duration-200 ease-in-out",
          active ? "bg-[#9B2677]" : "bg-gray-200"
        )}
      >
        <div
          className={cn(
            "absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out",
            active ? "left-7" : "left-1"
          )}
        />
      </button>
    </div>
  );
}
