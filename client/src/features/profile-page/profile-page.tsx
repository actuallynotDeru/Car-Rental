import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { User, Mail, Phone, MapPin, Calendar, Shield, ArrowLeft, Info} from "lucide-react";
import { ProfileAPI } from "./api/profile.api";
import type { UserProfile } from "./types/profile.types";

const ProfilePage = () => {
  const { userId } = useParams<{ userId: string }>();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId) {
        setError("User ID is required");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await ProfileAPI.getUserById(userId);
        setProfile(data);
        setError(null);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch user profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  const handleUpdate = async (updatedData: Partial<UserProfile>) => {
    if (!userId) return;

    try {
      const updated = await ProfileAPI.updateUser(userId, updatedData);
      setProfile(updated);
      setIsEditing(false);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update profile");
    }
  };

  if (loading) {
    return (
      <div className="p-16 space-y-6">
        <Skeleton className="h-12 w-64" />
        <Card className="p-6 space-y-4">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-16">
        <Card className="p-12 text-center">
          <p className="text-destructive">{error}</p>
        </Card>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="p-16">
      <Button
        variant="ghost"
        onClick={() => navigate("/")}
        className="mb-4 gap-2 hover:cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </Button>
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">User Profile</h1>
        <p className="">View and manage user information</p>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          {/* Personal Information */}
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <User className="size-5" />
              Personal Information
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label className = "text-lg font-semibold">Full Name</Label>
                <div className="flex items-center gap-2 mt-1">
                  <User className="size-4" />
                  <p className="text-foreground">{profile.fullName}</p>
                </div>
              </div>

              <div>
                <Label className = "text-lg font-semibold">Email</Label>
                <div className="flex items-center gap-2 mt-1">
                  <Mail className="size-4 " />
                  <p className="text-foreground">{profile.email}</p>
                </div>
              </div>

              <div>
                <Label className = "text-lg font-semibold">Phone Number</Label>
                <div className="flex items-center gap-2 mt-1">
                  <Phone className="size-4 " />
                  <p className="text-foreground">{profile.phone}</p>
                </div>
              </div>

              <div>
                <Label className = "text-lg font-semibold">Role</Label>
                <div className="flex items-center gap-2 mt-1">
                  <Shield className="size-4 " />
                  <p className="text-foreground capitalize">{profile.role}</p>
                </div>
              </div>

              {profile.dateOfBirth && (
                <div>
                  <Label className = "text-lg font-semibold">Date of Birth</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar className="size-4 " />
                    <p className="text-foreground">
                      {new Date(profile.dateOfBirth).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Address Information */}
          {(profile.fullAddress || profile.city || profile.province || profile.zip) && (
            <div className="border-t pt-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <MapPin className="size-5" />
                Address Information
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {profile.fullAddress && (
                  <div>
                    <Label className = "text-lg font-semibold">Address</Label>
                    <p className="text-foreground mt-1">{profile.fullAddress}</p>
                  </div>
                )}

                {profile.city && (
                  <div>
                    <Label className = "text-lg font-semibold">City</Label>
                    <p className="text-foreground mt-1">{profile.city}</p>
                  </div>
                )}

                {profile.province && (
                  <div>
                    <Label className = "text-lg font-semibold">State</Label>
                    <p className="text-foreground mt-1">{profile.province}</p>
                  </div>
                )}

                {profile.zip && (
                  <div>
                    <Label className = "text-lg font-semibold">Zip Code</Label>
                    <p className="text-foreground mt-1">{profile.zip}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Account Information */}
          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Info className="size-5" />
              Account Information
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label className = "text-lg font-semibold">Account Created</Label>
                <p className="text-foreground mt-1">
                  {new Date(profile.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div>
                <Label className = "text-lg font-semibold">Last Updated</Label>
                <p className="text-foreground mt-1">
                  {new Date(profile.updatedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="border-t pt-6 flex gap-2">
            <Button onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? "Cancel" : "Edit Profile"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProfilePage;