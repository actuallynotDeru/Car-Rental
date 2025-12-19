import { useState, useEffect } from "react";
import Header from "@/components/Header";
import ProfileContainer from "./components/profile-container";
import PreviouslyBooked from "./components/PreviouslyBooked-Container";
import { motion } from "framer-motion";
import { ProfileAnimations } from "./animations/profile.animations";
import { useNavigate } from "react-router-dom";
import { ProfileAPI } from "./api/profile.api";
import type { User, BookingWithDetails } from "./types/profile.types";

interface LocalUserData {
  _id: string;
  role: string;
}

const ProfilePage = () => {
  const [localUser, setLocalUser] = useState<LocalUserData | null>(null);
  const [userData, setUserData] = useState<User | null>(null);
  const [bookings, setBookings] = useState<BookingWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const navigate = useNavigate();

  // Check auth from localStorage
  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const parsedUser = JSON.parse(userStr);
        setLocalUser(parsedUser);
      } catch (err) {
        console.error("Error parsing user data: ", err);
      }
    }
    setAuthChecked(true);
  }, []);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authChecked) return;

    if (!localUser) navigate("/");
  }, [authChecked, localUser, navigate]);

  // Fetch user data and bookings
  useEffect(() => {
    const fetchProfileData = async () => {
      if (!localUser?._id) return;

      try {
        setLoading(true);
        setError(null);

        const [userDataRes, bookingsRes] = await Promise.all([
          ProfileAPI.getUserById(localUser._id),
          ProfileAPI.getBookingsByCustomer(localUser._id),
        ]);

        setUserData(userDataRes);
        setBookings(bookingsRes);
      } catch (err) {
        setError("Failed to load profile data. Please try again.");
        console.error("Error fetching profile data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (authChecked && localUser) {
      fetchProfileData();
    }
  }, [authChecked, localUser]);

  // Format join date
  const formatJoinDate = (dateString: string | undefined): string => {
    if (!dateString) return "Unknown";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <>
      <motion.div
        variants={ProfileAnimations.container}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={ProfileAnimations.header}
          initial="hidden"
          animate="visible"
        >
          <Header />
        </motion.div>

        <div className="w-full flex flex-row">
          <ProfileContainer
            name={userData?.fullName || "User"}
            location={userData?.city || "Unknown"}
            joined={formatJoinDate(userData?.dateJoined)}
            isIdentityVerified={userData?.status === "Verified"}
            isEmailVerified={!!userData?.email}
            isPhoneVerified={!!userData?.phone}
            selfiePhoto={userData?.selfiePhoto || null}
          />

          <div className="w-full flex flex-col mr-10">
            <PreviouslyBooked bookings={bookings} />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default ProfilePage;