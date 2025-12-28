const ProductSkeleton = () => {
    return (
        <div className="card bg-base-100 shadow-md">
            {/* Image */}
            <div className="h-48 w-full skeleton rounded-t-lg"></div>

            <div className="card-body p-4 space-y-3">
                {/* Title */}
                <div className="h-4 w-3/4 skeleton"></div>
                <div className="h-4 w-1/2 skeleton"></div>

                {/* Rating */}
                <div className="h-4 w-1/3 skeleton"></div>

                {/* Price + sold */}
                <div className="flex justify-between items-center mt-2">
                    <div className="h-5 w-16 skeleton"></div>
                    <div className="h-3 w-12 skeleton"></div>
                </div>

                {/* Buttons */}
                <div className="flex gap-2 mt-3">
                    <div className="h-10 w-full skeleton"></div>
                </div>
            </div>
        </div>
    );
};

export default ProductSkeleton;
