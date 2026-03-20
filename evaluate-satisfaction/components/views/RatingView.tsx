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
  onGoToReview,
}: RatingViewProps) {
  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden">
      {/* Illustration Area - Mapped to provided assets */}
      <div className="self-stretch h-[320px] relative overflow-hidden flex-shrink-0">
        {/* Background Decorative Ellipses */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[48px]">
          <Image 
            src="/asset/icons/evaluate-satisfaction-icon/Ellipse 1946.svg" 
            alt="Bg Decor" 
            width={219} 
            height={219}
            className="opacity-50 blur-[2px]"
          />
        </div>
        <div className="absolute left-1/2 -translate-x-[60%] top-[73px]">
          <Image 
            src="/asset/icons/evaluate-satisfaction-icon/Ellipse 1945.svg" 
            alt="Bg Decor Small" 
            width={157} 
            height={157}
            className="opacity-50"
          />
        </div>
        
        {/* Main Character Illustration */}
        <div className="absolute inset-0 flex items-center justify-center pt-8">
             <Image 
                src="/asset/icons/evaluate-satisfaction-icon/Mask group.svg" 
                alt="Satisfaction Illustration" 
                width={157} 
                height={157}
                className="relative z-10"
                priority
             />
        </div>

        {/* Floating elements if needed - Vector.svg (Speech bubble) */}
        <div className="absolute right-[20%] top-[80px] animate-bounce duration-[3000ms]">
          <Image 
            src="/asset/icons/evaluate-satisfaction-icon/Vector.svg" 
            alt="Speech Bubble" 
            width={40} 
            height={22}
            className="opacity-80"
          />
        </div>
      </div>

      {/* Text Content */}
      <div className="flex flex-col justify-start items-center gap-5 px-6">
        <div className="flex flex-col justify-start items-center gap-2">
          <h1 className="text-[#101828] text-2xl font-semibold font-['Kanit'] leading-8 text-center">
            ให้คะแนนความพึงพอใจ
          </h1>
          <p className="text-[#101828] text-base font-normal font-['Kanit'] leading-6 text-center max-w-[320px]">
            {activeQuestion ? activeQuestion.question : "คุณรู้สึกพึงพอใจกับประสบการณ์การใช้งาน PEA Smart Plus หรือไม่"}
          </p>
        </div>

        {/* Rating Section */}
        <div className="flex flex-col items-center gap-4 w-full py-4">
          <div className="flex justify-between items-center w-full max-w-[320px]">
            {[1, 2, 3, 4, 5].map((star) => (
              <div key={star} className="w-14 h-14 flex items-center justify-center">
                <StarIcon
                  filled={(hoverRating || rating) >= star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Buttons Area */}
      <div className="mt-auto pt-6 pb-12 px-5 flex flex-col justify-center items-start gap-4">
        <button
          onClick={onRatingSubmit}
          disabled={rating === 0}
          className={`self-stretch px-5 py-4 rounded-full shadow-[0_1px_2px_rgba(16,24,40,0.05)] outline outline-1 outline-offset-[-1px] flex justify-center items-center transition-all ${
            rating > 0
              ? "bg-[#A80689] text-white outline-[#A80689] active:scale-[0.98]"
              : "bg-[#F2F4F7] text-[#98A1B2] outline-[#E4E7EC] cursor-not-allowed"
          }`}
        >
          <span className="text-xl font-medium font-['Kanit'] leading-7">ยืนยัน</span>
        </button>

        <button
          onClick={onGoToReview}
          className="self-stretch px-5 py-4 bg-white rounded-full shadow-[0_1px_2px_rgba(16,24,40,0.05)] outline outline-1 outline-offset-[-1px] outline-[#E4E7EC] flex justify-center items-center hover:bg-slate-50 active:scale-[0.98] transition-all"
        >
          <span className="text-[#344054] text-xl font-medium font-['Kanit'] leading-7">เขียนรีวิวเพิ่มเติม</span>
        </button>
      </div>
    </div>
  );
}
