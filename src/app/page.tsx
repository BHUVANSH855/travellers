import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  Lock,
  MessageSquare,
  UserPlus,
} from "lucide-react";

import VerifiedTicket from "@/components/illustrations/VerifiedTicket";
import SmartMatching from "@/components/illustrations/SmartMatching";
import PrivateMessaging from "@/components/illustrations/PrivateMessaging";
import AccountIllustration from "@/components/illustrations/AccountIllustration";
import UploadIllustration from "@/components/illustrations/UploadIllustration";
import MatchesIllustration from "@/components/illustrations/MatchesIllustration";

export default function HomePage() {
  return (
    <main>

      {/* ================= HERO (CINEMATIC VERSION) ================= */}
      <section className="relative w-full overflow-hidden">

        {/* Background world map */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10 dark:opacity-30"
          style={{ backgroundImage: "url('/worldMap.png')" }}
        />

        {/* Theme-aware overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/90 to-transparent dark:from-slate-950/90 dark:via-slate-950/80 dark:to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-28">
          <div className="grid items-center gap-16 md:grid-cols-2">

            {/* LEFT SIDE */}
            <div className="text-slate-900 dark:text-white">

              <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 dark:bg-white/10 px-4 py-1 text-sm text-slate-600 dark:text-gray-200 backdrop-blur transition-colors duration-300">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Now verifying tickets for fall trips
              </div>

              <h1 className="mt-6 text-4xl font-bold leading-tight md:text-6xl transition-colors duration-300">
                Meet verified travellers. <br />
                Make real connections.
              </h1>

              <p className="mt-6 text-lg text-slate-600 dark:text-gray-300 max-w-xl transition-colors duration-300">
                travellersmeet helps solo travellers find others headed to the
                same city and dates — verified with a real ticket, not just vibes.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center rounded-lg bg-emerald-500 px-6 py-3 font-medium text-white shadow hover:bg-emerald-600 transition duration-300"
                >
                  Get started free <UserPlus className="ml-2 h-4 w-4" />
                </Link>

                <Link
                  href="#how-it-works"
                  className="inline-flex items-center justify-center rounded-lg border border-slate-200 dark:border-white/40 px-6 py-3 font-medium text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-white/10 transition duration-300"
                >
                  See how it works
                </Link>
              </div>

              <p className="mt-4 text-xs text-slate-500 dark:text-gray-400 transition-colors duration-300">
                No spam. Private by default. Cancel anytime.
              </p>

            </div>

            {/* RIGHT IMAGE */}
            <div className="relative flex justify-center md:justify-end overflow-visible">

              <div className="absolute -right-40 top-1/2 -translate-y-1/2">

                <Image
                  src="/newhero.png"
                  alt="Travellers connecting"
                  width={2000}
                  height={1500}
                  priority
                  className="
        w-[1000px]
        md:w-[1400px]
        max-w-none
        drop-shadow-2xl
      "
                />

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ================= TRUST STRIP ================= */}
      <section className="mx-auto max-w-7xl px-6 -mt-16 relative z-20 pb-10">
        <div className="grid items-center gap-6 rounded-xl border border-slate-200 bg-white px-8 py-6 text-sm text-slate-600 shadow-xl sm:grid-cols-3 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-5 w-5 text-emerald-500" />
            <p>Ticket-verified profiles</p>
          </div>
          <div className="flex items-center gap-3">
            <Lock className="h-5 w-5 text-blue-500" />
            <p>Zero ads. No selling your data</p>
          </div>
          <div className="flex items-center gap-3">
            <MessageSquare className="h-5 w-5 text-purple-500" />
            <p>Report + block controls</p>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section id="features" className="mx-auto max-w-7xl px-6 mt-28 scroll-mt-20">
        <div className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight">
            Everything you need to find your crew
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600 dark:text-slate-400">
            Built for safety and ease. Upload a ticket once and we do the rest.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {[
            {
              title: "Verified by ticket",
              desc: "Simple upload with sensitive details redacted by our team.",
              illustration: <VerifiedTicket />,
            },
            {
              title: "Smart matching",
              desc: "We surface people overlapping your city and dates.",
              illustration: <SmartMatching />,
            },
            {
              title: "Private messaging",
              desc: "Chat only after both sides opt in. Report anytime.",
              illustration: <PrivateMessaging />,
            },
          ].map((f) => (
            <div
              key={f.title}
              className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="h-[220px] border-b border-slate-100 bg-slate-50 flex items-center justify-center dark:border-slate-800 dark:bg-slate-800/30">
                {f.illustration}
              </div>
              <div className="p-8">
                <h3 className="text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-slate-600 dark:text-slate-400">
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section id="how-it-works" className="mx-auto max-w-7xl px-6 mt-28 scroll-mt-20">
        <div className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight">
            Process
          </h2>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {[
            {
              title: "Create account",
              desc: "Sign up with email and password.",
              illustration: <AccountIllustration />,
            },
            {
              title: "Upload ticket",
              desc: "Submit your ticket for a quick verification.",
              illustration: <UploadIllustration />,
            },
            {
              title: "Find matches",
              desc: "See people in your destination window and say hello.",
              illustration: <MatchesIllustration />,
            },
          ].map((s) => (
            <div
              key={s.title}
              className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-md transition dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-slate-50 dark:bg-slate-800/50">
                {s.illustration}
              </div>
              <h3 className="text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-slate-600 dark:text-slate-400">
                {s.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/signup"
            className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-6 py-3 font-medium text-white hover:opacity-90 transition dark:bg-white dark:text-slate-900"
          >
            Create your account
          </Link>
        </div>
      </section>

{/* ================= FAQ ================= */}
<section
  id="faq"
  className="mx-auto max-w-4xl px-6 mt-28 mb-28 scroll-mt-20"
>
  <div className="text-center">
    <h2 className="text-3xl font-semibold tracking-tight">
      Frequently Asked Questions
    </h2>
    <p className="mt-3 text-slate-600 dark:text-slate-400">
      Everything you need to know before joining travellersmeet.
    </p>
  </div>

  <div className="mt-12 space-y-4">
    {[
      {
        q: "How do I create a profile?",
        a: "Simply sign up using your email and password. Once registered, you can upload your ticket to verify your trip.",
      },
      {
        q: "How do I connect with other travellers?",
        a: "After verification, you’ll see travellers going to the same city on overlapping dates. You can send a connection request to start chatting.",
      },
      {
        q: "Is the platform free to use?",
        a: "Yes. travellersmeet is currently free to join and use for verified travellers.",
      },
      {
        q: "How is my data protected?",
        a: "We never sell your data. Ticket details are reviewed securely and sensitive information is not displayed publicly.",
      },
    ].map((faq, index) => (
      <details
        key={index}
        className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition dark:border-slate-800 dark:bg-slate-900"
      >
        <summary className="cursor-pointer list-none flex justify-between items-center font-medium text-slate-900 dark:text-white">
          {faq.q}
          <span className="ml-4 transition-transform group-open:rotate-180">
            ▼
          </span>
        </summary>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          {faq.a}
        </p>
      </details>
    ))}
  </div>
</section>

</main>
  );
}
