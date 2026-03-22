"use client";

import React, { useRef, useState } from "react";
import InAppBrowser from "../InAppBrowser";

interface ServiceViewProps {
  onBack: () => void;
}

interface ServiceItem {
  label: string;
  description?: string;
  icon: string;
  highlight?: boolean;
  url?: string;
}

interface ServiceSection {
  tabLabel: string;
  sectionTitle: string;
  type: "icon-row" | "card-grid" | "card-list";
  items: ServiceItem[];
}

const ALL_SECTIONS: ServiceSection[] = [
  {
    tabLabel: "มิเตอร์ไฟฟ้า",
    sectionTitle: "บริการใช้บ้าน",
    type: "icon-row",
    items: [
      { label: "ติดตามคำขอต่างๆ", icon: "📋" },
      { label: "แจ้งปัญหาไฟฟ้าดับ", icon: "📍" },
    ],
  },
  {
    tabLabel: "มิเตอร์ไฟฟ้า",
    sectionTitle: "มิเตอร์ไฟฟ้า",
    type: "card-grid",
    items: [
      { label: "ขอใช้ไฟฟ้าใหม่", description: "บริการยื่นคำขอใช้ไฟฟ้าสำหรับที่อยู่อาศัยและธุรกิจ ได้ที่นี่เลย", icon: "🏠", highlight: true },
      { label: "อธิบายแบบระบบไฟฟ้า", description: "", icon: "📄", highlight: true },
      { label: "แจ้งย้ายมิเตอร์", description: "", icon: "🔄" },
      { label: "ยกเลิกการใช้ไฟฟ้า", description: "", icon: "❌" },
    ],
  },
  {
    tabLabel: "พื้นฐานด้านไฟฟ้า",
    sectionTitle: "พื้นฐานด้านไฟฟ้า",
    type: "card-list",
    items: [
      { label: "ขอคืนเงินประกันการใช้ไฟฟ้า", description: "ขอรับเงินคืนค่าประกันออนไลน์", icon: "💰", url: "https://cdp.pea.co.th" },
      { label: "ประมาณการค่าไฟฟ้า", description: "คำนวณค่าไฟล่วงหน้าได้ที่นี่", icon: "💡" },
      { label: "คำนวณขนาดมิเตอร์เบื้องต้น", description: "ตรวจสอบขนาดมิเตอร์ที่เหมาะสม", icon: "📏" },
    ],
  },
  {
    tabLabel: "รถยนต์ไฟฟ้า (EV)",
    sectionTitle: "รถยนต์ไฟฟ้า (EV)",
    type: "card-list",
    items: [
      { label: "PEA VOLTA", description: "บริการชาร์จรถยนต์ไฟฟ้าทั่วประเทศโดย PEA", icon: "🚗", url: "https://peavoltaev.pea.co.th" },
      { label: "Pupaplug", description: "บริการค้นหาสถานีชาร์จและจองคิวออนไลน์", icon: "🔋", url: "https://pupa.pea.co.th" },
      { label: "VOLTA FLEET", description: "ระบบบริหารจัดการยานพาหนะไฟฟ้า", icon: "🚌", url: "https://www.pea.co.th/about-pea/sgi/green-energy/ev-fleet" },
      { label: "VOLTA CONNEXT", description: "แพลตฟอร์มบริหารจัดการการชาร์จ EV", icon: "⚡", url: "https://peavoltaev.pea.co.th/product-network-operation/" },
    ],
  },
  {
    tabLabel: "พลังงานสะอาด (Solar)",
    sectionTitle: "พลังงานสะอาด (Solar)",
    type: "card-list",
    items: [
      { label: "สำรวจ ออกแบบ และติดตั้งระบบ Solar", description: "บริการออกแบบและติดตั้ง Solar Rooftop", icon: "☀️", url: "https://peasolar.pea.co.th" },
    ],
  },
  {
    tabLabel: "พลังงานสะอาด (Solar)",
    sectionTitle: "บริการอื่น ๆ",
    type: "card-list",
    items: [
      { label: "ยืนยันตัวตนส่วนตัว", description: "ยืนยันตัวตนด้วยแอป Thai ID", icon: "👤", highlight: true },
      { label: "คืนค่าประกันการใช้ไฟฟ้า", description: "ขอรับเงินคืนค่าประกันออนไลน์", icon: "💰", url: "https://cdp.pea.co.th" },
      { label: "บริการ E-service ทั้งหมด", description: "รวบรวมบริการ E-service ทุกอย่างของ PEA", icon: "📱", url: "https://sabuyservice.co.th" },
    ],
  },
];

const TABS = ["มิเตอร์ไฟฟ้า", "พื้นฐานด้านไฟฟ้า", "รถยนต์ไฟฟ้า (EV)", "พลังงานสะอาด (Solar)"];

export default function Servicemview({ onBack }: ServiceViewProps) {
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const scrollRef = useRef<HTMLDivElement>(null);
  const [browser, setBrowser] = useState<{ url: string; title: string } | null>(null);

  const handleTabClick = (tab: string) => {
    const key = ALL_SECTIONS.find((s) => s.tabLabel === tab)?.sectionTitle ?? "";
    const el = sectionRefs.current[key];
    if (el && scrollRef.current) {
      scrollRef.current.scrollTo({ top: el.offsetTop - 8, behavior: "smooth" });
    }
  };

  const handleItemClick = (item: ServiceItem) => {
    if (item.url) {
      setBrowser({ url: item.url, title: item.label });
    }
  };

  return (
    <div className="relative flex h-full flex-col bg-white">
      {/* Header */}
      <div className="flex-shrink-0 bg-white px-5 pt-12 sm:px-6">
        <div className="flex items-start gap-3 mb-4">
          <button
            onClick={onBack}
            className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 transition active:scale-90"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <div>
            <h1 className="text-xl font-bold text-slate-900 leading-tight">บริการด้านระบบไฟฟ้า</h1>
            <p className="text-sm text-slate-400 mt-0.5">ครอบจักรวาล PEA</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-3 -mx-5 px-5">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabClick(tab)}
              className="flex-shrink-0 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-500 transition-all active:scale-95 active:bg-[#A80689] active:text-white active:border-[#A80689]"
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Scrollable content */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto no-scrollbar px-5 pb-10 pt-2 sm:px-6">
        {ALL_SECTIONS.map((sec, idx) => {
          const prevTab = idx > 0 ? ALL_SECTIONS[idx - 1].tabLabel : null;
          const showDivider = prevTab && prevTab !== sec.tabLabel;

          return (
            <div key={`${sec.tabLabel}-${sec.sectionTitle}`}>
              {showDivider && <div className="my-4 h-[1px] bg-slate-100" />}
              <div ref={(el) => { sectionRefs.current[sec.sectionTitle] = el; }} className="mb-5">
                <h2 className="mb-3 text-sm font-bold text-slate-800">{sec.sectionTitle}</h2>

                {/* Icon row */}
                {sec.type === "icon-row" && (
                  <div className="flex gap-6">
                    {sec.items.map((item) => (
                      <button
                        key={item.label}
                        onClick={() => handleItemClick(item)}
                        className="flex flex-col items-center gap-2 active:scale-95"
                      >
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-50 text-2xl">
                          {item.icon}
                        </div>
                        <span className="text-center text-[11px] font-medium text-slate-600 max-w-[64px] leading-tight">{item.label}</span>
                      </button>
                    ))}
                  </div>
                )}

                {/* Card grid 2 columns */}
                {sec.type === "card-grid" && (
                  <div className="grid grid-cols-2 gap-3">
                    {sec.items.map((item) => (
                      <button
                        key={item.label}
                        onClick={() => handleItemClick(item)}
                        className={`flex items-start gap-3 rounded-2xl border p-3 text-left transition active:scale-[0.97] ${
                          item.highlight ? "border-[#EDAAE3] bg-[#FDF4FC]" : "border-slate-100 bg-white"
                        }`}
                      >
                        <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-xl ${item.highlight ? "bg-white shadow-sm" : "bg-slate-50"}`}>
                          {item.icon}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-slate-800 leading-tight">{item.label}</p>
                          {item.description ? (
                            <p className="mt-1 text-[10px] text-slate-400 leading-relaxed line-clamp-3">{item.description}</p>
                          ) : null}
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {/* Card list */}
                {sec.type === "card-list" && (
                  <div className="flex flex-col gap-3">
                    {sec.items.map((item) => (
                      <button
                        key={item.label}
                        onClick={() => handleItemClick(item)}
                        className={`flex w-full items-center gap-3 rounded-2xl border p-4 text-left transition active:scale-[0.98] ${
                          item.highlight ? "border-[#EDAAE3] bg-[#FDF4FC]" : "border-slate-100 bg-white shadow-sm"
                        }`}
                      >
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-purple-50 text-xl">
                          {item.icon}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-slate-800">{item.label}</p>
                          {item.description ? (
                            <p className="mt-0.5 text-xs text-slate-400 line-clamp-1">{item.description}</p>
                          ) : null}
                        </div>
                        {item.url && (
                          <svg className="flex-shrink-0 text-slate-300" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 18l6-6-6-6" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
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