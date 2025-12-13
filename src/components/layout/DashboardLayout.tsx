import { ReactNode } from "react";
import Sidebar from "./Sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar tetap ada */}
      <Sidebar />

      {/* Main content ada margin kiri agar tidak ketutupan */}
      <main className="flex-1 ml-[70px] md:ml-[90px] lg:ml-[120px] p-6">
        <div className="max-w-full">{children}</div>
      </main>
    </div>
  );
}
