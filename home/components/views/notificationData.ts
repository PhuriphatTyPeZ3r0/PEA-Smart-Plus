"use client";

export type NotificationCategory = "bill" | "service" | "outage" | "news";

export interface NotificationItem {
  id: string;
  category: NotificationCategory;
  title: string;
  description: string;
  detail: string;
  date: string;
  isRead: boolean;
}

export interface NotificationPreferences {
  showOnLockScreen: boolean;
  showPreviewText: boolean;
  bill: boolean;
  service: boolean;
  outage: boolean;
  news: boolean;
}

export type NotificationSettingKey = keyof NotificationPreferences;
export type EditableNotificationSettingKey = Exclude<NotificationSettingKey, "bill">;

export const NOTIFICATION_CATEGORY_LABELS: Record<NotificationCategory, string> = {
  bill: "ค่าไฟฟ้า",
  service: "บริการ",
  outage: "ไฟฟ้าขัดข้อง/ประกาศดับไฟ",
  news: "ข่าวสาร",
};

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "bill-1",
    category: "bill",
    title: "แจ้งค่าไฟฟ้า",
    description:
      "หมายเลขผู้ใช้ไฟฟ้า (CA): 020020638827 ประจำเดือน 02/2567 เป็นเงิน 997.64 บาท ขออภัยหากชำระแล้ว",
    detail:
      "หมายเลขผู้ใช้ไฟฟ้า (CA): 020020638827\nประจำเดือน 02/2567 เป็นเงิน 997.64 บาท\nขออภัยหากท่านได้ดำเนินการชำระแล้ว",
    date: "11 ก.ย. 2568 - 09:45",
    isRead: true,
  },
  {
    id: "bill-2",
    category: "bill",
    title: "แจ้งค่าไฟฟ้า",
    description:
      "หมายเลขผู้ใช้ไฟฟ้า (CA): 020020638827 ประจำเดือน 02/2567 เป็นเงิน 997.64 บาท ขออภัยหากชำระแล้ว",
    detail:
      "ระบบแจ้งเตือนค่าไฟฟ้าประจำเดือน 02/2567\nจำนวนเงิน 997.64 บาท\nกรุณาชำระภายในกำหนดเพื่อหลีกเลี่ยงการถูกงดจ่ายไฟ",
    date: "11 ก.ย. 2568 - 09:45",
    isRead: true,
  },
  {
    id: "outage-1",
    category: "outage",
    title: "ไฟฟ้ากลับมาใช้งานได้ตามปกติแล้ว",
    description: "หมายเลขคำร้อง 9993858393 ดำเนินการแล้วเสร็จ ขออภัยในความไม่สะดวก",
    detail:
      "หมายเลขคำร้อง 9993858393 ได้รับการดำเนินการเรียบร้อยแล้ว\nขณะนี้ระบบไฟฟ้ากลับมาใช้งานได้ตามปกติ\nขออภัยในความไม่สะดวก",
    date: "11 ก.ย. 2568 - 09:45",
    isRead: true,
  },
  {
    id: "outage-2",
    category: "outage",
    title: "ประกาศดับไฟเพื่อปรับปรุงระบบ",
    description: "วันที่ 25 ก.ย. 2568 เวลา 09.00 - 15.00 น. บริเวณ ถ.งามวงศ์วาน",
    detail:
      "การไฟฟ้าส่วนภูมิภาคมีความจำเป็นต้องของดจ่ายกระแสไฟฟ้าเพื่อปฏิบัติงาน ในวันที่ 25 ก.ย. 2568 เวลา 09.00 - 15.00 น. บริเวณ ถ.งามวงศ์วาน (ช่วงแยกพงษ์เพชร ถึง ทางด่วน)\nขออภัยในความไม่สะดวก",
    date: "20 ก.ย. 2568 - 08:30",
    isRead: false,
  },
  {
    id: "service-1",
    category: "service",
    title: "ได้รับคำร้องเรียบร้อยแล้ว",
    description: "หมายเลขคำร้อง 9993858300 จะถูกส่งให้เจ้าหน้าที่เพื่อดำเนินการต่อไป",
    detail:
      "ระบบได้รับคำร้องหมายเลข 9993858300 เรียบร้อยแล้ว\nคำร้องของคุณจะถูกส่งให้เจ้าหน้าที่เพื่อดำเนินการในขั้นตอนถัดไป",
    date: "11 ก.ย. 2568 - 09:45",
    isRead: true,
  },
  {
    id: "news-1",
    category: "news",
    title: "Watt-D แจ้งเตือน อย่า!!! หลงเชื่อมิจฉาชีพ หลอกลงทะเบียนเพื่อรับสิทธิ์ขอคืนเงินประกัน",
    description:
      "อย่า!!! หลงเชื่อมิจฉาชีพ ให้กดโทร หรือ SMS เพื่อลงทะเบียน รับสิทธิ์ขอคืนเงินประกันการใช้ไฟฟ้า",
    detail:
      "PEA ขอแจ้งเตือนประชาชนอย่าหลงเชื่อมิจฉาชีพที่แอบอ้างเป็นเจ้าหน้าที่\nหากได้รับข้อความ โทรศัพท์ หรือ SMS ที่ชักชวนให้ลงทะเบียนเพื่อขอคืนเงินประกันการใช้ไฟฟ้า โปรดอย่ากดลิงก์และอย่าให้ข้อมูลส่วนตัว",
    date: "11 ก.ย. 2568 - 09:45",
    isRead: false,
  },
  {
    id: "news-2",
    category: "news",
    title: "Watt-D แจ้งเตือน อย่า!!! หลงเชื่อมิจฉาชีพ หลอกลงทะเบียนเพื่อรับสิทธิ์ขอคืนเงินประกัน",
    description:
      "อย่า!!! หลงเชื่อมิจฉาชีพ ให้กดโทร หรือ SMS เพื่อลงทะเบียน รับสิทธิ์ขอคืนเงินประกันการใช้ไฟฟ้า",
    detail:
      "หากต้องการตรวจสอบข่าวสารหรือประกาศจาก PEA กรุณาตรวจสอบผ่านช่องทางทางการเท่านั้น\nแนะนำให้ติดตามผ่านแอปและเว็บไซต์ทางการเพื่อความปลอดภัย",
    date: "11 ก.ย. 2568 - 09:45",
    isRead: false,
  },
  {
    id: "service-2",
    category: "service",
    title: "ได้รับคำร้องเรียบร้อยแล้ว",
    description: "หมายเลขคำร้อง 9993858300 จะถูกส่งให้เจ้าหน้าที่เพื่อดำเนินการต่อไป",
    detail:
      "คำร้องของคุณถูกบันทึกเข้าสู่ระบบแล้ว\nเจ้าหน้าที่จะติดต่อกลับหรืออัปเดตสถานะผ่านแอปเมื่อมีความคืบหน้า",
    date: "11 ก.ย. 2568 - 09:45",
    isRead: true,
  },
];

export const DEFAULT_NOTIFICATION_SETTINGS: NotificationPreferences = {
  showOnLockScreen: true,
  showPreviewText: true,
  bill: true,
  service: true,
  outage: true,
  news: true,
};

