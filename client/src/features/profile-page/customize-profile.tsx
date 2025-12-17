import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { User, ArrowLeft, Camera } from "lucide-react";
import { ProfileAPI } from "./api/profile.api";
import type { UserProfile } from "./types/profile.types";
import { SERVER_BASE_URL } from "@/config/serverURL";

const CustomizeProfile = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [formData, setFormData] = useState<Partial<UserProfile>>({});
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId) return;
      try {
        setLoading(true);
        const data = await ProfileAPI.getUserById(userId);
        setProfile(data);
        setFormData(data); // source of truth
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl(null);
      return;
    }

    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [selectedFile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleCancel = () => {
    if (!profile) return;
    setFormData(profile);
    setSelectedFile(null);
    setPreviewUrl(null);
    setIsEditing(false);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEditing || !userId) return;

    try {
      setSaving(true);
      setError(null);

      const data = new FormData();
      data.append("fullName", formData.fullName ?? "");
      data.append("phone", formData.phone ?? "");
      data.append("city", formData.city ?? "");
      data.append("zip", formData.zip ?? "");

      if (selectedFile) {
        data.append("selfiePhoto", selectedFile);
      }

      const updated = await ProfileAPI.updateUser(userId, data);
      setProfile(updated);
      setFormData(updated);
      setIsEditing(false);
      setSelectedFile(null);
      setPreviewUrl(null);
    } catch (err: any) {
      setError(err.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-16 space-y-6">
        <Skeleton className="h-12 w-64" />
        <Card className="p-6 space-y-4">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
        </Card>
      </div>
    );
  }

  if (!profile) return null;

  const imageSrc = previewUrl || profile.selfiePhoto || "";

  return (
    <div className="p-16">
      <Button
        variant="ghost"
        onClick={() => navigate("/")}
        className="mb-4 gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </Button>

      <h1 className="text-3xl font-bold mb-8">Edit Account</h1>

      {isEditing ? (
        // EDIT MODE
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <Card className="p-6 space-y-8 ring-2 ring-primary">
            {/* Profile Photo */}
            <div className="flex flex-col items-center gap-4 border-b pb-6">
              <div className="relative size-32 rounded-full border bg-muted overflow-hidden flex items-center justify-center">
                {imageSrc ? (
                  <img src={imageSrc} className="size-full object-cover" />
                ) : (
                  <User className="size-12 text-muted-foreground" />
                )}

                <label className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer">
                  <Camera className="text-white" />
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </label>
              </div>

              {selectedFile && (
                <p className="text-sm text-blue-500">
                  New photo selected: {selectedFile.name}
                </p>
              )}
            </div>

            {/* Error */}
            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}

            {/* Form Fields */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input
                  name="fullName"
                  value={formData.fullName ?? ""}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label>Phone Number</Label>
                <Input
                  name="phone"
                  value={formData.phone ?? ""}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label>City</Label>
                <Input
                  name="city"
                  value={formData.city ?? ""}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label>Zip Code</Label>
                <Input
                  name="zip"
                  value={formData.zip ?? ""}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Save/Cancel Buttons */}
            <div className="flex gap-4 pt-4">
              <Button type="submit" disabled={saving}>
                {saving ? "Saving..." : "Save Changes"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </div>
          </Card>
        </form>
      ) : (
        // VIEW MODE
        <>
          {/* Error Display in View Mode */}
          {error && (
            <p className="text-sm text-red-500 mb-4 text-center">{error}</p>
          )}

          <Card className="p-6 space-y-8">
            {/* Profile Photo */}
            <div className="flex flex-col items-center gap-4 border-b pb-6">
              <div className="relative size-32 rounded-full border bg-muted overflow-hidden flex items-center justify-center">
                {profile.selfiePhoto ? (
                  <img src={`${SERVER_BASE_URL}${profile.selfiePhoto}`} className="size-full object-cover" />
                ) : (
                  <User className="size-12 text-muted-foreground" />
                )}
              </div>
            </div>

            {/* Profile Details */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-muted-foreground">Full Name</Label>
                <div className="text-lg font-medium">{profile.fullName || "Not provided"}</div>
              </div>

              <div className="space-y-2">
                <Label className="text-muted-foreground">Phone Number</Label>
                <div className="text-lg font-medium">{profile.phone || "Not provided"}</div>
              </div>

              <div className="space-y-2">
                <Label className="text-muted-foreground">City</Label>
                <div className="text-lg font-medium">{profile.city || "Not provided"}</div>
              </div>

              <div className="space-y-2">
                <Label className="text-muted-foreground">Zip Code</Label>
                <div className="text-lg font-medium">{profile.zip || "Not provided"}</div>
              </div>
            </div>

            {/* Edit Button */}
            <div className="pt-4">
              <Button onClick={() => setIsEditing(true)}>
                Edit Profile
              </Button>
            </div>
          </Card>
        </>
      )}
    </div>
  );
};

export default CustomizeProfile;