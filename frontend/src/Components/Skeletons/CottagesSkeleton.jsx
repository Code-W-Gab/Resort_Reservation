import Skeleton from "react-loading-skeleton";

export default function CottagesSkeleton() {
  return (
    <div className="bg-[#effaf4]">
      {/* Header */}
      <Skeleton height={70} />
      
      {/* Filter/Search Area */}
      <div className="px-10 py-6">
        <Skeleton height={50} />
      </div>

      {/* Cottages Grid */}
      <div className="px-10 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div key={item} className="space-y-3">
              <Skeleton height={180} />
              <Skeleton height={20} width="85%" />
              <Skeleton height={16} width="70%" />
              <Skeleton height={35} />
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Skeleton height={200} className="mt-12" />
    </div>
  );
}