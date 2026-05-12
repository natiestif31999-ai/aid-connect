import Link from "next/link";

export default function AdminNotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-slate-50 px-6 py-20 text-center text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <h1 className="text-4xl font-semibold">Admin page not found</h1>
      <p className="mt-4 max-w-xl text-sm text-slate-600 dark:text-slate-400">
        The section you are trying to access does not exist yet. Return to the dashboard to continue managing the platform.
      </p>
      <Link href="/admin" className="mt-8 inline-flex rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
        Back to dashboard
      </Link>
    </div>
  );
}
