import React, { useRef, useState, useEffect } from 'react';
// Import your SVG directly
import totalAgeSvg from '../assets/total_age.svg';

const HorizontalScroll = () => {
    const containerRef = useRef(null);
    const imageContainerRef = useRef(null);
    const [isAtEnd, setIsAtEnd] = useState(false);
    const [isScrolling, setIsScrolling] = useState(false);
    const [hasCompletedOnce, setHasCompletedOnce] = useState(false);

    // Update the reveal effect based on scroll position
    const updateReveal = (scrollLeft) => {
        if (containerRef.current && imageContainerRef.current) {
            const maxScroll = containerRef.current.scrollWidth - containerRef.current.clientWidth;
            const scrollPercentage = (scrollLeft / maxScroll) * 100;
            
            // Update the clip path based on scroll percentage
            imageContainerRef.current.style.clipPath = `inset(0 ${Math.max(0, 100 - scrollPercentage)}% 0 0)`;
            
            // Determine if we're at the end
            const reachedEnd = scrollPercentage >= 95;
            
            if (reachedEnd && !isAtEnd) {
                setIsAtEnd(true);
                setHasCompletedOnce(true);
            } else if (!reachedEnd && isAtEnd) {
                setIsAtEnd(false);
            }
        }
    };

    // Handle regular scrolling on the component
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleScroll = () => {
            updateReveal(container.scrollLeft);
        };

        container.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            container.removeEventListener('scroll', handleScroll);
        };
    }, [isAtEnd]);

    // Main scroll handling effect
    useEffect(() => {
        // Get current window scroll position
        let lastScrollY = window.scrollY;
        let isManuallyScrolling = false;

        const handleWheel = (e) => {
            // No special handling if we've completed once and we're not at top of page
            if (hasCompletedOnce && window.scrollY > 100) {
                return;
            }
            
            const container = containerRef.current;
            if (!container) return;

            // If we haven't reached the end of horizontal scroll
            if (!isAtEnd) {
                e.preventDefault();
                
                // Use deltaY for horizontal scrolling
                const newScrollLeft = container.scrollLeft + e.deltaY;
                container.scrollLeft = Math.max(0, Math.min(newScrollLeft, container.scrollWidth - container.clientWidth));
                
                setIsScrolling(true);
                clearTimeout(window.scrollTimer);
                window.scrollTimer = setTimeout(() => setIsScrolling(false), 150);
            } 
            // If at end and attempting to scroll down, let it happen naturally
            else if (isAtEnd && e.deltaY > 0) {
                // Allow normal scrolling
                isManuallyScrolling = true;
                setTimeout(() => { isManuallyScrolling = false; }, 300);
            }
            // If at end but attempting to scroll back up, control the horizontal scroll
            else if (isAtEnd && e.deltaY < 0) {
                e.preventDefault();
                const newScrollLeft = container.scrollLeft + e.deltaY;
                container.scrollLeft = Math.max(0, Math.min(newScrollLeft, container.scrollWidth - container.clientWidth));
            }
        };

        // Watch page scrolling to reset horizontal scroll when at top
        const handleWindowScroll = () => {
            // If scrolling up to the top, reset horizontal scroll
            if (window.scrollY < 50 && lastScrollY > window.scrollY && !isManuallyScrolling) {
                if (containerRef.current) {
                    containerRef.current.scrollLeft = 0;
                    updateReveal(0);
                    setIsAtEnd(false);
                }
            }
            
            lastScrollY = window.scrollY;
        };

        // Add event listeners
        window.addEventListener('wheel', handleWheel, { passive: false });
        window.addEventListener('scroll', handleWindowScroll, { passive: true });

        return () => {
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('scroll', handleWindowScroll);
            clearTimeout(window.scrollTimer);
        };
    }, [isAtEnd, hasCompletedOnce]);

    // Mobile touch support
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let touchStartX = 0;
        let touchStartY = 0;
        let initialScrollLeft = 0;
        let isTouchHorizontal = false;

        const handleTouchStart = (e) => {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
            initialScrollLeft = container.scrollLeft;
            isTouchHorizontal = false;
        };

        const handleTouchMove = (e) => {
            if (e.touches.length !== 1) return;
            
            const touchX = e.touches[0].clientX;
            const touchY = e.touches[0].clientY;
            const deltaX = touchStartX - touchX;
            const deltaY = touchStartY - touchY;
            
            // Determine scroll direction if not already set
            if (!isTouchHorizontal && Math.abs(deltaX) > Math.abs(deltaY) && !isAtEnd) {
                isTouchHorizontal = true;
            }
            
            // Handle horizontal scrolling
            if (isTouchHorizontal && !isAtEnd) {
                e.preventDefault();
                const newScrollLeft = initialScrollLeft + deltaX;
                container.scrollLeft = Math.max(0, Math.min(newScrollLeft, container.scrollWidth - container.clientWidth));
                updateReveal(container.scrollLeft);
            }
        };

        // Add touch event listeners
        container.addEventListener('touchstart', handleTouchStart, { passive: true });
        container.addEventListener('touchmove', handleTouchMove, { passive: false });
        
        return () => {
            container.removeEventListener('touchstart', handleTouchStart);
            container.removeEventListener('touchmove', handleTouchMove);
        };
    }, [isAtEnd]);

    return (
        <div style={{ 
            width: '100%', 
            height: '100%', 
            overflow: 'hidden',
            position: 'relative'
        }}>
            {/* Instruction overlay that fades out */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                background: 'rgba(0,0,0,0.7)',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '8px',
                zIndex: 10,
                opacity: isScrolling || isAtEnd ? 0 : 0.8,
                transition: 'opacity 0.5s ease',
                pointerEvents: 'none',
            }}>
                {isAtEnd ? 'Continue scrolling down' : 'Scroll horizontally →'}
            </div>
            
            <div 
                ref={containerRef}
                style={{
                    width: '100%',
                    height: '100%',
                    overflowX: 'scroll',
                    marginTop:'-60px',
                    overflowY: 'hidden',
                    WebkitOverflowScrolling: 'touch',
                    scrollbarWidth: 'none', // Hide scrollbar for Firefox
                    msOverflowStyle: 'none', // Hide scrollbar for IE/Edge
                }}
                className="hide-scrollbar" // Add a class to hide the scrollbar with CSS
            >
                <div style={{ 
                    position: 'relative', 
                    width: '200vw', 
                    height: '100%',
                }}>
                    {/* Background placeholder */}
                    <div style={{ 
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start'
                    }}>
                        <img 
                            src={totalAgeSvg}
                            alt="placeholder background"
                            style={{
                                height: '75%',
                                width: 'auto',
                                objectFit: 'contain',
                                userSelect: 'none',
                                pointerEvents: 'none'
                            }}
                        />
                    </div>
                    
                    {/* Revealing image */}
                    <div 
                        ref={imageContainerRef}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            clipPath: 'inset(0 100% 0 0)',
                            transition: 'clip-path 0.1s ease-out'
                        }}
                    >
                        <img 
                            src={totalAgeSvg}
                            alt="main content"
                            style={{
                                height: '75%',
                                width: 'auto',
                                objectFit: 'contain',
                                userSelect: 'none',
                                pointerEvents: 'none'
                            }}
                        />
                    </div>
                </div>
            </div>
            
            {/* Visual indicator for transition to vertical scrolling */}
            <div style={{
                position: 'absolute',
                bottom: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                color: 'white',
                background: 'rgba(0,0,0,0.7)',
                padding: '8px 16px',
                borderRadius: '20px',
                opacity: isAtEnd ? 0 : 0,
                transition: 'opacity 0.3s ease',
                pointerEvents: 'none',
            }}>
                
            </div>
        </div>
    );
};

// Add this CSS to your stylesheet
// .hide-scrollbar::-webkit-scrollbar {
//     display: none;
// }

export default HorizontalScroll;