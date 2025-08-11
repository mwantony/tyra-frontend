import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function AddSkeleton() {
  return (
    <div className="p-4 md:p-8 w-full max-w-7xl mx-auto">
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-48 mx-auto" />
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <Skeleton className="h-5 w-24 mb-2" />
                <Skeleton className="h-10 w-full" />
              </div>

              <div>
                <Skeleton className="h-5 w-24 mb-2" />
                <div className="space-y-2">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-60 w-full" />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div className="bg-muted/50 rounded-lg p-6 flex items-center justify-center h-full">
                <div className="space-y-4 w-full">
                  <Skeleton className="h-6 w-48 mx-auto" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
