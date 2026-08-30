import { Card, CardContent, CardFooter, CardHeader, Skeleton } from "@/shared/ui";

const NotesSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <Card key={index} className="h-44">
          <CardHeader>
            <div className="flex items-start justify-between gap-2">
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-5 w-14 shrink-0" />
            </div>
          </CardHeader>
          <CardContent className="flex-1 space-y-2">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-4/5" />
          </CardContent>
          <CardFooter className="flex items-center justify-between">
            <Skeleton className="h-3 w-24" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-7 w-12" />
              <Skeleton className="h-7 w-14" />
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export { NotesSkeleton };
