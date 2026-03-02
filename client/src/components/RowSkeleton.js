import React from 'react';
import './RowSkeleton.css';

const RowSkeleton = ({ title, isLargeRow = false }) => {
    // Generate an array of 6 dummy items to render skeleton cards
    const skeletonCards = Array.from({ length: 6 });

    return (
        <div className="row skeleton-row">
            {title && <h2 className="row-title skeleton-title-pulse" aria-hidden="true" style={{ color: 'transparent' }}>Loading...</h2>}
            <div className="row-posters skeleton-posters">
                {skeletonCards.map((_, index) => (
                    <div
                        key={index}
                        className={`movie-card-container skeleton-card ${isLargeRow ? 'large' : ''}`}
                    >
                        <div className={`skeleton-poster ${isLargeRow ? 'row-posterLarge' : ''}`}></div>
                        <div className="skeleton-title-below"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RowSkeleton;
