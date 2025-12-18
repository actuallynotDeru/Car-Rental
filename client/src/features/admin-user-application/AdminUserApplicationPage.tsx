import { useState, useMemo, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckCircle, XCircle, Clock } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ApplicationsTable from "./components/application-data-table"
import { getStatusColor, getStatusIcon } from "./utils/get"
import RenderDialogContent from "./components/modal-content"
import { getApplications } from "./api/application.api"
import type { Application } from "./types/application.types"
import { motion } from "framer-motion"
import { UserApplicationAnimations } from "./animations/admin-user-application.animations"
import { Error, Loading } from "./components/status"
import { pendingCount, approvedCount, rejectedCount } from "./utils/count"

const MotionCard = motion(Card);

const AdminUserApplicationPage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("All")
  const [sortBy, setSortBy] = useState<string>("newest")
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    const fetchApplications = async() => {
      try {
        setLoading(true)
        setError(null)
        const data = await getApplications()
        setApplications(data);
      } catch(error) {
        setError("Failed to load applications. Please try again.");
        console.error("Error fetching applications: ", error);
      } finally {
        setLoading(false);
      }
    }
    fetchApplications()
  }, [])

  const filteredApplications = useMemo(() => {
    const filtered = applications.filter((app) => {
      const matchesSearch =
       app.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
       app.userId.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
       app.businessEmail.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === "All" || app.status === statusFilter
      
      return matchesSearch && matchesStatus
    })

    if(sortBy === "newest") {
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    } else if(sortBy === "oldest") {
      filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    }
    return filtered
  }, [applications, searchTerm, statusFilter, sortBy])

  if(loading) {
    return(
      <Loading />
    )
  }
  
  if(error) {
    return (
      <Error err = {error} />
    )
  }
  
  return(
    <motion.div variants = {UserApplicationAnimations.container} initial = "hidden" animate = "visible" className = "flex-1 overflow-auto p-4">
      <motion.div variants = {UserApplicationAnimations.header} initial = "hidden" animate = "visible" className = "mb-8">
        <h1 className = "text-3xl font-bold text-foreground mb-2">Car Owner Applications</h1>
        <p className = "text-muted-foreground">Review and manage car owner applications</p>
      </motion.div>

      {/* metric cards */}
      <motion.div variants = {UserApplicationAnimations.metricsGrid} initial = "hidden" animate = "visible" className = "grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <MotionCard variants ={UserApplicationAnimations.metricCard} initial = "hidden" animate = "visible" className = "p-6 bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800">
          <div className = "flex items-center justify-between">
            <div>
              <p className = "text-sm text-muted-foreground">Pending Reviews</p>
              <p className = "text-3xl font-bold text-yellow-600 dark:text-yello-400">{pendingCount(applications)}</p>
            </div>
            <Clock className = "size-8 text-yellow-600 dark:text-yellow-400"/>
          </div>
        </MotionCard>

        <MotionCard variants ={UserApplicationAnimations.metricCard} initial = "hidden" animate = "visible" className = "p-6 bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
          <div className = "flex items-center justify-between">
            <div>
              <p className = "text-sm text-muted-foreground">Approved</p>
              <p className = "text-3xl font-bold text-green-600 dark:text-green-400">{approvedCount(applications)}</p>
            </div>
            <CheckCircle className = "size-8 text-green-600 dark:text-green-400"/>
          </div>
        </MotionCard>

        <MotionCard variants ={UserApplicationAnimations.metricCard} initial = "hidden" animate = "visible" className = "p-6 bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800">
          <div className = "flex items-center justify-between">
            <div>
              <p className = "text-sm text-muted-foreground">Rejected</p>
              <p className = "text-3xl font-bold text-red-600 dark:text-red-400">{rejectedCount(applications)}</p>
            </div>
            <XCircle className = "size-8 text-red-600 dark:text-red-400"/>
          </div>
        </MotionCard>
      </motion.div>

      {/* Filters */}
      <MotionCard variants = {UserApplicationAnimations.filtersCard} initial = "hidden" animate = "visible" className = "p-6 mb-8">
        <div className = "grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <Label className = "block text-sm font-medium text-foreground mb-2">Search</Label>
            <Input 
              placeholder = "Business name, user, email..."
              value = {searchTerm}
              onChange = {(e) => setSearchTerm(e.target.value)}
              className = "w-full"
            />
          </div>

          <div>
            <Label className = "block text-sm font-medium text-foreground mb-2">Status</Label>
            <Select value = {statusFilter} onValueChange = {setStatusFilter}>
                <SelectTrigger className = "w-full">
                    <SelectValue placeholder = "All Status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value = "All">All Status</SelectItem>
                    <SelectItem value = "Pending">Pending</SelectItem>
                    <SelectItem value = "Approved">Approved</SelectItem>
                    <SelectItem value = "Rejected">Rejected</SelectItem>
                </SelectContent>
            </Select>
          </div>

          <div>
            <Label className = "block text-sm font-medium text-foreground mb-2">Sort By</Label>
            <Select value = {sortBy} onValueChange = {setSortBy}>
                <SelectTrigger className = "w-full">
                    <SelectValue placeholder = "Newest First" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value = "newest">Newest First</SelectItem>
                    <SelectItem value = "oldest">Oldest First</SelectItem>
                </SelectContent>
            </Select>
          </div>

          <div className = "flex items-end">
            <Button
              onClick = {() => {
                  setSearchTerm("")
                  setStatusFilter("All")
                  setSortBy("newest")
              }}
              variant = "outline"
              className = "w-full"
            >
              Clear Filters
            </Button>
          </div>
        </div>
      </MotionCard>

      {/* Applications Table */}
      <ApplicationsTable
        data={filteredApplications}
        renderDialogContent={RenderDialogContent}
        getStatusColor={getStatusColor}
        getStatusIcon={getStatusIcon}
      />
    </motion.div>
  )
}

export default AdminUserApplicationPage