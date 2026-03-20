"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

type ViewState = "loading" | "home" | "rating" | "review" | "success";

interface ActiveQuestion {
  questionId: number;
  question: string;
}

const StarIcon = ({ filled, onClick, onMouseEnter, onMouseLeave }: { 
  filled: boolean; 
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) => (
  <button
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    className="transition-transform duration-200 hover:scale-110 active:scale-95"
  >
    <svg 
      width="40" 
      height="40" 
      viewBox="0 0 45 45" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="w-10 h-10"
    >
      <path 
        d="M44.8827 17.2621C44.5881 16.3509 43.7799 15.7037 42.8237 15.6175L29.8355 14.4382L24.6996 2.41708C24.3209 1.53609 23.4585 0.96582 22.5002 0.96582C21.542 0.96582 20.6795 1.53609 20.3008 2.41914L15.165 14.4382L2.17466 15.6175C1.22019 15.7057 0.414052 16.3509 0.117757 17.2621C-0.178538 18.1733 0.0950972 19.1727 0.817124 19.8027L10.6347 28.4128L7.73972 41.1651C7.52788 42.1028 7.89181 43.072 8.6698 43.6344C9.08798 43.9365 9.57723 44.0903 10.0706 44.0903C10.496 44.0903 10.9179 43.9757 11.2966 43.7491L22.5002 37.0531L33.6997 43.7491C34.5192 44.2421 35.5523 44.1971 36.3286 43.6344C37.1069 43.0703 37.4705 42.1007 37.2587 41.1651L34.3637 28.4128L44.1813 19.8044C44.9033 19.1727 45.179 18.175 44.8827 17.2621Z" 
        fill={filled ? "#FFC107" : "#E4E7EC"}
      />
    </svg>
  </button>
);

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

  // Mockup Setup
  useEffect(() => {
    // Set mock data in localStorage for testing
    localStorage.setItem("UserAccIdenNumber", mockUser.idenNumber);
    localStorage.setItem("SetLanguage", "TH");
    console.log(`Mock data set: UserAccIdenNumber=${mockUser.idenNumber}, SetLanguage=TH`);
  }, []);

  const fetchSatisfactionQuestion = async () => {
    try {
      const userAccIdenNumber = localStorage.getItem("UserAccIdenNumber") || "";
      const lang = localStorage.getItem("SetLanguage") || "TH";

      console.log("Fetching satisfaction question via local proxy for:", { userAccIdenNumber, lang });
      
      const res = await fetch("/api/pea/get-question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          UserAccIdenNumber: userAccIdenNumber,
          Lang: lang
        }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log("Local Proxy Response:", data);
        
        // Handle all possible success values (1, "1", true, "true")
        const isSuccess = data.result === 1 || data.result === "1" || data.result === true || String(data.result).toLowerCase() === "true";
        
        if (isSuccess) {
          setActiveQuestion({
            questionId: data.questionId,
            question: data.question
          });
          console.log("Active question set successfully:", data.question);
          return true;
        } else {
          console.warn("API returned result: 0 or false. Popup will not show. Result was:", data.result);
        }
      } else {
        console.error("Local Proxy failed, status:", res.status);
      }
    } catch (err) {
      console.error("Failed to fetch satisfaction question:", err);
    }
    return false;
  };

  const logEvaluationShow = async (questionId: number) => {
    try {
      const userAccIdenNumber = localStorage.getItem("UserAccIdenNumber") || "";
      console.log("Logging evaluation show for QuestionId:", questionId);
      const res = await fetch("/api/pea/proxy/InsertLogShow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          UserAccIdenNumber: userAccIdenNumber,
          QuestionId: questionId
        }),
      });
      if (res.ok) {
        const data = await res.json();
        console.log("InsertLogShow successful:", data);
      } else {
        console.error("InsertLogShow failed, status:", res.status);
      }
    } catch (err) {
      console.error("Failed to log evaluation show:", err);
    }
  };

  const logDismiss = async () => {
    try {
      const userAccIdenNumber = localStorage.getItem("UserAccIdenNumber") || "";
      const questionId = activeQuestion?.questionId ?? 0;
      console.log("Logging dismissal for QuestionId:", questionId);
      
      await fetch("/api/pea/proxy/InsertLogDismiss", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          UserAccIdenNumber: userAccIdenNumber,
          QuestionId: questionId
        }),
      });
    } catch (err) {
      console.error("Failed to log dismiss:", err);
    }
  };

  const submitSatisfaction = async (score: number, commentText: string = "") => {
    try {
      const userAccIdenNumber = localStorage.getItem("UserAccIdenNumber") || "";
      const questionId = Number(activeQuestion?.questionId ?? 1);
      
      console.log("Submitting satisfaction (InsertAnswerOrLog):", { questionId, score, commentText });
      
      const res = await fetch(`/api/pea/proxy/InsertAnswerOrLog`, {
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
        console.log("InsertAnswerOrLog response:", data);
        return data.result === 1 || data.result === true || String(data.result).toLowerCase() === "true";
      }
    } catch (err) {
      console.error("Failed to submit satisfaction:", err);
    }
    return false;
  };

  // Loading Logic
  useEffect(() => {
    if (view === "loading") {
      const initApp = async () => {
        // Await the fetch before moving to home
        await fetchSatisfactionQuestion();
        
        const timer = setTimeout(() => {
          setView("home");
        }, 2000);
        return () => clearTimeout(timer);
      };
      
      initApp();
    }
  }, [view]);

  // Auto-show evaluation after reaching home
  useEffect(() => {
    // Only start the process if we are on home and haven't shown it yet and have a question
    if (view === "home" && !hasShownEvaluation && activeQuestion) {
      const timer = setTimeout(() => {
        setHasShownEvaluation(true);
        setView("rating");
        
        // Log show event
        const questionIdToLog = activeQuestion.questionId;
        logEvaluationShow(questionIdToLog);
        
        console.log("Auto-showing evaluation. Using QuestionId:", questionIdToLog);
      }, 1500); 
      return () => clearTimeout(timer);
    }
  }, [view, hasShownEvaluation, activeQuestion]);

  const handleRatingSubmit = async () => {
    if (rating > 0) {
      const success = await submitSatisfaction(rating, "");
      if (success) {
        setView("success");
      } else {
        // Even if API fails, we might want to show success to user or handle error
        setView("success");
      }
    }
  };

  const handleGoToReview = () => {
    setView("review");
  };

  const handleReviewSubmit = async () => {
    const success = await submitSatisfaction(rating, comment);
    if (success) {
      setView("success");
    } else {
      setView("success");
    }
  };

  const handleClose = () => {
    if (view === "rating" || view === "review") {
      logDismiss();
    }
    setView("home");
    setRating(0);
    setComment("");
  };

  const handleOpenEvaluation = () => {
    setView("rating");
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] flex items-center justify-center p-0 sm:p-4 font-sans text-slate-900">
      <div className="w-full max-w-[430px] h-screen sm:h-[932px] bg-white sm:rounded-[48px] shadow-2xl overflow-hidden relative flex flex-col">
        
        {/* VIEW: LOADING */}
        {view === "loading" && (
          <div className="flex-1 flex flex-col items-center justify-center bg-white">
            <div className="w-32 h-32 relative">
              <Image 
                src="/asset/loading/loading.gif" 
                alt="Loading..." 
                fill
                sizes="128px"
                className="object-contain"
                priority
              />
            </div>
          </div>
        )}

        {/* VIEW: HOME (Background for evaluation) */}
        {view !== "loading" && (
          <div className={`flex-1 flex flex-col bg-white relative overflow-y-auto no-scrollbar ${view !== "home" ? "pointer-events-none" : "animate-zoom-in"}`}>
            {/* Header Section */}
            <div className="relative w-full h-[320px] shrink-0 overflow-hidden">
              <Image 
                src="/asset/home-img/Rectangle 2.png" 
                alt="Header Bg" 
                fill
                sizes="(max-width: 430px) 100vw, 430px"
                className="object-cover rounded-b-[48px]"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent"></div>
              
              {/* Content on Header */}
              <div className="relative z-10 pt-14">
                <div className="px-6 flex justify-between items-center mb-8">
                  <Image 
                    src="/asset/icons/home-icon/Logo - Flat Logo w TH Motto - Main 2.svg" 
                    alt="PEA Logo" 
                    width={140} 
                    height={50}
                    className="h-10 w-auto"
                  />
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center relative backdrop-blur-md border border-white/20 shadow-inner">
                      <Image src="/asset/icons/home-icon/bell-01.svg" alt="Notifications" width={22} height={22} className="brightness-0 invert" />
                      <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-[#7B2CBF]"></span>
                    </div>
                    <div className="w-10 h-10 rounded-full border-2 border-white/30 overflow-hidden bg-white/10 backdrop-blur-sm shadow-inner">
                      <Image src="/asset/home-img/Profile GitHub.png" alt="User Avatar" width={40} height={40} className="object-cover" />
                    </div>
                  </div>
                </div>

                <div className="px-6">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-white/80 text-[13px] font-medium mb-1">สวัสดีตอนเช้า</p>
                      <p className="text-white font-bold text-[24px] tracking-tight leading-tight">{mockUser.name}</p>
                    </div>
                    <button className="flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 active:scale-95 transition-all shadow-sm">
                       <Image src="/asset/icons/home-icon/Buttons/switch-horizontal-01.svg" alt="Switch" width={16} height={16} className="brightness-0 invert" />
                       <span className="text-white text-[11px] font-bold">สลับบัญชี</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Balance Card */}
            <div className="px-6 -mt-28 relative z-20 shrink-0">
              <div className="bg-white rounded-[32px] p-6 shadow-[0_20px_60px_-15px_rgba(123,44,191,0.18)] border border-purple-50/50">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="text-slate-400 text-[12px] font-bold uppercase tracking-wider mb-2">ยอดค้างชำระทั้งหมด</p>
                    <div className="flex items-baseline gap-1">
                       <span className="text-slate-900 text-[38px] font-black tracking-tighter">฿ {mockUser.balance}</span>
                    </div>
                  </div>
                  <button className="bg-[#7B2CBF] text-white px-7 py-3.5 rounded-2xl text-[16px] font-black shadow-[0_8px_20px_-4px_rgba(123,44,191,0.3)] active:scale-95 transition-all">
                    จ่ายบิล
                  </button>
                </div>
                <div className="h-[1px] bg-slate-100 w-full mb-5"></div>
                <div className="flex justify-between items-center">
                   <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center">
                         <img src="/asset/icons/home-icon/Vector.svg" alt="" className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-slate-400 text-[10px] font-bold uppercase tracking-tight">เลขอ้างอิง</span>
                        <span className="text-slate-600 text-[13px] font-bold tabular-nums">{mockUser.ca}</span>
                      </div>
                   </div>
                   <div className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-50 transition-colors">
                      <Image src="/asset/icons/home-icon/end icon.svg" alt="More" width={18} height={18} />
                   </div>
                </div>
              </div>
            </div>

            {/* Quick Actions Grid */}
            <div className="px-6 mt-10 mb-10 shrink-0">
              <div className="grid grid-cols-4 gap-x-4 gap-y-10">
                 {[
                   { label: "ดูและจ่ายบิล", icon: "ดูและจ่ายบิล.svg" },
                   { label: "ดูการใช้ไฟ", icon: "ดูการใช้ไฟ.svg" },
                   { label: "แจ้งไฟดับ", icon: "แจ้งไฟดับ 2.svg" },
                   { label: "ดูเพิ่มเติม", icon: "ดูเพิ่มเติม.svg" }
                 ].map((item, i) => (
                   <div key={i} className="flex flex-col items-center gap-2.5 group cursor-pointer">
                      <div className="w-[66px] h-[66px] rounded-[24px] bg-white shadow-[0_12px_24px_-8px_rgba(0,0,0,0.08)] border border-slate-50/50 flex items-center justify-center transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1.5 group-hover:bg-purple-50/30 active:scale-90">
                        {item.icon ? (
                          <Image 
                            src={`/asset/icons/home-icon/${item.icon}`} 
                            alt={item.label} 
                            width={34} 
                            height={34}
                            className="w-8.5 h-8.5 object-contain"
                          />
                        ) : (
                          <div className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center">
                            <span className="text-slate-300 text-xl font-black">?</span>
                          </div>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-600 font-bold text-center leading-[1.3] px-0.5 group-hover:text-[#7B2CBF] transition-colors">{item.label}</span>
                   </div>
                 ))}
              </div>
            </div>

            {/* Banner Section */}
            <div className="px-6 mb-32 shrink-0">
               <div className="flex justify-between items-center mb-5">
                  <h2 className="text-[18px] font-bold text-slate-900">สิทธิพิเศษ</h2>
                  <button className="text-[14px] font-bold text-[#D93D8D]">ดูทั้งหมด</button>
               </div>
               <div className="w-full h-[180px] rounded-[36px] overflow-hidden shadow-[0_20px_40px_-12px_rgba(0,0,0,0.12)] relative group cursor-pointer">
                  <Image 
                    src="/asset/icons/home-icon/Group 289549.svg" 
                    alt="Promo Banner" 
                    fill
                    sizes="(max-width: 430px) 100vw, 430px"
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
                  <div className="absolute bottom-7 left-7 text-white pr-10">
                    <p className="font-black text-[22px] leading-tight mb-1.5 tracking-tight">สิทธิพิเศษสำหรับคุณ</p>
                    <p className="text-[13px] opacity-90 font-bold leading-relaxed">รับส่วนลดค่าไฟสูงสุด 10% เมื่อชำระผ่านแอป PEA Smart Plus ตลอดเดือนนี้</p>
                  </div>
               </div>
            </div>

            {/* Bottom Navigation */}
            <div className="fixed bottom-0 w-full max-w-[430px] bg-white/95 backdrop-blur-xl border-t border-slate-100 flex justify-around items-center h-[85px] pb-5 px-4 z-50 shadow-[0_-8px_30px_rgba(0,0,0,0.03)] rounded-t-[32px]">
               <div className="flex flex-col items-center gap-1 text-[#7B2CBF] cursor-pointer">
                  <div className="w-8 h-8 flex items-center justify-center">
                    <Image src="/asset/icons/home-icon/Vector-3.svg" alt="Home" width={24} height={24} className="brightness-90 contrast-125" />
                  </div>
                  <span className="text-[10px] font-bold">หน้าแรก</span>
               </div>
               
               <div className="flex flex-col items-center gap-1 text-slate-400 group cursor-pointer">
                  <div className="w-8 h-8 flex items-center justify-center transition-transform group-hover:scale-110">
                    <img src="/asset/icons/home-icon/Nav Bar-1.svg" alt="Usage" className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold">สถานที่ใช้ไฟฟ้า</span>
               </div>

               <div className="flex flex-col items-center gap-1 text-slate-400 group cursor-pointer">
                  <div className="w-8 h-8 flex items-center justify-center transition-transform group-hover:scale-110">
                    <Image src="/asset/icons/home-icon/Nav Bar-2.svg" alt="Usage" width={24} height={24} />
                  </div>
                  <span className="text-[10px] font-bold">บริการ</span>
               </div>

               <div className="flex flex-col items-center gap-1 text-slate-400 group cursor-pointer">
                  <div className="w-8 h-8 flex items-center justify-center transition-transform group-hover:scale-110">
                    <Image src="/asset/icons/home-icon/Nav Bar.svg" alt="Pay" width={24} height={24} />
                  </div>
                  <span className="text-[10px] font-bold">ชำระเงิน</span>
               </div>

               <div className="flex flex-col items-center gap-1 text-slate-400 group cursor-pointer">
                  <div className="w-8 h-8 flex items-center justify-center transition-transform group-hover:scale-110">
                    <Image src="/asset/icons/home-icon/user-avatar (1) 1.svg" alt="Profile" width={24} height={24} />
                  </div>
                  <span className="text-[10px] font-bold">โปรไฟล์</span>
               </div>
            </div>

            {/* Popup Trigger (Hidden overlay for testing) */}
            <button 
              onClick={handleOpenEvaluation}
              className="absolute top-[400px] left-1/2 -translate-x-1/2 w-40 h-20 opacity-0 z-50 cursor-default"
            />
          </div>
        )}


        {/* VIEW: EVALUATION POPUP OVERLAY */}
        {(view === "rating" || view === "review" || view === "success") && (
          <div className="absolute inset-0 bg-black/40 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6 transition-opacity duration-300">
            <div className="w-full max-w-[430px] h-[650px] sm:h-[680px] bg-white rounded-t-[40px] sm:rounded-[40px] shadow-2xl overflow-hidden relative flex flex-col animate-slide-in-bottom">
              
              {/* Header / Close Button */}
              <button 
                onClick={handleClose}
                className="absolute top-6 left-6 z-10 w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <Image 
                  src="/asset/icons/evaluate-satisfaction-icon/x-close.svg" 
                  alt="Close" 
                  width={12} 
                  height={12}
                />
              </button>

              {view === "rating" && (
                <div className="flex-1 flex flex-col items-center px-8 pt-16 pb-10">
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
                      onClick={handleRatingSubmit}
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
                      onClick={handleGoToReview}
                      className="w-full py-[16px] rounded-2xl text-[16px] font-bold border-2 border-[#F3F4F6] text-[#4B5563] hover:bg-gray-50 transition-all active:scale-[0.98]"
                    >
                      เขียนรีวิวเพิ่มเติม
                    </button>
                  </div>
                </div>
              )}

              {view === "review" && (
                <div className="flex-1 flex flex-col px-8 pt-20 pb-10 animate-slide-in-right">
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
                    onClick={handleReviewSubmit}
                    className="w-full py-[16px] bg-gradient-to-r from-purple-600 to-[#A855F7] text-white rounded-2xl text-[16px] font-bold shadow-lg shadow-purple-200 active:scale-[0.98] transition-all"
                  >
                    ยืนยัน
                  </button>
                </div>
              )}

              {view === "success" && (
                <div className="flex-1 flex flex-col items-center justify-center px-8 pt-16 pb-10 animate-zoom-in">
                  <div className="mb-8">
                    <Image 
                      src="/asset/icons/evaluate-satisfaction-icon/Mask group.svg" 
                      alt="Success Icon" 
                      width={200} 
                      height={200}
                      className="w-[160px] h-auto"
                    />
                  </div>

                  <h1 className="text-[22px] font-bold text-[#1F2937] mb-3 text-center">ขอบคุณสำหรับการประเมิน!</h1>
                  <p className="text-[14px] text-gray-500 text-center leading-relaxed px-2">
                    ขอบคุณที่เข้ามาร่วมแสดงความคิดเห็น <br/>
                    ในการปรับปรุงคุณภาพการให้บริการต่อไป
                  </p>

                  <div className="flex gap-1.5 mt-12">
                     <div className="w-2.5 h-2.5 bg-purple-600 rounded-full"></div>
                     <div className="w-2.5 h-2.5 bg-purple-100 rounded-full"></div>
                     <div className="w-2.5 h-2.5 bg-purple-100 rounded-full"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
