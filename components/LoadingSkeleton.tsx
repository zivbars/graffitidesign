export default function LoadingSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      {/* Image skeleton */}
      <div className="aspect-square bg-base-gray/30" />
      
      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        <div className="h-6 bg-base-gray/30 rounded w-3/4" />
        <div className="h-4 bg-base-gray/20 rounded w-full" />
        <div className="h-4 bg-base-gray/20 rounded w-5/6" />
        <div className="h-8 bg-base-gray/30 rounded w-1/2 mt-4" />
        <div className="flex gap-2 mt-4">
          <div className="h-10 bg-base-gray/30 rounded flex-1" />
          <div className="h-10 bg-base-gray/30 rounded flex-1" />
        </div>
      </div>
    </div>
  );
}

