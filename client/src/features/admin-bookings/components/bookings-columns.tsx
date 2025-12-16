import type { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

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
              : "bg-red-100 text-red-700"
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
    cell: ({ row }) => {
      const booking = row.original
      const formattedTotal =
        typeof booking.totalPrice === "number"
          ? `$${booking.totalPrice.toFixed(2)}`
          : "—"
      const statusClasses =
        booking.status === "Confirmed" || booking.status === "Completed"
          ? "bg-emerald-100 text-emerald-700"
          : booking.status === "Cancelled"
            ? "bg-red-100 text-red-700"
            : "bg-amber-100 text-amber-700"
      const paymentClasses =
        booking.paymentStatus === "Paid"
          ? "bg-emerald-100 text-emerald-700"
          : "bg-slate-200 text-slate-700"

      return (
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm">
                <Eye className="w-4 h-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle>{booking.bookingCode ?? booking.id}</DialogTitle>
                <DialogDescription>Booking breakdown</DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                <section>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Booking Summary</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-muted p-4 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Booking ID</p>
                      <p className="text-foreground font-semibold">{booking.id}</p>
                    </div>
                    <div className="bg-muted p-4 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Status</p>
                      <span className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-semibold ${statusClasses}`}>
                        {booking.status}
                      </span>
                    </div>
                    <div className="bg-muted p-4 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Customer</p>
                      <p className="text-foreground font-semibold">{booking.customerName}</p>
                    </div>
                    <div className="bg-muted p-4 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Car</p>
                      <p className="text-foreground font-semibold">{booking.carName}</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Schedule</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-muted p-4 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Start Date</p>
                      <p className="text-foreground font-semibold">{booking.startDateLabel}</p>
                    </div>
                    <div className="bg-muted p-4 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">End Date</p>
                      <p className="text-foreground font-semibold">{booking.endDateLabel}</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Financials</h3>
                  <div className="flex gap-4">
                    <div className="bg-muted p-4 rounded-lg w-full">
                      <p className="text-xs text-muted-foreground mb-1">Total Amount</p>
                      <p className="text-foreground font-semibold">{formattedTotal}</p>
                    </div>
                    {booking.paymentStatus && (
                      <div className="bg-muted p-4 rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">Payment Status</p>
                        <span className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-semibold ${paymentClasses}`}>
                          {booking.paymentStatus}
                        </span>
                      </div>
                    )}
                  </div>
                </section>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )
    },
  },
]