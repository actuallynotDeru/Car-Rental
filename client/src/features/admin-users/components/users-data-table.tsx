import { useState } from "react";
import { 
    type ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable
} from "@tanstack/react-table"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { 
    Select, 
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { UsersAnimations } from "../animations/admin-users.animations";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

const MotionTable = motion(Table);

export function UsersDataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [globalFilter, setGlobalFilter] = useState("")

    const table = useReactTable({
        data,
        columns,
        state: {
            globalFilter,
        },
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    const totalRows = table.getFilteredRowModel().rows.length
    const pageIndex = table.getState().pagination.pageIndex
    const pageSize = table.getState().pagination.pageSize
    const from = totalRows === 0 ? 0 : pageIndex * pageSize + 1
    const to = totalRows === 0 ? 0 : Math.min(totalRows, (pageIndex + 1) * pageSize)

    return(
        <div className = "space-y-4">
          <motion.div variants={UsersAnimations.filterCard} initial = "hidden" animate = "visible" className = "flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className = "flex items-center gap-2">
                <Label
                    htmlFor = "users-table-page-size"
                    className = "text-sm text-muted-foreground"
                >
                    Rows per page
                </Label>
                <Select value = {pageSize.toString()} onValueChange = {(e) => table.setPageSize(Number(e))}>
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {[5, 10, 20, 50].map((size) => (
                            <SelectItem key = {size} value = {size.toString()}>
                                {size}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
          </motion.div>

          <div className = "rounded-md border">
            <MotionTable variants={UsersAnimations.table} initial = "hidden" animate = "visible">
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key = {headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key = {header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                        )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                      <TableRow
                          key = {row.id}
                          data-state = {row.getIsSelected() && "selected"}
                      >
                          {row.getVisibleCells().map((cell) => (
                              <TableCell key = {cell.id}>
                                  {flexRender(
                                      cell.column.columnDef.cell,
                                      cell.getContext()
                                  )}
                              </TableCell>
                          ))}
                      </TableRow>
                  ))
                ) : (
                  <TableRow>
                      <TableCell colSpan = {columns.length} className = "h-24 text-center">
                          No Users Found.
                      </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </MotionTable>
          </div>

          <motion.div variants = {UsersAnimations.filterCard} initial = "hidden" animate = "visible" className = "flex flex-col gap-3 border-t pt-4 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
            <span>
              Showing {from} to {to} of {totalRows} entries
            </span>
            <div className = "flex items-center gap-2">
                <Button 
                    variant= "outline"
                    size = "sm"
                    onClick = {() => table.setPageIndex(0)}
                    disabled = {!table.getCanPreviousPage()}
                >
                    First
                </Button>
                
                <Button
                    variant = "outline"
                    size = "sm"
                    onClick = {() => table.previousPage()}
                    disabled = {!table.getCanPreviousPage()}
                >
                    Previous
                </Button>
                <span className = "px-2">
                    Page { pageIndex + 1 } of { Math.max(table.getPageCount(), 1) }
                </span>

                <Button
                  variant = "outline"
                  size = "sm"
                  onClick = {() => table.nextPage()}
                  disabled = {!table.getCanNextPage()}
                >
                    Next
                </Button>

                <Button
                  variant = "outline"
                  size = "sm"
                  onClick = {() => table.setPageIndex(table.getPageCount() - 1)}
                  disabled = {!table.getCanNextPage()}
                >
                  Last
                </Button>
            </div>
          </motion.div>
        </div>
    )
}