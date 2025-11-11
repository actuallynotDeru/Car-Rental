import { Clock, CheckCircle, XCircle } from "lucide-react"

export const getStatusColor = (status:string) => {
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

export const getStatusIcon = (status:string) => {
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