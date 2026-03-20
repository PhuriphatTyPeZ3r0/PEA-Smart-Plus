import React from "react";
import Image from "next/image";
import AccountSummaryCard from "../AccountSummaryCard";
import FoundNewCACard from "../FoundNewCACard";
import PrivilegeCard from "../PrivilegeCard";
import RecommendedServiceCard from "../RecommendedServiceCard";

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
  onOpenNotifications: () => void;
}

export default function HomeView({ mockUser, isActive, onOpenEvaluation, onOpenNotifications }: HomeViewProps) {
  return (
    <div className={`flex-1 flex flex-col bg-[#F8FAFC] relative h-full overflow-hidden ${!isActive ? "pointer-events-none" : "animate-zoom-in"}`}>
      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-[120px]">
        
        {/* Header Section with Personalized Greeting */}
        <div className="relative w-full h-[220px] xs:h-[240px] shrink-0 overflow-hidden">
          <Image 
            src="/asset/home-img/Rectangle 2.png" 
            alt="Header Bg" 
            fill
            sizes="(max-width: 430px) 100vw, 430px"
            className="object-cover rounded-b-[48px]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent"></div>
          
          <div className="relative z-10 pt-10 xs:pt-12 px-6">
            {/* User Greeting Area */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 xs:w-14 xs:h-14 rounded-full border-[0.75px] border-white/20 p-0.5 overflow-hidden">
                  <Image src="/asset/home-img/Avatar.png" alt="Profile" width={56} height={56} className="rounded-full object-cover" />
                </div>
                <div className="flex flex-col">
                  <span className="text-white/80 text-sm xs:text-base font-medium font-['Kanit'] leading-5">สวัสดี</span>
                  <span className="text-white text-base xs:text-lg font-semibold font-['Kanit'] leading-6">คุณศิญาพร สวยดี</span>
                </div>
              </div>
              <div 
                onClick={onOpenNotifications}
                className="w-9 h-9 xs:w-10 xs:h-10 rounded-full bg-white/15 flex items-center justify-center relative backdrop-blur-lg border border-white/30 active:scale-90 transition-transform cursor-pointer"
              >
                <Image src="/asset/icons/home-icon/bell-01.svg" alt="Notifications" width={20} height={20} className="brightness-0 invert" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-pink-500 rounded-full border border-white"></span>
              </div>
            </div>
          </div>
        </div>

        {/* Account Summary Card */}
        <div className="px-5 -mt-16 xs:-mt-20 relative z-20 shrink-0">
          <AccountSummaryCard
            accountName="บ้านแห่งความสุข"
            accountNumber={mockUser.ca}
            balance={mockUser.balance}
            dueDate="28 ก.ย. 2568"
            onPayBill={() => {}}
            onSwitchAccount={() => {}}
          />
        </div>

        {/* Notification: Found New CA */}
        <div className="px-5 mt-4 shrink-0">
          <FoundNewCACard count={1} />
        </div>

        {/* Quick Actions Grid */}
        <div className="px-6 mt-10 mb-10 shrink-0">
          <div className="grid grid-cols-4 gap-x-2 gap-y-10">
             {[
               { label: "ดูและจ่ายบิล", icon: "ดูและจ่ายบิล.svg" },
               { label: "ดูการใช้ไฟ", icon: "ดูการใช้ไฟ.svg" },
               { label: "แจ้งไฟดับ", icon: "แจ้งไฟดับ 2.svg" },
               { label: "ดูเพิ่มเติม", icon: "ดูเพิ่มเติม.svg" }
             ].map((item, i) => (
               <div key={i} className="flex flex-col items-center gap-3 group cursor-pointer min-w-0">
                  <div className="w-full max-w-[68px] aspect-square rounded-[24px] bg-white shadow-[0_10px_20px_-8px_rgba(0,0,0,0.06)] border border-slate-50 flex items-center justify-center transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-2 group-hover:bg-purple-50/20 active:scale-90">
                    <Image 
                      src={`/asset/icons/home-icon/${item.icon}`} 
                      alt={item.label} 
                      width={36} 
                      height={36}
                      className="w-1/2 h-1/2 object-contain"
                    />
                  </div>
                  <span className="text-[11px] text-[#344054] font-medium text-center leading-[1.3] px-0.5 group-hover:text-[#74045F] transition-colors line-clamp-2 min-h-[2.6em] font-['Kanit']">{item.label}</span>
               </div>
             ))}
          </div>
        </div>

        {/* Privileges Section */}
        <div className="mb-8 shrink-0">
           <div className="flex justify-between items-center mb-4 px-6">
              <h2 className="text-lg font-semibold text-black font-['Kanit']">สิทธิพิเศษ</h2>
              <button className="text-sm font-medium text-[#A80689] font-['Kanit'] active:scale-95 transition-transform">ดูทั้งหมด</button>
           </div>
           <div className="flex overflow-x-auto no-scrollbar gap-4 px-6 pb-2">
              <PrivilegeCard 
                title="ชาร์จคุ้ม! ชาร์จครั้งแรก ลดไปเลย 20 บาท" 
                description="โปรแรงรับหน้าฝน เติมวันนี้ - 31 ส.ค. รับเงินเพิ่มทันที"
                discount="20.-"
                imageSrc="/asset/icons/home-icon/Group 289549.svg"
              />
              <PrivilegeCard 
                title="รับส่วนลดค่าไฟสูงสุด 10% เมื่อชำระผ่านแอป" 
                description="สิทธิพิเศษสำหรับลูกค้า PEA Smart Plus เท่านั้น"
                discount="10%"
                imageSrc="/asset/icons/home-icon/Group 289549.svg"
              />
           </div>
        </div>

        {/* Recommended Services Section */}
        <div className="mb-12 shrink-0">
          <div className="flex justify-between items-center mb-4 px-6">
            <h2 className="text-lg font-semibold text-black font-['Kanit']">บริการแนะนำ</h2>
            <button className="text-sm font-medium text-[#A80689] font-['Kanit'] active:scale-95 transition-transform">ดูทั้งหมด</button>
          </div>
          <div className="flex overflow-x-auto no-scrollbar gap-4 px-6 pb-2">
            <RecommendedServiceCard 
              title="บริการติดตั้ง Solar"
              description="ใช้ 250 คะแนน แลกส่วนลด 20 บาท"
              imageSrc="https://placehold.co/172x172"
            />
            <RecommendedServiceCard 
              title="ตรวจสอบสายไฟ"
              description="บริการตรวจสอบระบบไฟฟ้าภายในบ้าน"
              imageSrc="https://placehold.co/172x172"
            />
            <RecommendedServiceCard 
              title="ขยายเขตไฟฟ้า"
              description="ยื่นขอรับบริการออนไลน์ได้ทันที"
              imageSrc="https://placehold.co/172x172"
            />
          </div>
        </div>

        {/* Popup Trigger (Hidden overlay for testing) */}
        <button 
          onClick={onOpenEvaluation}
          className="w-40 h-20 opacity-0 mx-auto block cursor-default"
        />
      </div>

      {/* Fixed Bottom Navigation */}
      <div className="absolute bottom-0 left-0 w-full bg-white/95 backdrop-blur-2xl border-t border-slate-50/50 flex justify-around items-center h-[85px] sm:h-[90px] pb-safe-bottom px-2 sm:px-4 z-50 shadow-[0_-12px_32px_rgba(0,0,0,0.03)] rounded-t-[36px] sm:max-w-[430px]">
         <div className="flex flex-col items-center gap-1.5 text-[#74045F] cursor-pointer group active:scale-95 transition-transform flex-1 min-w-0">
            <div className="w-8 h-8 flex items-center justify-center relative">
              <div className="absolute inset-0 bg-purple-50 rounded-full scale-125 opacity-40 blur-sm"></div>
              <div className="w-6 h-6 bg-[radial-gradient(ellipse_75.81%_145.75%_at_49.46%_-2.02%,_#FF44DB_0%,_#A80689_100%)] rounded shadow-[inset_0_1px_3px_rgba(255,255,255,0.5)] flex items-center justify-center">
                 <Image src="/asset/icons/home-icon/Vector-3.svg" alt="Home" width={16} height={16} className="brightness-0 invert" />
              </div>
            </div>
            <span className="text-[10px] font-bold tracking-tight text-center font-['Kanit']">หน้าหลัก</span>
         </div>
         
         <div className="flex flex-col items-center gap-1.5 text-slate-400 group cursor-pointer active:scale-95 transition-transform flex-1 min-w-0">
            <div className="w-8 h-8 flex items-center justify-center transition-all group-hover:scale-110">
              <Image src="/asset/icons/home-icon/Nav Bar-1.svg" alt="Usage" width={22} height={22} className="opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all" />
            </div>
            <span className="text-[10px] font-normal tracking-tight text-center truncate w-full px-1 font-['Kanit']">สถานที่ใช้ไฟ</span>
         </div>

         <div className="flex flex-col items-center gap-1.5 text-slate-400 group cursor-pointer active:scale-95 transition-transform flex-1 min-w-0">
            <div className="w-8 h-8 flex items-center justify-center transition-all group-hover:scale-110">
              <Image src="/asset/icons/home-icon/Nav Bar-2.svg" alt="Services" width={22} height={22} className="opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all" />
            </div>
            <span className="text-[10px] font-normal tracking-tight text-center truncate w-full font-['Kanit']">บริการ</span>
         </div>

         <div className="flex flex-col items-center gap-1.5 text-slate-400 group cursor-pointer active:scale-95 transition-transform flex-1 min-w-0">
            <div className="w-8 h-8 flex items-center justify-center transition-all group-hover:scale-110">
              <Image src="/asset/icons/home-icon/Nav Bar.svg" alt="Pay" width={22} height={22} className="opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all" />
            </div>
            <span className="text-[10px] font-normal tracking-tight text-center truncate w-full font-['Kanit']">ชำระเงิน</span>
         </div>

         <div className="flex flex-col items-center gap-1.5 text-slate-400 group cursor-pointer active:scale-95 transition-transform flex-1 min-w-0">
            <div className="w-8 h-8 flex items-center justify-center transition-all group-hover:scale-110">
              <Image src="/asset/icons/home-icon/user-avatar (1) 1.svg" alt="Profile" width={22} height={22} className="opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all" />
            </div>
            <span className="text-[10px] font-normal tracking-tight text-center truncate w-full font-['Kanit']">โปรไฟล์</span>
         </div>
      </div>
    </div>
  );
}
