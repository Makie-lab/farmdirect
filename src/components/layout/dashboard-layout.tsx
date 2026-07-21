"use client";

import { Sidebar } from "./sidebar";

interface DashboardLayoutProps { children: React.ReactNode; userRole: "farmer" | "buyer"; userName: string; }

export function DashboardLayout({ children, userRole, userName }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar userRole={userRole} userName={userName} />
      <main className="lg:ml-64 min-h-screen">
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
