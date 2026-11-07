import { type ReactNode } from "react";
import {
  useReactTable,
  type ColumnDef,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { InboxIcon, Loader2Icon } from "lucide-react";

import { IUser } from "../../authentication/core/types/user.types";
import { Table } from "@/core/components/ui/table";
import { Button } from "@/core/components/ui/button";
import { cn } from "@/core/libraries/tailwind";

type UsersTableProps = {
  data: IUser[];
  columns: ColumnDef<IUser>[];
  errorMessage?: ReactNode;
  loading?: boolean;
  meta?: BasePaginationResponse;
  page?: number;
  onPageChange?: (page: number) => void;
};

export const UsersTable = ({
  data,
  columns,
  errorMessage,
  loading,
  meta,
  page = 1,
  onPageChange,
}: UsersTableProps) => {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  const colSpan = table.getAllColumns().length || columns.length;

  return (
    <div className="grid gap-5">
      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <Table className="w-full">
          <Table.Header>
            {table.getHeaderGroups().map((headerGroup) => (
              <Table.Row key={headerGroup.id} className="bg-gray-50">
                {headerGroup.headers.map((header) => (
                  <Table.Head
                    key={header.id}
                    colSpan={header?.colSpan}
                    className={cn(
                      "text-xs font-semibold text-gray-600",
                      header.column.columnDef.meta?.className,
                    )}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </Table.Head>
                ))}
              </Table.Row>
            ))}
          </Table.Header>

          <Table.Body>
            {loading ? (
              <Table.Row>
                <Table.Cell colSpan={colSpan} className="h-32 text-center">
                  <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                    <Loader2Icon className="w-5 h-5 animate-spin text-sky-600" />
                    <span>Loading users...</span>
                  </div>
                </Table.Cell>
              </Table.Row>
            ) : errorMessage ? (
              <Table.Row>
                <Table.Cell colSpan={colSpan} className="h-32 text-center">
                  {errorMessage}
                </Table.Cell>
              </Table.Row>
            ) : table.getRowModel().rows?.length === 0 ? (
              <Table.Row>
                <Table.Cell colSpan={colSpan} className="h-36 text-center">
                  <div className="flex flex-col items-center justify-center gap-2 text-xs text-gray-400">
                    <InboxIcon className="w-8 h-8 stroke-1" />
                    <p className="font-medium text-gray-600">No users found</p>
                    <p>No users match your current search or filter criteria.</p>
                  </div>
                </Table.Cell>
              </Table.Row>
            ) : (
              table.getRowModel().rows.map((row) => (
                <Table.Row
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="hover:bg-gray-50/80 transition"
                >
                  {row.getVisibleCells().map((cell) => (
                    <Table.Cell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </Table.Cell>
                  ))}
                </Table.Row>
              ))
            )}
          </Table.Body>
        </Table>
      </div>

      {meta && meta.total_page >= 1 && (
        <div className="flex items-center justify-between pt-2 text-xs text-gray-600">
          <span>
            Showing page <strong>{meta.page}</strong> of{" "}
            <strong>{Math.max(1, meta.total_page)}</strong> ({meta.total_data}{" "}
            total users)
          </span>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              disabled={page <= 1}
              onClick={() => onPageChange?.(Math.max(1, page - 1))}
              className="text-xs py-1 px-3"
            >
              Previous
            </Button>
            <Button
              variant="outline"
              disabled={page >= Math.max(1, meta.total_page)}
              onClick={() =>
                onPageChange?.(Math.min(Math.max(1, meta.total_page), page + 1))
              }
              className="text-xs py-1 px-3"
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
