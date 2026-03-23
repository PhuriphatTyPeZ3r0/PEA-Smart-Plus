"use client";

import React, { useEffect, useState } from "react";
import LoadingView from "@/components/views/LoadingView";
import HomeView from "@/components/views/HomeView";
import { useUserProfile } from "@/components/providers/UserProfileProvider";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const { profile } = useUserProfile();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const sharedUser = {
    id: profile.id,
    idenNumber: profile.idenNumber,
    name: profile.fullName,
    balance: profile.balance,
    ca: profile.ca,
    accountName: profile.accountName,
    dueDate: profile.dueDate,
    newServiceLocationCount: profile.newServiceLocationCount,
  };

  useEffect(() => {
    localStorage.setItem("UserAccIdenNumber", profile.idenNumber);
    localStorage.setItem("SetLanguage", "TH");

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [profile.idenNumber]);

  useEffect(() => {
    if (!loading) {
      const hasShown = sessionStorage.getItem("hasShownEvaluation");
      if (!hasShown) {
        const timer = setTimeout(() => {
          sessionStorage.setItem("hasShownEvaluation", "true");
          router.push("/evaluation");
        }, 1500);
        return () => clearTimeout(timer);
      }
    }
  }, [loading, router]);

  if (loading) {
    return <LoadingView />;
  }

  return (
    <HomeView
      mockUser={sharedUser}
      isActive={true}
      onOpenEvaluation={() => router.push("/evaluation")}
      onOpenNotifications={() => router.push("/notification")}
      onOpenService={() => router.push("/service")}
      onOpenServiceAll={() => router.push("/service-all")}
    />
  );
}