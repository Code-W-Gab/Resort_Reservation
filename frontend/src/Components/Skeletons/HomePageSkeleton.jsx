import Skeleton from "react-loading-skeleton";

export default function HomePageSkeleton() {
  return (
    <div className="bg-[#effaf4]">
      {/* Header */}
      <Skeleton height={70} />
      
      {/* Hero Section */}
      <div className="px-10 py-12">
        <Skeleton height={150} />
      </div>

      {/* Info Section */}
      <div className="px-10 py-8">
        <Skeleton height={100} />
      </div>

      {/* Accommodations Grid */}
      <div className="px-40 py-6">
        <Skeleton height={40} width="200px" className="mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="space-y-3">
              <Skeleton height={200} />
              <Skeleton height={20} width="80%" />
              <Skeleton height={16} width="60%" />
              <Skeleton height={40} />
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Skeleton height={200} className="mt-12" />
    </div>
  );
}