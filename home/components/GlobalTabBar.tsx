"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type TabItem = {
  href: string;
  label: string;
  icon: string;
  activeIcon?: string;
};

const TAB_ITEMS: TabItem[] = [
  {
    href: "/",
    label: "หน้าหลัก",
    icon: "/asset/icons/home-icon/Vector-3.svg",
    activeIcon: "/asset/icons/home-icon/Vector-3.svg",
  },
  {
    href: "/notification",
    label: "แจ้งเตือน",
    icon: "/asset/icons/home-icon/Nav Bar-2.svg",
  },
  {
    href: "/service",
    label: "บริการ",
    icon: "/asset/icons/home-icon/Nav Bar-1.svg",
  },
  {
    href: "/service-all",
    label: "ชำระเงิน",
    icon: "/asset/icons/home-icon/Nav Bar.svg",
  },
  {
    href: "/dashboard",
    label: "โปรไฟล์",
    icon: "/asset/icons/home-icon/user-avatar (1) 1.svg",
  },
];

function isActivePath(currentPath: string, href: string) {
  if (href === "/") {
    return currentPath === "/";
  }
  return currentPath === href || currentPath.startsWith(`${href}/`);
}

export default function GlobalTabBar() {
  const pathname = usePathname();

  if (pathname === "/evaluation") {
    return null;
  }

  return (
    <div className="pwa-tabbar absolute bottom-0 left-0 right-0 z-[60] bg-white/95 px-3 pb-safe-bottom pt-3 shadow-[0_-12px_32px_rgba(0,0,0,0.03)] backdrop-blur-2xl md:rounded-t-[32px] lg:px-6">
      <div className="mx-auto flex w-full max-w-[1180px] items-center justify-around border-t border-slate-50/50 pt-1">
        {TAB_ITEMS.map((tab) => {
          const active = isActivePath(pathname, tab.href);
          const iconSrc = active && tab.activeIcon ? tab.activeIcon : tab.icon;

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`group flex min-w-0 flex-1 cursor-pointer flex-col items-center gap-1.5 transition-transform active:scale-95 ${
                active ? "text-[#74045F]" : "text-slate-400"
              }`}
            >
              <div className="relative flex h-8 w-8 items-center justify-center transition-all group-hover:scale-110">
                {active && tab.href === "/" ? (
                  <>
                    <div className="absolute inset-0 scale-125 rounded-full bg-purple-50 opacity-40 blur-sm" />
                    <div className="flex h-6 w-6 items-center justify-center rounded bg-[radial-gradient(ellipse_75.81%_145.75%_at_49.46%_-2.02%,_#FF44DB_0%,_#A80689_100%)] shadow-[inset_0_1px_3px_rgba(255,255,255,0.5)]">
                      <Image
                        src={iconSrc}
                        alt={tab.label}
                        width={16}
                        height={16}
                        className="brightness-0 invert"
                      />
                    </div>
                  </>
                ) : (
                  <Image
                    src={iconSrc}
                    alt={tab.label}
                    width={22}
                    height={22}
                    className={`${active ? "opacity-100" : "opacity-60"} transition-all group-hover:opacity-100`}
                    style={{ width: "auto", height: "auto" }}
                  />
                )}
              </div>
              <span className={`w-full truncate px-1 text-center text-[10px] tracking-tight ${active ? "font-bold" : "font-normal"}`}>
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}