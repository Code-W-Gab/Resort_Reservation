import Skeleton from "react-loading-skeleton";

export default function SkeletonLoading() {

  return (
    <div
      style={{
        marginBottom: "20px",
      }}
    >
      <Skeleton height={30} />

      <Skeleton
        count={2}
      />
    </div>
  );
}