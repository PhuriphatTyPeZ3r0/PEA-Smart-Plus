"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserProfile } from "@/components/providers/UserProfileProvider";
import { isValidEmail, normalizeEmail } from "@/lib/user-profile";

export default function ChangeEmail() {
  const router = useRouter();
  const { profile, setPendingEmail } = useUserProfile();
  const [newEmail, setNewEmail] = useState(profile.email);

  const normalizedEmail = useMemo(() => normalizeEmail(newEmail), [newEmail]);
  const canContinue = useMemo(
    () => isValidEmail(normalizedEmail) && normalizedEmail !== profile.email,
    [normalizedEmail, profile.email]
  );

  const handleContinue = () => {
    if (!canContinue) {
      return;
    }
    setPendingEmail(normalizedEmail);
    router.push("/otp_confirm_email");
  };

  return (
    <div className="edit-phone-flow app-container" style={{ backgroundColor: "#ffffff", minHeight: "100vh", padding: "0" }}>
      <div className="top-bar-plain" style={{ justifyContent: "flex-start", paddingLeft: "20px" }}>
        <Link href="/edit_basic_info" className="back-btn" style={{ marginRight: "15px" }}>
          <span className="material-symbols-outlined" style={{ fontWeight: "bold" }}>
            chevron_left
          </span>
        </Link>
      </div>

      <div className="form-container" style={{ padding: "0 20px", marginTop: "15px" }}>
        <h1 className="form-title" style={{ fontSize: "22px", fontWeight: "700", color: "#1a1a1a", margin: "5px 0 15px" }}>
          เปลี่ยนอีเมล
        </h1>
        <p className="form-desc" style={{ fontSize: "15px", color: "#333", marginBottom: "35px", fontWeight: "500" }}>
          กรุณากรอกอีเมลใหม่ของคุณ
        </p>

        <div className="input-group" style={{ marginBottom: "45px", position: "relative" }}>
          <input
            type="email"
            className="custom-input"
            value={newEmail}
            onChange={(event) => setNewEmail(event.target.value)}
            style={{
              width: "100%",
              padding: "18px 16px",
              backgroundColor: "#fff",
              border: "1px solid #7a329f",
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
