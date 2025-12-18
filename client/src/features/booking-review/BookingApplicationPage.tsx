import { useState, useMemo, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog"
import { X, Search, Calendar, User, Car, FileText, CheckCircle, XCircle, Eye, ArrowLeft, Check } from "lucide-react"
import { calculateDays, formatDate, getStatusBadge } from "./utils/booking-review.utils"
import { useNavigate, useParams } from "react-router-dom"
import DetailsModal from "./components/details-modal";
import { getOwnerBookings, updateBookingStatus } from "./api/booking-review.api"
import type { Booking } from "./types/booking-review.types"
import BookingActionButtons from "./components/status-buttons"

const BookingApplication = () => {
  const [applications, setApplications] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    status: "all",
    car: "all",
  });
  const [selectedApplication, setSelectedApplication] = useState(null);
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();
  const currentOwnerId = userId;
  
  useEffect(() => {
    if(!currentOwnerId) return
    
    const fetchBookings = async () => {
      try {
        const data = await getOwnerBookings(currentOwnerId);
        setApplications(data);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [currentOwnerId]);

  const handleApprove = async (bookingId: string) => {
    try {
      await updateBookingStatus(bookingId, "Confirmed");
      setApplications((prev) =>
        prev.map((app) =>
          app._id === bookingId ? { ...app, status: "Confirmed" } : app
        )
      );
    } catch (error) {
      console.error("Failed to approve:", error);
    }
  };
  
  const handleCompleted = async(bookingId: string) => {
    try {
      await updateBookingStatus(bookingId, "Completed");
      setApplications((prev) =>
        prev.map((app) =>
          app._id === bookingId ? { ...app, status: "Completed" } : app
        )
      );
    } catch (error) {
      console.error("Failed to complete: ", error);
    }
  }

  const handleReject = async (bookingId: string) => {
    try {
      await updateBookingStatus(bookingId, "Cancelled");
      setApplications((prev) =>
        prev.map((app) =>
          app._id === bookingId ? { ...app, status: "Cancelled" } : app
        )
      );
    } catch (error) {
      console.error("Failed to reject:", error);
    }
  };

  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      // Get customer and car info from populated data
      const customer = typeof app.customerId === 'object' ? app.customerId : null;
      const car = typeof app.carId === 'object' ? app.carId : null;

      const customerName = customer?.fullName || '';
      const customerEmail = customer?.email || '';
      const carName = car?.name || '';

      const matchesSearch =
        customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        carName.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = filters.status === "all" || app.status === filters.status;
      const matchesCar = filters.car === "all" || carName === filters.car;
      return matchesSearch && matchesStatus && matchesCar;
    });
  }, [applications, searchTerm, filters]);
  
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }
  
  const clearFilters = () => {
    setSearchTerm("");
    setFilters({ status: "all", car: "all" });
  }
  
  const viewDetails = (application) => {
    setSelectedApplication(application);
  }
  
  const hasActiveFilters = searchTerm || Object.values(filters).some((v) => v !== "all")
  
  const uniqueCars = useMemo(() => {
    return [...new Set(applications.map((app) => {
      const car = typeof app.carId === 'object' ? app.carId : null;
      return car?.name || '';
    }).filter(Boolean))];
  }, [applications]);
  
  return(
    <div className = "flex-1 overflow-auto p-12">
      <Button
        variant="ghost"
        onClick={() => navigate("/")}
        className="mb-4 gap-2 hover:cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </Button>
      
      <div className = "mb-8">
        <h1 className = "text-3xl font-bold text-foreground mb-2">Car Rental Applications</h1>
        <p className = "text-muted-foreground">Review and manage rental requests for your vehicles</p>
      </div>
      
      {/* Filters Card */}
      <Card className = "p-6 mb-6">
        <div className = "space-y-3">
          <div className = "flex gap-2 flex-wrap items-end">
            <div className = "flex-1 min-w-[200px]">
              <Label className = "text-sm font-medium text-foreground mb-1 block">Search</Label>
              <div className = "relative">
                <Search className = "absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground size-4" />
                <Input 
                  placeholder="Search by customer or car..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className = "pl-10"
                />
              </div>
            </div>
            
            <div className = "min-w-[150px]">
              <Label className = "text-sm font-medium text-foreground mb-1 block">Status</Label>
              <Select
                value = {filters.status}
                onValueChange = {(e) => handleFilterChange("status", e)}
              >
                <SelectTrigger className = "w-full">
                  <SelectValue placeholder = "All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value = "all">All</SelectItem>
                  <SelectItem value = "Pending">Pending</SelectItem>
                  <SelectItem value = "Confirmed">Confirmed</SelectItem>
                  <SelectItem value = "Cancelled">Cancelled</SelectItem>
                  <SelectItem value = "Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className = "min-w-[200px]">
              <Label className = "text-sm font-medium text-foreground mb-1 block">Vehicle</Label>
              <Select
                value={filters.car}
                onValueChange = {(e) => handleFilterChange("car", e)}
              >
                <SelectTrigger className = "w-full">
                  <SelectValue placeholder = "All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value = "all">All Vehicles</SelectItem>
                  {uniqueCars.map((car) => (
                    <SelectItem key={car} value={car}>{car}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {hasActiveFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className = "gap-2 bg-transparent"
              >
                <X className = "size-4" />
                Clear Filters
              </Button>
            )}
          </div>
        </div>
      </Card>
      
      {/* Applications Grid */}
      <div className = "grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredApplications.map((application) => {
          const customer = typeof application.customerId === 'object' ? application.customerId : null;
          const car = typeof application.carId === 'object' ? application.carId : null;

          return (
            <Card key={application._id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <User className="size-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{customer?.fullName || 'Unknown'}</h3>
                      <p className="text-sm text-muted-foreground">{customer?.email || 'N/A'}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusBadge(application.status)}`}>
                    {application.status}
                  </span>
                </div>
                
                {/* Car Details */}
                <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                  <Car className="size-4 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{car?.name || 'Unknown'}</p>
                    <p className="text-xs text-muted-foreground">{car?.carDetails?.plateNumber || 'N/A'}</p>
                  </div>
                </div>

                {/* Booking Details */}
                <div className = "space-y-2">
                  <div className = "flex items-center gap-2 text-sm">
                    <Calendar className = "size-4 text-muted-foreground" />
                    <span className = "text-muted-foreground">Pickup:</span>
                    <span className = "font-medium">{formatDate(application.pickupDate.toString())}</span>
                  </div>

                  <div className = "flex items-center gap-2 text-sm">
                    <Calendar className = "size-4 text-muted-foreground" />
                    <span className = "text-muted-foreground">Return:</span>
                    <span className = "font-medium">{formatDate(application.returnDate.toString())}</span>
                  </div>

                  <div className = "flex items-center gap-2 text-sm">
                    <Calendar className = "size-4 text-muted-foreground" />
                    <span className = "text-muted-foreground">Duration:</span>
                    <span className = "font-medium">{calculateDays(application.pickupDate, application.returnDate)}</span>
                  </div>

                  <div className = "flex items-center gap-2 text-sm">
                    <Calendar className = "size-4 text-muted-foreground" />
                    <span className = "text-muted-foreground">Total Price:</span>
                    <span className = "font-medium">{application.totalPrice}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className = "flex gap-2 pt-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant = "outline"
                        size = "sm"
                        className = "flex-1"
                        onClick = {() => viewDetails(application)}
                      >
                        <Eye className = "size-4 mr-1" />
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className = "max-w-2xl">
                      <DetailsModal application={selectedApplication} />
                    </DialogContent>
                  </Dialog>
                  
                  <BookingActionButtons 
                    status={application.status}
                    bookingId={application._id!}
                    onApprove={handleApprove}
                    onReject={handleReject}
                    onComplete={handleCompleted}
                  />

                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {filteredApplications.length === 0 && (
        <Card className = "p-12">
          <div className = "text-center">
            <FileText className = "size-12 text-muted-foreground mx-auto mb-4" />
            <h3 className = "text-lg font-semibold text-foreground mb-2">No applications found</h3>
            <p className = "text-muted-foreground">
              {hasActiveFilters ? "Try adjusting your filters" : "No rental applications yet"}
            </p>
          </div>
        </Card>
      )}
    </div>
  )
}

export default BookingApplication