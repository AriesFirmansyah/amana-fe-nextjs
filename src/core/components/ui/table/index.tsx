import { cn } from "@/core/libraries/tailwind";
import { forwardRef } from "react";
import {
  TableHeaderProps,
  TableBodyProps,
  TableFooterProps,
  TableRowProps,
  TableHeadProps,
  TableCellProps,
  TableCaptionProps,
  TableComponent,
} from "./types";

const TableBody: TableBodyProps = forwardRef(({ className, ...props }, ref) => (
  <tbody
    {...props}
    ref={ref}
    className={cn("", className)}
  />
));
TableBody.displayName = "TableBody";

const TableCaption: TableCaptionProps = forwardRef(
  ({ className, ...props }, ref) => (
    <caption
      ref={ref}
      className={cn("mt-4 text-xxs text-neutral-tertiary", className)}
      {...props}
    />
  ),
);
TableCaption.displayName = "TableCaption";

const TableCell: TableCellProps = forwardRef(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      "py-4 px-6 text-left align-middle font-normal [&:has([role=checkbox])]:pr-0",
      className,
    )}
    {...props}
  />
));
TableCell.displayName = "TableCell";

const TableFooter: TableFooterProps = forwardRef(
  ({ className, ...props }, ref) => (
    <tfoot
      ref={ref}
      className={cn(
        "border-t border-[#EAECF0] bg-neutral-bg/50 font-bold [&>tr]:last:border-b-0",
        className,
      )}
      {...props}
    />
  ),
);
TableFooter.displayName = "TableFooter";

const TableHead: TableHeadProps = forwardRef(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-6 !py-0 px-6 text-left align-middle font-medium text-gray-500 bg-[#F6F6F6] first:rounded-tl-lg last:rounded-tr-lg [&:has([role=checkbox])]:pr-0",
      className,
    )}
    {...props}
  />
));
TableHead.displayName = "TableHead";

const TableHeader: TableHeaderProps = forwardRef(
  ({ className, ...props }, ref) => (
    <thead
      {...props}
      ref={ref}
      className={cn(className)}
    />
  ),
);
TableHeader.displayName = "TableHeader";

const TableRow: TableRowProps = forwardRef(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b border-[#EAECF0] hover:bg-neutral-bg/50 data-[state=selected]:bg-neutral-bg transition-colors ease-out duration-200",
      className,
    )}
    {...props}
  />
));
TableRow.displayName = "TableRow";

export const Table = forwardRef(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      {...props}
      ref={ref}
      className={cn("w-full text-xs", className)}
    />
  </div>
)) as TableComponent;
Table.displayName = "Table";

Table.Body = TableBody;
Table.Caption = TableCaption;
Table.Cell = TableCell;
Table.Footer = TableFooter;
Table.Head = TableHead;
Table.Header = TableHeader;
Table.Row = TableRow;
