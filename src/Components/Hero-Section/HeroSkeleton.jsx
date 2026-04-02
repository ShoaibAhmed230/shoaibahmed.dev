import React from 'react';
import Skeleton from '../Skeleton/Skeleton';

const HeroSkeleton = () => {
    return (
        <section className="hero-container text-gray-400 pt-10 pb-20 md:py-24 overflow-hidden">
            <div className="container mx-auto flex px-5 md:flex-row flex-col items-center relative gap-12">
                
                {/* TEXT CONTENT SKELETON */}
                <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left items-center text-center mb-16 md:mb-0">
                    <Skeleton className="h-6 w-32 mb-4" />
                    <Skeleton className="h-20 w-full md:w-3/4 mb-6" />
                    <Skeleton className="h-8 w-48 mb-8" />
                    <Skeleton className="h-24 w-full md:w-5/6 mb-10" />
                    <Skeleton className="h-14 w-44 rounded-full" />
                    
                    <div className="mt-12 flex gap-4">
                        <Skeleton className="h-8 w-20 rounded-full" />
                        <Skeleton className="h-8 w-24 rounded-full" />
                        <Skeleton className="h-8 w-20 rounded-full" />
                    </div>
                </div>

                {/* IMAGE & BADGES SKELETON */}
                <div className="lg:w-full md:w-1/2 w-full flex justify-center items-center relative">
                    <Skeleton className="absolute top-0 left-10 h-10 w-40 rounded-xl" />
                    <Skeleton className="absolute bottom-10 right-10 h-10 w-36 rounded-xl" />
                    <Skeleton className="w-[320px] h-[400px] lg:w-[400px] rounded-2xl" />
                </div>

            </div>
        </section>
    );
};

export default HeroSkeleton;
