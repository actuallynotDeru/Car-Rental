import { type ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Edit2, Shield, Trash2 } from "lucide-react"
import { type User } from "@/types"

export const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: "fullName",
    header: "Full Name",
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <span className="text-muted-foreground">{row.getValue<string>("email")}</span>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.getValue<string>("role")
      return role.replace(/\b\w/g, (char) => char.toUpperCase())
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue<string>("status")
      const isVerified = status === "Verified"
      return (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            isVerified
              ? "bg-emerald-100 text-emerald-700"
              : "bg-slate-200 text-slate-700"
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
          <Shield className="w-4 h-4" />
        </Button>
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