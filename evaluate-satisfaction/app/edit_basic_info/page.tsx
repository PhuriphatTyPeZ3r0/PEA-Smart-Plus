"use client";

import Link from "next/link";
import { useUserProfile } from "@/components/providers/UserProfileProvider";
import { formatPhone } from "@/lib/user-profile";

export default function EditBasicInfo() {
  const { profile } = useUserProfile();

  return (
    <div className="edit-phone-flow app-container" style={{ backgroundColor: "#fff" }}>
      <div className="top-bar-plain border-b">
        <Link href="/personal_info" className="back-btn">
          <span className="material-symbols-outlined">chevron_left</span>
        </Link>
        <div className="page-title" style={{ fontSize: "18px", fontWeight: "600" }}>
          แก้ไขข้อมูลพื้นฐาน
        </div>
      </div>

      <div className="edit-menu-list">
        <Link href="/change_phone" className="edit-menu-item">
          <div className="edit-menu-content">
            <div className="edit-menu-title">เปลี่ยนเบอร์โทรศัพท์มือถือ</div>
            <div className="edit-menu-subtitle">{formatPhone(profile.phone)}</div>
          </div>
          <span className="material-symbols-outlined chevron">chevron_right</span>
        </Link>

        <Link href="/change_email" className="edit-menu-item">
          <div className="edit-menu-content">
            <div className="edit-menu-title">เปลี่ยนอีเมล</div>
            <div className="edit-menu-subtitle">{profile.email}</div>
          </div>
          <span className="material-symbols-outlined chevron">chevron_right</span>
        </Link>
      </div>
    </div>
  );
}
