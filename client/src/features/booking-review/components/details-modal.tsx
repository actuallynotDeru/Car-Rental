import { DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { getStatusBadge, formatDate, calculateDays } from "../utils/booking-review.utils";

export interface Application {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  carId: string;
  carName: string;
  carPlate: string;
  pickupDate: string;
  returnDate: string;
  totalPrice: number;
  paymentProof: string;
  idPhoto: string;
  status: string;
  createdAt: string;
}

interface DetailsModalProps {
  application: Application | null;
}

const DetailsModal = ({ application }: DetailsModalProps) => {
  if (!application) return null;

  return (
    <>
      <DialogHeader>
        <DialogTitle>Application Details</DialogTitle>
        <DialogDescription>Complete information about this rental application</DialogDescription>
      </DialogHeader>
      
      <div className="space-y-4 py-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-sm text-muted-foreground mb-1">Customer Name</h4>
            <p className="text-foreground">{application.customerName}</p>
          </div>
          
          <div>
            <h4 className="font-semibold text-sm text-muted-foreground mb-1">Email</h4>
            <p className="text-foreground">{application.customerEmail}</p>
          </div>
          
          <div>
            <h4 className="font-semibold text-sm text-muted-foreground mb-1">Phone</h4>
            <p className="text-foreground">{application.customerPhone}</p>
          </div>
          
          <div>
            <h4 className="font-semibold text-sm text-muted-foreground mb-1">Status</h4>
            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusBadge(application.status)}`}>
              {application.status}
            </span>
          </div>
        </div>
        
        <div className="border-t pt-4">
          <h4 className="font-semibold text-sm text-muted-foreground mb-2">Vehicle Information</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Car Name</p>
              <p className="text-foreground font-medium">{application.carName}</p>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground">Plate Number</p>
              <p className="text-foreground font-medium">{application.carPlate}</p>
            </div>
          </div>
        </div>
        
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
              <p className="text-foreground font-medium">${application.totalPrice}</p>
            </div>
          </div>
        </div>
        
        <div className="border-t pt-4">
          <h4 className="font-semibold text-sm text-muted-foreground mb-2">Documents</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Payment Proof</p>
              <Button variant="outline" size="sm" className="w-full">
                View Payment Proof
              </Button>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground mb-2">ID Photo</p>
              <Button variant="outline" size="sm" className="w-full">
                View ID Photo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailsModal;