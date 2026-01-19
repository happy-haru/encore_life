import { Skeleton } from "@/components/ui/skeleton";

export function PostSkeleton({ count = 6 }: { count?: number }) {
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="border rounded-lg p-6 space-y-4">
                    <div className="flex items-start justify-between">
                        <Skeleton className="h-6 w-24" />
                        <Skeleton className="h-5 w-16" />
                    </div>
                    <Skeleton className="h-7 w-full" />
                    <Skeleton className="h-20 w-full" />
                    <div className="flex items-center gap-4">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-16" />
                    </div>
                </div>
            ))}
        </div>
    );
}
