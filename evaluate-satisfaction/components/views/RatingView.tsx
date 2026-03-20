import React from "react";
import Image from "next/image";
import { StarIcon } from "../StarIcon";

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
  onGoToReview
}: RatingViewProps) {
  return (
    <div className="flex-1 flex flex-col items-center px-8 pt-16 pb-10 overflow-y-auto no-scrollbar">
      <div className="mb-8 mt-4">
        <Image 
          src="/asset/icons/evaluate-satisfaction-icon/Mask group.svg" 
          alt="Satisfaction Icon" 
          width={200} 
          height={200}
          className="w-[160px] h-auto"
          priority
        />
      </div>

      <h1 className="text-[20px] font-bold text-[#1F2937] mb-2 text-center">ให้คะแนนความพึงพอใจ</h1>
      <p className="text-[14px] text-gray-500 text-center leading-relaxed mb-8 max-w-[280px]">
        {activeQuestion ? activeQuestion.question : "คุณรู้สึกอย่างไรต่อการใช้บริการแอปพลิเคชัน PEA Smart Plus ครั้งนี้"}
      </p>

      <div className="flex flex-col items-center mb-10 w-full">
        <div className="flex gap-3 mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <StarIcon
              key={star}
              filled={(hoverRating || rating) >= star}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
            />
          ))}
        </div>
        <div className="w-full flex justify-end pr-8">
          <span className="text-[12px] text-purple-600 font-medium">มากที่สุด</span>
        </div>
      </div>

      <div className="mt-auto w-full flex flex-col gap-3">
        <button
          onClick={onRatingSubmit}
          disabled={rating === 0}
          className={`w-full py-[16px] rounded-2xl text-[16px] font-bold transition-all duration-300 ${
            rating > 0 
              ? "bg-gradient-to-r from-purple-600 to-[#A855F7] text-white shadow-lg shadow-purple-200 active:scale-[0.98]" 
              : "bg-[#F3F4F6] text-[#9CA3AF] cursor-not-allowed"
          }`}
        >
          ยืนยัน
        </button>
        <button
          onClick={onGoToReview}
          className="w-full py-[16px] rounded-2xl text-[16px] font-bold border-2 border-[#F3F4F6] text-[#4B5563] hover:bg-gray-50 transition-all active:scale-[0.98]"
        >
          เขียนรีวิวเพิ่มเติม
        </button>
      </div>
    </div>
  );
}
