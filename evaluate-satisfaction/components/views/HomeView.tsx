import React from "react";
import Image from "next/image";
import Link from "next/link";
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
    accountName: string;
    dueDate: string;
    newServiceLocationCount: number;
  };
  isActive: boolean;
  onOpenEvaluation: () => void;
}

const QUICK_ACTIONS = [
  { label: "ดูและจ่ายบิล", icon: "ดูและจ่ายบิล.svg" },
  { label: "ดูการใช้ไฟ", icon: "ดูการใช้ไฟ.svg" },
  { label: "แจ้งไฟดับ", icon: "แจ้งไฟดับ 2.svg" },
  { label: "ดูเพิ่มเติม", icon: "ดูเพิ่มเติม.svg" },
];

const PRIVILEGES = [
  {
    title: "ชาร์จคุ้ม ชาร์จครั้งแรก ลดทันที 20 บาท",
    description: "โปรแรงรับหน้าฝน วันนี้ - 31 ส.ค. รับส่วนลดทันทีเมื่อชาร์จผ่านแอป",
    discount: "20.-",
    imageSrc: "/images/banner/1_th_0.png",
  },
  {
    title: "รับส่วนลดค่าไฟสูงสุด 10% เมื่อชำระผ่านแอป",
    description: "สิทธิพิเศษสำหรับลูกค้า PEA Smart Plus เท่านั้น",
    discount: "10%",
    imageSrc: "/images/banner/1-3_0.png",
  },
];

const RECOMMENDED_SERVICES = [
  {
    title: "บริการติดตั้ง Solar",
    description: "ใช้ 250 คะแนน แลกส่วนลด 20 บาท",
    imageSrc: "/images/banner/3_th_0.png",
  },
  {
    title: "ตรวจสอบสายไฟ",
    description: "บริการตรวจสอบระบบไฟฟ้าภายในบ้าน",
    imageSrc: "/images/banner/2_th_0.png",
  },
  {
    title: "ขยายเขตไฟฟ้า",
    description: "ยื่นขอรับบริการออนไลน์ได้ทันที",
    imageSrc: "/images/banner/1_th_0.png",
  },
];

export default function HomeView({ mockUser, isActive, onOpenEvaluation }: HomeViewProps) {
  return (
    <div
      className={`relative flex h-full flex-1 flex-col overflow-hidden bg-[#F8FAFC] ${
        !isActive ? "pointer-events-none" : "animate-zoom-in"
      }`}
    >
      <div className="flex-1 overflow-y-auto no-scrollbar pb-[132px] lg:pb-[144px]">
        <div className="relative overflow-hidden">
          <div className="relative h-[220px] sm:h-[260px] lg:h-[320px] xl:h-[360px]">
            <Image
              src="/asset/home-img/Rectangle 2.png"
              alt="Header Bg"
              fill
              sizes="100vw"
              className="object-cover lg:object-[center_20%] md:rounded-b-[40px] lg:rounded-b-[56px]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/10 to-transparent" />

            <div className="relative z-10 mx-auto flex h-full w-full max-w-[1180px] items-start justify-between px-5 pt-10 sm:px-6 md:pt-12 lg:px-10">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 overflow-hidden rounded-full border-[0.75px] border-white/20 p-0.5 sm:h-14 sm:w-14">
                  <Image
                    src="/avatar.png"
                    alt="Profile"
                    width={56}
                    height={56}
                    className="rounded-full object-cover"
                  />
                </div>

                <div className="flex flex-col">
                  <span className="text-sm font-medium leading-5 text-white/80 sm:text-base">สวัสดี</span>
                  <span className="text-base font-semibold leading-6 text-white sm:text-lg">{mockUser.name}</span>
                </div>
              </div>

              <button
                type="button"
                className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/15 backdrop-blur-lg transition-transform active:scale-90 sm:h-11 sm:w-11"
                aria-label="Notifications"
              >
                <Image
                  src="/asset/icons/home-icon/bell-01.svg"
                  alt="Notifications"
                  width={20}
                  height={20}
                  className="brightness-0 invert"
                />
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full border border-white bg-pink-500" />
              </button>
            </div>
          </div>

          <div className="relative z-20 mx-auto -mt-16 w-full max-w-[1180px] px-5 sm:-mt-20 sm:px-6 lg:-mt-24 lg:px-10">
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
              <AccountSummaryCard
                accountName={mockUser.accountName}
                accountNumber={mockUser.ca}
                balance={mockUser.balance}
                dueDate={mockUser.dueDate}
                onPayBill={() => {}}
                onSwitchAccount={() => {}}
              />

              <FoundNewCACard count={mockUser.newServiceLocationCount} />
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[1180px] px-5 pb-10 pt-8 sm:px-6 lg:px-10">
          <section className="mx-auto max-w-[720px]">
            <div className="grid grid-cols-4 gap-x-2 gap-y-10 sm:gap-x-4 lg:gap-x-6">
              {QUICK_ACTIONS.map((item) => (
                <div
                  key={item.label}
                  className="group flex min-w-0 cursor-pointer flex-col items-center gap-3"
                >
                  <div className="flex aspect-square w-full max-w-[68px] items-center justify-center rounded-[24px] border border-slate-50 bg-white shadow-[0_10px_20px_-8px_rgba(0,0,0,0.06)] transition-all duration-500 group-hover:-translate-y-2 group-hover:bg-purple-50/20 group-hover:shadow-xl active:scale-90 sm:max-w-[76px]">
                    <Image
                      src={`/asset/icons/home-icon/${item.icon}`}
                      alt={item.label}
                      width={36}
                      height={36}
                      className="h-1/2 w-1/2 object-contain"
                    />
                  </div>
                  <span className="min-h-[2.6em] px-0.5 text-center text-[11px] font-medium leading-[1.3] text-[#344054] transition-colors line-clamp-2 group-hover:text-[#74045F] sm:text-xs">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-12">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-black">สิทธิพิเศษ</h2>
              <button className="text-sm font-medium text-[#A80689] transition-transform active:scale-95">ดูทั้งหมด</button>
            </div>
            <div className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-2">
              {PRIVILEGES.map((item) => (
                <PrivilegeCard key={`${item.title}-${item.imageSrc}`} {...item} />
              ))}
            </div>
          </section>

          <section className="mt-10">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-black">บริการแนะนำ</h2>
              <button className="text-sm font-medium text-[#A80689] transition-transform active:scale-95">ดูทั้งหมด</button>
            </div>
            <div className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-2">
              {RECOMMENDED_SERVICES.map((item) => (
                <RecommendedServiceCard key={`${item.title}-${item.imageSrc}`} {...item} />
              ))}
            </div>
          </section>

          <button onClick={onOpenEvaluation} className="mx-auto mt-8 block h-20 w-40 cursor-default opacity-0" />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-white/95 px-3 pb-safe-bottom pt-3 shadow-[0_-12px_32px_rgba(0,0,0,0.03)] backdrop-blur-2xl md:rounded-t-[32px] lg:px-6">
        <div className="mx-auto flex w-full max-w-[1180px] items-center justify-around border-t border-slate-50/50 pt-1">
          <div className="group flex min-w-0 flex-1 cursor-pointer flex-col items-center gap-1.5 text-[#74045F] transition-transform active:scale-95">
            <div className="relative flex h-8 w-8 items-center justify-center">
              <div className="absolute inset-0 scale-125 rounded-full bg-purple-50 opacity-40 blur-sm" />
              <div className="flex h-6 w-6 items-center justify-center rounded bg-[radial-gradient(ellipse_75.81%_145.75%_at_49.46%_-2.02%,_#FF44DB_0%,_#A80689_100%)] shadow-[inset_0_1px_3px_rgba(255,255,255,0.5)]">
                <Image
                  src="/asset/icons/home-icon/Vector-3.svg"
                  alt="Home"
                  width={16}
                  height={16}
                  className="brightness-0 invert"
                />
              </div>
            </div>
            <span className="text-center text-[10px] font-bold tracking-tight">หน้าหลัก</span>
          </div>

          <div className="group flex min-w-0 flex-1 cursor-pointer flex-col items-center gap-1.5 text-slate-400 transition-transform active:scale-95">
            <div className="flex h-8 w-8 items-center justify-center transition-all group-hover:scale-110">
              <Image
                src="/asset/icons/home-icon/Nav Bar-2.svg"
                alt="Usage"
                width={22}
                height={22}
                className="opacity-60 transition-all group-hover:opacity-100"
                style={{ width: "auto", height: "auto" }}
              />
            </div>
            <span className="w-full truncate px-1 text-center text-[10px] font-normal tracking-tight">สถานที่ใช้ไฟ</span>
          </div>

          <div className="group flex min-w-0 flex-1 cursor-pointer flex-col items-center gap-1.5 text-slate-400 transition-transform active:scale-95">
            <div className="flex h-8 w-8 items-center justify-center transition-all group-hover:scale-110">
              <Image
                src="/asset/icons/home-icon/Nav Bar-1.svg"
                alt="Services"
                width={22}
                height={22}
                className="opacity-60 transition-all group-hover:opacity-100"
                style={{ width: "auto", height: "auto" }}
              />
            </div>
            <span className="w-full truncate text-center text-[10px] font-normal tracking-tight">บริการ</span>
          </div>

          <div className="group flex min-w-0 flex-1 cursor-pointer flex-col items-center gap-1.5 text-slate-400 transition-transform active:scale-95">
            <div className="flex h-8 w-8 items-center justify-center transition-all group-hover:scale-110">
              <Image
                src="/asset/icons/home-icon/Nav Bar.svg"
                alt="Pay"
                width={22}
                height={22}
                className="opacity-60 transition-all group-hover:opacity-100"
                style={{ width: "auto", height: "auto" }}
              />
            </div>
            <span className="w-full truncate text-center text-[10px] font-normal tracking-tight">ชำระเงิน</span>
          </div>

          <Link
            href="/profile"
            className="group flex min-w-0 flex-1 cursor-pointer flex-col items-center gap-1.5 text-slate-400 transition-transform active:scale-95"
          >
            <div className="flex h-8 w-8 items-center justify-center transition-all group-hover:scale-110">
              <Image
                src="/asset/icons/home-icon/user-avatar (1) 1.svg"
                alt="Profile"
                width={22}
                height={22}
                className="opacity-60 transition-all group-hover:opacity-100"
                style={{ width: "auto", height: "auto" }}
              />
            </div>
            <span className="w-full truncate text-center text-[10px] font-normal tracking-tight">โปรไฟล์</span>
          </Link>
        </div>
      </div>
    </div>
  );
}