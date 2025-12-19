import { Separator } from "@/components/ui/separator"
import { format } from "date-fns"

interface OrderSummaryProps {
  data: {
    carName: string;
    image: string;
    pricePerDay: number;
    startDate: Date;
    endDate: Date;
    totalDays: number;
    totalPrice: number;
    serviceFee: number;
    tax: number;
  }
}

export default function OrderSummary({ data }: OrderSummaryProps) {
  // Calculate final total locally for display
  const finalTotal = data.totalPrice + data.serviceFee + data.tax;

  return (
    <div className="sticky top-8 rounded-lg border border-border bg-card p-6 w-[400px]">
      <div className="flex items-center gap-2 mb-6">
        <h2 className="text-xl font-semibold text-foreground">Order summary</h2>
      </div>

      <div className="space-y-4">
          <div className="flex gap-4">
            <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-border bg-muted">
              <img 
                src={data.image || "/placeholder.svg"} 
                alt={data.carName} 
                className="h-full w-full object-cover" 
              />
            </div>
            <div className="flex flex-1 flex-col justify-between">
              <div>
                <h3 className="text-sm font-medium text-foreground">{data.carName}</h3>
                <p className="mt-0.5 text-xs text-muted-foreground">
                    {format(new Date(data.startDate), "MMM dd")} - {format(new Date(data.endDate), "MMM dd")}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{data.totalDays} Days</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">₱{data.totalPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
      </div>

      <Separator className="my-6 bg-border" />

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="text-foreground">₱{data.totalPrice.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Service Fee</span>
          <span className="text-foreground">₱{data.serviceFee.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Tax</span>
          <span className="text-foreground">₱{data.tax.toLocaleString()}</span>
        </div>
      </div>

      <Separator className="my-6 bg-border" />

      <div className="flex justify-between text-lg font-semibold">
        <span className="text-foreground">Total</span>
        <span className="text-foreground">₱{finalTotal.toLocaleString()}</span>
      </div>

    </div>
  )
}