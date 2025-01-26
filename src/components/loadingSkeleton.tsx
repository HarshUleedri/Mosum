import { Skeleton } from "./ui/skeleton";

const weatherSkeleton = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center gap-4">
        <Skeleton className="h-[100px] w-full rounded-lg" />
        <Skeleton className="h-[100px] w-full rounded-lg" />
        <Skeleton className="h-[100px] w-full rounded-lg" />
      </div>
      <div className="grid gap-4">
        <Skeleton className="h-[200px] w-full rounded-lg" />
        <Skeleton className="h-[300px] w-full rounded-lg" />
        <div className="grid gap-4 md:grid-cols-2">
          <Skeleton className="h-[300px] w-full rounded-lg" />
          <Skeleton className="h-[300px] w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default weatherSkeleton;
