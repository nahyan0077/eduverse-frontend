
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const SkeletonHeader = () => (
    <div className="skeleton-header">
        <Skeleton height={40} width={200} />
        <Skeleton height={40} width="80%" />
    </div>
);

export const SkeletonHeroSection = () => (
    <div className="skeleton-hero">
        <Skeleton height={300} />
        <Skeleton height={50} width="60%" />
        <Skeleton height={50} width="40%" />
    </div>
);

export const SkeletonFeaturesSection = () => (
    <div className="skeleton-features">
        <Skeleton height={200} width="100%" />
        <Skeleton height={200} width="100%" />
        <Skeleton height={200} width="100%" />
    </div>
);

// Add more skeleton components as needed

