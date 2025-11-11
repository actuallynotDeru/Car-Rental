import { useState, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { mockCarOwnerApplications } from "@/lib/mock-data"
import { CheckCircle, XCircle, Clock } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ApplicationsTable from "./components/application-data-table"
import type { Application } from "./components/application-columns"
import { DialogFooter } from "@/components/ui/dialog"

const AdminUserApplicationPage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("All")
  const [sortBy, setSortBy] = useState<string>("newest")

  const filteredApplications = useMemo(() => {
    const filtered = mockCarOwnerApplications.filter((app) => {
      const matchesSearch =
       app.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
       app.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
  }, [searchTerm, statusFilter, sortBy])

  const getStatusColor = (status:string) => {
    switch(status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Approved":
        return "bg-green-100 text-green-800"
      case "Rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status:string) => {
    switch(status) {
      case "Pending":
        return <Clock className = "size-4" />
      case "Approved":
        return <CheckCircle className = "size-4" />
      case "Rejected":
        return <XCircle className = "size-4" />
      default:
        return null
    }
  }

  const pendingCount = mockCarOwnerApplications.filter((a) => a.status === "Pending").length
  const approvedCount = mockCarOwnerApplications.filter((a) => a.status === "Approved").length
  const rejectedCount = mockCarOwnerApplications.filter((a) => a.status === "Rejected").length

  const renderDialogContent = (app: Application) => (
    <>
      {/* Personal Information */}
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Full Name</p>
              <p className="font-semibold text-foreground">{app.userName}</p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Email</p>
              <p className="font-semibold text-foreground">{app.userEmail}</p>
            </div>
          </div>
        </div>
        {/* Business Information */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">Business Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Business Name</p>
              <p className="font-semibold text-foreground">{app.businessName}</p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Business Phone</p>
              <p className="font-semibold text-foreground">{app.businessPhone}</p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Business Email</p>
              <p className="font-semibold text-foreground">{app.businessEmail}</p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Tax ID</p>
              <p className="font-semibold text-foreground">{app.taxId}</p>
            </div>
            <div className="md:col-span-2 bg-muted p-4 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Business Address</p>
              <p className="font-semibold text-foreground">{app.businessAddress}</p>
            </div>
          </div>
        </div>
        {/* Description */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">Business Description</h3>
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-foreground whitespace-pre-wrap">{app.description}</p>
          </div>
        </div>
        {/* Documents */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">Documents</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-border rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-2">Driving License</p>
              <div className="bg-muted rounded p-2 text-center text-sm text-muted-foreground">📄 License Document</div>
            </div>
            <div className="border border-border rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-2">Business License</p>
              <div className="bg-muted rounded p-2 text-center text-sm text-muted-foreground">📄 License Document</div>
            </div>
          </div>
        </div>
        {/* Status */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">Application Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Status</p>
              <div className="flex items-center gap-2">
                {getStatusIcon(app.status)}
                <p className="font-semibold text-foreground">{app.status}</p>
              </div>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Applied Date</p>
              <p className="font-semibold text-foreground">{new Date(app.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
          {app.reviewedAt && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Reviewed Date</p>
                <p className="font-semibold text-foreground">{new Date(app.reviewedAt).toLocaleDateString()}</p>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Reviewed By</p>
                <p className="font-semibold text-foreground">{app.reviewedBy}</p>
              </div>
              {app.adminNotes && (
                <div className="md:col-span-2 bg-muted p-4 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-2">Admin Notes</p>
                  <p className="text-foreground">{app.adminNotes}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <DialogFooter className="flex flex-col gap-2">
        {app.status === "Pending" && (
          <div className="flex flex-col sm:flex-row gap-2 w-full">
            <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white">Approve Application</Button>
            <Button className="flex-1 bg-red-600 hover:bg-red-700 text-white">Reject Application</Button>
          </div>
        )}
      </DialogFooter>
    </>
  )

  return(
    <div className = "flex-1 overflow-auto p-4">
      <div className = "mb-8">
        <h1 className = "text-3xl font-bold text-foreground mb-2">Car Owner Applications</h1>
        <p className = "text-muted-foreground">Review and manage car owner applications</p>
      </div>

      {/* metric cards */}
      <div className = "grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className = "p-6 bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800">
          <div className = "flex items-center justify-between">
            <div>
              <p className = "text-sm text-muted-foreground">Pending Reviews</p>
              <p className = "text-3xl font-bold text-yellow-600 dark:text-yello-400">{pendingCount}</p>
            </div>
            <Clock className = "size-8 text-yellow-600 dark:text-yellow-400"/>
          </div>
        </Card>

        <Card className = "p-6 bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
          <div className = "flex items-center justify-between">
            <div>
              <p className = "text-sm text-muted-foreground">Approved</p>
              <p className = "text-3xl font-bold text-green-600 dark:text-green-400">{approvedCount}</p>
            </div>
            <CheckCircle className = "size-8 text-green-600 dark:text-green-400"/>
          </div>
        </Card>

        <Card className = "p-6 bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800">
          <div className = "flex items-center justify-between">
            <div>
              <p className = "text-sm text-muted-foreground">Rejected</p>
              <p className = "text-3xl font-bold text-red-600 dark:text-red-400">{rejectedCount}</p>
            </div>
            <XCircle className = "size-8 text-red-600 dark:text-red-400"/>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className = "p-6 mb-8">
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
      </Card>

      {/* Applications Table */}
      <ApplicationsTable
        data={filteredApplications}
        renderDialogContent={renderDialogContent}
        getStatusColor={getStatusColor}
        getStatusIcon={getStatusIcon}
      />
    </div>
  )
}

export default AdminUserApplicationPage