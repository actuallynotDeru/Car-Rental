"use client"

import { type ColumnDef } from "@tanstack/react-table"
import { type Car } from "@/types"
import { Button } from "@/components/ui/button"
import { Edit2, Trash2 } from "lucide-react"

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
    cell: ({ row }) => `$${row.getValue<number>("price")}`,
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
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm">
          <Edit2 className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" className="text-destructive">
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    ),
  },
]