import { useState } from "react"
import { format } from "date-fns"
import type { DateRange } from "react-day-picker"

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
}

export function DateRangeModal({ onSearch, children }: DateRangeModalProps) {
  const [date, setDate] = useState<DateRange | undefined>()
  const [isOpen, setIsOpen] = useState(false)

  const handleSearch = () => {
    onSearch(date)
    setIsOpen(false)
  }

  // New: Handle Reset Action
  const handleReset = () => {
    setDate(undefined)   // 1. Clear local calendar state
    onSearch(undefined)  // 2. Clear parent state (reset fields)
    setIsOpen(false)     // 3. Close modal
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
            Choose your pickup and return dates to see available vehicles.
          </DialogDescription>
        </DialogHeader>
        
        {/* Input Fields */}
        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="pickup">Pickup Date</Label>
            <Input
              id="pickup"
              readOnly
              placeholder="Select date"
              // If date is undefined, this falls back to "" (empty)
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
              // If date is undefined, this falls back to "" (empty)
              value={date?.to ? format(date.to, "PPP") : ""}
              className="focus-visible:ring-0 cursor-pointer"
            />
          </div>
        </div>

        {/* Calendar */}
        <div className="flex justify-center border rounded-md p-2">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={1}
            disabled={(date) => date < new Date()} 
          />
        </div>

        <DialogFooter className="flex sm:justify-between gap-2">
           {/* New Reset Button */}
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