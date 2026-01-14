export const SliderCardSkeleton: React.FC = () => {
    return (
        <div className="bg-neutral-primary-soft flex flex-col max-w-sm rounded-lg shadow-lg animate-pulse">
            {/* Content */}
            <div className="p-6">
                <div className="h-4 bg-gray-300 rounded w-full mb-3"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6 mb-3"></div>
                <div className="h-4 bg-gray-300 rounded w-4/6"></div>
            </div>

            {/* Avatar */}
            <div className="flex flex-col items-center mb-6">
                <div className="w-20 h-20 rounded-full bg-gray-300 mb-3"></div>
                <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-24"></div>
            </div>
        </div>
    );
};