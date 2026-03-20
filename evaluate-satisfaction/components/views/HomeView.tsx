import React from "react";
import Image from "next/image";

interface HomeViewProps {
  mockUser: {
    id: string;
    idenNumber: string;
    name: string;
    balance: string;
    ca: string;
  };
  isActive: boolean;
  onOpenEvaluation: () => void;
}

export default function HomeView({ mockUser, isActive, onOpenEvaluation }: HomeViewProps) {
  return (
    <div className={`flex-1 flex flex-col bg-white relative overflow-y-auto no-scrollbar ${!isActive ? "pointer-events-none" : "animate-zoom-in"}`}>
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
        onClick={onOpenEvaluation}
        className="absolute top-[400px] left-1/2 -translate-x-1/2 w-40 h-20 opacity-0 z-50 cursor-default"
      />
    </div>
  );
}
