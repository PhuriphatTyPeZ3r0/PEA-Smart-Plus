import React from "react";
import Image from "next/image";

interface SuccessViewProps {
  onClose: () => void;
}

export default function SuccessView({ onClose }: SuccessViewProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-8 pt-16 pb-10 animate-zoom-in bg-white">
      <div className="mb-10 mt-4 relative">
        {/* Background Decorative Ellipses for Success */}
        <div className="absolute inset-0 flex items-center justify-center scale-150">
          <Image 
            src="/asset/icons/evaluate-satisfaction-icon/Ellipse 1946.svg" 
            alt="Bg Decor" 
            width={219} 
            height={219}
            className="opacity-30 blur-xl animate-pulse"
          />
        </div>
        
        {/* Success Star Icon */}
        <div className="w-[180px] h-[180px] rounded-full bg-gradient-to-br from-slate-50 to-purple-50 flex items-center justify-center relative z-10 overflow-hidden border-4 border-white shadow-2xl">
          <Image 
            src="/asset/icons/evaluate-satisfaction-icon/Frame 1321314288.svg" 
            alt="Success Star" 
            width={120} 
            height={120}
            className="w-[100px] h-auto drop-shadow-lg"
          />
        </div>
      </div>

      <div className="flex flex-col items-center gap-3 mb-12">
        <h1 className="text-[26px] font-semibold text-[#101828] text-center tracking-tight font-['Kanit']">ขอบคุณสำหรับการประเมิน!</h1>
        <p className="text-[16px] text-[#667085] text-center leading-relaxed px-4 font-['Kanit']">
          ข้อเสนอแนะของคุณจะนำไปใช้ <br/>
          ในการปรับปรุงคุณภาพการให้บริการต่อไป
        </p>
      </div>

      <button
        onClick={onClose}
        className="w-full py-4 bg-[#A80689] text-white rounded-full text-xl font-medium shadow-[0_1px_2px_rgba(16,24,40,0.05)] outline outline-1 outline-offset-[-1px] outline-[#A80689] active:scale-[0.98] transition-all font-['Kanit']"
      >
        ยืนยัน
      </button>

      {/* Pagination Dots Mapping */}
      <div className="flex gap-2 mt-10 items-center">
         <div className="w-1 h-1 bg-slate-200 rounded-full"></div>
         <div className="w-1 h-1 bg-slate-200 rounded-full"></div>
         <div className="w-6 h-1 bg-[#A80689] rounded-full transition-all"></div>
      </div>
    </div>
  );
}
