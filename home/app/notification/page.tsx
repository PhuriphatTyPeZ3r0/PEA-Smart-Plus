"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import NotificationView from "@/components/views/NotificationView";
import NotificationSettingsView from "@/components/views/NotificationSettingsView";
import NotificationDetailView from "@/components/views/NotificationDetailView";
import {
  DEFAULT_NOTIFICATION_SETTINGS,
  INITIAL_NOTIFICATIONS,
  type EditableNotificationSettingKey,
  type NotificationItem,
  type NotificationPreferences,
} from "@/components/views/notificationData";

type NotiViewState = "list" | "settings" | "detail";

export default function NotificationPage() {
  const router = useRouter();
  const [view, setView] = useState<NotiViewState>("list");
  const [selectedNotiId, setSelectedNotiId] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [notificationSettings, setNotificationSettings] =
    useState<NotificationPreferences>(DEFAULT_NOTIFICATION_SETTINGS);

  const selectedNotification = notifications.find((item) => item.id === selectedNotiId) ?? null;

  const handleOpenNotificationDetail = (id: string) => {
    setNotifications((current) =>
      current.map((item) => (item.id === id ? { ...item, isRead: true } : item))
    );
    setSelectedNotiId(id);
    setView("detail");
  };

  const handleMarkAllNotificationsAsRead = () => {
    setNotifications((current) => current.map((item) => ({ ...item, isRead: true })));
  };

  const handleMarkNotificationsAsRead = (ids: string[]) => {
    setNotifications((current) =>
      current.map((item) => (ids.includes(item.id) ? { ...item, isRead: true } : item))
    );
  };

  const handleDeleteNotifications = (ids: string[]) => {
    setNotifications((current) => current.filter((item) => !ids.includes(item.id)));
  };

  const handleToggleNotificationSetting = (key: EditableNotificationSettingKey) => {
    setNotificationSettings((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

  return (
    <div className="absolute inset-0 z-[50] bg-white h-full w-full">
      {view === "list" && (
        <NotificationView
          notifications={notifications}
          onBack={() => router.push("/")}
          onGoToSettings={() => setView("settings")}
          onGoToDetail={handleOpenNotificationDetail}
          onMarkAllAsRead={handleMarkAllNotificationsAsRead}
          onMarkNotificationsAsRead={handleMarkNotificationsAsRead}
          onDeleteNotifications={handleDeleteNotifications}
        />
      )}

      {view === "settings" && (
        <NotificationSettingsView
          settings={notificationSettings}
          onBack={() => setView("list")}
          onToggleSetting={handleToggleNotificationSetting}
        />
      )}

      {view === "detail" && (
        <NotificationDetailView 
          notification={selectedNotification} 
          onBack={() => setView("list")} 
        />
      )}
    </div>
  );
}
