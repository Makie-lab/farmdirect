"use client";

import { useState } from "react";
import { User, MapPin, Phone, Mail, Sprout, Save, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function ProfilePage() {
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState({
    name: "Juan dela Cruz",
    email: "juan@farmdirect.ph",
    phone: "+63 917 123 4567",
    farmName: "Dela Cruz Organic Farm",
    farmLocation: "Lipa, Batangas",
    farmDescription: "Family-owned organic farm specializing in citrus fruits and vegetables. Practicing sustainable farming since 2015.",
    bio: "Third-generation farmer passionate about organic agriculture and fair trade.",
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        <p className="text-gray-600 mt-1">Manage your farmer profile and farm information</p>
      </div>

      {/* Profile Photo */}
      <Card padding="md">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
            <User className="w-10 h-10 text-green-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{profile.name}</h3>
            <p className="text-sm text-gray-500">Farmer since 2015</p>
            <button className="text-sm text-green-600 hover:text-green-700 font-medium mt-1">Change Photo</button>
          </div>
        </div>
      </Card>

      {/* Personal Info */}
      <Card padding="md">
        <h3 className="font-semibold text-gray-900 mb-4">Personal Information</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> Email</span>
              </label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> Phone</span>
              </label>
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
            <textarea
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              rows={2}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-green-500 resize-none"
            />
          </div>
        </div>
      </Card>

      {/* Farm Info */}
      <Card padding="md">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Sprout className="w-5 h-5 text-green-600" /> Farm Information
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Farm Name</label>
            <input
              type="text"
              value={profile.farmName}
              onChange={(e) => setProfile({ ...profile, farmName: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-green-600" /> Farm Location</span>
            </label>
            <input
              type="text"
              value={profile.farmLocation}
              onChange={(e) => setProfile({ ...profile, farmLocation: e.target.value })}
              placeholder="e.g., Lipa, Batangas"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Farm Description</label>
            <textarea
              value={profile.farmDescription}
              onChange={(e) => setProfile({ ...profile, farmDescription: e.target.value })}
              rows={3}
              placeholder="Tell buyers about your farm, crops, and practices..."
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-green-500 resize-none"
            />
          </div>
        </div>
      </Card>

      {/* Save Button */}
      <Button onClick={handleSave} size="lg" className="w-full sm:w-auto">
        <Save className="w-4 h-4 mr-2" /> Save Changes
      </Button>

      {/* Success Toast */}
      {saved && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-3 z-50">
          <CheckCircle2 className="w-5 h-5" />
          <span className="font-medium text-sm">Profile saved successfully!</span>
        </div>
      )}
    </div>
  );
}
