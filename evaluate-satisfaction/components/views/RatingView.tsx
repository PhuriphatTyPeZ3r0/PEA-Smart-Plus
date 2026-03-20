"use client";

import React from "react";
import Image from "next/image";

interface RatingViewProps {
  activeQuestion: { questionId: number; question: string } | null;
  rating: number;
  hoverRating: number;
  setRating: (rating: number) => void;
  setHoverRating: (rating: number) => void;
  onRatingSubmit: () => void;
  onGoToReview: () => void;
}

export default function RatingView({
  activeQuestion,
  rating,
  hoverRating,
  setRating,
  setHoverRating,
  onRatingSubmit,
  onGoToReview,
}: RatingViewProps) {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="w-full flex flex-col justify-start items-center overflow-hidden bg-white">
      {/* Header Section (Mocking the UI snippet provided) */}
      <div className="self-stretch flex-1 flex flex-col justify-start items-center pt-4">
        <div className="self-stretch h-72 relative overflow-hidden">
          <div className="w-52 h-52 left-[50%] -translate-x-1/2 top-[48px] absolute opacity-50 bg-green-100 rounded-full blur-sm" />
          <div className="w-40 h-40 left-[50%] -translate-x-1/2 top-[73px] absolute opacity-50 bg-gradient-to-b from-emerald-100 to-emerald-200 rounded-full" />
          <div className="w-40 h-40 left-[50%] -translate-x-1/2 top-[73px] absolute bg-gradient-to-b from-emerald-100 to-emerald-200 rounded-full" />
          
          {/* Central Character/Illustration (simplified implementation of the complex absolute divs) */}
          <div className="absolute inset-0 flex items-center justify-center pt-8">
             <div className="w-24 h-24 bg-[radial-gradient(ellipse_75.81%_145.75%_at_49.46%_-2.02%,_#FF44DB_0%,_#A80689_100%)] rounded-full relative shadow-lg">
                {/* Simplified eyes/face to match the style */}
                <div className="absolute top-[30%] left-[25%] w-2 h-2 bg-stone-950 rounded-full" />
                <div className="absolute top-[30%] right-[25%] w-2 h-2 bg-stone-950 rounded-full" />
                <div className="absolute bottom-[30%] left-[50%] -translate-x-1/2 w-6 h-3 border-b-2 border-stone-950 rounded-full" />
             </div>
          </div>
          
          {/* Decorative elements from the snippet */}
          <div className="w-16 h-16 left-[20%] top-[130px] absolute origin-top-left rotate-[-11.63deg]">
            <div className="w-9 h-9 left-[25.25px] top-[18.64px] absolute origin-top-left rotate-[11.63deg] bg-white rounded-[3px] shadow-sm" />
          </div>
          <div className="w-24 h-14 right-[10%] top-[130px] absolute bg-gradient-to-b from-blue-500 to-indigo-300/50 rounded-lg opacity-40" />
        </div>

        <div className="flex flex-col justify-start items-center gap-5 px-6">
          <div className="flex flex-col justify-start items-center gap-2">
            <div className="self-stretch text-center text-[#101828] text-2xl font-semibold font-['Kanit'] leading-8">
              ให้คะแนนความพึงพอใจ
            </div>
            <div className="text-center text-[#101828] text-base font-normal font-['Kanit'] leading-6">
              {activeQuestion?.question || "คุณรู้สึกพึงพอใจกับประสบการณ์การใช้งาน PEA Smart Plus หรือไม่"}
            </div>
          </div>

          {/* Rating Stars (Mocking the custom style from snippet) */}
          <div className="self-stretch flex justify-center items-center gap-3 py-2">
            {stars.map((star) => (
              <div 
                key={star}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
                className={`w-14 h-14 relative cursor-pointer transition-all duration-200 transform ${
                  (hoverRating || rating) >= star ? "scale-110" : "scale-100"
                }`}
              >
                <div className={`w-14 h-14 left-0 top-0 absolute rounded-lg transition-colors ${
                  (hoverRating || rating) >= star ? "bg-[#FFD700]" : "bg-zinc-300"
                }`} />
                <div className="w-11 h-11 left-[6px] top-[6px] absolute overflow-hidden flex items-center justify-center">
                  <div className={`w-11 h-11 rounded-md transition-colors ${
                    (hoverRating || rating) >= star ? "bg-white/20" : "bg-[#E4E7EC]"
                  }`} />
                  {/* Star Icon Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center text-white">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill={(hoverRating || rating) >= star ? "white" : "#98A1B2"}>
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons Section */}
      <div className="w-full pt-10 pb-12 bg-white flex flex-col justify-center items-start gap-8 px-5">
        <div className="self-stretch flex flex-col justify-center items-start gap-5">
          <button
            onClick={onRatingSubmit}
            disabled={rating === 0}
            className={`self-stretch px-5 py-4 rounded-full shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] outline outline-1 outline-offset-[-1px] inline-flex justify-center items-center gap-2.5 overflow-hidden transition-all active:scale-[0.98] ${
              rating > 0 
                ? "bg-[#9B2677] outline-[#9B2677] text-white" 
                : "bg-[#F2F4F7] outline-[#E4E7EC] text-[#98A1B2] cursor-not-allowed"
            }`}
          >
            <div className="text-xl font-medium font-['Kanit'] leading-7">ยืนยัน</div>
          </button>
          
          <button
            onClick={onGoToReview}
            className="self-stretch px-5 py-4 bg-white rounded-full shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] outline outline-1 outline-offset-[-1px] outline-[#E4E7EC] inline-flex justify-center items-center gap-2.5 overflow-hidden transition-all hover:bg-gray-50 active:scale-[0.98]"
          >
            <div className="text-[#101828] text-xl font-medium font-['Kanit'] leading-7">เขียนรีวิวเพิ่มเติม</div>
          </button>
        </div>
      </div>
    </div>
  );
}
