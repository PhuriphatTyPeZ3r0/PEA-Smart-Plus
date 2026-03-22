"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserProfile } from "@/components/providers/UserProfileProvider";
import { formatPhone, isValidThaiMobile, normalizePhone } from "@/lib/user-profile";

export default function ChangePhone() {
  const router = useRouter();
  const { profile, setPendingPhone } = useUserProfile();
  const [newPhone, setNewPhone] = useState(profile.phone);

  const normalizedNewPhone = useMemo(() => normalizePhone(newPhone), [newPhone]);
  const canContinue = useMemo(
    () => isValidThaiMobile(normalizedNewPhone) && normalizedNewPhone !== profile.phone,
    [normalizedNewPhone, profile.phone]
  );

  const handleContinue = () => {
    if (!canContinue) {
      return;
    }
    setPendingPhone(normalizedNewPhone);
    router.push("/otp_confirm");
  };

  return (
    <div className="edit-phone-flow app-container" style={{ backgroundColor: "#ffffff", minHeight: "100vh", padding: "0" }}>
      <div className="top-bar-plain" style={{ justifyContent: "flex-start" }}>
        <Link href="/edit_basic_info" className="back-btn">
          <span className="material-symbols-outlined">chevron_left</span>
        </Link>
      </div>

      <div className="form-container" style={{ padding: "0 20px" }}>
        <h1 className="form-title" style={{ fontSize: "22px", fontWeight: "700", color: "#1a1a1a", margin: "5px 0 15px" }}>
          เปลี่ยนเบอร์โทรศัพท์มือถือ
        </h1>
        <p className="form-desc" style={{ fontSize: "15px", color: "#333", marginBottom: "2px", fontWeight: "500" }}>
          กรุณากรอกเบอร์โทรศัพท์มือถือใหม่ของคุณ
        </p>
        <p className="form-note" style={{ fontSize: "12px", color: "#666", marginBottom: "35px" }}>
          *ระบบรองรับเบอร์โทรศัพท์มือถือที่ลงทะเบียนในประเทศไทยเท่านั้น
        </p>

        <div className="input-group" style={{ marginBottom: "25px", position: "relative" }}>
          <div className="input-label" style={{ position: "absolute", fontSize: "11px", color: "#666", top: "10px", left: "16px", zIndex: 1 }}>
            เบอร์โทรศัพท์มือถือ ปัจจุบัน
          </div>
          <input
            type="text"
            className="custom-input disabled-input"
            value={formatPhone(profile.phone)}
            readOnly
            style={{
              width: "100%",
              padding: "28px 15px 10px",
              backgroundColor: "#f6f6f9",
              border: "1px solid #e8e8e8",
              borderRadius: "12px",
              fontSize: "16px",
              color: "#888",
              outline: "none",
              fontWeight: "400",
            }}
          />
        </div>

        <div className="input-group" style={{ marginBottom: "45px", position: "relative" }}>
          <input
            type="tel"
            inputMode="numeric"
            className="custom-input"
            placeholder="เบอร์โทรศัพท์มือถือ ใหม่"
            value={normalizedNewPhone}
            onChange={(event) => setNewPhone(normalizePhone(event.target.value))}
            style={{
              width: "100%",
              padding: "18px 16px",
              backgroundColor: "#fff",
              border: "1px solid #d1d1d1",
              borderRadius: "12px",
              fontSize: "16px",
              color: "#333",
              outline: "none",
            }}
          />
        </div>

        <button
          type="button"
          onClick={handleContinue}
          disabled={!canContinue}
          className="primary-btn"
          style={{
            width: "100%",
            padding: "16px",
            backgroundColor: canContinue ? "#84328f" : "#d1a8d6",
            color: "#fff",
            border: "none",
            borderRadius: "30px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: canContinue ? "pointer" : "not-allowed",
          }}
        >
          ยืนยัน
        </button>
      </div>
    </div>
  );
}
