import React, { useRef, useState, useEffect } from 'react';
// Import your SVG directly
import totalAgeSvg from '../assets/total_age.svg';

const HorizontalScroll = () => {
    const containerRef = useRef(null);
    const imageContainerRef = useRef(null);
    const coloredImgRef = useRef(null);
    const sectionRef = useRef(null);
    const [isAtEnd, setIsAtEnd] = useState(false);
    const [scrollDistance, setScrollDistance] = useState(0);
    const [sectionHeight, setSectionHeight] = useState(0);
    const [sectionTop, setSectionTop] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [touchScrolling, setTouchScrolling] = useState(false);
    
    // Detect mobile devices
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => {
            window.removeEventListener('resize', checkMobile);
        };
    }, []);
    
    // Calculate the total horizontal scroll distance
    useEffect(() => {
        if (containerRef.current) {
            setScrollDistance(containerRef.current.scrollWidth - containerRef.current.clientWidth);
        }
    }, [isMobile]); // Added isMobile dependency to recalculate when device type changes

    // Update the reveal effect based on scroll position
    const updateReveal = (scrollLeft) => {
        if (containerRef.current && imageContainerRef.current) {
            const maxScroll = containerRef.current.scrollWidth - containerRef.current.clientWidth;
            const scrollPercentage = Math.min(100, (scrollLeft / maxScroll) * 100);
            
            // Update the scroll progress state for both mobile and desktop
            const newProgress = Math.min(1, scrollPercentage / 100);
            setScrollProgress(newProgress);
            
            // For desktop: Update the clip path based on scroll percentage
            if (!isMobile && imageContainerRef.current) {
                imageContainerRef.current.style.clipPath = `inset(0 ${Math.max(0, 100 - scrollPercentage)}% 0 0)`;
            }
            
            // Determine if we're at the end - lowered threshold for mobile to ensure completion
            const reachedEnd = isMobile ? scrollPercentage >= 90 : scrollPercentage >= 95;
            
            if (reachedEnd && !isAtEnd) {
                setIsAtEnd(true);
                setScrollProgress(1); // Ensure full color
            } else if (!reachedEnd && isAtEnd) {
                setIsAtEnd(false);
            }
        }
    };

    // Section separation function
    const applySectionSeparation = () => {
        const thisSection = sectionRef.current;
        const nextSection = thisSection?.nextElementSibling;
        
        if (nextSection) {
            // Reset next section styles
            nextSection.style.position = 'relative';
            nextSection.style.zIndex = '1';
            
            // Adjust spacing between sections
            nextSection.style.marginTop = isMobile ? '100px' : '150px'; // Reduced spacing
            
            // Set visibility based on scroll completion
            nextSection.style.visibility = isAtEnd ? 'visible' : 'hidden';
            nextSection.style.pointerEvents = isAtEnd ? 'auto' : 'none';
            
            // Position next section based on scroll completion
            if (!isAtEnd) {
                nextSection.style.position = 'absolute';
                nextSection.style.top = '1500px'; // Reduced distance for better performance
                nextSection.style.opacity = '0';
                nextSection.style.overflow = 'hidden';
            } else {
                nextSection.style.position = 'relative';
                nextSection.style.top = 'auto';
                nextSection.style.opacity = '1';
                nextSection.style.overflow = 'visible';
            }
            
            // Apply styles to parent container
            const parentElement = thisSection.parentElement;
            if (parentElement) {
                parentElement.style.position = 'relative';
                parentElement.style.overflow = 'visible'; // Changed from hidden to allow scrolling
            }
            
            // Handle following siblings
            let sibling = nextSection.nextElementSibling;
            while (sibling) {
                if (!isAtEnd) {
                    sibling.style.position = 'absolute';
                    sibling.style.top = '2000px';
                    sibling.style.visibility = 'hidden';
                    sibling.style.opacity = '0';
                    sibling.style.pointerEvents = 'none';
                } else {
                    sibling.style.position = 'relative';
                    sibling.style.top = 'auto';
                    sibling.style.visibility = 'visible';
                    sibling.style.opacity = '1';
                    sibling.style.pointerEvents = 'auto';
                }
                sibling = sibling.nextElementSibling;
            }
        }
    };

    // Handle visibility and positioning of next section
    useEffect(() => {
        applySectionSeparation();
        
        return () => {
            const thisSection = sectionRef.current;
            const nextSection = thisSection?.nextElementSibling;
            
            if (nextSection) {
                // Reset all styles on unmount
                nextSection.style.visibility = 'visible';
                nextSection.style.pointerEvents = 'auto';
                nextSection.style.position = 'relative';
                nextSection.style.top = 'auto';
                nextSection.style.marginTop = '0';
                nextSection.style.zIndex = 'auto';
                nextSection.style.opacity = '1';
                nextSection.style.overflow = 'visible';
                
                // Reset following siblings
                let sibling = nextSection.nextElementSibling;
                while (sibling) {
                    sibling.style.position = 'relative';
                    sibling.style.top = 'auto';
                    sibling.style.visibility = 'visible';
                    sibling.style.opacity = '1';
                    sibling.style.pointerEvents = 'auto';
                    sibling = sibling.nextElementSibling;
                }
            }
        };
    }, [isAtEnd, isMobile]);

    // Main scroll handler
    useEffect(() => {
        const section = sectionRef.current;
        const container = containerRef.current;
        if (!section || !container) return;
        
        // Update section metrics
        const updateSectionMetrics = () => {
            const rect = section.getBoundingClientRect();
            setSectionTop(window.scrollY + rect.top);
            setSectionHeight(rect.height);
            applySectionSeparation();
        };
        
        updateSectionMetrics();
        
        // Scroll handler
        const handleScroll = () => {
            // If we're above the section, reset everything
            if (window.scrollY < sectionTop) {
                container.scrollLeft = 0;
                updateReveal(0);
                section.style.position = 'relative';
                section.style.top = 'auto';
                section.style.left = 'auto';
                section.style.width = 'auto';
                return;
            }
            
            // If we're below the section and at the end, do nothing
            if (isAtEnd && window.scrollY > sectionTop + sectionHeight + 100) {
                return;
            }
            
            // Handle in-section scrolling
            if (!isAtEnd) {
                // Pin the section
                section.style.position = 'fixed';
                section.style.top = '0';
                section.style.left = '0';
                section.style.width = '100%';
                section.style.zIndex = '10';
                
                // Calculate scroll progress
                const scrollProgress = Math.min(1, (window.scrollY - sectionTop) / sectionHeight);
                
                // Update horizontal scroll position
                const targetScrollLeft = scrollProgress * scrollDistance;
                container.scrollLeft = targetScrollLeft;
                
                // Update reveal effect
                updateReveal(targetScrollLeft);
                
                // Check if we've reached the end
                if (scrollProgress >= (isMobile ? 0.9 : 0.95) && !isAtEnd) {
                    setIsAtEnd(true);
                    setScrollProgress(1);
                    
                    // Release scroll lock with a small delay
                    setTimeout(() => {
                        section.style.position = 'relative';
                        section.style.top = 'auto';
                        section.style.left = 'auto';
                        applySectionSeparation();
                    }, 100);
                }
            } else {
                // Unpin section when horizontal scroll is complete
                section.style.position = 'relative';
                section.style.top = 'auto';
                section.style.left = 'auto';
            }
        };
        
        // Handle resize
        const handleResize = () => {
            updateSectionMetrics();
            setScrollDistance(container.scrollWidth - container.clientWidth);
            handleScroll();
        };
        
        // Add event listeners
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleResize, { passive: true });
        window.addEventListener('orientationchange', handleResize, { passive: true });
        
        // Initial call
        handleScroll();
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('orientationchange', handleResize);
            
            // Reset styles
            section.style.position = 'relative';
            section.style.top = 'auto';
            section.style.left = 'auto';
            section.style.width = 'auto';
            section.style.zIndex = 'auto';
        };
    }, [sectionTop, sectionHeight, scrollDistance, isAtEnd, isMobile]);

    // Handle horizontal scroll events
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        
        const handleHorizontalScroll = () => {
            updateReveal(container.scrollLeft);
        };
        
        container.addEventListener('scroll', handleHorizontalScroll, { passive: true });
        
        return () => {
            container.removeEventListener('scroll', handleHorizontalScroll);
        };
    }, []);

    // IMPROVED Mobile touch handling
    useEffect(() => {
        const section = sectionRef.current;
        const container = containerRef.current;
        if (!section || !container || !isMobile) return;
        
        let touchStartY = 0;
        let touchStartX = 0;
        let touchMoveDistance = 0;
        let isHorizontalSwipe = false;
        
        // Handle touch start
        const handleTouchStart = (e) => {
            if (isAtEnd) return; // Don't interfere if we're already at the end
            
            touchStartY = e.touches[0].clientY;
            touchStartX = e.touches[0].clientX;
            touchMoveDistance = 0;
            isHorizontalSwipe = false;
            setTouchScrolling(true);
        };
        
        // Handle touch move
        const handleTouchMove = (e) => {
            if (isAtEnd || !isMobile) return;
            
            const currentY = e.touches[0].clientY;
            const currentX = e.touches[0].clientX;
            const deltaY = touchStartY - currentY;
            const deltaX = touchStartX - currentX;
            
            // Determine if this is primarily a horizontal or vertical swipe
            if (!isHorizontalSwipe && Math.abs(touchMoveDistance) < 10) {
                isHorizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY);
                touchMoveDistance += Math.abs(deltaX) + Math.abs(deltaY);
            }
            
            // Only handle horizontal swipes
            if (isHorizontalSwipe) {
                e.preventDefault(); // Prevent vertical scrolling only for horizontal swipes
                
                // Update horizontal scroll directly for smoother experience
                container.scrollLeft += deltaX / 2; // Reduced sensitivity
                touchStartX = currentX;
                
                // Update reveal effect
                updateReveal(container.scrollLeft);
                
                // Check if we've reached the end
                if (container.scrollLeft >= scrollDistance * 0.9) {
                    setIsAtEnd(true);
                    setScrollProgress(1);
                    setTouchScrolling(false);
                    
                    // Apply section separation with a short delay
                    setTimeout(() => {
                        applySectionSeparation();
                    }, 50);
                }
            } else {
                // For vertical swipes, ensure we're tracking position correctly
                touchStartY = currentY;
            }
        };
        
        // Handle touch end
        const handleTouchEnd = () => {
            setTouchScrolling(false);
            
            // If we've moved more than 80% through, auto-complete the scroll
            if (container.scrollLeft >= scrollDistance * 0.8 && !isAtEnd) {
                container.scrollLeft = scrollDistance;
                setIsAtEnd(true);
                setScrollProgress(1);
                applySectionSeparation();
            }
        };
        
        // Add touch event listeners
        section.addEventListener('touchstart', handleTouchStart, { passive: true });
        section.addEventListener('touchmove', handleTouchMove, { passive: false }); // non-passive to allow preventDefault
        section.addEventListener('touchend', handleTouchEnd, { passive: true });
        
        return () => {
            section.removeEventListener('touchstart', handleTouchStart);
            section.removeEventListener('touchmove', handleTouchMove);
            section.removeEventListener('touchend', handleTouchEnd);
        };
    }, [sectionTop, sectionHeight, scrollDistance, isAtEnd, isMobile]);

    // Handle wheel events on desktop
    useEffect(() => {
        const section = sectionRef.current;
        const container = containerRef.current;
        if (!section || !container || isMobile) return;
        
        const handleWheel = (e) => {
            // Only intercept wheel when in section and not at end
            if (!isAtEnd && window.scrollY >= sectionTop && window.scrollY <= sectionTop + sectionHeight) {
                e.preventDefault();
                
                // Determine scroll direction and amount
                const delta = e.deltaY || e.deltaX;
                container.scrollLeft += delta;
                
                // Update reveal effect
                updateReveal(container.scrollLeft);
                
                // Check if we've completed the scroll
                if (container.scrollLeft >= scrollDistance * 0.95) {
                    setIsAtEnd(true);
                    setScrollProgress(1);
                }
            }
        };
        
        section.addEventListener('wheel', handleWheel, { passive: false });
        
        return () => {
            section.removeEventListener('wheel', handleWheel);
        };
    }, [sectionTop, sectionHeight, scrollDistance, isAtEnd, isMobile]);

    return (
        <section 
            ref={sectionRef}
            style={{ 
                width: '100%', 
                height: '100vh',
                overflow: 'hidden',
                position: 'relative',
                marginBottom: isMobile ? '100px' : '150px', // Reduced margin
                paddingBottom: '30px',
                zIndex: '10',
                isolation: 'isolate'
            }}
        >
            <div 
                ref={containerRef}
                style={{
                    width: '100%',
                    height: '85%',
                    marginTop: '20px',
                    overflowX: 'scroll',
                    overflowY: 'hidden',
                    WebkitOverflowScrolling: 'touch',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    position: 'relative',
                    zIndex: '2'
                }}
                className="hide-scrollbar"
            >
                <div style={{ 
                    position: 'relative', 
                    width: isMobile ? '250vw' : '200vw', // Increased width for mobile
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                }}>
                    {/* Background grayscale image */}
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
                                height: '85%',
                                width: 'auto',
                                objectFit: 'contain',
                                userSelect: 'none',
                                pointerEvents: 'none',
                                filter: 'grayscale(100%) opacity(40%)'
                            }}
                        />
                    </div>
                    
                    {/* Desktop: Revealing image with clip-path */}
                    {!isMobile && (
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
                                    height: '85%',
                                    width: 'auto',
                                    objectFit: 'contain',
                                    userSelect: 'none',
                                    pointerEvents: 'none'
                                }}
                            />
                        </div>
                    )}
                    
                    {/* Mobile: Color image with opacity transition */}
                    {isMobile && (
                        <div 
                            style={{
                                position: 'absolute',
                                inset: 0,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                                opacity: scrollProgress,
                                transition: 'opacity 0.15s ease-out', // Smoother transition
                                zIndex: 5
                            }}
                        >
                            <img 
                                ref={coloredImgRef}
                                src={totalAgeSvg}
                                alt="main content"
                                style={{
                                    height: '85%',
                                    width: 'auto',
                                    objectFit: 'contain',
                                    userSelect: 'none',
                                    pointerEvents: 'none'
                                }}
                            />
                        </div>
                    )}
                </div>
            </div>
            
            {/* Buffer element */}
            <div style={{
                height: '50px',
                width: '100%',
                background: 'transparent'
            }}></div>
            
            {/* Scroll indicator */}
            <div style={{
                position: 'absolute',
                bottom: '80px',
                left: '0',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                opacity: isAtEnd ? 0 : 1,
                transition: 'opacity 0.5s ease',
                pointerEvents: 'none',
                zIndex: '15'
            }}>
                <div style={{
                    padding: '10px 20px',
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    color: 'white',
                    borderRadius: '30px',
                    fontSize: '14px'
                }}>
                    {isMobile ? 'Swipe right to continue' : 'Scroll to continue'}
                </div>
            </div>
        </section>
    );
};

// Add this CSS to your stylesheet
// .hide-scrollbar::-webkit-scrollbar {
//     display: none;
// }

export default HorizontalScroll;