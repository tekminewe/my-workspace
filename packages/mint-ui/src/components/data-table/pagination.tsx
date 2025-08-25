import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { Button } from "../button";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function Pagination<TData>({ table }: DataTablePaginationProps<TData>) {
  const currentPageIndex = table.getState().pagination.pageIndex;
  return (
    <div className="flex items-center gap-1 mt-4">
      <Button
        variant="outline"
        size="sm"
        disabled={!table.getCanPreviousPage()}
        style={{
          boxShadow: "none",
          width: "2rem",
          height: "2rem",
          padding: 0,
          cursor: table.getCanPreviousPage() ? "pointer" : "not-allowed",
        }}
        onClick={() => table.setPageIndex(currentPageIndex - 1)}
      >
        <ChevronLeftIcon width={16} height={20} />
      </Button>
      {table.getPageOptions().map((pageIndex) => {
        return (
          <Button
            key={pageIndex}
            size="sm"
            variant={currentPageIndex === pageIndex ? "solid" : "outline"}
            style={{
              boxShadow: "none",
              cursor: "pointer",
            }}
            onClick={() => table.setPageIndex(pageIndex)}
          >
            {pageIndex + 1}
          </Button>
        );
      })}
      <Button
        size="sm"
        variant="outline"
        style={{
          boxShadow: "none",
          width: "2rem",
          height: "2rem",
          padding: 0,
          cursor: table.getCanNextPage() ? "pointer" : "not-allowed",
        }}
        disabled={!table.getCanNextPage()}
        onClick={() => table.setPageIndex(currentPageIndex + 1)}
      >
        <ChevronRightIcon width={16} height={16} />
      </Button>
    </div>
  );
}
