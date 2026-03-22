"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useUserProfile } from '@/components/providers/UserProfileProvider';
import { maskPhoneForProfile } from '@/lib/user-profile';

export default function Home() {
  const { profile } = useUserProfile();

  return (
    <div className="flex h-screen w-full flex-col items-center justify-start overflow-hidden bg-[#F5F5F5]">
      <div className="flex w-full max-w-[560px] flex-1 flex-col overflow-y-auto bg-white no-scrollbar pb-[90px] relative">
        <div className="edit-phone-flow w-full shadow-none !min-h-0 page-account">
          <div className="header-index">
        <div className="top-bar">
          <Link href="/" className="back-btn">
            <span className="material-symbols-outlined">chevron_left</span>
          </Link>
          <div className="page-title">บัญชีผู้ใช้</div>
          <Link href="#" className="settings-btn" aria-label="ตั้งค่า">
            <span className="material-symbols-outlined">settings</span>
          </Link>
        </div>

        <div className="profile-section">
          <div className="avatar-wrapper">
            <Image src="/avatar.png" alt="Profile" width={76} height={76} className="avatar" />
            <div className="avatar-badge">
              <span className="material-symbols-outlined">fingerprint</span>
            </div>
          </div>
          <div className="profile-info">
            <div className="profile-name">{profile.fullName}</div>
            <div className="profile-phone">เบอร์มือถือ: {maskPhoneForProfile(profile.phone)}</div>
            <div className="verified-badge">
              <span className="material-symbols-outlined">check_circle</span>
              ยืนยันตัวตนแล้ว
            </div>
          </div>
          <Link href="/personal_info" className="edit-btn">
            <span className="material-symbols-outlined" style={{ color: '#666', fontSize: '20px' }}>
              edit
            </span>
          </Link>
        </div>
      </div>

      <div className="section-title">จัดการบัญชี</div>
      <div className="menu-list">
        <Link href="#" className="menu-item">
          <div className="menu-icon">
            <span className="material-symbols-outlined">bolt</span>
          </div>
          <div className="menu-content">
            <div className="menu-label">จัดการสถานที่ใช้ไฟฟ้า</div>
          </div>
          <div className="menu-arrow">
            <span className="material-symbols-outlined">chevron_right</span>
          </div>
        </Link>

        <Link href="#" className="menu-item">
          <div className="menu-icon">
            <span className="material-symbols-outlined">list_alt</span>
          </div>
          <div className="menu-content">
            <div className="menu-label">ติดตามสถานะ</div>
            <div className="menu-sublabel">ติดตามสถานะคำขอรับบริการและคำร้องได้ที่นี่</div>
          </div>
          <div className="menu-arrow">
            <span className="material-symbols-outlined">chevron_right</span>
          </div>
        </Link>

        <Link href="#" className="menu-item">
          <div className="menu-icon">
            <span className="material-symbols-outlined">receipt_long</span>
          </div>
          <div className="menu-content">
            <div className="menu-label">จัดการบิลและใบเสร็จ</div>
          </div>
          <div className="menu-arrow">
            <span className="material-symbols-outlined">chevron_right</span>
          </div>
        </Link>

        <Link href="#" className="menu-item">
          <div className="menu-icon">
            <span className="material-symbols-outlined">credit_card</span>
          </div>
          <div className="menu-content">
            <div className="menu-label">จัดการบัตรเครดิต/เดบิต</div>
          </div>
          <div className="menu-arrow">
            <span className="material-symbols-outlined">chevron_right</span>
          </div>
        </Link>

        <Link href="#" className="menu-item">
          <div className="menu-icon">
            <span className="material-symbols-outlined">card_giftcard</span>
          </div>
          <div className="menu-content">
            <div className="menu-label">สมาชิก Watt-D Point</div>
          </div>
          <div className="menu-arrow">
            <span className="material-symbols-outlined">chevron_right</span>
          </div>
        </Link>
      </div>

      <div className="section-title">ความช่วยเหลือ</div>
      <div className="menu-list">
        <Link href="#" className="menu-item">
          <div className="menu-icon">
            <span className="material-symbols-outlined">store</span>
          </div>
          <div className="menu-content">
            <div className="menu-label">สาขาและช่องทางให้บริการ</div>
          </div>
          <div className="menu-arrow">
            <span className="material-symbols-outlined">chevron_right</span>
          </div>
        </Link>

        <Link href="#" className="menu-item">
          <div className="menu-icon">
            <span className="material-symbols-outlined">help_outline</span>
          </div>
          <div className="menu-content">
            <div className="menu-label">คำถามที่พบบ่อย/แนะนำการใช้งาน</div>
          </div>
          <div className="menu-arrow">
            <span className="material-symbols-outlined">chevron_right</span>
          </div>
        </Link>

        <Link href="#" className="menu-item">
          <div className="menu-icon">
            <span className="material-symbols-outlined">electric_meter</span>
          </div>
          <div className="menu-content">
            <div className="menu-label">แจ้งเหตุไฟฟ้าขัดข้อง</div>
          </div>
          <div className="menu-arrow">
            <span className="material-symbols-outlined">chevron_right</span>
          </div>
        </Link>

        <Link href="#" className="menu-item">
          <div className="menu-icon">
            <span className="material-symbols-outlined">error_outline</span>
          </div>
          <div className="menu-content">
            <div className="menu-label">แจ้งปัญหา</div>
          </div>
          <div className="menu-arrow">
            <span className="material-symbols-outlined">chevron_right</span>
          </div>
        </Link>

        <Link href="#" className="menu-item">
          <div className="menu-icon">
            <span className="material-symbols-outlined">info</span>
          </div>
          <div className="menu-content">
            <div className="menu-label">สอบถาม/แนะนำติชม</div>
          </div>
          <div className="menu-arrow">
            <span className="material-symbols-outlined">chevron_right</span>
          </div>
        </Link>

        <Link href="#" className="menu-item">
          <div className="menu-icon">
            <span className="material-symbols-outlined">support_agent</span>
          </div>
          <div className="menu-content">
            <div className="menu-label">ติดต่อเรา</div>
          </div>
          <div className="menu-arrow">
            <span className="material-symbols-outlined">chevron_right</span>
          </div>
        </Link>
      </div>

      <div className="section-title">ข้อกำหนดและเงื่อนไข</div>
      <div className="menu-list">
        <Link href="#" className="menu-item">
          <div className="menu-icon">
            <span className="material-symbols-outlined">verified_user</span>
          </div>
          <div className="menu-content">
            <div className="menu-label">นโยบายคุ้มครองข้อมูลส่วนบุคคล</div>
          </div>
          <div className="menu-arrow">
            <span className="material-symbols-outlined">chevron_right</span>
          </div>
        </Link>

        <Link href="#" className="menu-item">
          <div className="menu-icon">
            <span className="material-symbols-outlined">description</span>
          </div>
          <div className="menu-content">
            <div className="menu-label">ข้อกำหนดและเงื่อนไข</div>
          </div>
          <div className="menu-arrow">
            <span className="material-symbols-outlined">chevron_right</span>
          </div>
        </Link>
      </div>

      <br />
      <div className="menu-list">
        <Link href="#" className="menu-item">
          <div className="menu-icon">
            <span className="material-symbols-outlined">logout</span>
          </div>
          <div className="menu-content">
            <div className="menu-label">ออกจากระบบ</div>
          </div>
          <div className="menu-arrow">
            <span className="material-symbols-outlined">chevron_right</span>
          </div>
        </Link>
      </div>

        <div className="footer-text !mb-4 mt-8 pb-4">
          เวอร์ชัน 10.8.0
          <br />
          © 2568 การไฟฟ้าส่วนภูมิภาค
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-[100] w-full bg-white/95 px-3 pb-safe-bottom pt-3 shadow-[0_-12px_32px_rgba(0,0,0,0.03)] backdrop-blur-2xl md:rounded-t-[32px] lg:px-6">
        <div className="mx-auto flex w-full max-w-[1180px] items-center justify-around border-t border-slate-50/50 pt-1">
          <Link
            href="/"
            className="group flex min-w-0 flex-1 cursor-pointer flex-col items-center gap-1.5 text-slate-400 transition-transform active:scale-95"
          >
            <div className="flex h-8 w-8 items-center justify-center transition-all group-hover:scale-110">
              <Image
                src="/asset/icons/home-icon/Vector-3.svg"
                alt="Home"
                width={22}
                height={22}
                className="opacity-60 transition-all group-hover:opacity-100"
              />
            </div>
            <span className="text-center text-[10px] font-normal tracking-tight">หน้าหลัก</span>
          </Link>

          <Link href="#" className="group flex min-w-0 flex-1 cursor-pointer flex-col items-center gap-1.5 text-slate-400 transition-transform active:scale-95">
            <div className="flex h-8 w-8 items-center justify-center transition-all group-hover:scale-110">
              <Image
                src="/asset/icons/home-icon/Nav Bar-1.svg"
                alt="Usage"
                width={22}
                height={22}
                className="opacity-60 transition-all group-hover:opacity-100"
              />
            </div>
            <span className="w-full truncate px-1 text-center text-[10px] font-normal tracking-tight">สถานที่ใช้ไฟ</span>
          </Link>

          <Link href="#" className="group flex min-w-0 flex-1 cursor-pointer flex-col items-center gap-1.5 text-slate-400 transition-transform active:scale-95">
            <div className="flex h-8 w-8 items-center justify-center transition-all group-hover:scale-110">
              <Image
                src="/asset/icons/home-icon/Nav Bar-2.svg"
                alt="Services"
                width={22}
                height={22}
                className="opacity-60 transition-all group-hover:opacity-100"
              />
            </div>
            <span className="w-full truncate text-center text-[10px] font-normal tracking-tight">บริการ</span>
          </Link>

          <Link href="#" className="group flex min-w-0 flex-1 cursor-pointer flex-col items-center gap-1.5 text-slate-400 transition-transform active:scale-95">
            <div className="flex h-8 w-8 items-center justify-center transition-all group-hover:scale-110">
              <Image
                src="/asset/icons/home-icon/Nav Bar.svg"
                alt="Pay"
                width={22}
                height={22}
                className="opacity-60 transition-all group-hover:opacity-100"
              />
            </div>
            <span className="w-full truncate text-center text-[10px] font-normal tracking-tight">ชำระเงิน</span>
          </Link>

          <div className="group flex min-w-0 flex-1 cursor-pointer flex-col items-center gap-1.5 text-[#74045F] transition-transform active:scale-95">
            <div className="relative flex h-8 w-8 items-center justify-center">
              <div className="absolute inset-0 scale-125 rounded-full bg-purple-50 opacity-40 blur-sm" />
              <div className="flex h-6 w-6 items-center justify-center rounded bg-[radial-gradient(ellipse_75.81%_145.75%_at_49.46%_-2.02%,_#FF44DB_0%,_#A80689_100%)] shadow-[inset_0_1px_3px_rgba(255,255,255,0.5)]">
                <Image
                  src="/asset/icons/home-icon/user-avatar (1) 1.svg"
                  alt="Profile"
                  width={16}
                  height={16}
                  className="brightness-0 invert"
                />
              </div>
            </div>
            <span className="w-full truncate text-center text-[10px] font-bold tracking-tight">โปรไฟล์</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}
