import { DashboardLayout } from "@/components/layout/dashboard-layout";

export default function DashboardRootLayout({ children }: { children: React.ReactNode }) {
  const userRole = "farmer" as "farmer" | "buyer";
  const userName = "Juan Dela Cruz";
  return (
    <DashboardLayout userRole={userRole} userName={userName}>
      {children}
    </DashboardLayout>
  );
}
