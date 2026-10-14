"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  ShieldAlert,
  Menu,
  X,
  FileText,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/superadmin/dashboard", icon: LayoutDashboard },
  { label: "User Management", href: "/superadmin/users", icon: Users },
  { label: "Audit Log", href: "/superadmin/audit", icon: FileText },
  { label: "Settings", href: "/superadmin/settings", icon: Settings },
];

export function SuperAdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/superadmin/login");
    router.refresh();
  };

  const NavContent = () => (
    <>
      <div className="px-5 py-6 border-b border-[rgba(201,168,76,0.1)]">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-sm bg-[rgba(201,168,76,0.15)] border border-[rgba(201,168,76,0.3)] flex items-center justify-center">
            <ShieldAlert className="w-4 h-4 text-[#c9a84c]" />
          </div>
          <div>
            <p className="text-white text-sm font-semibold leading-none">Super Admin</p>
            <p className="text-[#c9a84c] text-[10px] uppercase tracking-widest mt-0.5">
              Full Access
            </p>
          </div>
        </div>
        <div className="mt-3 px-2 py-1.5 bg-[rgba(201,168,76,0.06)] border border-[rgba(201,168,76,0.1)] rounded-sm">
          <p className="text-white/30 text-[10px]">Rock One Square</p>
          <p className="text-white/50 text-[11px]">Senflore Hospitality LLP</p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
          const active = pathname === href || (pathname.startsWith(href) && href !== "/superadmin/dashboard");
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm transition-all ${
                active
                  ? "bg-[rgba(201,168,76,0.12)] text-[#c9a84c] border border-[rgba(201,168,76,0.2)]"
                  : "text-white/50 hover:text-white hover:bg-white/4 border border-transparent"
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-white/5">
        <Link
          href="/admin/dashboard"
          className="flex items-center gap-3 px-3 py-2 rounded-sm text-sm text-white/30 hover:text-white/50 transition-colors mb-2"
        >
          <LayoutDashboard className="w-4 h-4" />
          Switch to Admin Panel
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-sm text-sm text-red-400/70 hover:text-red-400 hover:bg-red-500/5 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-[#0a0f1e] border border-[rgba(201,168,76,0.2)] rounded-sm text-[#c9a84c]"
        aria-label="Open super admin menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div
        className={`md:hidden fixed inset-y-0 left-0 z-50 w-64 bg-[#080d18] border-r border-[rgba(201,168,76,0.1)] flex flex-col transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-4 right-4 text-white/30 hover:text-white"
          aria-label="Close menu"
        >
          <X className="w-4 h-4" />
        </button>
        <NavContent />
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-56 flex-col bg-[#080d18] border-r border-[rgba(201,168,76,0.1)] min-h-screen sticky top-0">
        <NavContent />
      </aside>
    </>
  );
}
