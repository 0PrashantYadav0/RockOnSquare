import React from "react";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/auth";
import { SuperAdminSidebar } from "@/components/superadmin/SuperAdminSidebar";

export default async function SuperAdminPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Server-side auth guard — middleware can't check session revocation
  const session = await auth();
  if (!session?.user || session.user.role !== "superadmin") {
    redirect("/superadmin/login?reason=unauthorized");
  }

  return (
    <div className="flex min-h-screen bg-[#080d18]">
      <SuperAdminSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="p-6 md:p-8 max-w-7xl">{children}</div>
      </main>
    </div>
  );
}
