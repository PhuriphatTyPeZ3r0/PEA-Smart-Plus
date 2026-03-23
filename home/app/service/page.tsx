"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Servicemview from "@/components/views/Servicemview";

export default function ServicePage() {
  const router = useRouter();

  return (
    <div className="absolute inset-0 z-[50] bg-white h-full w-full">
      <Servicemview onBack={() => router.push("/")} />
    </div>
  );
}
