"use client";

import { Header, Button, Card } from "@/ui/components";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto w-full px-4 py-12">
        <Card className="text-center">
          <h1 className="text-3xl font-bold text-red-500 mb-4">
            Error Loading Products
          </h1>
          <p className="text-gray-400 mb-6">
            {error.message || "An unexpected error occurred"}
          </p>
          {error.digest && (
            <p className="text-gray-500 text-sm mb-6">
              Error ID: {error.digest}
            </p>
          )}
          <div className="flex gap-4 justify-center">
            <Button variant="primary" onClick={reset}>
              Try Again
            </Button>
            <Link href="/">
              <Button variant="secondary">Go Home</Button>
            </Link>
          </div>
        </Card>
      </div>
    </>
  );
}
