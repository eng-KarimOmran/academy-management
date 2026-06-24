import { Skeleton } from "@/components/ui/skeleton";
import { createDataWithKeys } from "@/lib/utils";

export default function LoadingPage() {
  return (
    <section className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {createDataWithKeys(3).map((kay) => (
          <Skeleton key={`card-${kay}`} className="h-40 w-full" />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {createDataWithKeys(4).map((kay) => (
          <Skeleton key={`chart-${kay}`} className="h-80 w-full" />
        ))}
      </div>
    </section>
  );
}
