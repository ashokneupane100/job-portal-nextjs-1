import Link from "next/link";
import Image from "next/image";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/features/auth/server/auth.queries";
import { logoutUserAction } from "@/features/auth/server/auth.actions";

export default async function Navbar() {
  const user = await getCurrentUser();

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto max-w-7xl px-4 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-3 group"
        >
          <div className="relative h-10 w-10 rounded-xl overflow-hidden shadow-xs border border-blue-100 shrink-0">
            <Image
              src="https://dfmb7dp8wq.ufs.sh/f/4fIxZ5ejF6tgBwoHE6xx1GraKJNmXRe0HvspYWlIiwfLtAqo"
              alt="Job Sewa (जब सेवा) Hand Briefcase Logo"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="flex flex-col leading-none">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight text-blue-700 group-hover:text-blue-600 transition-colors">
                Job Sewa
              </span>
              <span className="rounded-md bg-red-600 px-1.5 py-0.5 text-xs font-bold text-white">
                जब सेवा
              </span>
            </div>
            <span className="text-[10px] font-medium text-gray-500 mt-0.5">
              नेपालको रोजगारी प्लेटफर्म
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <Link href="/jobs" className="hover:text-blue-600 transition-colors">
            Find Job
          </Link>
          <Link href="/#top-employers" className="hover:text-blue-600 transition-colors">
            Employers
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {!user ? (
            <>
              <Button variant="ghost" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Post a Job</Link>
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="outline">
                <Link
                  href={
                    user.role === "employer"
                      ? "/employer-dashboard"
                      : "/dashboard/settings"
                  }
                >
                  Dashboard
                </Link>
              </Button>

              <form action={logoutUserAction}>
                <Button
                  variant="ghost"
                  type="submit"
                  size="icon"
                  title="Log out"
                >
                  <LogOut className="w-5 h-5 text-gray-600 hover:text-red-600 transition-colors" />
                </Button>
              </form>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
