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
  const [activeQuestion, setActiveQuestion] = useState<ActiveQuestion | null>(null);

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
  }, []);

  const fetchSatisfactionQuestion = async () => {
    try {
      const userAccIdenNumber = localStorage.getItem("UserAccIdenNumber") || "";
      const lang = localStorage.getItem("SetLanguage") || "TH";

      const res = await fetch("https://smartplus3-api-dev.pea.co.th/API/EvaluateSatisfaction/GetQuestionByUserCA", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ UserAccIdenNumber: userAccIdenNumber, Lang: lang }),
      });

      if (res.ok) {
        const data = await res.json();
        const isSuccess = data.result === 1 || data.result === "1" || data.result === true || String(data.result).toLowerCase() === "true";
        
        if (isSuccess) {
          setActiveQuestion({ questionId: data.questionId, question: data.question });
          return true;
        } else {
          setActiveQuestion({ questionId: 999, question: "คุณรู้สึกอย่างไรต่อการใช้บริการแอปพลิเคชัน PEA Smart Plus ครั้งนี้" });
          return true;
        }
      } else {
        setActiveQuestion({ questionId: 999, question: "คุณรู้สึกอย่างไรต่อการใช้บริการแอปพลิเคชัน PEA Smart Plus ครั้งนี้ (Fallback)" });
        return true;
      }
    } catch (err) {
      setActiveQuestion({ questionId: 999, question: "คุณรู้สึกอย่างไรต่อการใช้บริการแอปพลิเคชัน PEA Smart Plus ครั้งนี้ (Mockup Mode)" });
      return true;
    }
  };

  const logEvaluationShow = async (questionId: number) => {
    try {
      const userAccIdenNumber = localStorage.getItem("UserAccIdenNumber") || "";
      await fetch("https://smartplus3-api-dev.pea.co.th/API/EvaluateSatisfaction/InsertLogShow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ UserAccIdenNumber: userAccIdenNumber, QuestionId: questionId }),
      });
    } catch (err) {
      console.error("Failed to log evaluation show:", err);
    }
  };

  const logDismiss = async () => {
    try {
      const userAccIdenNumber = localStorage.getItem("UserAccIdenNumber") || "";
      const questionId = activeQuestion?.questionId ?? 0;
      await fetch("https://smartplus3-api-dev.pea.co.th/API/EvaluateSatisfaction/InsertLogDismiss", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ UserAccIdenNumber: userAccIdenNumber, QuestionId: questionId }),
      });
    } catch (err) {
      console.error("Failed to log dismiss:", err);
    }
  };

  const submitSatisfaction = async (score: number, commentText: string = "") => {
    try {
      const userAccIdenNumber = localStorage.getItem("UserAccIdenNumber") || "";
      const questionId = Number(activeQuestion?.questionId ?? 1);
      
      const res = await fetch("https://smartplus3-api-dev.pea.co.th/API/EvaluateSatisfaction/InsertAnswerOrLog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          UserAccId: userAccIdenNumber,
          QuestionId: questionId,
          ActionType: 2,
          Score: score,
          Comment: commentText || null
        }),
      });

      if (res.ok) {
        const data = await res.json();
        return data.result === 1 || data.result === true || String(data.result).toLowerCase() === "true";
      }
    } catch (err) {
      console.error("Failed to submit satisfaction:", err);
    }
    return false;
  };

  useEffect(() => {
    if (view === "loading") {
      const initApp = async () => {
        await fetchSatisfactionQuestion();
        const timer = setTimeout(() => setView("home"), 2000);
        return () => clearTimeout(timer);
      };
      initApp();
    }
  }, [view]);

  useEffect(() => {
    if (view === "home" && !hasShownEvaluation && activeQuestion) {
      const timer = setTimeout(() => {
        setHasShownEvaluation(true);
        setView("rating");
        logEvaluationShow(activeQuestion.questionId);
      }, 1500); 
      return () => clearTimeout(timer);
    }
  }, [view, hasShownEvaluation, activeQuestion]);

  const handleRatingSubmit = async () => {
    if (rating > 0) {
      await submitSatisfaction(rating, "");
      setView("success");
    }
  };

  const handleReviewSubmit = async () => {
    await submitSatisfaction(rating, comment);
    setView("success");
  };

  const handleClose = () => {
    if (view === "rating" || view === "review") {
      logDismiss();
    }
    setView("home");
    setRating(0);
    setComment("");
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] flex items-center justify-center p-0 sm:p-4 font-sans text-slate-900">
      <div className="w-full max-w-[430px] h-screen sm:h-[932px] bg-white sm:rounded-[48px] shadow-2xl overflow-hidden relative flex flex-col">
        
        {view === "loading" && <LoadingView />}

        {view !== "loading" && (
          <HomeView mockUser={mockUser} isActive={view === "home"} onOpenEvaluation={() => setView("rating")} />
        )}

        {(view === "rating" || view === "review" || view === "success") && (
          <div className="absolute inset-0 bg-black/40 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6 transition-opacity duration-300">
            <div className="w-full max-w-[430px] h-[650px] sm:h-[680px] bg-white rounded-t-[40px] sm:rounded-[40px] shadow-2xl overflow-hidden relative flex flex-col animate-slide-in-bottom">
              
              <button 
                onClick={handleClose}
                className="absolute top-6 left-6 z-10 w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <Image src="/asset/icons/evaluate-satisfaction-icon/x-close.svg" alt="Close" width={12} height={12} />
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

              {view === "success" && <SuccessView />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
