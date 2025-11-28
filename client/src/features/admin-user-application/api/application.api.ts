import { API_BASE_URL } from "@/config/apiURL";
import axios from "axios";
import type { Application } from "../types/application.types";

export async function getApplications(): Promise<Application[]> {
  try {
    const res = await axios.get(`${API_BASE_URL}/car-owner-applications`, {
      headers: { Accept: 'applications/json' },
    });
    
    let applications: Application[] = [];
    
    if(Array.isArray(res.data)) {
      applications = res.data;
    } else if(res.data && Array.isArray(res.data.data)) {
      applications = res.data.data;
    }
    
    return applications.map(application => ({
      ...application,
      id: application.id || application._id,
      
      userId: {
        ...application.userId,
        id: application.userId.id || application.userId._id
      },
    })) 
  } catch(error) {
    console.error("Error fetching applications: ", error);
    throw new Error("Failed to fetch applicaitons");
  }
}