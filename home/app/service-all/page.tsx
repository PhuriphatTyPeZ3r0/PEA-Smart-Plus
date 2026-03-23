"use client";

import React from "react";
import { useRouter } from "next/navigation";
import ServiceView from "@/components/views/ServiceView";

export default function ServiceAllPage() {
  const router = useRouter();

  return (
    <div className="absolute inset-0 z-[50] bg-white h-full w-full">
      <ServiceView onBack={() => router.push("/")} />
    </div>
  );
}
