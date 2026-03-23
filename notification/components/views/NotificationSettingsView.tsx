"use client";

import React from "react";
import type { EditableNotificationSettingKey, NotificationPreferences } from "./notificationData";
import {
  NotificationContentContainer,
  NotificationHeader,
  NotificationStatusBar,
  NotificationToggle,
  cn,
} from "./notificationShared";

interface NotificationSettingsViewProps {
  settings: NotificationPreferences;
  onBack: () => void;
  onToggleSetting: (key: EditableNotificationSettingKey) => void;
}

export default function NotificationSettingsView({
  settings,
  onBack,
  onToggleSetting,
}: NotificationSettingsViewProps) {
  return (
    <div className="flex h-full flex-col overflow-hidden bg-[#F9FAFB] animate-slide-in-right">
      <NotificationStatusBar />
      <NotificationHeader title="การแจ้งเตือน" onBack={onBack} />

      <div className="flex-1 overflow-y-auto pb-8 no-scrollbar">
        <NotificationContentContainer className="space-y-5">
          <section className="space-y-5">
            <SectionTitle title="รูปแบบการแจ้งเตือน" />

            <div className="bg-white px-5">
              <SettingRow
                title="แสดงบนหน้าจอล็อก"
                description="เห็นการแจ้งเตือนบนหน้าจอเมื่อโทรศัพท์ล็อกอยู่"
                checked={settings.showOnLockScreen}
                onToggle={() => onToggleSetting("showOnLockScreen")}
              />
              <SettingRow
                title="แสดงตัวอย่างข้อความ"
                description="เห็นรายละเอียดข้อความบนหน้าจอล็อก หากปิดจะแสดงเพียงว่ามีการแจ้งเตือนเท่านั้น"
                checked={settings.showPreviewText}
                onToggle={() => onToggleSetting("showPreviewText")}
                isLast
              />
            </div>
          </section>

          <section className="space-y-5">
            <SectionTitle title="หมวดหมู่การแจ้งเตือน" />

            <div className="bg-white px-5">
              <SettingRow
                title="แจ้งเตือนค่าไฟฟ้า"
                description="แจ้งเตือนเมื่อได้มีบิลใหม่ ใกล้ครบกำหนดชำระ เลยกำหนดชำระ และแจ้งก่อน-หลังงดจ่ายไฟฟ้า"
                note="การแจ้งเตือนนี้ไม่สามารถปิดได้ เพื่อให้คุณไม่พลาดข้อมูลสำคัญในการใช้บริการ"
                checked={settings.bill}
                disabled
              />
              <SettingRow
                title="แจ้งเตือนบริการ"
                description="รับข้อความแจ้งสถานะคำขอใช้บริการ รู้ทุกความเคลื่อนไหวเกี่ยวกับบริการ"
                checked={settings.service}
                onToggle={() => onToggleSetting("service")}
              />
              <SettingRow
                title="แจ้งเตือนไฟฟ้าขัดข้อง/ประกาศดับไฟ"
                description="รู้ทุกเหตุการณ์ไฟฟ้าดับในพื้นที่ของคุณ ทั้งแบบฉุกเฉิน และตามแผนดับไฟของ PEA"
                checked={settings.outage}
                onToggle={() => onToggleSetting("outage")}
              />
              <SettingRow
                title="แจ้งเตือนข่าวสาร"
                description="รับข่าวประชาสัมพันธ์ ประกาศ และสิทธิพิเศษจาก PEA"
                checked={settings.news}
                onToggle={() => onToggleSetting("news")}
                isLast
              />
            </div>
          </section>
        </NotificationContentContainer>
      </div>
    </div>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <div className="px-5">
      <h2 className="text-base font-semibold leading-6 text-[#667085]">{title}</h2>
    </div>
  );
}

interface SettingRowProps {
  title: string;
  description: string;
  note?: string;
  checked: boolean;
  disabled?: boolean;
  onToggle?: () => void;
  isLast?: boolean;
}

function SettingRow({
  title,
  description,
  note,
  checked,
  disabled = false,
  onToggle,
  isLast = false,
}: SettingRowProps) {
  return (
    <div className={cn("flex items-start gap-4 py-4", !isLast && "border-b border-[#E4E7EC]")}>
      <div className="min-w-0 flex-1">
        <h3 className="text-base font-medium leading-6 text-[#101828]">{title}</h3>
        <p className="mt-1 text-xs font-normal leading-4 text-[#667085]">{description}</p>
        {note && <p className="mt-1 text-[10px] font-normal leading-4 text-[#667085]">{note}</p>}
      </div>

      <NotificationToggle checked={checked} disabled={disabled} onToggle={onToggle} ariaLabel={title} />
    </div>
  );
}
