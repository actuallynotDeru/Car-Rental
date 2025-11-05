import { useState } from "react";
import { 
    type ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    type SortingState,
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
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function UsersDataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [globalFilter, setGlobalFilter] = useState("")

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            globalFilter,
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
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
            <div className = "flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className = "flex items-center gap-2">
                    <Label
                        htmlFor = "users-table-page-size"
                        className = "text-sm text-muted-foreground"
                    >
                        Rows per page
                    </Label>
                    <select
                        id = "users-table-page-size"
                        value = {pageSize}
                        onChange = {(e) => table.setPageSize(Number(e.target.value))}
                        className = "rounded-md border border-input bg-background px-2 py-1 text-sm"
                    >
                        {[5, 10, 20, 50].map((size) => (
                            <option key = {size} value = {size}>
                                {size}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className = "rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key = {headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key = {header.id}>
                                        {header.isPlaceholder ? null : header.column.getCanSort() ? (
                                            <button
                                                type = "button"
                                                onClick = {header.column.getToggleSortingHandler()}
                                                className = "flex w-full items-center justify-between gap-2 text-left text-sm font-medium"
                                            >
                                                <span>
                                                    {flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                                </span>
                                                <span className = "text-xs text-muted-foreground">
                                                    {header.column.getIsSorted() === "asc"
                                                        ? "▲"
                                                        : header.column.getIsSorted() === "desc"
                                                        ? "▼"
                                                        : "↕"}
                                                </span>
                                            </button>
                                        ) : (
                                            flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )
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
                </Table>
            </div>

            <div className = "flex flex-col gap-3 border-t pt-4 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
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
            </div>
        </div>
    )
} 