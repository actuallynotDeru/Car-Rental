import { useEffect, useState, useMemo } from "react"
import Header from "@/components/Header"
import RentalCard from "./components/rental-card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Calendar, Search, SlidersHorizontal, ChevronDown, Loader2 } from "lucide-react"

// Date handling imports
import { format } from "date-fns"
import type { DateRange } from "react-day-picker"
import { DateRangeModal } from "@/components/BookCalendar"

// Import your API and Types
import type { Car, Bookings } from "./types/product.types" 
import { getCarAllCars } from "./api/product.api" 
import { getBookings } from "./api/booking.api"

const categories = [
  { id: "suv", label: "SUV", count: 24 },
  { id: "sedan", label: "Sedan", count: 18 },
  { id: "hatchback", label: "Hatchback", count: 12 },
  { id: "luxury", label: "Luxury", count: 8 },
  { id: "sports", label: "Sports", count: 6 },
  { id: "van", label: "Van", count: 4 },
]

export default function RentalPage() {
  const [cars, setCars] = useState<Car[]>([])
  const [bookings, setBookings] = useState<Bookings[]>([])
  const [loading, setLoading] = useState(true)
  
  // State for the date range
  const [dateRange, setDateRange] = useState<DateRange | undefined>()

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true)
        const carData = await getCarAllCars()
        setCars(carData)
        
        // This now returns only "Confirmed" bookings due to the update in booking.api.ts
        const bookingData = await getBookings()
        setBookings(bookingData)
      } catch (error) {
        console.error("Failed to fetch data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCars()
  }, [])

// --- ROBUST FILTERING LOGIC ---
  const availableCars = useMemo(() => {
    // 1. Safety Check: If dates aren't selected, show all cars
    if (!dateRange?.from || !dateRange?.to) {
      return cars;
    }

    // 2. Normalize User Dates (Strip time to avoid timezone issues)
    const userStart = new Date(dateRange.from);
    userStart.setHours(0, 0, 0, 0);
    
    const userEnd = new Date(dateRange.to);
    userEnd.setHours(23, 59, 59, 999); // End of the selected day

    console.log("--- Filtering Start ---");
    console.log("User wants:", userStart.toISOString(), "to", userEnd.toISOString());

    return cars.filter((car) => {
      // 3. Robust ID Comparison (Convert both to strings to be safe)
      const carBookings = bookings.filter((b) => {
        // If carId is an object (populated), we might need to access ._id, 
        // but typically String() handles simple ID strings well.
        const bookingCarId = typeof b.carId === 'object' ? (b.carId as any)._id : b.carId;
        return String(bookingCarId) === String(car._id);
      });

      // 4. Check for Overlaps
      const hasConflict = carBookings.some((booking) => {
        // Parse database dates safely
        const bookingStart = new Date(booking.pickupDate);
        const bookingEnd = new Date(booking.returnDate);

        // Normalize database dates to start of day / end of day for fair comparison
        bookingStart.setHours(0, 0, 0, 0);
        bookingEnd.setHours(23, 59, 59, 999);

        // LOGGING: Check these in your console if it still fails!
        // console.log(`Checking Car: ${car.name}`);
        // console.log(`Booking: ${bookingStart.toISOString()} - ${bookingEnd.toISOString()}`);

        // THE OVERLAP FORMULA:
        // (StartA <= EndB) AND (EndA >= StartB)
        const isOverlapping = userStart <= bookingEnd && userEnd >= bookingStart;
        
        if (isOverlapping) {
            console.log(`🚫 Conflict found for ${car.name} on dates ${booking.pickupDate}`);
        }
        
        return isOverlapping;
      });

      // Return true if NO conflict (keep the car)
      return !hasConflict;
    });
  }, [cars, bookings, dateRange]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-6 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight text-balance">
              Find Your Perfect Ride
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Browse our premium fleet and discover the ideal vehicle for your journey. Transparent pricing, no hidden
              fees.
            </p>

            {/* Search Bar */}
            <div className="mt-10 bg-card border border-border rounded-2xl p-2 shadow-sm max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                
                <div className="flex-1">
                  <DateRangeModal onSearch={setDateRange}>
                    <div className="flex items-center gap-3 px-4 py-3 bg-muted rounded-xl hover:bg-muted/80 transition-colors h-full cursor-pointer">
                      <Calendar size={20} className="text-muted-foreground shrink-0" />
                      <div className="text-left">
                        <p className="text-xs text-muted-foreground">Pick-up Date</p>
                        <p className="text-sm font-medium text-foreground">
                          {dateRange?.from ? (
                            <>
                              {format(dateRange.from, "LLL dd")} 
                              {dateRange.to && ` - ${format(dateRange.to, "LLL dd")}`}
                            </>
                          ) : (
                            "Select Dates"
                          )}
                        </p>
                      </div>
                      <ChevronDown size={16} className="text-muted-foreground ml-auto" />
                    </div>
                  </DateRangeModal>
                </div>

                <Button size="lg" className="rounded-xl px-8 bg-blue-400 mt-3 sm:mt-0">
                  <Search size={18} className="mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-6 pb-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-72 shrink-0 space-y-6">
            {/* Categories */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Categories</h2>
              <div className="space-y-3">
                {categories.map((category) => (
                  <label key={category.id} className="flex items-center gap-3 cursor-pointer group">
                    <Checkbox
                      id={category.id}
                      className="border-border data-[state=checked]:bg-foreground data-[state=checked]:border-foreground"
                    />
                    <span className="flex-1 text-sm text-foreground group-hover:text-muted-foreground transition-colors">
                      {category.label}
                    </span>
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                      {category.count}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Filters */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Filters</h2>

              {/* Fuel Type */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-foreground mb-3">Fuel Type</h3>
                <div className="space-y-2.5">
                  {["Electric", "Gasoline", "Hybrid", "Diesel"].map((fuel) => (
                    <label key={fuel} className="flex items-center gap-3 cursor-pointer">
                      <Checkbox className="border-border data-[state=checked]:bg-foreground data-[state=checked]:border-foreground" />
                      <span className="text-sm text-muted-foreground">{fuel}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-foreground mb-3">Price Range</h3>
                <div className="space-y-2.5">
                  {["₱0 - ₱1,500", "₱1,500 - ₱2,500", "₱2,500 - ₱3,500", "₱3,500+"].map((price) => (
                    <label key={price} className="flex items-center gap-3 cursor-pointer">
                      <Checkbox className="border-border data-[state=checked]:bg-foreground data-[state=checked]:border-foreground" />
                      <span className="text-sm text-muted-foreground">{price}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Transmission */}
              <div>
                <h3 className="text-sm font-medium text-foreground mb-3">Transmission</h3>
                <div className="space-y-2.5">
                  {["Automatic", "Manual"].map((trans) => (
                    <label key={trans} className="flex items-center gap-3 cursor-pointer">
                      <Checkbox className="border-border data-[state=checked]:bg-foreground data-[state=checked]:border-foreground" />
                      <span className="text-sm text-muted-foreground">{trans}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Fleet Grid */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Our Fleet</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {/* Dynamic Count based on Filter */}
                  {dateRange?.from && dateRange?.to 
                     ? `Showing ${availableCars.length} available vehicles`
                     : `Showing ${cars.length} vehicles`
                   }
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative flex-1 sm:w-64">
                  <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Search vehicles..." className="pl-10 bg-card border-border rounded-xl" />
                </div>
                <Button variant="outline" size="icon" className="rounded-xl shrink-0 bg-transparent">
                  <SlidersHorizontal size={18} />
                </Button>
              </div>
            </div>

            {/* Grid */}
            {loading ? (
               <div className="flex justify-center items-center h-64">
                  <Loader2 className="animate-spin text-blue-400" size={48} />
               </div>
            ) : (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {/* Check if availableCars has items, otherwise show "No cars" message */}
                {availableCars.length > 0 ? (
                  availableCars.map((car) => (
                    <RentalCard
                      key={car._id}
                      car={car} 
                    />
                  ))
                ) : (
                  <div className="col-span-full flex flex-col items-center justify-center py-12 text-muted-foreground">
                    <p>No cars available for these specific dates.</p>
                    <Button 
                      variant="link" 
                      onClick={() => setDateRange(undefined)}
                      className="mt-2 text-blue-400"
                    >
                      Clear Dates
                    </Button>
                  </div>
                )}
              </div>
            )}
            
            {/* Load More - Only show if we have results */}
            {!loading && availableCars.length > 0 && (
              <div className="flex justify-center mt-12">
                <Button variant="outline" size="lg" className="rounded-full px-8 bg-transparent">
                  Load More Vehicles
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}