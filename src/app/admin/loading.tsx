export default function AdminLoading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-6 py-14 text-slate-500">
      <div className="animate-pulse rounded-3xl border border-slate-200/80 bg-white/80 px-8 py-10 shadow-lg shadow-slate-900/5 dark:border-slate-800/80 dark:bg-slate-950/80">
        <p className="text-lg font-medium">Loading dashboard…</p>
      </div>
    </div>
  );
}
