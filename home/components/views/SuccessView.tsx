"use client";

import React, { useEffect } from "react";
import Image from "next/image";

interface SuccessViewProps {
  onClose: () => void;
}

export default function SuccessView({ onClose }: SuccessViewProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="flex w-full flex-col items-center justify-start overflow-hidden bg-white">
      <div className="flex w-full flex-1 flex-col items-center justify-start pt-4">
        <div className="relative h-[260px] w-full overflow-hidden sm:h-72">
          <div className="absolute left-1/2 top-[48px] flex h-[219px] w-[219px] -translate-x-1/2 items-center justify-center">
            <Image
              src="/asset/icons/evaluate-satisfaction-icon/Ellipse 1946.svg"
              alt="Background decoration large"
              width={219}
              height={219}
              className="absolute"
            />
            <Image
              src="/asset/icons/evaluate-satisfaction-icon/Ellipse 1945.svg"
              alt="Background decoration small"
              width={157}
              height={157}
              className="absolute"
            />
          </div>

          <div className="absolute inset-0 flex items-center justify-center pt-8">
            <div className="relative h-[157px] w-[260px]">
              <div className="absolute left-1/2 top-0 h-[157px] w-[157px] -translate-x-1/2">
                <Image
                  src="/asset/icons/evaluate-satisfaction-icon/Mask group.svg"
                  alt="Character"
                  fill
                  className="object-contain"
                />
              </div>

              <div className="absolute left-[14px] top-[50px] h-[82px] w-[82px] origin-top-left -rotate-12">
                <Image
                  src="/asset/icons/evaluate-satisfaction-icon/Frame 1321314288.svg"
                  alt="Decoration left"
                  width={82}
                  height={82}
                />
              </div>

              <div className="absolute right-[8px] top-[54px] h-[57px] w-[102px]">
                <Image
                  src="/asset/icons/evaluate-satisfaction-icon/Vector.svg"
                  alt="Decoration right"
                  width={102}
                  height={57}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex w-full max-w-[560px] flex-col items-center justify-start gap-5 px-5 sm:px-8">
          <div className="self-stretch text-center text-2xl font-semibold leading-8 text-[#101828]">
            ขอบคุณสำหรับการประเมิน!
          </div>
          <div className="self-stretch text-center text-base font-normal leading-6 text-[#101828]">
            ข้อเสนอแนะของคุณจะถูกนำไปใช้
            <br />
            ในการปรับปรุงคุณภาพการให้บริการต่อไป
          </div>
        </div>
      </div>
    </div>
  );
}
