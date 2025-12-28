import React from 'react';

const loading = () => {
    return (
        <div className="max-w-6xl mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Image */}
            <div className="h-[400px] skeleton rounded-lg"></div>

            {/* Info */}
            <div className="space-y-4">
                <div className="h-6 w-3/4 skeleton"></div>
                <div className="h-4 w-1/2 skeleton"></div>

                <div className="h-4 w-1/3 skeleton"></div>

                <div className="h-8 w-40 skeleton"></div>

                <div className="h-12 w-full skeleton"></div>
            </div>

            {/* Description */}
            <div className="md:col-span-2 space-y-3">
                <div className="h-5 w-40 skeleton"></div>
                <div className="h-4 w-full skeleton"></div>
                <div className="h-4 w-full skeleton"></div>
                <div className="h-4 w-5/6 skeleton"></div>
            </div>
        </div>
    );
};

export default loading;