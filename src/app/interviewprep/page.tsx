import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const ACCESS_COOKIE = "interviewprep_access";
const ACCESS_TOKEN = "granted";
const PAGE_PASSWORD = "study2026!";

export const metadata: Metadata = {
  title: "Interview Prep",
  robots: {
    index: false,
    follow: false,
  },
};

async function unlockInterviewPrep(formData: FormData) {
  "use server";

  const password = String(formData.get("password") ?? "");

  if (password !== PAGE_PASSWORD) {
    redirect("/interviewprep?error=1");
  }

  cookies().set({
    name: ACCESS_COOKIE,
    value: ACCESS_TOKEN,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/interviewprep",
    maxAge: 60 * 60 * 12,
  });

  redirect("/interviewprep");
}

export default async function InterviewPrepPage({
  searchParams,
}: {
  searchParams?: { error?: string };
}) {
  const isAuthorized = cookies().get(ACCESS_COOKIE)?.value === ACCESS_TOKEN;

  if (!isAuthorized) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6 py-16" style={{ backgroundColor: "#F5F5F0" }}>
        <section className="w-full max-w-md rounded-2xl border p-8 md:p-10" style={{ borderColor: "rgba(45, 41, 38, 0.12)", backgroundColor: "#FFFFFF" }}>
          <p className="text-[10px] uppercase font-semibold mb-3" style={{ letterSpacing: "0.3em", color: "rgba(45, 41, 38, 0.55)" }}>
            Private Page
          </p>
          <h1 className="font-serif text-4xl italic mb-4" style={{ fontWeight: 400, color: "#2D2926" }}>
            Interview Prep
          </h1>
          <p className="text-sm mb-6" style={{ color: "rgba(45, 41, 38, 0.75)" }}>
            Enter the password to view this page.
          </p>

          <form action={unlockInterviewPrep} className="space-y-4">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2"
              style={{
                borderColor: "rgba(45, 41, 38, 0.2)",
                color: "#2D2926",
              }}
            />
            <button
              type="submit"
              className="w-full rounded-full px-6 py-3 text-[11px] uppercase font-bold transition-colors hover:opacity-90"
              style={{ letterSpacing: "0.2em", backgroundColor: "#2D2926", color: "#FFFFFF" }}
            >
              Unlock
            </button>
          </form>

          {searchParams?.error ? (
            <p className="mt-4 text-sm" style={{ color: "#B45309" }}>
              Incorrect password. Please try again.
            </p>
          ) : null}
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen" style={{ backgroundColor: "#F5F5F0" }}>
      <iframe
        title="Interview Prep Content"
        src="/interviewprep-content.html"
        className="w-full min-h-screen border-0"
      />
    </main>
  );
}
