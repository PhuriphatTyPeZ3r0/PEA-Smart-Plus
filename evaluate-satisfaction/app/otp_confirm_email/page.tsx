"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useUserProfile } from "@/components/providers/UserProfileProvider";
import { maskEmail } from "@/lib/user-profile";

export default function OtpConfirmEmail() {
  const router = useRouter();
  const { profile, confirmEmailChange, clearPendingEmail } = useUserProfile();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const targetEmail = profile.pendingEmail || profile.email;

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (!profile.pendingEmail) {
      router.replace("/change_email");
    }
  }, [profile.pendingEmail, router]);

  const submitOtp = () => {
    confirmEmailChange();
    router.push("/success_email");
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = event.target.value.replace(/[^0-9]/g, "");
    event.target.value = value;

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    const allFilled = inputRefs.current.slice(0, 6).every((input) => input?.value.length === 1);
    if (allFilled) {
      setTimeout(submitOtp, 250);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (event.key === "Backspace" && !event.currentTarget.value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="edit-phone-flow app-container" style={{ backgroundColor: "#ffffff", minHeight: "100vh", padding: "0" }}>
      <div className="top-bar-plain" style={{ justifyContent: "flex-start", paddingLeft: "20px" }}>
        <Link href="/change_email" className="back-btn" onClick={clearPendingEmail} style={{ marginRight: "15px" }}>
          <span className="material-symbols-outlined" style={{ fontWeight: "bold" }}>
            chevron_left
          </span>
        </Link>
      </div>

      <div className="form-container" style={{ padding: "20px 24px" }}>
        <h1 style={{ fontSize: "18px", fontWeight: "700", color: "#1a1a1a", marginBottom: "16px" }}>
          ยืนยันอีเมล
        </h1>
        <p style={{ fontSize: "14px", color: "#333", marginBottom: "4px", fontWeight: "400" }}>
          กรอกรหัส OTP 6 หลัก ที่ส่งไปยัง
        </p>
        <p style={{ fontSize: "14px", color: "#333", marginBottom: "4px", fontWeight: "400" }}>{maskEmail(targetEmail)}</p>
        <p style={{ fontSize: "14px", color: "#333", marginBottom: "60px", fontWeight: "400" }}>
          หากยังไม่ได้รับ กดขอรหัสใหม่ได้เมื่อครบกำหนดเวลา
        </p>

        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "50px", gap: "8px" }}>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <input
              key={i}
              ref={(element) => {
                inputRefs.current[i] = element;
              }}
              type="text"
              maxLength={1}
              inputMode="numeric"
              onChange={(event) => handleInput(event, i)}
              onKeyDown={(event) => handleKeyDown(event, i)}
              style={{
                width: "100%",
                height: "40px",
                border: "none",
                borderBottom: "1.5px solid #bbb",
                textAlign: "center",
                fontSize: "22px",
                outline: "none",
                backgroundColor: "transparent",
                borderRadius: "0",
              }}
            />
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: "14px", color: "#333", fontWeight: "400" }}>รหัสอ้างอิง: 3754E9</div>
          <div style={{ fontSize: "14px", color: "#db5b94", fontWeight: "600", cursor: "pointer" }}>
            ขอรหัสใหม่ในอีก 2:26 นาที
          </div>
        </div>
      </div>
    </div>
  );
}
