import { Skeleton } from "@/components/ui/skeleton";

export default function AcademySkeleton() {
  return (
    <section className="max-w-7xl mx-auto space-y-8 p-4 md:p-6">
      <div className="bg-card border rounded-2xl shadow-sm p-6 md:p-8 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-6">
          <div className="space-y-3 w-full">
            <Skeleton className="h-9 w-2/3 md:w-1/3" />
            <Skeleton className="h-4 w-1/3 md:w-1/4" />
          </div>
          <Skeleton className="h-10 w-32 shrink-0" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-4 rounded-xl border bg-muted/10"
            >
              <Skeleton className="w-12 h-12 rounded-lg shrink-0" />
              <div className="space-y-2 w-full">
                <Skeleton className="h-3 w-1/4" />
                <Skeleton className="h-5 w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-card border rounded-2xl shadow-sm overflow-hidden">
          <div className="flex justify-between items-center p-5 border-b bg-muted/20">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-9 w-24" />
          </div>
          <div className="p-5 space-y-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="flex justify-between items-center p-4 border rounded-xl"
              >
                <div className="space-y-2 w-1/2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
                <div className="flex gap-2">
                  <Skeleton className="w-8 h-8 rounded-lg" />
                  <Skeleton className="w-8 h-8 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border rounded-2xl shadow-sm overflow-hidden">
          <div className="flex justify-between items-center p-5 border-b bg-muted/20">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-9 w-24" />
          </div>
          <div className="p-5 space-y-4">
            {[1, 2].map((item) => (
              <div
                key={item}
                className="flex justify-between items-center p-4 border rounded-xl"
              >
                <div className="space-y-2 w-1/2">
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-3 w-full" />
                </div>
                <div className="flex gap-2">
                  <Skeleton className="w-8 h-8 rounded-lg" />
                  <Skeleton className="w-8 h-8 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
