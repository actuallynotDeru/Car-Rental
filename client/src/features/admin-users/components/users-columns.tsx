"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { type User } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
      const role = row.getValue<string>("role");
      return role.replace(/\b\w/g, (char) => char.toUpperCase());
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue<string>("status");
      const isVerified = status === "Verified";
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
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const user = row.original;
      const formattedRole =
        user.role?.replace(/\b\w/g, (char) => char.toUpperCase()) ?? "—";
      const isVerified = user.status === "Verified";
      const statusClasses = isVerified
        ? "bg-emerald-100 text-emerald-700"
        : "bg-slate-200 text-slate-700";

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
                <DialogTitle>{user.fullName}</DialogTitle>
                <DialogDescription>Full user profile</DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                <section>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-muted p-4 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Full Name</p>
                      <p className="text-foreground font-semibold">{user.fullName}</p>
                    </div>
                    <div className="bg-muted p-4 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Email</p>
                      <p className="text-foreground font-semibold">{user.email}</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Account Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-muted p-4 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Role</p>
                      <p className="text-foreground font-semibold">{formattedRole}</p>
                    </div>
                    <div className="bg-muted p-4 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Status</p>
                      <span className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-semibold ${statusClasses}`}>
                        {user.status}
                      </span>
                    </div>
                  </div>
                </section>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      );
    },
  },
];