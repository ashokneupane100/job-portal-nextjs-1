"use client";

import { logoutUserAction } from "@/features/auth/server/auth.actions";
import { isActiveLink } from "@/lib/navigation-utils";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { applicantNavItems } from "@/config/constant";

const ApplicantSidebar = () => {
  const pathname = usePathname();
  console.log("pathname: ", pathname);

  return (
    <div className="w-64 bg-card border-r border-border fixed bottom-0 top-0">
      <div className="p-6 space-y-2">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="relative h-8 w-8 rounded-lg overflow-hidden border border-blue-100 shrink-0">
            <Image
              src="https://dfmb7dp8wq.ufs.sh/f/4fIxZ5ejF6tgBwoHE6xx1GraKJNmXRe0HvspYWlIiwfLtAqo"
              alt="Job Sewa Logo"
              fill
              className="object-cover"
            />
          </div>
          <span className="font-bold text-base text-blue-700">Job Sewa</span>
          <span className="rounded bg-red-600 px-1.5 py-0.5 text-[10px] font-bold text-white">
            जब सेवा
          </span>
        </Link>
        <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wide pt-1">
          Applicant Dashboard
        </h2>
      </div>

      <nav className="px-3 space-y-1">
        {applicantNavItems.map((item) => {
          const Icon = item.icon;
          const active = isActiveLink(pathname, item.href, item.exact);

          console.log("pathname:   item.href ", item.href);

          return (
            <Link
              key={item.name}
              href={item.href || "#"}
              className={cn(
                "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                active
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent",
              )}
            >
              <Icon className="h-4 w-4" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-6 left-3 right-3">
        <button
          onClick={logoutUserAction}
          className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors w-full"
        >
          <LogOut className="h-4 w-4" />
          Log-out
        </button>
      </div>
    </div>
  );
};

export default ApplicantSidebar;
