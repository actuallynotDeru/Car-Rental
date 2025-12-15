import type { ColumnDef } from "@tanstack/react-table";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import type { Application } from "../types/application.types";

export type Applycation = Application;

export type ApplicationTableMeta = {
  openDialog: (app: Applycation) => void;
  getStatusColor: (status: Applycation["status"]) => string;
  getStatusIcon: (status: Applycation["status"]) => ReactNode;
};

export const applicationColumns: ColumnDef<Applycation>[] = [
  {
    accessorKey: "businessName",
    header: () => <span className="text-sm font-semibold text-foreground">Business Name</span>,
    cell: ({ row }) => <span className="text-sm font-medium text-foreground">{row.original.businessName}</span>,
  },
  {
    accessorKey: "userName",
    header: () => <span className="text-sm font-semibold text-foreground">Owner</span>,
    cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.original.userId.fullName}</span>,
  },
  {
    accessorKey: "businessEmail",
    header: () => <span className="text-sm font-semibold text-foreground">Business Email</span>,
    cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.original.businessEmail}</span>,
  },
  {
    accessorKey: "status",
    header: () => <span className="text-sm font-semibold text-foreground">Status</span>,
    cell: ({ row, table }) => {
      const meta = table.options.meta as ApplicationTableMeta | undefined;
      const status = row.original.status;
      const badgeClasses = meta?.getStatusColor?.(status) ?? "bg-gray-100 text-gray-800";
      const statusIcon = meta?.getStatusIcon?.(status);
      return (
        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${badgeClasses}`}>
          {statusIcon}
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: () => <span className="text-sm font-semibold text-foreground">Applied</span>,
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">{new Date(row.original.createdAt).toLocaleDateString()}</span>
    ),
  },
  {
    id: "action",
    header: () => <span className="block text-center text-sm font-semibold text-foreground">Action</span>,
    cell: ({ row, table }) => {
      const meta = table.options.meta as ApplicationTableMeta | undefined;
      return (
        <div className="flex justify-center">
          <Button
            variant="ghost"
            size="sm"
            className="gap-1"
            onClick={() => meta?.openDialog?.(row.original)}
          >
            <Eye className="size-4" />
            View
          </Button>
        </div>
      );
    },
  },
];
