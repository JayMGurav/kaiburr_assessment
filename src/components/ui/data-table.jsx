import {
  flexRender
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination";
  import { Button } from "@/components/ui/button"


export function DataTable({
  table,
  page,
  pageSize,
  total,
  totalColumns
}) {
  return (
    <div className="w-full">
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={totalColumns} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
      <div className="flex items-center justify-between">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div>
          <DataPagination page={page} pageSize={pageSize} total={total}/>
        </div>
      </div>
    </div>
  )
}


export function DataPagination({ page, total, pageSize}){
    return (
      <Pagination className="justify-end space-x-2 py-4">
        <PaginationContent>
          <PaginationItem className="cursor-pointer">
            <PaginationPrevious className={ page >=2 ? "" : "pointer-events-none text-neutral-400"} href={`/?page=${page >=2 ? page-1 : page}&pageSize=${10}`}/>
          </PaginationItem>
          {page > 2 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          {page > 1 && <PaginationItem>
            <PaginationLink href={`/?page=${page-1}&pageSize=${10}`}>{page-1}</PaginationLink>
          </PaginationItem>}
          <PaginationItem>
            <PaginationLink isActive href={`/?page=1&pageSize=10`}>{page}</PaginationLink>
          </PaginationItem>
          {pageSize*page < total-1 && (
            <>
              <PaginationItem>
                <PaginationLink href={`/?page=${page+1}&pageSize=${10}`}>{page+1}</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            </>
          )}
          <PaginationItem className="cursor-pointer">
            <PaginationNext className={ page < (total/pageSize) ? "" : "pointer-events-none text-neutral-400"} href={`/?page=${page < (total/pageSize) ? page+1 : page}&pageSize=${10}`} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )
  }