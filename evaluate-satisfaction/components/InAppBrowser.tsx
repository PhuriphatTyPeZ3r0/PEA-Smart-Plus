"use client";

import React from "react";

interface InAppBrowserProps {
  url: string;
  title: string;
  onClose: () => void;
}

export default function InAppBrowser({ url, onClose }: InAppBrowserProps) {
  const handleConfirm = () => {
    window.open(url, "_blank");
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="absolute inset-0 z-[200] bg-black/50"
        onClick={onClose}
      />

      {/* Bottom Sheet */}
      <div className="absolute bottom-0 left-0 right-0 z-[201] rounded-t-[32px] bg-white px-6 pb-10 pt-8 animate-slide-up">
        {/* Icon */}
        <div className="mb-6 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-pink-50">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-pink-100">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <rect x="5" y="2" width="14" height="20" rx="2" fill="#C020A0" opacity="0.15" stroke="#C020A0" strokeWidth="1.5" />
                <rect x="8" y="5" width="8" height="1.5" rx="0.75" fill="#C020A0" opacity="0.5" />
                <circle cx="12" cy="18" r="1.2" fill="#C020A0" />
              </svg>
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-xl font-bold text-slate-900">เปิดลิงก์ภายนอก</h2>
          <p className="text-sm leading-relaxed text-slate-500">
            คุณกำลังออกจากแอปเพื่อเปิดลิงก์จากภายนอก
            <br />
            ต้องการดำเนินการต่อหรือไม่
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={handleConfirm}
            className="w-full rounded-full bg-[#C020A0] py-4 text-base font-bold text-white transition active:scale-95"
          >
            ดำเนินการต่อ
          </button>
          <button
            onClick={onClose}
            className="w-full rounded-full border-2 border-[#C020A0] py-4 text-base font-bold text-[#C020A0] transition active:scale-95"
          >
            ยกเลิก
          </button>
        </div>
      </div>
    </>
  );
}