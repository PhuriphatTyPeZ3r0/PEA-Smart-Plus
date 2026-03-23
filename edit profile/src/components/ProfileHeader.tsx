import React from 'react';
import Link from 'next/link';

interface ProfileHeaderProps {
  avatarUrl: string;
  name: string;
  phone: string;
  verified?: boolean;
  onEdit?: () => void;
  editLink?: string;
  badgeColor?: string;
}

export default function ProfileHeader({
  avatarUrl,
  name,
  phone,
  verified = false,
  onEdit,
  editLink = '/personal_info',
  badgeColor = '#c93b9e'
}: ProfileHeaderProps) {
  // Render edit control as Link when editLink is provided, otherwise as a button

  return (
    <div className="header-index bg-gradient-to-br from-[#fef0f7] to-[#fbd5ec] p-5 rounded-b-3xl">
      <div className="top-bar mb-6">
        <div className="page-title text-lg font-semibold text-[#333]">บัญชีผู้ใช้</div>
        <button className="settings-btn bg-white border border-[#9b2785] text-[#9b2785] px-3 py-1 rounded-full text-sm flex items-center gap-1 hover:bg-[#fdeaf6]">
          <span className="material-symbols-outlined text-base">settings</span> ตั้งค่า
        </button>
      </div>

      <div className="profile-section flex items-start gap-4">
        <div className="avatar-wrapper relative w-16 h-16 flex-shrink-0">
          <img src={avatarUrl} alt="Profile" className="avatar w-full h-full rounded-full object-cover" />
          <div
            className="avatar-badge absolute -bottom-1 -right-1 rounded-full flex items-center justify-center cursor-pointer hover:opacity-80"
            style={{ backgroundColor: badgeColor, width: '28px', height: '28px' }}
          >
            <span className="material-symbols-outlined text-white" style={{ fontSize: '16px' }}>
              photo_camera
            </span>
          </div>
        </div>

        <div className="profile-info flex-1">
          <div className="profile-name font-semibold text-[#333] mb-1">{name}</div>
          <div className="profile-phone text-sm text-[#666] mb-2">เบอร์มือถือ: {phone}</div>
          {verified && (
            <div className="verified-badge text-xs text-[#2e7d32] flex items-center gap-1">
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>check_circle</span>
              ยืนยันตัวตนแล้ว
            </div>
          )}
        </div>

        {editLink ? (
          <Link href={editLink} className="edit-btn flex-shrink-0 text-[#666] hover:text-[#9b2785] transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-3xl">edit</span>
          </Link>
        ) : (
          <button type="button" onClick={onEdit} className="edit-btn flex-shrink-0 text-[#666] hover:text-[#9b2785] transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-3xl">edit</span>
          </button>
        )}
      </div>
    </div>
  );
}
