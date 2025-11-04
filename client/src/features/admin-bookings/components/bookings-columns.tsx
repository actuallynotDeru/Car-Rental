import type { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Eye, Trash2 } from "lucide-react"

export type BookingTableRow = {
  id: string
  bookingCode?: string
  customerName: string
  carName: string
  startDateLabel: string
  endDateLabel: string
  totalPrice?: number
  status: string
  paymentStatus?: string
}

export const bookingColumns: ColumnDef<BookingTableRow>[] = [
  {
    accessorKey: "id",
    header: "Booking ID",
  },
  {
    accessorKey: "customerName",
    header: "Customer",
  },
  {
    accessorKey: "carName",
    header: "Car",
  },
  {
    accessorKey: "startDateLabel",
    header: "Start Date",
  },
  {
    accessorKey: "endDateLabel",
    header: "End Date",
  },
  {
    accessorKey: "totalPrice",
    header: "Total",
    cell: ({ row }) => {
      const total = row.getValue<number | undefined>("totalPrice")
      return total ? `$${total.toFixed(2)}` : "—"
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue<string>("status")
      const isActive = status === "Confirmed" || status === "Completed"
      return (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            isActive
              ? "bg-emerald-100 text-emerald-700"
              : "bg-amber-100 text-amber-700"
          }`}
        >
          {status}
        </span>
      )
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: () => (
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm">
          <Eye className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" className="text-destructive">
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    ),
  },
]