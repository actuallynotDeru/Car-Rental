import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockUsers } from "@/lib/mock-data";
import { X } from "lucide-react";
import { useState, useMemo } from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectValue } from "@/components/ui/select";
import { UsersDataTable } from "./components/users-data-table";
import { userColumns } from "./components/users-columns";
import { SelectTrigger } from "@radix-ui/react-select";

const AdminUsers = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const [filters, setFilters] = useState({
        role: "",
        status: "",
    })

    const filteredUsers = useMemo(() => {
        return mockUsers.filter((user) => {
            const matchesSearch = 
            user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
            
            const matchesRole = !filters.role || user.role === filters.role
            const matchesStatus = !filters.status || user.status === filters.status

            return matchesSearch && matchesRole && matchesStatus
        })
    }, [searchTerm, filters])

    const handleFilterChange = (key: string, value: string) => {
        setFilters((prev) => ({
            ...prev,
            [key]: value,
        }))
    }

    const clearFilters = () => {
        setSearchTerm("")
        setFilters({ role: "", status: ""})
    }

    const hasActiveFilters = searchTerm || Object.values(filters).some((v) => v)

    return(
        <div className = "flex-1 overflow-auto">
            <div className = "mb-8">
                <h1 className = "text-3xl font-bold text-foreground mb-2">Users Management</h1>
                <p className = "text-muted-foreground">Manage all users and their roles</p>
            </div>

            <Card className = "p-6 mb-6">
                <div className = "space-y-3">
                    <div className = "flex gap-2 flex-wrap items-end">
                        <div className = "flex-1 min-w-[200px]">
                            <Label className = "text-sm fon-medium text-foreground mb-1 block">Search</Label>
                            <Input 
                                placeholder = "Search users..."
                                value = {searchTerm}
                                onChange = {(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

{/* can be component */}
                        <div className = "min-w-[150px]">
                            <Label className = "text-sm font-medium text-foreground mb-1 block">Role</Label>
                            <Select
                            value={filters.role}
                            onValueChange={(e) => handleFilterChange("role", e)}
                            >
                            <SelectTrigger className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground text-sm">
                                <SelectValue placeholder="All Roles ⇅" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                <SelectLabel>User Role</SelectLabel>
                                <SelectItem value="Admin">Admin</SelectItem>
                                <SelectItem value="Customer">Customer</SelectItem>
                                <SelectItem value="CarOwner">Car Owner</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                            </Select>
                        </div>

                        <div className = "min-w-[150px]">
                            <Label className = "text-sm font-medium text-foreground mb-1 block">Status</Label>
                            <Select
                                value = {filters.status}
                                onValueChange = {(e) => handleFilterChange("status", e)}
                            >
                                <SelectTrigger className = "w-full px-3 py-2 border border-input rounded-md bg-background text-foreground text-sm">
                                    <SelectValue placeholder = "All Statuses ⇅"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>User Status</SelectLabel>
                                        <SelectItem value = "Verified">Verified</SelectItem>
                                        <SelectItem value = "Unerified">Unverified</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        {hasActiveFilters && (
                            <Button
                                variant = "outline"
                                size = "sm"
                                onClick = {clearFilters}
                                className = "gap-2 bg-transparent"
                            >
                                <X className = "size-4" />
                                Clear Filters
                            </Button>
                        )}
                    </div>
                </div>
            </Card>

            <UsersDataTable columns = {userColumns} data = {filteredUsers} />
        </div>
    )
}

export default AdminUsers;