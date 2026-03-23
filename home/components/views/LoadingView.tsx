import React from "react";
import Image from "next/image";

export default function LoadingView() {
  return (
    <div className="absolute inset-0 z-[120] flex flex-col items-center justify-center bg-white">
      <div className="w-32 h-32 relative">
        <Image 
          src="/asset/loading/loading.gif" 
          alt="Loading..." 
          fill
          sizes="128px"
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
}
