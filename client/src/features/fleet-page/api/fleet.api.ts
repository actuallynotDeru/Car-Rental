import { API_BASE_URL } from "@/config/apiURL";
import axios from "axios";
import type { Car, CreateCarRequest, UpdateCarRequest } from "../types/fleet.types";

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

  // Create a new car with file upload
  createCar: async (carData: CreateCarRequest): Promise<Car> => {
    try {
      const formData = new FormData();
      
      console.log("Creating car with data:", carData);
      console.log("carType value:", carData.carDetails.carType);
      
      formData.append("ownerId", carData.ownerId);
      formData.append("name", carData.name);
      formData.append("price", carData.price.toString());
      formData.append("carType", carData.carDetails.carType || "Sedan");
      formData.append("seats", carData.carDetails.seats.toString());
      formData.append("transmission", carData.carDetails.transmission);
      formData.append("fuelType", carData.carDetails.fuelType);
      formData.append("plateNumber", carData.carDetails.plateNumber);
      formData.append("status", carData.status);
      formData.append("rating", (carData.rating || 5.0).toString());
      if (carData.description) formData.append("description", carData.description);
      if (carData.location) formData.append("location", carData.location);
      
      if (carData.image) {
        formData.append("images", carData.image);
      }
      
      const res = await axios.post(`${API_BASE_URL}/cars`, formData, {
        headers: { 
          'Content-Type': 'multipart/form-data',
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

  // Update car details with optional file upload
  updateCar: async (carId: string, carData: UpdateCarRequest): Promise<Car> => {
    try {
      const formData = new FormData();
      
      if (carData.name) formData.append("name", carData.name);
      if (carData.price !== undefined) formData.append("price", carData.price.toString());
      if (carData.carDetails) {
        formData.append("carType", carData.carDetails.carType);
        formData.append("seats", carData.carDetails.seats.toString());
        formData.append("transmission", carData.carDetails.transmission);
        formData.append("fuelType", carData.carDetails.fuelType);
        formData.append("plateNumber", carData.carDetails.plateNumber);
      }
      if (carData.status) formData.append("status", carData.status);
      if (carData.description !== undefined) formData.append("description", carData.description);
      if (carData.location !== undefined) formData.append("location", carData.location);
      
      if (carData.image) {
        formData.append("images", carData.image);
      }
      
      const res = await axios.put(`${API_BASE_URL}/cars/${carId}`, formData, {
        headers: { 
          'Content-Type': 'multipart/form-data',
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