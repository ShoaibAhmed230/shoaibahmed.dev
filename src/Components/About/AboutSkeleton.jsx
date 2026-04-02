import React from 'react';
import Skeleton from '../Skeleton/Skeleton';

const AboutSkeleton = () => {
    return (
        <div className="abt-container mt-10">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-8 items-stretch mb-8">
                    {/* LEFT CARD - BIO SKELETON */}
                    <div className="lg:w-7/12 abt-card p-8 md:p-12 relative overflow-hidden h-[450px]">
                        <Skeleton className="h-6 w-24 mb-4" />
                        <Skeleton className="h-10 w-64 mb-8" />
                        <div className="space-y-4">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-3/4" />
                            <div className="pt-4" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-5/6" />
                        </div>
                    </div>

                    {/* RIGHT CARD - PROFILE SKELETON */}
                    <div className="lg:w-5/12 abt-card p-8 flex items-center justify-center relative h-[300px] lg:h-[450px]">
                        <Skeleton className="w-48 h-48 md:w-64 md:h-64 rounded-full" />
                    </div>
                </div>

                {/* SOCIAL ROW SKELETON */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Skeleton className="h-14 rounded-xl" />
                    <Skeleton className="h-14 rounded-xl" />
                    <Skeleton className="h-14 rounded-xl" />
                </div>
            </div>
        </div>
    );
};

export default AboutSkeleton;
