import React from "react";
import Image from "next/image";

interface AccountSummaryCardProps {
  accountName: string;
  accountNumber: string;
  balance: string;
  dueDate: string;
  onPayBill?: () => void;
  onSwitchAccount?: () => void;
}

const AccountSummaryCard: React.FC<AccountSummaryCardProps> = ({
  accountName,
  accountNumber,
  balance,
  dueDate,
  onPayBill,
  onSwitchAccount,
}) => {
  return (
    <div
      style={{
        width: "100%",
        padding: "24px 20px",
        background: "linear-gradient(180deg, rgba(255, 255, 255, 0.90) 0%, rgba(255, 255, 255, 0.60) 100%)",
        borderRadius: 20,
        boxShadow: "0px 12px 24px -4px rgba(145, 158, 171, 0.12), 0px 0px 2px 0px rgba(145, 158, 171, 0.20)",
        outline: "1px solid white",
        outlineOffset: "-1px",
        backdropFilter: "blur(6px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        gap: 20,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          alignSelf: "stretch",
          display: "inline-flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", gap: 12 }}>
          <div
            style={{
              display: "inline-flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              gap: 2,
            }}
          >
            <div
              style={{
                color: "#101828",
                fontSize: 16,
                fontFamily: "Kanit",
                fontWeight: "500",
                lineHeight: "24px",
              }}
            >
              {accountName}
            </div>
            <div
              style={{
                color: "#344054",
                fontSize: 12,
                fontFamily: "Kanit",
                fontWeight: "400",
                lineHeight: "16px",
              }}
            >
              {accountNumber}
            </div>
          </div>
        </div>

        <button
          onClick={onSwitchAccount}
          style={{
            padding: "6px 8px 6px 6px",
            background: "#F9FAFB",
            borderRadius: 9999,
            outline: "1px solid white",
            outlineOffset: "-1px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 4,
            border: "none",
            cursor: "pointer",
            overflow: "hidden",
          }}
        >
          <div style={{ padding: "0 2px", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div
              style={{
                color: "#101828",
                fontSize: 10,
                fontFamily: "Kanit",
                fontWeight: "500",
                lineHeight: "16px",
              }}
            >
              เปลี่ยนบัญชี
            </div>
          </div>
          <div style={{ width: 16, height: 16, position: "relative", overflow: "hidden" }}>
            <Image src="/asset/icons/home-icon/Buttons/switch-horizontal-01.svg" alt="Switch" width={16} height={16} />
          </div>
        </button>
      </div>

      <div
        style={{
          alignSelf: "stretch",
          height: 0,
          outline: "0.5px solid rgba(255, 255, 255, 0.90)",
          outlineOffset: "-0.25px",
        }}
      />

      <div
        style={{
          alignSelf: "stretch",
          display: "inline-flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: 16,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              gap: 4,
            }}
          >
            <div
              style={{
                color: "#344054",
                fontSize: 12,
                fontFamily: "Kanit",
                fontWeight: "500",
                lineHeight: "16px",
              }}
            >
              ยอดค้างชำระ
            </div>
            <div style={{ display: "inline-flex", justifyContent: "flex-start", alignItems: "baseline", gap: 4 }}>
              <div
                style={{
                  color: "#101828",
                  fontSize: 24,
                  fontFamily: "Kanit",
                  fontWeight: "600",
                  lineHeight: "32px",
                }}
              >
                {balance}
              </div>
              <div
                style={{
                  color: "#344054",
                  fontSize: 18,
                  fontFamily: "Kanit",
                  fontWeight: "400",
                  lineHeight: "24px",
                }}
              >
                บาท
              </div>
            </div>
            <div
              style={{
                color: "#344054",
                fontSize: 14,
                fontFamily: "Kanit",
                fontWeight: "400",
                lineHeight: "21px",
              }}
            >
              กำหนดชำระ {dueDate}
            </div>
          </div>
        </div>

        <div
          style={{
            display: "inline-flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-end",
            gap: 4,
          }}
        >
          <button
            onClick={onPayBill}
            style={{
              padding: "10px 16px",
              background: "#A80689",
              borderRadius: 9999,
              boxShadow:
                "0px 1px 2px rgba(16, 24, 40, 0.05), inset 0px -2px 0px rgba(16, 24, 40, 0.05), inset 0px 0px 0px 1px rgba(16, 24, 40, 0.18)",
              outline: "2px solid rgba(255, 255, 255, 0.10)",
              outlineOffset: "-2px",
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 4,
              border: "none",
              cursor: "pointer",
              overflow: "hidden",
            }}
          >
            <div style={{ padding: "0 2px", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <div
                style={{
                  color: "white",
                  fontSize: 14,
                  fontFamily: "Kanit",
                  fontWeight: "600",
                  lineHeight: "18px",
                }}
              >
                จ่ายบิล
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountSummaryCard;
