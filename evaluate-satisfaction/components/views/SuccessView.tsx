"use client";

import React, { useEffect } from "react";

interface SuccessViewProps {
  onClose: () => void;
}

export default function SuccessView({ onClose }: SuccessViewProps) {
  // Auto close or manual close as requested: "หลังกด Summit ปิดหน้าไปเลย"
  // We'll give it a small delay so the user sees the success message
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="w-full flex flex-col justify-start items-center bg-white overflow-hidden">
      {/* Header Illustration Section (Shared with RatingView style) */}
      <div className="self-stretch flex-1 flex flex-col justify-start items-center pt-4">
        <div className="self-stretch h-72 relative overflow-hidden">
          <div className="w-52 h-52 left-[50%] -translate-x-1/2 top-[48px] absolute opacity-50 bg-green-100 rounded-full blur-sm" />
          <div className="w-40 h-40 left-[50%] -translate-x-1/2 top-[73px] absolute opacity-50 bg-gradient-to-b from-emerald-100 to-emerald-200 rounded-full" />
          <div className="w-40 h-40 left-[50%] -translate-x-1/2 top-[73px] absolute bg-gradient-to-b from-emerald-100 to-emerald-200 rounded-full" />
          
          {/* Central Character/Illustration */}
          <div className="absolute inset-0 flex items-center justify-center pt-8">
             <div className="w-24 h-24 bg-[radial-gradient(ellipse_75.81%_145.75%_at_49.46%_-2.02%,_#FF44DB_0%,_#A80689_100%)] rounded-full relative shadow-lg">
                <div className="absolute top-[30%] left-[25%] w-2 h-2 bg-stone-950 rounded-full" />
                <div className="absolute top-[30%] right-[25%] w-2 h-2 bg-stone-950 rounded-full" />
                <div className="absolute bottom-[30%] left-[50%] -translate-x-1/2 w-6 h-3 border-b-2 border-stone-950 rounded-full" />
             </div>
          </div>
          
          <div className="w-16 h-16 left-[20%] top-[130px] absolute origin-top-left rotate-[-11.63deg]">
            <div className="w-9 h-9 left-[25.25px] top-[18.64px] absolute origin-top-left rotate-[11.63deg] bg-white rounded-[3px] shadow-sm" />
          </div>
          <div className="w-24 h-14 right-[10%] top-[130px] absolute bg-gradient-to-b from-blue-500 to-indigo-300/50 rounded-lg opacity-40" />
        </div>

        <div className="self-stretch px-5 flex flex-col justify-start items-center gap-5 mt-4">
          <div className="self-stretch text-center text-[#101828] text-2xl font-semibold font-['Kanit'] leading-8">
            ขอบคุณสำหรับการประเมิน!
          </div>
          <div className="self-stretch text-center text-[#101828] text-base font-normal font-['Kanit'] leading-6">
            ข้อเสนอแนะของคุณจะถูกนำไปใช้
            <br />
            ในการปรับปรุงคุณภาพการให้บริการต่อไป
          </div>
        </div>
      </div>

      {/* Button to manually close if needed */}
      <div className="w-full pt-10 pb-12 bg-white flex flex-col justify-center items-start px-5">
        <button
          onClick={onClose}
          className="self-stretch px-5 py-4 bg-[#9B2677] text-white rounded-full shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] outline outline-1 outline-offset-[-1px] outline-[#9B2677] inline-flex justify-center items-center gap-2.5 overflow-hidden transition-all active:scale-[0.98] font-['Kanit'] font-medium text-xl"
        >
          กลับสู่หน้าหลัก
        </button>
      </div>
    </div>
  );
}
