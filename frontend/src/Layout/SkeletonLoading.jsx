import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function SkeletonLoading() {
  return (
    <div className="space-y-4 p-6">
      {/* Header Skeleton */}
      <Skeleton height={60} className="mb-6" />
      
      {/* Multiple cards skeleton */}
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
  );
}