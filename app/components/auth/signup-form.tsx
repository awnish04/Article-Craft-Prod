"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";

export function SignupForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
    };

    if (data.password.length < 8) {
      toast.warning("Password must be at least 8 characters long.");
      return;
    }
    if (data.password !== data.confirmPassword) {
      toast.warning("Passwords do not match. Please check and try again.");
      return;
    }
    if (!termsAccepted) {
      toast.warning(
        "You must accept the Terms and Privacy Policies to continue.",
      );
      return;
    }

    setLoading(true);

    toast.promise(
      fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          password: data.password,
        }),
      }).then(async (res) => {
        const result = await res.json();
        if (res.status === 409)
          throw new Error(
            "An account with this email already exists. Try logging in.",
          );
        if (res.status === 400)
          throw new Error(
            result.error || "Please fill in all required fields.",
          );
        if (!res.ok)
          throw new Error(result.error || "Signup failed. Please try again.");
        setTimeout(() => router.push("/login?registered=true"), 1000);
        return result;
      }),
      {
        loading: "Creating your account...",
        success: "Account created successfully! Redirecting to login...",
        error: (err) =>
          err.message ?? "Network error. Please check your connection.",
        finally: () => setLoading(false),
      },
    );
  };

  const inputClass =
    "h-11 bg-muted border-border rounded-md focus-visible:ring-primary";
  const labelClass = "text-sm font-medium text-foreground";

  return (
    <div className="w-full max-w-2xl mx-auto bg-background rounded-xl shadow-sm border border-border p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-foreground mb-1">Sign up</h1>
        <p className="text-sm text-muted-foreground">
          Let&apos;s get you all set up so you can access your personal account
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName" className={labelClass}>
              First Name
            </Label>
            <Input
              id="firstName"
              name="firstName"
              type="text"
              placeholder="John"
              className={inputClass}
              required
              disabled={loading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName" className={labelClass}>
              Last Name
            </Label>
            <Input
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Doe"
              className={inputClass}
              required
              disabled={loading}
            />
          </div>
        </div>

        {/* Email + Phone row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email" className={labelClass}>
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="john.doe@gmail.com"
              className={inputClass}
              required
              disabled={loading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className={labelClass}>
              Phone Number
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+1 (555) 000-0000"
              className={inputClass}
              required
              disabled={loading}
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-2">
          <Label htmlFor="password" className={labelClass}>
            Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className={`${inputClass} pr-10`}
              required
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              disabled={loading}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className={labelClass}>
            Confirm Password
          </Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••"
              className={`${inputClass} pr-10`}
              required
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              disabled={loading}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* Terms */}
        <div className="flex items-center gap-2">
          <Checkbox
            id="terms"
            className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
            checked={termsAccepted}
            onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
            disabled={loading}
          />
          <label
            htmlFor="terms"
            className="text-sm text-muted-foreground leading-none"
          >
            I agree to all the{" "}
            <Link href="#" className="text-primary hover:underline font-medium">
              Terms
            </Link>{" "}
            and{" "}
            <Link href="#" className="text-primary hover:underline font-medium">
              Privacy Policies
            </Link>
          </label>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating account...
            </>
          ) : (
            "Create account"
          )}
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-primary hover:underline font-medium"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
