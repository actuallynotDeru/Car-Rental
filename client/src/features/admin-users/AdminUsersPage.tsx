import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectValue, SelectTrigger } from "@/components/ui/select";
import { UsersDataTable } from "./components/users-data-table";
import { userColumns } from "./components/users-columns";
import { getUsers } from "./api/user.api";
import type { User } from "@/types";
import { motion } from "framer-motion";
import { UsersAnimations } from "./animations/admin-users.animations";
import { Error, Loading } from "./components/status";

const MotionCard = motion(Card);

interface UserData {
  _id: string
  role: string
}

const AdminUsers = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
      role: "all",
      status: "all",
  })
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [user, setUser] = useState<UserData | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
      const fetchUsers = async () => {
          try {
              setLoading(true)
              setError(null)
              const data = await getUsers()
              setUsers(data)
          } catch (err) {
              setError("Failed to load users. Please try again.")
              console.error("Error fetching users:", err)
          } finally {
              setLoading(false)
          }
      }

      fetchUsers()
  }, [])
  
  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if(userStr) {
      try {
        const userData = JSON.parse(userStr);
        setUser(userData);
      } catch(err) {
        console.error("Error parsing user data: ", err);
      }
    }
    setAuthChecked(true);
  }, [])
  
  useEffect(() => {
    if (!authChecked) return;
    
    if (!user || user.role !== "Admin") navigate("/");
  }, [authChecked, user, navigate])

  const filteredUsers = useMemo(() => {
      return users.filter((user) => {
          const matchesSearch = 
          user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
          
          const matchesRole = filters.role === "all" || user.role === filters.role
          const matchesStatus = filters.status === "all" || user.status === filters.status

          return matchesSearch && matchesRole && matchesStatus
      })
  }, [users, searchTerm, filters])

  const handleFilterChange = (key: string, value: string) => {
      setFilters((prev) => ({
          ...prev,
          [key]: value,
      }))
  }

  const clearFilters = () => {
      setSearchTerm("")
      setFilters({ role: "all", status: "all"})
  }

  const hasActiveFilters = searchTerm || Object.values(filters).some((v) => v !== "all")

  if (loading) {
      return (
        <Loading />
      )
  }

  if (error) {
      return (
        <Error err={error} />
      )
  }

  return(
      <motion.div variants={UsersAnimations.container} initial = "hidden" animate = "visible" className = "flex-1 overflow-auto">
        <motion.div variants={UsersAnimations.header} initial = "hidden" animate = "visible"  className = "mb-8">
            <h1 className = "text-3xl font-bold text-foreground mb-2">Users Management</h1>
            <p className = "text-muted-foreground">Manage all users and their roles</p>
        </motion.div>

        <MotionCard variants = {UsersAnimations.filterCard} initial = "hidden" animate = "visible" className = "p-6 mb-6">
            <div className = "space-y-3">
                <div className = "flex gap-2 flex-wrap items-end">
                    <div className = "flex-1 min-w-[200px]">
                        <Label className = "text-sm font-medium text-foreground mb-1 block">Search</Label>
                        <Input 
                            placeholder = "Search users..."
                            value = {searchTerm}
                            onChange = {(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className = "min-w-[150px]">
                        <Label className = "text-sm font-medium text-foreground mb-1 block">Role</Label>
                        <Select
                        value={filters.role}
                        onValueChange={(e) => handleFilterChange("role", e)}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="All" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value = "all">All</SelectItem>
                                <SelectItem value="Admin">Admin</SelectItem>
                                <SelectItem value="Customer">Customer</SelectItem>
                                <SelectItem value="CarOwner">Car Owner</SelectItem>
                                <SelectItem value="Registrar">Registrar</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className = "min-w-[150px]">
                        <Label className = "text-sm font-medium text-foreground mb-1 block">Status</Label>
                        <Select
                            value = {filters.status}
                            onValueChange = {(e) => handleFilterChange("status", e)}
                        >
                            <SelectTrigger className = "w-full">
                                <SelectValue placeholder = "All"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value = "all">All</SelectItem>
                                <SelectItem value = "Verified">Verified</SelectItem>
                                <SelectItem value = "Unverified">Unverified</SelectItem>
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
        </MotionCard>

        <UsersDataTable columns = {userColumns} data = {filteredUsers} />
      </motion.div>
  )
}

export default AdminUsers;