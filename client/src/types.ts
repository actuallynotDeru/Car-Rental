export interface CarDetails {
    seats: number
    transmission: string
    fuelType: string
    plateNumber: string
}

export interface Car {
    id: string
    name: string
    carDetails: CarDetails
    price: number
    rating: number
    status: string
}