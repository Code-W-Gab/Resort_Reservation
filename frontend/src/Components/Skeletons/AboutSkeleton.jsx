import Skeleton from "react-loading-skeleton";

export default function AboutSkeleton() {
  return (
    <div className="bg-[#effaf4]">
      {/* Header */}
      <Skeleton height={70} />
      
      {/* About Section */}
      <div className="px-20 py-12">
        <Skeleton height={50} width="40%" className="mb-4" />
        <Skeleton count={3} height={20} className="mb-3" />
      </div>

      {/* Content Sections */}
      <div className="px-20 py-8">
        <Skeleton height={40} width="30%" className="mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div key={item} className="space-y-3">
              <Skeleton height={150} />
              <Skeleton count={2} height={16} />
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="px-20 py-8 bg-white">
        <Skeleton height={40} width="25%" className="mb-6" />
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <Skeleton key={item} height={50} />
          ))}
        </div>
      </div>

      {/* Footer */}
      <Skeleton height={200} className="mt-12" />
    </div>
  );
}