import cn from "clsx";
import type { ReactNode } from "react";

export type DataTableColumn<TData> = {
  key: keyof TData;
  header: ReactNode;
  render?: (value: TData[keyof TData], row: TData) => ReactNode;
  align?: "left" | "right" | "center";
};

export interface DataTableProps<TData> {
  columns: DataTableColumn<TData>[];
  data: TData[];
  getRowId: (row: TData, index: number) => string;
  emptyState?: ReactNode;
  className?: string;
}

export function DataTable<TData>({
  columns,
  data,
  getRowId,
  emptyState,
  className,
}: DataTableProps<TData>) {
  return (
    <div
      className={cn("overflow-hidden rounded-xl border border-borderDivider bg-white", className)}
    >
      <table className="min-w-full divide-y divide-borderDivider text-left">
        <thead className="bg-bgContent">
          <tr>
            {columns.map((column) => (
              <th
                key={String(column.key)}
                scope="col"
                className={cn(
                  "px-4 py-3 text-caption font-semibold uppercase tracking-wide text-textSecondary",
                  alignToClass(column.align),
                )}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-borderDivider">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-6 text-center text-body text-textSecondary"
              >
                {emptyState ?? "No records to display."}
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr key={getRowId(row, rowIndex)} className="hover:bg-bgContent/60">
                {columns.map((column) => {
                  const cell = column.render
                    ? column.render(row[column.key], row)
                    : (row[column.key] as ReactNode);
                  return (
                    <td
                      key={String(column.key)}
                      className={cn(
                        "px-4 py-3 text-body text-textPrimary",
                        alignToClass(column.align),
                      )}
                    >
                      {cell}
                    </td>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

function alignToClass(align: DataTableColumn<unknown>["align"]) {
  if (align === "right") return "text-right";
  if (align === "center") return "text-center";
  return "text-left";
}
