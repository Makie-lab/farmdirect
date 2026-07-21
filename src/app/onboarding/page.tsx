"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sprout, Tractor, ShoppingBag, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<"farmer" | "buyer" | null>(null);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [farmName, setFarmName] = useState("");
  const [farmLocation, setFarmLocation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!role) return;
    setIsSubmitting(true);
    try {
      await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role,
          phone,
          address,
          farmName: role === "farmer" ? farmName : undefined,
          farmLocation: role === "farmer" ? farmLocation : undefined,
        }),
      });
      router.push("/dashboard");
    } catch (error) {
      console.error("Onboarding failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="flex items-center gap-2 justify-center mb-8">
          <Sprout className="w-7 h-7 text-green-600" />
          <span className="text-xl font-bold text-gray-900">FarmDirect</span>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className={`w-3 h-3 rounded-full ${step >= 1 ? "bg-green-600" : "bg-gray-300"}`} />
          <div className={`w-12 h-0.5 ${step >= 2 ? "bg-green-600" : "bg-gray-300"}`} />
          <div className={`w-3 h-3 rounded-full ${step >= 2 ? "bg-green-600" : "bg-gray-300"}`} />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          {step === 1 && (
            <div>
              <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">
                How will you use FarmDirect?
              </h1>
              <p className="text-gray-500 text-center mb-8">
                Choose your role to personalize your experience
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => setRole("farmer")}
                  className={`p-6 rounded-xl border-2 text-left transition-all ${
                    role === "farmer"
                      ? "border-green-600 bg-green-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Tractor className={`w-8 h-8 mb-3 ${role === "farmer" ? "text-green-600" : "text-gray-400"}`} />
                  <h3 className="font-semibold text-gray-900">Farmer</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Sell your fresh produce directly to buyers
                  </p>
                </button>
                <button
                  onClick={() => setRole("buyer")}
                  className={`p-6 rounded-xl border-2 text-left transition-all ${
                    role === "buyer"
                      ? "border-green-600 bg-green-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <ShoppingBag className={`w-8 h-8 mb-3 ${role === "buyer" ? "text-green-600" : "text-gray-400"}`} />
                  <h3 className="font-semibold text-gray-900">Buyer</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Buy fresh produce directly from farmers
                  </p>
                </button>
              </div>
              <Button
                className="w-full mt-6"
                disabled={!role}
                onClick={() => setStep(2)}
              >
                Continue <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}

          {step === 2 && (
            <div>
              <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">
                Complete Your Profile
              </h1>
              <p className="text-gray-500 text-center mb-8">
                Tell us a bit more about yourself
              </p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+63 9XX XXX XXXX"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Street, City, Province"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                  />
                </div>
                {role === "farmer" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Farm Name
                      </label>
                      <input
                        type="text"
                        value={farmName}
                        onChange={(e) => setFarmName(e.target.value)}
                        placeholder="Your farm name"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Farm Location
                      </label>
                      <input
                        type="text"
                        value={farmLocation}
                        onChange={(e) => setFarmLocation(e.target.value)}
                        placeholder="City, Province"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                      />
                    </div>
                  </>
                )}
              </div>
              <div className="flex gap-3 mt-6">
                <Button variant="outline" onClick={() => setStep(1)}>
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </Button>
                <Button
                  className="flex-1"
                  onClick={handleSubmit}
                  disabled={isSubmitting || !phone || !address}
                >
                  {isSubmitting ? "Setting up..." : "Complete Setup"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
