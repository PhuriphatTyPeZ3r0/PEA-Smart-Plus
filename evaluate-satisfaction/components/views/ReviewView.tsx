"use client";

import React from "react";

interface ReviewViewProps {
  comment: string;
  setComment: (comment: string) => void;
  onReviewSubmit: () => void;
}

export default function ReviewView({ comment, setComment, onReviewSubmit }: ReviewViewProps) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-start overflow-hidden bg-white">
      <div className="flex w-full flex-1 flex-col items-center justify-start gap-5 px-5 py-10 sm:px-8">
        <div className="flex w-full max-w-[560px] flex-col items-start justify-start gap-2">
          <div className="text-2xl font-medium leading-8 text-[#101828]">ประเมินรายละเอียดเพิ่มเติม</div>
        </div>

        <div className="flex h-44 w-full max-w-[560px] flex-col items-start justify-start gap-1.5">
          <div className="flex flex-1 w-full flex-col items-start justify-start gap-1.5">
            <div className="relative inline-flex flex-1 w-full items-start justify-start gap-2 overflow-hidden rounded-2xl bg-white px-3.5 py-3 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] outline outline-1 outline-offset-[-1px] outline-[#D0D5DD]">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="แบ่งปันประสบการณ์ของคุณกับเรา เพื่อพัฒนาบริการให้ดียิ่งขึ้น"
                className="flex-1 self-stretch resize-none border-none bg-transparent text-base font-normal leading-6 text-[#667085] focus:ring-0"
              />

              <div className="pointer-events-none absolute bottom-3 right-3 h-3 w-3 opacity-20">
                <div className="absolute left-[2px] top-[2px] h-2 w-2 outline outline-1 outline-offset-[-0.5px] outline-[#D0D5DD]" />
                <div className="absolute left-[7px] top-[7px] h-1 w-1 outline outline-1 outline-offset-[-0.5px] outline-[#D0D5DD]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full border-t border-gray-50 bg-white px-5 pb-12 pt-8 sm:px-8">
        <div className="mx-auto flex w-full max-w-[560px] flex-col items-start justify-center gap-5">
          <button
            onClick={onReviewSubmit}
            disabled={!comment.trim()}
            className={`inline-flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-full px-5 py-4 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] outline outline-1 outline-offset-[-1px] transition-all active:scale-[0.98] ${
              comment.trim()
                ? "bg-[#9B2677] text-white outline-[#9B2677]"
                : "cursor-not-allowed bg-[#F2F4F7] text-[#98A1B2] outline-[#E4E7EC]"
            }`}
          >
            <div className="text-xl font-medium leading-7">ยืนยัน</div>
          </button>
        </div>
      </div>
    </div>
  );
}
