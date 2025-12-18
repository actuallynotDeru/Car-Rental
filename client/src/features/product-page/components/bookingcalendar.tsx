import { useState } from "react"
import { format } from "date-fns"
// Import Matcher for strict typing if needed, but DateRange works for ranges
import type { DateRange, Matcher } from "react-day-picker" 

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface DateRangeModalProps {
  onSearch: (date: DateRange | undefined) => void
  children?: React.ReactNode
  // New Prop: Array of ranges to disable
  bookedDates?: DateRange[] 
}

export default function DateRangeModal({ onSearch, children, bookedDates = [] }: DateRangeModalProps) {
  const [date, setDate] = useState<DateRange | undefined>()
  const [isOpen, setIsOpen] = useState(false)

  const handleSearch = () => {
    onSearch(date)
    setIsOpen(false)
  }

  const handleReset = () => {
    setDate(undefined)
    onSearch(undefined)
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="cursor-pointer w-full">
            {children || <Button variant="outline">Open Calendar</Button>}
        </div>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Select Rental Dates</DialogTitle>
          <DialogDescription>
            Dates crossed out are already booked.
          </DialogDescription>
        </DialogHeader>
        
        {/* Inputs (Same as before) */}
        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="pickup">Pickup Date</Label>
            <Input
              id="pickup"
              readOnly
              placeholder="Select date"
              value={date?.from ? format(date.from, "PPP") : ""}
              className="focus-visible:ring-0 cursor-pointer"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="return">Return Date</Label>
            <Input
              id="return"
              readOnly
              placeholder="Select date"
              value={date?.to ? format(date.to, "PPP") : ""}
              className="focus-visible:ring-0 cursor-pointer"
            />
          </div>
        </div>

        <div className="flex justify-center border rounded-md p-2">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={1}
            // UPDATE: Disable past dates AND booked ranges
            disabled={[
              { before: new Date() }, // Disable past dates
              ...bookedDates          // Disable API bookings
            ]}
          />
        </div>

        <DialogFooter className="flex sm:justify-between gap-2">
           <Button variant="ghost" onClick={handleReset}>
            Reset
          </Button>
          <Button type="submit" onClick={handleSearch} disabled={!date?.from || !date?.to}>
            Search Availability
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}