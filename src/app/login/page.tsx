"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Input, Card } from "@/ui/components";
import { authService } from "@/services";
import type { LoginCredentials } from "@/domain/types";
import type { AxiosError } from "axios";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginCredentials>({
    defaultValues: {
      username: "emilys",
      password: "emilyspass",
    },
  });

  const onSubmit = async (data: LoginCredentials) => {
    try {
      setError(null);
      await authService.login(data);
      router.push("/products");
    } catch (err: unknown) {
      const axiosError = err as AxiosError<{ message?: string }>;
      setError(
        axiosError.response?.data?.message ||
          "Failed to login. Please try again.",
      );
      console.error("Login error:", axiosError);
    }
  };
  // bg-linear-to-br from-gray-900 to-black

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <Card className="w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-400">Sign in to your account</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-900 border border-red-700 rounded text-red-200 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Username"
            placeholder="Enter your username"
            {...register("username", {
              required: "Username is required",
              minLength: {
                value: 3,
                message: "Username must be at least 3 characters",
              },
            })}
            error={errors.username?.message}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            error={errors.password?.message}
          />

          <Button type="submit" className="w-full" isLoading={isSubmitting}>
            Sign In
          </Button>
        </form>

        <div className="mt-6 p-3 bg-blue-900 border border-blue-700 rounded text-blue-200 text-sm">
          <p className="font-semibold mb-1">Demo Credentials:</p>
          <p>
            Username: <strong>emilys</strong>
          </p>
          <p>
            Password: <strong>emilypass</strong>
          </p>
        </div>
      </Card>
    </div>
  );
}
