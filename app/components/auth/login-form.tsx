"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reset = searchParams.get("reset");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (reset === "success") {
      toast.success("Password reset successfully! You can now log in.");
    }
  }, [reset]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email) {
      toast.warning("Please enter your email address.");
      return;
    }
    if (!password) {
      toast.warning("Please enter your password.");
      return;
    }

    setLoading(true);

    toast.promise(
      fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }).then(async (res) => {
        const result = await res.json();
        if (res.status === 401)
          throw new Error("Invalid email or password. Please try again.");
        if (res.status === 400)
          throw new Error(
            result.error || "Please fill in all required fields.",
          );
        if (!res.ok)
          throw new Error(result.error || "Login failed. Please try again.");
        setTimeout(() => router.push("/dashboard"), 1000);
        return result;
      }),
      {
        loading: "Logging in...",
        success: "Welcome back! Redirecting to dashboard...",
        error: (err) =>
          err.message ?? "Network error. Please check your connection.",
        finally: () => setLoading(false),
      },
    );
  };

  return (
    <div className="w-full max-w-md mx-auto bg-background rounded-xl shadow-sm border border-border p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-foreground mb-1">
          Login to your account
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label
            htmlFor="email"
            className="text-sm font-medium text-foreground"
          >
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="m@example.com"
            className="h-11 bg-muted border-border rounded-md focus-visible:ring-primary"
            required
            disabled={loading}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label
              htmlFor="password"
              className="text-sm font-medium text-foreground"
            >
              Password
            </Label>
            <Link
              href="/forgot-password"
              className="text-sm text-primary hover:underline"
            >
              Forgot your password?
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="h-11 bg-muted border-border rounded-md pr-10 focus-visible:ring-primary"
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

        <Button
          type="submit"
          disabled={loading}
          className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg"
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </div>
  );
}
