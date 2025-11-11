import { useState, type ReactNode } from "react"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { applicationColumns, type Application, type ApplicationTableMeta } from "./application-columns"

type ApplicationsTableProps = {
  data: Application[]
  renderDialogContent: (app: Application) => ReactNode
  getStatusColor: ApplicationTableMeta["getStatusColor"]
  getStatusIcon: ApplicationTableMeta["getStatusIcon"]
}

const ApplicationsTable = ({ data, renderDialogContent, getStatusColor, getStatusIcon }: ApplicationsTableProps) => {
  const [open, setOpen] = useState(false)
  const [selectedApp, setSelectedApp] = useState<Application | null>(null)

  const handleOpenDialog = (app: Application) => {
    setSelectedApp(app)
    setOpen(true)
  }

  const table = useReactTable<Application>({
    data,
    columns: applicationColumns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      openDialog: handleOpenDialog,
      getStatusColor,
      getStatusIcon,
    },
  })

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        setOpen(value)
        if (!value) setSelectedApp(null)
      }}
    >
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted border-b">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className={`px-6 py-3 text-sm font-semibold text-foreground ${
                        header.column.id === "action" ? "text-center" : "text-left"
                      }`}
                    >
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y">
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="hover:bg-muted/50 transition-colors">
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className={`px-6 py-4 ${cell.column.id === "action" ? "text-center" : "text-left"} align-middle`}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={table.getAllColumns().length} className="px-6 py-8 text-center text-muted-foreground">
                    No applications found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {selectedApp && (
        <DialogContent className="min-w-4xl max-h-[90vh] overflow-y-auto">
          {renderDialogContent(selectedApp)}
        </DialogContent>
      )}
    </Dialog>
  )
}

export default ApplicationsTable