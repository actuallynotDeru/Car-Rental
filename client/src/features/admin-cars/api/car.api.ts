import { API_BASE_URL } from "@/config/apiURL";
import type { Car } from "../types/cars.types";
import axios from "axios";

export async function getCars(): Promise<Car[]> {
  try {
    const res = await axios.get(`${API_BASE_URL}/cars`, {
      headers: { Accept: 'application/json' },
    });
    
    let cars: Car[] = [];
    
    if(Array.isArray(res.data)) {
      cars = res.data;
    } else if(res.data && Array.isArray(res.data.data)) {
      cars = res.data.data;
    }
    
    return cars.map(car => ({
      ...car,
      id: car.id
    }))
  } catch(error) {
    console.error("Error fetching cars: ", error);
    throw new Error("Failed to fetch cars");
  }
}