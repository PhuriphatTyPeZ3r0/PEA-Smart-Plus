import React from "react";

interface FoundNewCACardProps {
  count: number;
}

const FoundNewCACard: React.FC<FoundNewCACardProps> = ({ count }) => {
  return (
    <div
      style={{
        width: "100%",
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
        overflow: "hidden",
      }}
    >
      <div
        style={{
          alignSelf: "stretch",
          padding: 20,
          background: "linear-gradient(135deg, rgba(255, 255, 255, 0.90) 0%, rgba(255, 255, 255, 0.40) 100%)",
          borderRadius: 16,
          boxShadow: "0px 12px 24px -4px rgba(145, 158, 171, 0.12), 0px 0px 2px 0px rgba(145, 158, 171, 0.20)",
          outline: "2px solid rgba(255, 255, 255, 0.90)",
          outlineOffset: "-2px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          gap: 16,
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
          <div
            style={{
              display: "inline-flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              gap: 8,
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
                  color: "#DF4F16",
                  fontSize: 18,
                  fontFamily: "Kanit",
                  fontWeight: "500",
                  lineHeight: "24px",
                }}
              >
                เราพบสถานที่ใช้ไฟใหม่ของคุณ
              </div>
              <div
                style={{
                  color: "#101828",
                  fontSize: 14,
                  fontFamily: "Kanit",
                  fontWeight: "400",
                  lineHeight: "20px",
                }}
              >
                กรุณาตรวจสอบความถูกต้องของข้อมูล
                <br />
                สถานที่ใช้ไฟฟ้าใหม่
              </div>
            </div>
          </div>
          <div
            style={{
              width: 80,
              height: 80,
              padding: "6px 10px 10px 10px",
              background: "linear-gradient(135deg, rgba(255, 255, 255, 0.90) 0%, rgba(255, 255, 255, 0.40) 100%)",
              borderRadius: 16,
              boxShadow: "0px 12px 24px -4px rgba(145, 158, 171, 0.12), 0px 0px 2px 0px rgba(145, 158, 171, 0.20)",
              outline: "2px solid rgba(255, 255, 255, 0.90)",
              outlineOffset: "-2px",
              display: "inline-flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                alignSelf: "stretch",
                textAlign: "center",
                color: "#DF4F16",
                fontSize: 30,
                fontFamily: "Kanit",
                fontWeight: "600",
                lineHeight: "40px",
              }}
            >
              {count}
            </div>
            <div
              style={{
                textAlign: "center",
                color: "#344054",
                fontSize: 12,
                fontFamily: "Kanit",
                fontWeight: "500",
                lineHeight: "16px",
              }}
            >
              สถานที่
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoundNewCACard;
