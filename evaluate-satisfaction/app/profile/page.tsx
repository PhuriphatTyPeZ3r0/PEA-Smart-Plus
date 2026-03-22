"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useUserProfile } from '@/components/providers/UserProfileProvider';
import { maskPhoneForProfile } from '@/lib/user-profile';

export default function Home() {
  const { profile } = useUserProfile();

  return (
    <div className="edit-phone-flow app-container page-account">
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

      <div className="footer-text">
        เวอร์ชัน 10.8.0
        <br />
        © 2568 การไฟฟ้าส่วนภูมิภาค
      </div>

      <div className="bottom-nav">
        <Link href="/" className="nav-item">
          <span className="material-symbols-outlined">home</span>
          หน้าหลัก
        </Link>
        <Link href="#" className="nav-item">
          <span className="material-symbols-outlined">location_on</span>
          สถานที่ใช้ไฟ
        </Link>
        <Link href="#" className="nav-item">
          <span className="material-symbols-outlined">swap_horiz</span>
          บริการ
        </Link>
        <Link href="#" className="nav-item">
          <span className="material-symbols-outlined">toll</span>
          พอยต์
        </Link>
        <Link href="/profile" className="nav-item active">
          <span className="material-symbols-outlined">person</span>
          โปรไฟล์
        </Link>
      </div>
    </div>
  );
}
