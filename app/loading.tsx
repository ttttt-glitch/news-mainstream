export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 animate-pulse font-sans">
      {/* Header skeleton */}
      <div className="h-20 bg-white border-b border-gray-200" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* Hero section skeleton */}
        <div className="h-[400px] bg-gray-300 rounded-xl" />

        {/* Content grid skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="h-72 bg-gray-200 rounded-lg" />
            <div className="h-72 bg-gray-200 rounded-lg" />
          </div>
          <div className="h-96 bg-gray-200 rounded-lg" />
        </div>
      </main>
    </div>
  );
}