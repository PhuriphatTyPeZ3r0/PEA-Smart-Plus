import type { Metadata, Viewport } from "next";
import "./globals.css";
import { UserProfileProvider } from "@/components/providers/UserProfileProvider";

export const metadata: Metadata = {
  title: "PEA Smart Plus",
  description: "PEA Smart Plus Satisfaction Evaluation",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "PEA Smart Plus",
  },
  icons: {
    icon: [
      { url: "/pwa-icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/pwa-icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/pwa-icon-192.png",
  }
};

export const viewport: Viewport = {
  themeColor: "#7B2CBF",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

const serviceWorkerScript =
  process.env.NODE_ENV === "production"
    ? `
      if ('serviceWorker' in navigator) {
        var hasRefreshed = false;

        navigator.serviceWorker.addEventListener('controllerchange', function () {
          if (hasRefreshed) {
            return;
          }
          hasRefreshed = true;
          window.location.reload();
        });

        window.addEventListener('online', function () {
          navigator.serviceWorker.getRegistration().then(function (registration) {
            if (registration) {
              registration.update();
            }
          });
        });

        window.addEventListener('load', function () {
          navigator.serviceWorker
            .register('/sw.js')
            .then(function (registration) {
              if (registration.waiting) {
                registration.waiting.postMessage({ type: 'SKIP_WAITING' });
              }

              registration.addEventListener('updatefound', function () {
                var newWorker = registration.installing;
                if (!newWorker) {
                  return;
                }
                newWorker.addEventListener('statechange', function () {
                  if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    if (registration.waiting) {
                      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
                    }
                  }
                });
              });

              setInterval(function () {
                registration.update();
              }, 60 * 60 * 1000);
            })
            .catch(function (err) {
              console.log('ServiceWorker registration failed:', err);
            });
        });
      }
    `
    : `
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', function () {
          navigator.serviceWorker.getRegistrations().then(function (registrations) {
            registrations.forEach(function (registration) {
              registration.unregister();
            });
          });

          if ('caches' in window) {
            caches.keys().then(function (keys) {
              keys
                .filter(function (key) {
                  return (
                    key.indexOf('evaluate-satisfaction-') === 0 ||
                    key.indexOf('evaluate-satisfaction-pwa-') === 0 ||
                    key.indexOf('home-pwa-') === 0 ||
                    key.indexOf('pea-smart-plus-home-') === 0
                  );
                })
                .forEach(function (key) {
                  caches.delete(key);
                });
            });
          }
        });
      }
    `;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />
        <script dangerouslySetInnerHTML={{ __html: serviceWorkerScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <UserProfileProvider>{children}</UserProfileProvider>
      </body>
    </html>
  );
}
