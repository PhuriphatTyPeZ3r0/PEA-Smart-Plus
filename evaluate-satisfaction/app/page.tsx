"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import LoadingView from "../components/views/LoadingView";
import HomeView from "../components/views/HomeView";
import RatingView from "../components/views/RatingView";
import ReviewView from "../components/views/ReviewView";
import SuccessView from "../components/views/SuccessView";
import { useUserProfile } from "@/components/providers/UserProfileProvider";
type ViewState =
  | "loading"
  | "home"
  | "rating"
  | "review"
  | "success";

interface ActiveQuestion {
  questionId: number;
  question: string;
}

const ACTIVE_QUESTION: ActiveQuestion = {
  questionId: 999,
  question: "คุณรู้สึกพึงพอใจกับประสบการณ์การใช้งาน PEA Smart Plus ครั้งนี้มากเพียงใด",
};

export default function AppFlow() {
  const { profile } = useUserProfile();
  const [view, setView] = useState<ViewState>("loading");
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const sharedUser = {
    id: profile.id,
    idenNumber: profile.idenNumber,
    name: profile.fullName,
    balance: profile.balance,
    ca: profile.ca,
    accountName: profile.accountName,
    dueDate: profile.dueDate,
    newServiceLocationCount: profile.newServiceLocationCount,
  };

  useEffect(() => {
    localStorage.setItem("UserAccIdenNumber", profile.idenNumber);
    localStorage.setItem("SetLanguage", "TH");

    const timer = setTimeout(() => {
      setView("home");
    }, 2000);

    return () => clearTimeout(timer);
  }, [profile.idenNumber]);

  const handleRatingSubmit = () => {
    if (rating > 0) {
      setView("success");
    }
  };

  const handleReviewSubmit = () => {
    setView("success");
  };

  const handleClose = () => {
    setView("home");
    setRating(0);
    setComment("");
  };

  return (
    <div className="flex min-h-[100dvh] items-center justify-center overflow-hidden bg-[#F1F5F9] p-0 font-sans text-slate-900 md:p-4 lg:p-6">
      <div className="relative flex h-[100dvh] w-full flex-col overflow-hidden bg-white shadow-2xl md:mx-auto md:h-[calc(100dvh-2rem)] md:max-w-[820px] md:rounded-[40px] md:border-[6px] md:border-slate-800 lg:h-[calc(100dvh-3rem)] lg:max-w-[1180px] lg:border-0 xl:max-w-[1320px]">
        {view === "loading" && <LoadingView />}

        {view !== "loading" && (
          <HomeView
            mockUser={sharedUser}
            isActive={view === "home"}
            onOpenEvaluation={() => setView("rating")}
          />
        )}

        {(view === "rating" || view === "review" || view === "success") && (
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
        )}
      </div>
    </div>
  );
}