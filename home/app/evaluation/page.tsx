"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import RatingView from "@/components/views/RatingView";
import ReviewView from "@/components/views/ReviewView";
import SuccessView from "@/components/views/SuccessView";

type EvaluationViewState = "rating" | "review" | "success";

const ACTIVE_QUESTION = {
  questionId: 999,
  question: "คุณรู้สึกพึงพอใจกับประสบการณ์การใช้งาน PEA Smart Plus ครั้งนี้มากเพียงใด",
};

export default function EvaluationPage() {
  const router = useRouter();
  const [view, setView] = useState<EvaluationViewState>("rating");
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");

  const handleRatingSubmit = () => {
    if (rating > 0) {
      setView("review");
    }
  };

  const handleReviewSubmit = () => {
    setView("success");
  };

  const handleClose = () => {
    router.push("/");
  };

  return (
    <div className="absolute inset-0 z-[100] bg-white">
      <button
        type="button"
        onClick={handleClose}
        className="absolute left-6 top-6 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-slate-100 bg-slate-50 shadow-sm transition-all hover:bg-slate-100 active:scale-90"
      >
        <Image
          src="/asset/icons/evaluate-satisfaction-icon/x-close.svg"
          alt="Close"
          width={12}
          height={12}
          className="opacity-60"
        />
      </button>

      {view === "rating" && (
        <RatingView
          activeQuestion={ACTIVE_QUESTION}
          rating={rating}
          hoverRating={hoverRating}
          setRating={setRating}
          setHoverRating={setHoverRating}
          onRatingSubmit={handleRatingSubmit}
          onGoToReview={() => setView("review")}
        />
      )}

      {view === "review" && (
        <ReviewView comment={comment} setComment={setComment} onReviewSubmit={handleReviewSubmit} />
      )}

      {view === "success" && <SuccessView onClose={handleClose} />}
    </div>
  );
}
