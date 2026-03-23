"use client";

import { useEffect } from "react";

interface InAppBrowserProps {
  url: string;
  title: string;
  onClose: () => void;
}

export default function InAppBrowser({ url, onClose }: InAppBrowserProps) {
  useEffect(() => {
    window.open(url, "_blank");
    onClose(); // ปิด state กลับทันที ไม่ต้องแสดง overlay
  }, []);

  return null;
}