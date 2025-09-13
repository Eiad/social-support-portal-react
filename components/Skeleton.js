'use client';

// Base skeleton component
export function Skeleton({ className = '', width = 'full', height = '4' }) {
  return (
    <div 
      className={`animate-shimmer bg-gray-200 rounded ${className}`}
      style={{
        width: width === 'full' ? '100%' : width,
        height: `${height}rem`
      }}
    />
  );
}

// Form field skeleton
export function FieldSkeleton({ hasLabel = true, rows = 1 }) {
  return (
    <div className="space-y-2">
      {hasLabel && <Skeleton width="40%" height="1" />}
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} height="3" />
      ))}
    </div>
  );
}

// Step skeleton for form transitions
export function StepSkeleton({ step = 1 }) {
  const getFieldsForStep = (stepNumber) => {
    switch (stepNumber) {
      case 1: return 10; // Personal info fields
      case 2: return 6;  // Family/financial fields  
      case 3: return 3;  // Situation description fields
      default: return 5;
    }
  };

  const fieldCount = getFieldsForStep(step);
  
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header skeleton */}
      <div className="space-y-2 mb-6">
        <Skeleton width="60%" height="2" />
        <Skeleton width="80%" height="1" />
      </div>

      {/* Fields skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: fieldCount }).map((_, i) => (
          <FieldSkeleton 
            key={i} 
            rows={i % 4 === 3 ? 3 : 1} // Every 4th field is a textarea
          />
        ))}
      </div>

      {/* Button skeleton */}
      <div className="flex justify-end mt-8">
        <Skeleton width="120px" height="2.5" />
      </div>
    </div>
  );
}

// AI loading skeleton
export function AILoadingSkeleton({ message }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-6 h-6 bg-blue-600 rounded-full animate-pulse"></div>
        </div>
      </div>
      <div className="text-center space-y-2">
        <p className="text-gray-600 font-medium">{message}</p>
        <div className="flex space-x-1 justify-center">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
}

// Progress bar skeleton
export function ProgressSkeleton() {
  return (
    <div className="mb-6 space-y-4">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <Skeleton width="120px" height="1.5" />
          <Skeleton width="200px" height="1" />
        </div>
        <Skeleton width="80px" height="1" />
      </div>
      
      {/* Desktop progress */}
      <div className="hidden md:block space-y-4">
        <div className="flex justify-between">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center space-y-2">
              <Skeleton width="32px" height="2" />
              <Skeleton width="80px" height="1" />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile progress */}
      <div className="md:hidden">
        <Skeleton height="0.5" />
      </div>
    </div>
  );
}