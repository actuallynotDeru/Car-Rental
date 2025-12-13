import { DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { getStatusBadge, formatDate, calculateDays } from "../utils/booking-review.utils";
import type { Booking, User, Car } from "../types/booking-review.types";
import { API_BASE_URL } from "@/config/apiURL";

interface DetailsModalProps {
  application: Booking | null;
}

const DetailsModal = ({ application }: DetailsModalProps) => {
  if (!application) return null;

  // Extract populated data
  const customer = typeof application.customerId === 'object' 
    ? application.customerId as User 
    : null;
  
  const car = typeof application.carId === 'object' 
    ? application.carId as Car 
    : null;

  const handleViewImage = (imagePath: string | undefined) => {
    if (!imagePath) return;
    window.open(`${API_BASE_URL}${imagePath}`, '_blank');
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Application Details</DialogTitle>
        <DialogDescription>Complete information about this rental application</DialogDescription>
      </DialogHeader>
      
      <div className="space-y-4 py-4">
        {/* Customer Information */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-sm text-muted-foreground mb-1">Customer Name</h4>
            <p className="text-foreground">{customer?.fullName || 'Unknown'}</p>
          </div>
          
          <div>
            <h4 className="font-semibold text-sm text-muted-foreground mb-1">Email</h4>
            <p className="text-foreground">{customer?.email || 'N/A'}</p>
          </div>
          
          <div>
            <h4 className="font-semibold text-sm text-muted-foreground mb-1">Phone</h4>
            <p className="text-foreground">{customer?.phone || 'N/A'}</p>
          </div>
          
          <div>
            <h4 className="font-semibold text-sm text-muted-foreground mb-1">Status</h4>
            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusBadge(application.status)}`}>
              {application.status}
            </span>
          </div>
        </div>
        
        {/* Vehicle Information */}
        <div className="border-t pt-4">
          <h4 className="font-semibold text-sm text-muted-foreground mb-2">Vehicle Information</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Car Name</p>
              <p className="text-foreground font-medium">{car?.name || 'Unknown'}</p>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground">Plate Number</p>
              <p className="text-foreground font-medium">{car?.carDetails?.plateNumber || 'N/A'}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Transmission</p>
              <p className="text-foreground font-medium">{car?.carDetails?.transmission || 'N/A'}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Seats</p>
              <p className="text-foreground font-medium">{car?.carDetails?.seats || 'N/A'}</p>
            </div>
          </div>
        </div>
        
        {/* Booking Details */}
        <div className="border-t pt-4">
          <h4 className="font-semibold text-sm text-muted-foreground mb-2">Booking Details</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Pickup Date</p>
              <p className="text-foreground font-medium">{formatDate(application.pickupDate)}</p>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground">Return Date</p>
              <p className="text-foreground font-medium">{formatDate(application.returnDate)}</p>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground">Duration</p>
              <p className="text-foreground font-medium">{calculateDays(application.pickupDate, application.returnDate)} days</p>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground">Total Price</p>
              <p className="text-foreground font-medium text-green-600">₱{application.totalPrice?.toLocaleString()}</p>
            </div>
          </div>
        </div>
        
        {/* Documents */}
        <div className="border-t pt-4">
          <h4 className="font-semibold text-sm text-muted-foreground mb-2">Documents</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Payment Proof</p>
              {application.paymentProof ? (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => handleViewImage(application.paymentProof)}
                >
                  View Payment Proof
                </Button>
              ) : (
                <p className="text-xs text-muted-foreground italic">No payment proof uploaded</p>
              )}
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground mb-2">ID Photo</p>
              {application.idPhoto ? (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => handleViewImage(application.idPhoto)}
                >
                  View ID Photo
                </Button>
              ) : (
                <p className="text-xs text-muted-foreground italic">No ID photo uploaded</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailsModal;