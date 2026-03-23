import Image from "next/image";
import Link from "next/link";

export default function GlobalTabBar() {
  return (
    <div className="pwa-tabbar absolute bottom-0 left-0 right-0 bg-white/95 px-3 pb-safe-bottom pt-3 shadow-[0_-12px_32px_rgba(0,0,0,0.03)] backdrop-blur-2xl md:rounded-t-[32px] lg:px-6">
      <div className="mx-auto flex w-full max-w-[1180px] items-center justify-around border-t border-slate-50/50 pt-1">
        <div className="group flex min-w-0 flex-1 cursor-pointer flex-col items-center gap-1.5 text-[#74045F] transition-transform active:scale-95">
          <div className="relative flex h-8 w-8 items-center justify-center">
            <Image
              src="/asset/tab-bar-asset/active-home-nav-bar.png"
              alt="Home"
              width={24}
              height={24}
              className="object-contain"
              style={{ width: "auto", height: "auto" }}
            />
          </div>
          <span className="text-center text-[10px] font-bold tracking-tight">หน้าหลัก</span>
        </div>

        <div className="group flex min-w-0 flex-1 cursor-pointer flex-col items-center gap-1.5 text-slate-400 transition-transform active:scale-95">
          <div className="flex h-8 w-8 items-center justify-center transition-all group-hover:scale-110">
            <Image
              src="/asset/tab-bar-asset/ca-nav-bar.svg"
              alt="สถานที่ใช้ไฟฟ้า"
              width={24}
              height={24}
              className="opacity-80 object-contain transition-all group-hover:opacity-100"
              style={{ width: "auto", height: "auto" }}
            />
          </div>
          <span className="w-full truncate px-1 text-center text-[10px] font-normal tracking-tight">สถานที่ใช้ไฟฟ้า</span>
        </div>

        <div className="group flex min-w-0 flex-1 cursor-pointer flex-col items-center gap-1.5 text-slate-400 transition-transform active:scale-95">
          <div className="flex h-8 w-8 items-center justify-center transition-all group-hover:scale-110">
            <Image
              src="/asset/tab-bar-asset/service-nav-bar.png"
              alt="Services"
              width={24}
              height={24}
              className="opacity-80 object-contain transition-all group-hover:opacity-100"
              style={{ width: "auto", height: "auto" }}
            />
          </div>
          <span className="w-full truncate text-center text-[10px] font-normal tracking-tight">บริการ</span>
        </div>

        <div className="group flex min-w-0 flex-1 cursor-pointer flex-col items-center gap-1.5 text-slate-400 transition-transform active:scale-95">
          <div className="flex h-8 w-8 items-center justify-center transition-all group-hover:scale-110">
            <Image
              src="/asset/tab-bar-asset/watt-d-point-nav-bar.svg"
              alt="พอยต์"
              width={24}
              height={24}
              className="opacity-80 object-contain transition-all group-hover:opacity-100"
              style={{ width: "auto", height: "auto" }}
            />
          </div>
          <span className="w-full truncate text-center text-[10px] font-normal tracking-tight">พอยต์</span>
        </div>

        <Link
          href="/"
          className="group flex min-w-0 flex-1 cursor-pointer flex-col items-center gap-1.5 text-slate-400 transition-transform active:scale-95"
        >
          <div className="flex h-8 w-8 items-center justify-center transition-all group-hover:scale-110">
            <Image
              src="/asset/tab-bar-asset/user-avatar-nav-bar.svg"
              alt="Profile"
              width={24}
              height={24}
              className="opacity-80 object-contain transition-all group-hover:opacity-100"
              style={{ width: "auto", height: "auto" }}
            />
          </div>
          <span className="w-full truncate text-center text-[10px] font-normal tracking-tight">โปรไฟล์</span>
        </Link>
      </div>
    </div>
  );
}
