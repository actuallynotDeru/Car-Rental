import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Check } from "lucide-react"

type BookingStatus = "Pending" | "Confirmed" | "Cancelled" | "Completed"

interface BookingActionButtonsProps {
  status: BookingStatus
  bookingId: string
  onApprove: (id: string) => void
  onReject: (id: string) => void
  onComplete: (id: string) => void
}

const BookingActionButtons = ({
  status,
  bookingId,
  onApprove,
  onReject,
  onComplete,
}: BookingActionButtonsProps) => {
  if (status === "Pending") {
    return (
      <>
        <Button
          size="sm"
          className="flex-1 bg-green-600 hover:bg-green-700"
          onClick={() => onApprove(bookingId)}
        >
          <CheckCircle className="size-4 mr-1" />
          Approve
        </Button>

        <Button
          size="sm"
          className="flex-1 bg-red-600 hover:bg-red-700"
          onClick={() => onReject(bookingId)}
        >
          <XCircle className="size-4 mr-1" />
          Reject
        </Button>
      </>
    )
  }

  if (status === "Confirmed") {
    return (
      <Button
        size="sm"
        className="flex-1 bg-blue-600 hover:bg-blue-700"
        onClick={() => onComplete(bookingId)}
      >
        <Check className="size-4 mr-1" />
        Completed
      </Button>
    )
  }

  return null
}

export default BookingActionButtons
