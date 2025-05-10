import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { VendasSkeleton } from "../vendas/vendas-skeleton";

export function DashboardSkeleton() {
  return (
    <div className="px-4 lg:px-6 flex flex-col gap-6">
      {/* Cards de métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-6 min-h-45">
          <div className="flex flex-col space-y-3">
            <Skeleton className="h-4 w-3/4 rounded-md" />
            <Skeleton className="h-9 w-full rounded-md" />
            <Skeleton className="h-5 w-2/3 rounded-md" />
            <Skeleton className="h-5 w-1/2 rounded-md" />
          </div>
        </Card>
        <Card className="p-6 min-h-45">
          <div className="flex flex-col space-y-3">
            <Skeleton className="h-4 w-3/4 rounded-md" />
            <Skeleton className="h-9 w-full rounded-md" />
            <Skeleton className="h-5 w-2/3 rounded-md" />
            <Skeleton className="h-5 w-1/2 rounded-md" />
          </div>
        </Card>
        <Card className="p-6 min-h-45">
          <div className="flex flex-col space-y-3">
            <Skeleton className="h-4 w-3/4 rounded-md" />
            <Skeleton className="h-9 w-full rounded-md" />
            <Skeleton className="h-5 w-2/3 rounded-md" />
            <Skeleton className="h-5 w-1/2 rounded-md" />
          </div>
        </Card>
      </div>

      {/* Gráfico */}
      <Card className="p-6 min-h-35">
        <div className="flex justify-between items-center mb-6">
          <Skeleton className="h-6 w-1/4 rounded-md" />
          <Skeleton className="h-9 w-32 rounded-md" />
        </div>
        <div className="flex items-end space-x-2 h-[300px]">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex flex-col items-center flex-1">
              <Skeleton
                className="w-full rounded-t-md"
                style={{
                  height: `${Math.random() * 80 + 20}%`,
                }}
              />
              <Skeleton className="h-4 w-10 mt-2 rounded-md" />
            </div>
          ))}
        </div>
      </Card>
      <Card className="p-6">
        <VendasSkeleton></VendasSkeleton>
      </Card>
    </div>
  );
}
