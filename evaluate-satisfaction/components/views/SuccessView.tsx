import React from "react";
import Image from "next/image";

export default function SuccessView() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-8 pt-16 pb-10 animate-zoom-in">
      <div className="mb-8">
        <Image 
          src="/asset/icons/evaluate-satisfaction-icon/Mask group.svg" 
          alt="Success Icon" 
          width={200} 
          height={200}
          className="w-[160px] h-auto"
        />
      </div>

      <h1 className="text-[22px] font-bold text-[#1F2937] mb-3 text-center">ขอบคุณสำหรับการประเมิน!</h1>
      <p className="text-[14px] text-gray-500 text-center leading-relaxed px-2">
        ขอบคุณที่เข้ามาร่วมแสดงความคิดเห็น <br/>
        ในการปรับปรุงคุณภาพการให้บริการต่อไป
      </p>

      <div className="flex gap-1.5 mt-12">
         <div className="w-2.5 h-2.5 bg-purple-600 rounded-full"></div>
         <div className="w-2.5 h-2.5 bg-purple-100 rounded-full"></div>
         <div className="w-2.5 h-2.5 bg-purple-100 rounded-full"></div>
      </div>
    </div>
  );
}
