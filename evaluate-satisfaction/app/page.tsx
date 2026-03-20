"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import LoadingView from "../components/views/LoadingView";
import HomeView from "../components/views/HomeView";
import RatingView from "../components/views/RatingView";
import ReviewView from "../components/views/ReviewView";
import SuccessView from "../components/views/SuccessView";

type ViewState = "loading" | "home" | "rating" | "review" | "success";

interface ActiveQuestion {
  questionId: number;
  question: string;
}

export default function AppFlow() {
  const [view, setView] = useState<ViewState>("loading");
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [hasShownEvaluation, setHasShownEvaluation] = useState<boolean>(false);
  const [activeQuestion, setActiveQuestion] = useState<ActiveQuestion | null>({
    questionId: 999,
    question: "คุณรู้สึกพึงพอใจมากเพียงใดกับประสบการณ์การใช้งาน PEA Smart Plus ครั้งนี้"
  });

  // Mockup Data for UserAccId = 90
  const mockUser = {
    id: "90",
    idenNumber: "oPunVQb7OgaT3y6lyuUDrU+oCRct4OBM8kNgjGw=",
    name: "คุณ ภูริพัฒน์ เหมกุล",
    balance: "1,260.52",
    ca: "020001234567"
  };

  useEffect(() => {
    localStorage.setItem("UserAccIdenNumber", mockUser.idenNumber);
    localStorage.setItem("SetLanguage", "TH");
    
    // Initial loading simulation
    const timer = setTimeout(() => {
      setView("home");
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (view === "home" && !hasShownEvaluation) {
      const timer = setTimeout(() => {
        setHasShownEvaluation(true);
        setView("rating");
      }, 1500); 
      return () => clearTimeout(timer);
    }
  }, [view, hasShownEvaluation]);

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
    <div className="min-h-[100dvh] bg-[#F1F5F9] flex items-center justify-center p-0 sm:p-4 font-sans text-slate-900 overflow-hidden">
      {/* Main App Container */}
      <div className="w-full max-w-[430px] h-[100dvh] sm:h-[92dvh] sm:max-h-[932px] bg-white sm:rounded-[48px] shadow-2xl overflow-hidden relative flex flex-col sm:border-[8px] sm:border-slate-800">
        
        {view === "loading" && <LoadingView />}

        {view !== "loading" && (
          <HomeView mockUser={mockUser} isActive={view === "home"} onOpenEvaluation={() => setView("rating")} />
        )}

        {(view === "rating" || view === "review" || view === "success") && (
          <div className="absolute inset-0 bg-black/40 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6 transition-opacity duration-300">
            {/* Click outside to close (optional, but good for UX) */}
            <div className="absolute inset-0" onClick={handleClose}></div>
            
            <div className="w-full max-w-[430px] h-[88dvh] sm:h-auto sm:max-h-[720px] bg-white rounded-t-[40px] sm:rounded-[40px] shadow-2xl overflow-hidden relative flex flex-col animate-slide-in-bottom">
              {/* Drag Handle for Mobile feel */}
              <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mt-4 mb-2 shrink-0 sm:hidden"></div>
              
              <button 
                onClick={handleClose}
                className="absolute top-6 left-6 z-10 w-9 h-9 rounded-full flex items-center justify-center bg-slate-50 hover:bg-slate-100 active:scale-90 transition-all border border-slate-100 shadow-sm"
              >
                <Image src="/asset/icons/evaluate-satisfaction-icon/x-close.svg" alt="Close" width={12} height={12} className="opacity-60" />
              </button>

              {view === "rating" && (
                <RatingView 
                  activeQuestion={activeQuestion}
                  rating={rating}
                  hoverRating={hoverRating}
                  setRating={setRating}
                  setHoverRating={setHoverRating}
                  onRatingSubmit={handleRatingSubmit}
                  onGoToReview={() => setView("review")}
                />
              )}

              {view === "review" && (
                <ReviewView 
                  comment={comment}
                  setComment={setComment}
                  onReviewSubmit={handleReviewSubmit}
                />
              )}

              {view === "success" && <SuccessView onClose={handleClose} />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
