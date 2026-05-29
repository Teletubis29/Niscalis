"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "@/hooks/useForm";
import { SignInSchema, type SignInForm } from "@/lib/schemas";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { signIn } from "next-auth/react";

export default function SignInPage() {
  const router = useRouter();
  const { data, errors, isSubmitting, setValue, handleSubmit } = useForm(SignInSchema);
  const [apiError, setApiError] = useState<string>("");

  const onSubmit = async (formData: SignInForm) => {
    setApiError("");
    try {
      console.log("🔐 [SignInPage] Attempting login with:", formData.email);
      
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      console.log("📊 [SignInPage] SignIn result:", result);

      if (!result?.ok) {
        const errorMsg = result?.error === "CredentialsSignin" 
          ? "Invalid email or password" 
          : result?.error || "Sign in failed";
        throw new Error(errorMsg);
      }
      
      toast.success("Signed in successfully!");
      console.log("✅ [SignInPage] Login successful, redirecting...");
      setTimeout(() => router.push("/"), 500);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "An error occurred during sign in";
      setApiError(errorMsg);
      console.error("❌ [SignInPage] Login error:", errorMsg);
      toast.error(errorMsg);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Sign in to your account
          </h2>
          <p className="text-muted-foreground mt-2 text-center text-sm">
            Or{" "}
            <Link href="/auth/signup" className="text-primary hover:text-primary/80 font-medium">
              create a new account
            </Link>
          </p>
        </div>

        <form
          className="mt-8 space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(onSubmit);
          }}>
          <div className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="Email address"
                value={data.email || ""}
                onChange={(e) => setValue("email", e.target.value)}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
              <Input
                type="password"
                placeholder="Password"
                value={data.password || ""}
                onChange={(e) => setValue("password", e.target.value)}
                className={errors.password ? "border-red-500" : ""}
              />
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="text-primary focus:ring-primary h-4 w-4 rounded border-gray-300"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link
                href="/auth/forgot-password"
                className="text-primary hover:text-primary/80 font-medium">
                Forgot your password?
              </Link>
            </div>
          </div>

          {apiError && <p className="text-sm text-red-600">{apiError}</p>}

          <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
            {isSubmitting ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </div>
    </div>
  );
}
