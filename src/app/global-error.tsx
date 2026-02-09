"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="bg-black text-white">
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 max-w-md">
            <h2 className="text-2xl font-bold text-red-500 mb-4">
              Something went wrong!
            </h2>
            <p className="text-gray-300 mb-6 text-sm">{error.message}</p>
            {error.digest && (
              <p className="text-gray-500 text-xs mb-6">
                Error ID: {error.digest}
              </p>
            )}
            <button
              onClick={reset}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
