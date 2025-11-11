import { mockCars, mockUsers } from "@/lib/mock-data"

export const getCarName = (carId: string) => {
    return mockCars.find((u) => u.id === carId)?.name || "Unknown"
}

export const getCustomerName = (customerId: string) => {
    return mockUsers.find((u) => u.id === customerId)?.fullName || "Unknown"
}