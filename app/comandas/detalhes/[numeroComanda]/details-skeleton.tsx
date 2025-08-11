import { Skeleton } from "@/components/ui/skeleton";

export default function DetailsSkeleton() {
  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-4 w-48" />
          </div>
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-10 w-10" />
        </div>
      </div>

      <Skeleton className="h-[1px] w-full" />

      {/* Content */}
      <div className="space-y-4">
        <Skeleton className="h-6 w-24" />
        
        {/* Table skeleton */}
        <div className="rounded-lg border overflow-hidden">
          <div className="bg-muted/50 grid grid-cols-4 p-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-24 justify-self-end" />
            <Skeleton className="h-4 w-24 justify-self-end" />
            <Skeleton className="h-4 w-24 justify-self-end" />
          </div>
          
          <div className="divide-y">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="grid grid-cols-4 p-4">
                <div className="space-y-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-48" />
                </div>
                <Skeleton className="h-5 w-8 justify-self-end" />
                <Skeleton className="h-5 w-16 justify-self-end" />
                <Skeleton className="h-5 w-16 justify-self-end" />
              </div>
            ))}
          </div>
          
          {/* Footer */}
          <div className="bg-muted/50 p-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <Skeleton className="h-5 w-24" />
              <div className="flex flex-col items-end gap-2">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-10 w-full md:w-40" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}