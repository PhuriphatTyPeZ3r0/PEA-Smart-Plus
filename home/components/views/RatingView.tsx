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
    <div className="flex w-full flex-col items-center justify-start overflow-hidden bg-white">
      <div className="flex w-full flex-1 flex-col items-center justify-start pt-4">
        <div className="relative h-[260px] w-full overflow-hidden sm:h-72">
          <div className="absolute left-1/2 top-[48px] flex h-[219px] w-[219px] -translate-x-1/2 items-center justify-center">
            <Image
              src="/asset/icons/evaluate-satisfaction-icon/Ellipse 1946.svg"
              alt="Background decoration large"
              width={219}
              height={219}
              className="absolute"
            />
            <Image
              src="/asset/icons/evaluate-satisfaction-icon/Ellipse 1945.svg"
              alt="Background decoration small"
              width={157}
              height={157}
              className="absolute"
            />
          </div>

          <div className="absolute inset-0 flex items-center justify-center pt-8">
            <div className="relative h-[157px] w-[260px]">
              <div className="absolute left-1/2 top-0 h-[157px] w-[157px] -translate-x-1/2">
                <Image
                  src="/asset/icons/evaluate-satisfaction-icon/Mask group.svg"
                  alt="Character"
                  fill
                  className="object-contain"
                />
              </div>

              <div className="absolute left-[14px] top-[50px] h-[82px] w-[82px] origin-top-left -rotate-12">
                <Image
                  src="/asset/icons/evaluate-satisfaction-icon/Frame 1321314288.svg"
                  alt="Decoration left"
                  width={82}
                  height={82}
                />
              </div>

              <div className="absolute right-[8px] top-[54px] h-[57px] w-[102px]">
                <Image
                  src="/asset/icons/evaluate-satisfaction-icon/Vector.svg"
                  alt="Decoration right"
                  width={102}
                  height={57}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-full max-w-[560px] flex-col items-center justify-start gap-5 px-6 sm:px-8">
          <div className="flex flex-col items-center justify-start gap-2">
            <div className="self-stretch text-center text-2xl font-semibold leading-8 text-[#101828]">
              ให้คะแนนความพึงพอใจ
            </div>
            <div className="text-center text-base font-normal leading-6 text-[#101828]">
              {activeQuestion?.question || "คุณรู้สึกพึงพอใจกับประสบการณ์การใช้งาน PEA Smart Plus ครั้งนี้มากเพียงใด"}
            </div>
          </div>

          <div className="flex w-full flex-wrap items-center justify-center gap-2 py-2 sm:gap-3">
            {stars.map((star) => (
              <div
                key={star}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
                className={`relative flex h-12 w-12 cursor-pointer items-center justify-center transition-all duration-200 transform sm:h-14 sm:w-14 md:h-16 md:w-16 ${
                  (hoverRating || rating) >= star ? "scale-110" : "scale-100"
                }`}
              >
                <div
                  className={`h-12 w-12 transition-colors duration-200 sm:h-14 sm:w-14 md:h-16 md:w-16 ${
                    (hoverRating || rating) >= star ? "bg-[#FFD700]" : "bg-[#E6E6E6]"
                  }`}
                  style={{
                    maskImage: 'url("/asset/icons/evaluate-satisfaction-icon/fi_1828884.svg")',
                    maskSize: "contain",
                    maskRepeat: "no-repeat",
                    maskPosition: "center",
                    WebkitMaskImage: 'url("/asset/icons/evaluate-satisfaction-icon/fi_1828884.svg")',
                    WebkitMaskSize: "contain",
                    WebkitMaskRepeat: "no-repeat",
                    WebkitMaskPosition: "center",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full bg-white px-5 pb-12 pt-8 sm:px-8">
        <div className="mx-auto flex w-full max-w-[560px] flex-col items-start justify-center gap-5">
          <button
            onClick={onRatingSubmit}
            disabled={rating === 0}
            className={`inline-flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-full px-5 py-4 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] outline outline-1 outline-offset-[-1px] transition-all active:scale-[0.98] ${
              rating > 0
                ? "bg-[#9B2677] text-white outline-[#9B2677]"
                : "cursor-not-allowed bg-[#F2F4F7] text-[#98A1B2] outline-[#E4E7EC]"
            }`}
          >
            <div className="text-xl font-medium leading-7">ยืนยัน</div>
          </button>

          <button
            onClick={onGoToReview}
            className="inline-flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-full bg-white px-5 py-4 text-[#101828] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] outline outline-1 outline-offset-[-1px] outline-[#E4E7EC] transition-all hover:bg-gray-50 active:scale-[0.98]"
          >
            <div className="text-xl font-medium leading-7">เขียนรีวิวเพิ่มเติม</div>
          </button>
        </div>
      </div>
    </div>
  );
}
