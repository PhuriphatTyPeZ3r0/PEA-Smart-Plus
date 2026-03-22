"use client";

import React, { useState } from "react";

interface InAppBrowserProps {
  url: string;
  title: string;
  onClose: () => void;
}

export default function InAppBrowser({ url, title, onClose }: InAppBrowserProps) {
  const [loading, setLoading] = useState(true);

  return (
    <div className="absolute inset-0 z-[200] flex flex-col bg-white">
      {/* Browser Header */}
      <div className="flex flex-shrink-0 items-center gap-2 border-b border-slate-100 bg-white px-3 pt-10 pb-2">
        {/* Close */}
        <button
          onClick={onClose}
          className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 transition active:scale-90"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        {/* URL bar */}
        <div className="flex flex-1 items-center gap-2 rounded-xl bg-slate-100 px-3 py-2">
          {/* Lock icon */}
          <svg className="flex-shrink-0 text-green-500" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span className="min-w-0 flex-1 truncate text-[11px] text-slate-500">{url.replace("https://", "")}</span>
        </div>

        {/* Reload */}
        <button className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 transition active:scale-90">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M23 4v6h-6" />
            <path d="M1 20v-6h6" />
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
          </svg>
        </button>
      </div>

      {/* Loading bar */}
      {loading && (
        <div className="h-0.5 w-full bg-slate-100">
          <div
            className="h-full bg-[#A80689] animate-pulse"
            style={{ width: "60%" }}
          />
        </div>
      )}

      {/* iFrame */}
      <iframe
        src={url}
        title={title}
        className="flex-1 w-full border-none"
        onLoad={() => setLoading(false)}
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-navigation"
      />
    </div>
  );
}