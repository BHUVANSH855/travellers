"use client";

import { useTheme } from "@/state/theme";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Plane } from "lucide-react";
import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi";
import { AnimatePresence, motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Toggle from "./toggle";

export default function SiteHeader() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const { theme, changeTheme } = useTheme();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md dark:bg-slate-900/80 dark:border-slate-800 transition-colors duration-300">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-3">

        {/* LEFT SIDE */}
        <Link
          href={session?.user ? "/dashboard/profile" : "/"}
          className="flex items-center gap-3 group"
        >
          <div className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 transition-transform duration-300 group-hover:scale-110 shadow-sm overflow-hidden">
            <Plane className="h-5 w-5 rotate-[-45deg] group-hover:rotate-0 transition-transform duration-500" />
          </div>

          <span className="bg-white/90 text-black px-4 py-1.5 rounded-full text-lg font-semibold tracking-tight transition-all duration-300 hover:scale-105 shadow-sm dark:bg-slate-800 dark:text-white">
            travellersmeet
          </span>
        </Link>

        {/* NAV LINKS */}
        <nav className="hidden items-center text-sm font-medium text-slate-600 dark:text-slate-300 gap-8 md:flex">
          <Link href="/#features" className="hover:text-slate-900 dark:hover:text-white">Features</Link>
          <Link href="/#how-it-works" className="hover:text-slate-900 dark:hover:text-white">How it works</Link>
          <Link href="/#testimonials" className="hover:text-slate-900 dark:hover:text-white">Stories</Link>
          <Link href="/#faq" className="hover:text-slate-900 dark:hover:text-white">FAQ</Link>
          <Link href="/upload" className="hover:text-slate-900 dark:hover:text-white">Upload</Link>
          <Link href="/routes" className="hover:text-slate-900 dark:hover:text-white">Routes</Link>
        </nav>

        {/* RIGHT SIDE */}
        <div className="hidden md:flex items-center gap-4">

          {session?.user?.id ? (
            <Link
              href="/dashboard"
              className="rounded-lg bg-slate-900 dark:bg-white px-4 py-2.5 text-sm font-semibold text-white dark:text-slate-900 hover:opacity-90 transition-all shadow-sm"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link href="/signin" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">
                Sign in
              </Link>
              <Link
                href="/signup"
                className="rounded-lg bg-slate-900 dark:bg-white px-4 py-2.5 text-sm font-semibold text-white dark:text-slate-900 hover:opacity-90 shadow-sm"
              >
                Get started
              </Link>
            </>
          )}

          <button onClick={changeTheme} className="p-2">
            {theme === "dark" ? (
              <HiOutlineMoon size={22} />
            ) : (
              <HiOutlineSun size={22} />
            )}
          </button>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden p-2"
          onClick={() => setOpen((v) => !v)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-slate-900 border-t dark:border-slate-800"
          >
            <div className="px-6 py-4 space-y-3">
              <Link href="/upload">Upload</Link>
              <Link href="/routes">Routes</Link>

              {session?.user?.id ? (
                <Link href="/dashboard">Dashboard</Link>
              ) : (
                <>
                  <Link href="/signin">Sign in</Link>
                  <Link href="/signup">Get started</Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}