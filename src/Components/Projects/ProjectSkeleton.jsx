import React from 'react';
import Skeleton from '../Skeleton/Skeleton';

const ProjectSkeleton = () => {
    return (
        <div className="lg:w-1/3 sm:w-1/2 w-full p-4">
            <div className="relative overflow-hidden rounded-lg shadow-lg border-gray-700 border-2 aspect-video">
                <Skeleton className="absolute inset-0 w-full h-full" />
            </div>
            <div className="mt-4">
                <Skeleton className="h-6 w-3/4" />
            </div>
        </div>
    );
};

export const ProjectsSkeletonGrid = () => {
    return (
        <div className="text-center mt-10">
            <Skeleton className="h-10 w-64 inline-block mb-16" />
            <div className="container px-5 mx-auto">
                <div className="flex flex-wrap -m-4">
                    {[...Array(6)].map((_, index) => (
                        <ProjectSkeleton key={index} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectSkeleton;
