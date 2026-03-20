import React from "react";

interface ReviewViewProps {
  comment: string;
  setComment: (comment: string) => void;
  onReviewSubmit: () => void;
}

export default function ReviewView({ comment, setComment, onReviewSubmit }: ReviewViewProps) {
  return (
    <div className="flex-1 flex flex-col px-8 pt-20 pb-10 animate-slide-in-right overflow-y-auto no-scrollbar">
      <h1 className="text-[20px] font-bold text-[#1F2937] mb-6">ประเมินรายละเอียดเพิ่มเติม</h1>
      
      <label className="text-[14px] text-[#4B5563] mb-2 font-medium">แนะนำโดยรวมของท่าน</label>
      <div className="flex-1 mb-6 flex flex-col">
        <div className="flex-1 relative bg-[#F9FAFB] rounded-2xl border border-gray-100 focus-within:border-purple-300 focus-within:ring-2 focus-within:ring-purple-100 transition-all">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value.slice(0, 1000))}
            placeholder="กรุณาระบุรายละเอียดตามความต้องการ เพื่อนำไปพัฒนาการให้บริการดีขึ้น"
            className="w-full h-full p-5 bg-transparent resize-none outline-none text-[#374151] text-[14px] leading-relaxed placeholder:text-gray-400"
          />
          <div className="absolute bottom-4 right-4 text-[12px] text-gray-400">
            {comment.length}/1000
          </div>
        </div>
      </div>

      <button
        onClick={onReviewSubmit}
        className="w-full py-[16px] bg-gradient-to-r from-purple-600 to-[#A855F7] text-white rounded-2xl text-[16px] font-bold shadow-lg shadow-purple-200 active:scale-[0.98] transition-all"
      >
        ยืนยัน
      </button>
    </div>
  );
}
