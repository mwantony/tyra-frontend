import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function DetailsSkeletonMesas() {
  return (
    <div className="container mx-auto p-4 md:p-6 md:space-y-6">
      {/* Header */}
      <div className="flex justify-between pb-4 md:pb-0 items-center">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-10 w-24" />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {/* Left Column - Mesa Info */}
        <div className="md:col-span-2 space-y-4">
          <Card>
            <CardHeader className="flex flex-row justify-between items-center">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-10 w-24" />
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <Skeleton className="h-5 w-5 rounded-full" />
                <div className="space-y-1">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-5 w-48" />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Skeleton className="h-5 w-5 rounded-full" />
                <div className="space-y-1">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-5 w-24" />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Skeleton className="h-5 w-5 rounded-full" />
                <div className="space-y-1">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-5 w-64" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Status and Actions */}
        <div className="space-y-4 md:space-y-6">
          {/* Status Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-6 w-32" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-24 rounded-full" />
                <Skeleton className="h-4 w-36" />
              </div>
            </CardContent>
          </Card>

          {/* Reservation/Occupation Card */}
          <Card>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Skeleton className="h-5 w-5 rounded-full" />
                <div className="space-y-1">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-5 w-36" />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Skeleton className="h-5 w-5 rounded-full" />
                <div className="space-y-1">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-5 w-36" />
                </div>
              </div>
              <Skeleton className="h-10 w-full" />
            </CardContent>
          </Card>

          {/* Quick Actions Card */}
        </div>
      </div>
    </div>
  );
}
