"use client"

import { type ColumnDef } from "@tanstack/react-table"
import { type Car } from "@/types"
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

export const Carcolumns: ColumnDef<Car>[] = [
  {
    accessorKey: "name",
    header: "Car Name",
  },
  {
    accessorKey: "carDetails.seats",
    header: "Seats",
  },
  {
    accessorKey: "carDetails.transmission",
    header: "Transmission",
  },
  {
    accessorKey: "carDetails.fuelType",
    header: "Fuel Type",
  },
  {
    accessorKey: "carDetails.plateNumber",
    header: "Plate Number",
  },
  {
    accessorKey: "price",
    header: "Price/Day",
    cell: ({ row }) => {
      const car = row.original
      const formattedPrice = `₱${Number(car.price).toLocaleString()}`
      const statusClasses =
        car.status === "Available"
          ? "bg-emerald-100 text-emerald-700"
          : "bg-red-100 text-red-700"

      return (
        <div key={row.id} className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm">
                <Eye className="w-4 h-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-3xl">
              <DialogHeader>
                <DialogTitle>{car.name}</DialogTitle>
                <DialogDescription>Comprehensive vehicle overview</DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                <section>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Vehicle Overview</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-muted p-4 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Car Name</p>
                      <p className="text-foreground font-semibold">{car.name}</p>
                    </div>
                    <div className="bg-muted p-4 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Status</p>
                      <span className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-semibold ${statusClasses}`}>
                        {car.status}
                      </span>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Vehicle Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-muted p-4 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Seats</p>
                      <p className="text-foreground font-semibold">{car.carDetails.seats}</p>
                    </div>
                    <div className="bg-muted p-4 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Transmission</p>
                      <p className="text-foreground font-semibold">{car.carDetails.transmission}</p>
                    </div>
                    <div className="bg-muted p-4 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Fuel Type</p>
                      <p className="text-foreground font-semibold">{car.carDetails.fuelType}</p>
                    </div>
                    <div className="bg-muted p-4 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Plate Number</p>
                      <p className="text-foreground font-semibold">{car.carDetails.plateNumber}</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Rental Insights</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-muted p-4 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Price / Day</p>
                      <p className="text-foreground font-semibold">{formattedPrice}</p>
                    </div>
                    <div className="bg-muted p-4 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Rating</p>
                      <p className="text-foreground font-semibold">{car.rating}</p>
                    </div>
                  </div>
                </section>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )
    },
  },
  {
    accessorKey: "rating",
    header: "Rating",
    cell: ({ row }) => `⭐ ${row.getValue<number>("rating")}`,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue<string>("status")
      return (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            status === "Available"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {status}
        </span>
      )
    },
  }
]