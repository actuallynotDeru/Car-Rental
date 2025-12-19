import { API_BASE_URL } from "@/config/apiURL";
import axios from "axios";
import type { User, BookingWithDetails } from "../types/profile.types";

export const ProfileAPI = {
  // Get user by ID
  getUserById: async (userId: string): Promise<User> => {
    try {
      const res = await axios.get(`${API_BASE_URL}/users/${userId}`, {
        headers: { Accept: "application/json" },
      });

      return res.data;
    } catch (error) {
      console.error("Error fetching user: ", error);
      throw new Error("Failed to fetch user data");
    }
  },

  // Get bookings by customer ID
  getBookingsByCustomer: async (customerId: string): Promise<BookingWithDetails[]> => {
    try {
      const res = await axios.get(`${API_BASE_URL}/bookings`, {
        headers: { Accept: "application/json" },
      });

      let bookings: BookingWithDetails[] = [];

      if (Array.isArray(res.data)) {
        bookings = res.data;
      } else if (res.data && Array.isArray(res.data.data)) {
        bookings = res.data.data;
      }

      // Filter bookings by customerId
      const customerBookings = bookings.filter((booking) => {
        const bookingCustomerId =
          typeof booking.customerId === "string"
            ? booking.customerId
            : booking.customerId?._id;
        return bookingCustomerId === customerId;
      });

      return customerBookings;
    } catch (error) {
      console.error("Error fetching bookings: ", error);
      throw new Error("Failed to fetch bookings");
    }
  },

  // Update user profile
  updateUser: async (userId: string, userData: Partial<User>): Promise<User> => {
    try {
      const res = await axios.put(`${API_BASE_URL}/users/${userId}`, userData, {
        headers: { Accept: "application/json" },
      });

      return res.data;
    } catch (error) {
      console.error("Error updating user: ", error);
      throw new Error("Failed to update user");
    }
  },

  // Update user with profile photo
  updateUserWithPhoto: async (userId: string, formData: FormData): Promise<User> => {
    try {
      const res = await axios.put(`${API_BASE_URL}/users/${userId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      });

      return res.data;
    } catch (error) {
      console.error("Error updating user with photo: ", error);
      throw new Error("Failed to update user profile");
    }
  },
};
