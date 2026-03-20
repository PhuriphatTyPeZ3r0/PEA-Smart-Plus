"use client";

import React from "react";

interface ReviewViewProps {
  comment: string;
  setComment: (comment: string) => void;
  onReviewSubmit: () => void;
}

export default function ReviewView({
  comment,
  setComment,
  onReviewSubmit,
}: ReviewViewProps) {
  return (
    <div className="w-full h-full flex flex-col justify-start items-center bg-white overflow-hidden">
      {/* Header Space (Mocking the UI snippet provided) */}
      <div className="self-stretch flex-1 px-5 py-10 flex flex-col justify-start items-center gap-5">
        <div className="self-stretch flex flex-col justify-start items-start gap-2">
          <div className="text-[#101828] text-2xl font-medium font-['Kanit'] leading-8">
            ประเมินรายละเอียดเพิ่มเติม
          </div>
        </div>
        
        {/* Textarea Container */}
        <div className="self-stretch h-44 flex flex-col justify-start items-start gap-1.5">
          <div className="self-stretch flex-1 flex flex-col justify-start items-start gap-1.5">
            <div className="self-stretch flex-1 px-3.5 py-3 relative bg-white rounded-2xl shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] outline outline-1 outline-offset-[-1px] outline-[#D0D5DD] inline-flex justify-start items-start gap-2 overflow-hidden">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="แบ่งปันประสบการณ์ของคุณกับเรา เพื่อพัฒนาบริการให้ดีขึ้น"
                className="flex-1 self-stretch justify-start text-[#667085] text-base font-normal font-['Kanit'] leading-6 border-none focus:ring-0 resize-none bg-transparent"
              />
              
              {/* Resize/Decorative icons from snippet */}
              <div className="w-3 h-3 absolute right-3 bottom-3 opacity-20 pointer-events-none">
                <div className="w-2 h-2 left-[2px] top-[2px] absolute outline outline-1 outline-offset-[-0.50px] outline-[#D0D5DD]" />
                <div className="w-1 h-1 left-[7px] top-[7px] absolute outline outline-1 outline-offset-[-0.50px] outline-[#D0D5DD]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Button Section */}
      <div className="w-full pt-10 pb-12 bg-white flex flex-col justify-center items-start gap-8 px-5 border-t border-gray-50">
        <div className="self-stretch flex flex-col justify-center items-start gap-5">
          <button
            onClick={onReviewSubmit}
            disabled={!comment.trim()}
            className={`self-stretch px-5 py-4 rounded-full shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] outline outline-1 outline-offset-[-1px] inline-flex justify-center items-center gap-2.5 overflow-hidden transition-all active:scale-[0.98] ${
              comment.trim() 
                ? "bg-[#9B2677] outline-[#9B2677] text-white" 
                : "bg-[#F2F4F7] outline-[#E4E7EC] text-[#98A1B2] cursor-not-allowed"
            }`}
          >
            <div className="text-xl font-medium font-['Kanit'] leading-7">ยืนยัน</div>
          </button>
        </div>
      </div>
    </div>
  );
}
