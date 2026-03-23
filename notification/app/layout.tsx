import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PEA Smart Plus - Notification",
  description: "Notification module",
};

export const viewport: Viewport = {
  themeColor: "#A80689",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className="h-full antialiased">
      <body className="min-h-full">
        <main className="mx-auto flex min-h-[100dvh] w-full max-w-[1024px] flex-col bg-white">
          {children}
        </main>
      </body>
    </html>
  );
}
