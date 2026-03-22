"use client";

import Link from "next/link";
import { useUserProfile } from "@/components/providers/UserProfileProvider";
import { formatPhone } from "@/lib/user-profile";

export default function PersonalInfo() {
  const { profile } = useUserProfile();

  return (
    <div className="edit-phone-flow app-container page-info">
      <div className="top-bar-plain">
        <Link href="/profile" className="back-btn">
          <span className="material-symbols-outlined">chevron_left</span>
        </Link>
        <div className="page-title">personal_info</div>
      </div>

      <div className="toggle-section">
        <div className="toggle-label">แสดงข้อมูลทั้งหมด</div>
        <div className="toggle-switch"></div>
      </div>

      <div className="info-card">
        <div className="info-header">
          <div className="info-title">ข้อมูลส่วนตัว</div>
          <span className="material-symbols-outlined edit-icon">edit</span>
        </div>
        <div className="info-row">
          <div className="info-label">คำนำหน้า</div>
          <div className="info-value">{profile.title}</div>
        </div>
        <div className="info-row">
          <div className="info-label">ชื่อ</div>
          <div className="info-value">{profile.firstName}</div>
        </div>
        <div className="info-row">
          <div className="info-label">นามสกุล</div>
          <div className="info-value">{profile.lastName}</div>
        </div>
        <div className="info-row">
          <div className="info-label">citizen_no</div>
          <div className="info-value">{profile.citizenNo}</div>
        </div>
        <div className="info-row">
          <div className="info-label">วัน/เดือน/ปีเกิด</div>
          <div className="info-value">{profile.birthDate}</div>
        </div>
      </div>

      <div className="info-card">
        <div className="info-header">
          <div className="info-title">ข้อมูลพื้นฐาน</div>
          <Link href="/edit_basic_info">
            <span className="material-symbols-outlined edit-icon">edit</span>
          </Link>
        </div>
        <div className="info-row">
          <div className="info-label">
            <span className="material-symbols-outlined">phone_iphone</span> เบอร์โทรศัพท์
          </div>
          <div className="info-value">{formatPhone(profile.phone)}</div>
        </div>
        <div className="info-row">
          <div className="info-label">
            <span className="material-symbols-outlined">mail</span> อีเมล
          </div>
          <div className="info-value">{profile.email}</div>
        </div>
      </div>

      <div className="info-card">
        <div className="info-header">
          <div className="info-title">ที่อยู่</div>
          <span className="material-symbols-outlined edit-icon">edit</span>
        </div>
        <div className="info-row">
          <div className="info-label">citizen_card_address</div>
          <div className="info-value">{profile.citizenAddress}</div>
        </div>
        <div className="info-row">
          <div className="info-label">ที่อยู่ปัจจุบัน</div>
          <div className="info-value">{profile.currentAddress}</div>
        </div>
      </div>
    </div>
  );
}
