import { Button, Card } from "@/ui/components";
import Link from "next/link";

export const metadata = {
  title: "Not Found | Emart",
};

export default function NotFound() {
  return (
    <div className="max-w-6xl mx-auto w-full px-4 py-12">
      <Card className="text-center">
        <h1 className="text-5xl font-bold text-red-500 mb-4">404</h1>
        <p className="text-gray-400 text-lg mb-6">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link href="/products">
          <Button variant="primary" size="lg">
            Back to Products
          </Button>
        </Link>
      </Card>
    </div>
  );
}
