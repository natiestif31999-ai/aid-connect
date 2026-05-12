import { cn } from "@/lib/utils";

interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {}

export function Table({ className, children, ...props }: TableProps) {
  return (
    <div className={cn("overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm dark:border-slate-800/80 dark:bg-slate-950/90", className)}>
      <table className="min-w-full text-left text-sm text-slate-900 dark:text-slate-100" {...props}>
        {children}
      </table>
    </div>
  );
}

interface TableHeaderProps extends React.ThHTMLAttributes<HTMLTableCellElement> {}
export function TableHeader({ className, ...props }: TableHeaderProps) {
  return <th className={cn("border-b border-slate-200 bg-slate-50 px-4 py-3 font-medium uppercase tracking-[0.12em] text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400", className)} {...props} />;
}

interface TableRowProps extends React.TrHTMLAttributes<HTMLTableRowElement> {}
export function TableRow({ className, ...props }: TableRowProps) {
  return <tr className={cn("border-b border-slate-200/80 last:border-0 dark:border-slate-800/80", className)} {...props} />;
}

interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {}
export function TableCell({ className, ...props }: TableCellProps) {
  return <td className={cn("px-4 py-4 align-top text-slate-700 dark:text-slate-200", className)} {...props} />;
}
