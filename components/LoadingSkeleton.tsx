export default function LoadingSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden animate-pulse border border-gray-100 h-full flex flex-col">
      {/* Image skeleton */}
      <div className="aspect-square bg-gray-200" />
      
      {/* Content skeleton */}
      <div className="p-5 flex flex-col flex-grow space-y-4">
        <div className="space-y-2">
           <div className="h-6 bg-gray-200 rounded-md w-3/4" />
           <div className="h-3 bg-gray-100 rounded-md w-1/2" />
        </div>
        
        <div className="mt-auto flex items-end justify-between pt-4">
          <div className="h-8 bg-gray-200 rounded-md w-1/3" />
          <div className="h-10 w-10 bg-gray-200 rounded-xl lg:hidden" /> 
        </div>
      </div>
    </div>
  );
}

