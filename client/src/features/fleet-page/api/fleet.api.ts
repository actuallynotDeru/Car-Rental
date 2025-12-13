// client/src/features/fleet-page/api/fleet.api.ts
import { API_BASE_URL } from "@/config/apiURL";
import axios from "axios";
import type { Car } from "../types/fleet.types";

export const FleetAPI = {
  // Get all cars owned by a specific user
  getCarsByOwner: async (ownerId: string): Promise<Car[]> => {
    try {
      const res = await axios.get(`${API_BASE_URL}/cars`, {
        headers: { Accept: 'application/json' },
      });
      
      let cars: Car[] = [];
      
      if (Array.isArray(res.data)) {
        cars = res.data;
      } else if (res.data && Array.isArray(res.data.data)) {
        cars = res.data.data;
      }
      
      // Filter cars by ownerId
      const ownerCars = cars.filter(car => {
        const carOwnerId = typeof car.ownerId === 'string' 
          ? car.ownerId 
          : car.ownerId?._id || car.ownerId?._id;
        return carOwnerId === ownerId;
      });
      
      return ownerCars.map(car => ({
        ...car,
        id: car._id || car._id,
        ownerId: typeof car.ownerId === 'string' 
          ? car.ownerId 
          : car.ownerId?._id || car.ownerId?.id
      }));
    } catch (error) {
      console.error("Error fetching owner cars: ", error);
      throw new Error("Failed to fetch fleet");
    }
  },

  // Create a new car
  createCar: async (carData: Partial<Car>): Promise<Car> => {
    try {
      const res = await axios.post(`${API_BASE_URL}/cars`, carData, {
        headers: { 
          'Content-Type': 'application/json',
          Accept: 'application/json' 
        },
      });
      
      return {
        ...res.data,
        id: res.data.id || res.data._id
      };
    } catch (error) {
      console.error("Error creating car: ", error);
      throw new Error("Failed to create car");
    }
  },

  // Update car details
  updateCar: async (carId: string, carData: Partial<Car>): Promise<Car> => {
    try {
      const res = await axios.put(`${API_BASE_URL}/cars/${carId}`, carData, {
        headers: { 
          'Content-Type': 'application/json',
          Accept: 'application/json' 
        },
      });
      
      return {
        ...res.data,
        id: res.data.id || res.data._id
      };
    } catch (error) {
      console.error("Error updating car: ", error);
      throw new Error("Failed to update car");
    }
  },

  // Delete a car
  deleteCar: async (carId: string): Promise<void> => {
    try {
      await axios.delete(`${API_BASE_URL}/cars/${carId}`);
    } catch (error) {
      console.error("Error deleting car: ", error);
      throw new Error("Failed to delete car");
    }
  }
};