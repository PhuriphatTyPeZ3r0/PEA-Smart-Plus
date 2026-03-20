import React from "react";
import Image from "next/image";

interface ReviewViewProps {
  comment: string;
  setComment: (comment: string) => void;
  onReviewSubmit: () => void;
}

export default function ReviewView({ comment, setComment, onReviewSubmit }: ReviewViewProps) {
  return (
    <div className="flex-1 flex flex-col px-8 pt-16 pb-10 animate-slide-in-right overflow-y-auto no-scrollbar bg-white">
      <div className="mb-10 relative">
        {/* Decorative Speech Bubble Icon */}
        <div className="absolute -top-4 -right-2 opacity-20 rotate-12 scale-150">
          <Image 
            src="/asset/icons/evaluate-satisfaction-icon/Vector.svg" 
            alt="Decor" 
            width={60} 
            height={34}
          />
        </div>
        
        <h1 className="text-[26px] font-semibold text-[#101828] mb-2 tracking-tight text-center sm:text-left font-['Kanit']">ประเมินรายละเอียดเพิ่มเติม</h1>
        <p className="text-[16px] text-[#667085] font-normal text-center sm:text-left mb-4 font-['Kanit'] leading-relaxed">
          แบ่งปันประสบการณ์ของคุณกับเรา <br className="sm:hidden"/> เพื่อนำมาปรับปรุงการบริการให้ดีขึ้น
        </p>
        <div className="h-1.5 w-12 bg-[#A80689] rounded-full mx-auto sm:mx-0"></div>
      </div>
      
      <div className="flex-1 flex flex-col mb-10 group">
        <label className="text-[13px] text-[#667085] mb-2.5 font-medium uppercase tracking-widest pl-1 group-focus-within:text-[#A80689] transition-colors font-['Kanit']">
          ข้อเสนอแนะของท่าน
        </label>
        <div className="flex-1 min-h-[200px] relative bg-slate-50/50 rounded-3xl border border-slate-100 focus-within:border-[#A80689]/30 focus-within:bg-white focus-within:shadow-[0_12px_24px_-8px_rgba(168,6,137,0.06)] transition-all duration-300">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value.slice(0, 1000))}
            placeholder="กรุณาระบุรายละเอียดตามความต้องการ เพื่อนำไปพัฒนาการให้บริการดีขึ้น"
            className="w-full h-full p-6 bg-transparent resize-none outline-none text-[#101828] text-[15px] font-normal leading-relaxed placeholder:text-slate-400 no-scrollbar font-['Kanit']"
          />
          <div className="absolute bottom-6 right-6 flex items-center gap-1.5 px-3 py-1.5 bg-white shadow-sm rounded-full border border-slate-50 transition-all">
            <span className={`text-[11px] font-semibold tracking-tight font-['Kanit'] ${comment.length > 900 ? "text-red-500" : "text-[#667085]"}`}>
              {comment.length}
            </span>
            <span className="text-[10px] text-slate-300 font-bold">/</span>
            <span className="text-[11px] text-slate-300 font-bold font-['Kanit']">1000</span>
          </div>
        </div>
      </div>

      <button
        onClick={onReviewSubmit}
        className="w-full py-4 bg-[#A80689] text-white rounded-full text-xl font-medium shadow-[0_1px_2px_rgba(16,24,40,0.05)] outline outline-1 outline-offset-[-1px] outline-[#A80689] active:scale-[0.98] transition-all font-['Kanit']"
      >
        ยืนยันการประเมิน
      </button>

      {/* Pagination Dots Mapping */}
      <div className="flex gap-2 mt-10 items-center justify-center">
         <div className="w-1 h-1 bg-slate-200 rounded-full"></div>
         <div className="w-6 h-1 bg-[#A80689] rounded-full transition-all"></div>
         <div className="w-1 h-1 bg-slate-200 rounded-full"></div>
      </div>
    </div>
  );
}
