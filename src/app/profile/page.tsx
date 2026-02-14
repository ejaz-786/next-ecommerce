"use client";

import { useEffect, useState } from "react";
import { authService } from "@/services";
import type { User } from "@/domain/types";
import Link from "next/link";

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const userData = await authService.getMe();
        setUser(userData);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch user profile",
        );
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-400">Loading profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <div className="max-w-2xl mx-auto">
          <Link
            href="/products"
            className="text-blue-500 hover:text-blue-400 mb-4 inline-block"
          >
            ← Back to Products
          </Link>
          <div className="bg-red-900 border border-red-700 rounded-lg p-4">
            <h1 className="text-2xl font-bold mb-2">Error</h1>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <div className="max-w-2xl mx-auto">
          <Link
            href="/products"
            className="text-blue-500 hover:text-blue-400 mb-4 inline-block"
          >
            ← Back to Products
          </Link>
          <div className="text-center">
            <p className="text-gray-400">No user data available</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/products"
          className="text-blue-500 hover:text-blue-400 mb-8 inline-block"
        >
          ← Back to Products
        </Link>

        <div className="bg-gray-800 border border-gray-700 rounded-lg p-8">
          <div className="flex items-start gap-6 mb-8">
            {user.image && (
              <img
                src={user.image}
                alt={`${user.firstName} ${user.lastName}`}
                className="w-24 h-24 rounded-lg object-cover"
              />
            )}
            <div>
              <h1 className="text-4xl font-bold mb-2">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-gray-400 text-lg">{user.username}</p>
            </div>
          </div>

          <div className="space-y-4 border-t border-gray-700 pt-6">
            <div>
              <label className="text-gray-400 text-sm">Email</label>
              <p className="text-white text-lg">{user.email}</p>
            </div>
            <div>
              <label className="text-gray-400 text-sm">Username</label>
              <p className="text-white text-lg">{user.username}</p>
            </div>
            <div>
              <label className="text-gray-400 text-sm">First Name</label>
              <p className="text-white text-lg">{user.firstName}</p>
            </div>
            <div>
              <label className="text-gray-400 text-sm">Last Name</label>
              <p className="text-white text-lg">{user.lastName}</p>
            </div>
            <div>
              <label className="text-gray-400 text-sm">Gender</label>
              <p className="text-white text-lg capitalize">{user.gender}</p>
            </div>
            {user.id && (
              <div>
                <label className="text-gray-400 text-sm">User ID</label>
                <p className="text-white text-lg">{user.id}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
