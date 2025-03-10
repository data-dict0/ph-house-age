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
    }, []);

    // Update the reveal effect based on scroll position
    const updateReveal = (scrollLeft) => {
        if (containerRef.current && imageContainerRef.current) {
            const maxScroll = containerRef.current.scrollWidth - containerRef.current.clientWidth;
            const scrollPercentage = (scrollLeft / maxScroll) * 100;
            
            // Update the scroll progress state for mobile
            setScrollProgress(Math.min(1, scrollPercentage / 100));
            
            // For desktop: Always update the clip path based on scroll percentage
            // For mobile: We'll use opacity instead (controlled via scrollProgress)
            if (!isMobile) {
                imageContainerRef.current.style.clipPath = `inset(0 ${Math.max(0, 100 - scrollPercentage)}% 0 0)`;
            }
            
            // Determine if we're at the end
            const reachedEnd = scrollPercentage >= 95;
            
            if (reachedEnd && !isAtEnd) {
                setIsAtEnd(true);
                setScrollProgress(1); // Ensure full color
            } else if (!reachedEnd && isAtEnd) {
                setIsAtEnd(false);
            }
        }
    };

    // CRITICAL FUNCTION: Force strict separation between sections
    const applySectionSeparation = () => {
        const thisSection = sectionRef.current;
        const nextSection = thisSection?.nextElementSibling;
        
        if (nextSection) {
            // 1. Ensure the next section starts with a clean slate
            nextSection.style.position = 'relative';
            nextSection.style.zIndex = '1'; // Lower than our section
            
            // 2. Add significant spacing between sections (350px)
            nextSection.style.marginTop = '350px';
            
            // 3. Set visibility based on scroll completion
            nextSection.style.visibility = isAtEnd ? 'visible' : 'hidden';
            nextSection.style.pointerEvents = isAtEnd ? 'auto' : 'none';
            
            // 4. Create a hard barrier using overflow properties
            if (!isAtEnd) {
                // When scrolling horizontally, next section is completely hidden
                nextSection.style.position = 'absolute';
                nextSection.style.top = '1000vh'; // Push far below viewport
            } else {
                // Reset position when horizontal scroll is complete
                nextSection.style.position = 'relative';
                nextSection.style.top = 'auto';
            }
            
            // 5. Apply styles to parent container if needed
            const parentElement = thisSection.parentElement;
            if (parentElement) {
                parentElement.style.position = 'relative';
                parentElement.style.overflow = 'hidden';
            }
        }
    };

    // Handle visibility and positioning of next section
    useEffect(() => {
        // Apply strict separation between sections
        applySectionSeparation();
        
        // Cleanup
        return () => {
            const nextSection = sectionRef.current?.nextElementSibling;
            if (nextSection) {
                nextSection.style.visibility = 'visible';
                nextSection.style.pointerEvents = 'auto';
                nextSection.style.position = 'relative';
                nextSection.style.top = 'auto';
                nextSection.style.marginTop = '0';
                nextSection.style.zIndex = 'auto';
            }
        };
    }, [isAtEnd]);

    // Main scroll handler - pin section and hijack scrolling
    useEffect(() => {
        const section = sectionRef.current;
        const container = containerRef.current;
        if (!section || !container) return;
        
        // Get initial section metrics
        const updateSectionMetrics = () => {
            const rect = section.getBoundingClientRect();
            setSectionTop(window.scrollY + rect.top);
            setSectionHeight(rect.height);
            
            // Apply strict separation between sections
            applySectionSeparation();
        };
        
        updateSectionMetrics();
        
        // Set up scroll handler
        const handleScroll = () => {
            // If we haven't reached the section yet, do nothing special
            if (window.scrollY < sectionTop) {
                // Ensure horizontal scroll is reset when scrolling up above the section
                container.scrollLeft = 0;
                updateReveal(0);
                setScrollProgress(0);
                return;
            }
            
            // If we're at the end of horizontal scroll and below the section, do nothing
            if (isAtEnd && window.scrollY > sectionTop + sectionHeight + 350) { // Added buffer zone
                return;
            }
            
            // If we're in the section's range and not at the end, pin the section and control horizontal scroll
            if (!isAtEnd) {
                // Pin the section
                section.style.position = 'fixed';
                section.style.top = '0';
                section.style.left = '0';
                section.style.width = '100%';
                section.style.zIndex = '10'; // Higher than other content
                
                // Calculate what percentage of section height we've scrolled
                const scrollProgress = Math.min(1, (window.scrollY - sectionTop) / sectionHeight);
                setScrollProgress(scrollProgress); // Update scroll progress state
                
                const targetScrollLeft = scrollProgress * scrollDistance;
                
                // Update horizontal scroll - this reveals the image
                container.scrollLeft = targetScrollLeft;
                
                // For desktop, update clip-path
                if (!isMobile) {
                    updateReveal(targetScrollLeft);
                }
                
                // Block any attempt to scroll below the section
                if (window.scrollY > sectionTop + sectionHeight && !isAtEnd) {
                    window.scrollTo({
                        top: sectionTop + sectionHeight,
                        behavior: 'auto'
                    });
                }
                
                // Check if we've reached the end
                if (scrollProgress >= 0.95 && !isAtEnd) {
                    setIsAtEnd(true);
                    setScrollProgress(1); // Force complete reveal
                }
            } else {
                // If horizontal scroll is complete, unpin the section
                section.style.position = 'relative';
                section.style.top = 'auto';
                section.style.left = 'auto';
            }
        };
        
        // Handle resize events
        const handleResize = () => {
            updateSectionMetrics();
            setScrollDistance(container.scrollWidth - container.clientWidth);
            
            // Re-apply scroll handler to update positioning
            handleScroll();
        };
        
        // Add event listeners
        window.addEventListener('scroll', handleScroll, { passive: false });
        window.addEventListener('resize', handleResize, { passive: true });
        window.addEventListener('orientationchange', handleResize, { passive: true });
        
        // Initialize scroll state
        handleScroll();
        
        // Clean up
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

    // Handle direct horizontal scroll events
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

    // IMPROVED Mobile touch handling - specifically for the reveal effect
    useEffect(() => {
        const section = sectionRef.current;
        const container = containerRef.current;
        if (!section || !container) return;
        
        let touchStartY = 0;
        let touchStartX = 0;
        let lastScrollPosition = 0;
        
        // Record the initial scroll position - important for mobile
        const handleTouchStart = (e) => {
            touchStartY = e.touches[0].clientY;
            touchStartX = e.touches[0].clientX;
            lastScrollPosition = window.scrollY;
        };
        
        const handleTouchMove = (e) => {
            if (e.touches.length !== 1) return;
            
            const touchY = e.touches[0].clientY;
            const touchX = e.touches[0].clientX;
            const deltaY = touchStartY - touchY;
            const deltaX = touchStartX - touchX;
            
            // Record the initial scroll position - important for mobile
            if (!isAtEnd) {
                // Calculate and apply initial reveal based on scroll position
                const scrollProgress = Math.min(1, (window.scrollY - sectionTop) / sectionHeight);
                setScrollProgress(scrollProgress);
                
                // For desktop only, update the clip path
                if (!isMobile) {
                    const targetScrollLeft = scrollProgress * scrollDistance;
                    updateReveal(targetScrollLeft);
                }
            }
            
            // Update tracking variables
            touchStartY = touchY;
            touchStartX = touchX;
            lastScrollPosition = window.scrollY;
        };
        
        // Add touch event listeners
        section.addEventListener('touchstart', handleTouchStart, { passive: true });
        section.addEventListener('touchmove', handleTouchMove, { passive: true });
        
        return () => {
            section.removeEventListener('touchstart', handleTouchStart);
            section.removeEventListener('touchmove', handleTouchMove);
        };
    }, [sectionTop, sectionHeight, scrollDistance, isAtEnd, isMobile]);

    // Add wheel event handler to convert vertical scroll to horizontal
    useEffect(() => {
        const section = sectionRef.current;
        const container = containerRef.current;
        if (!section || !container) return;
        
        const handleWheel = (e) => {
            // Only intercept wheel events when we're in the section and haven't completed horizontal scroll
            if (!isAtEnd && window.scrollY >= sectionTop && window.scrollY <= sectionTop + sectionHeight) {
                e.preventDefault();
                
                // Determine scroll direction and amount
                const delta = e.deltaY || e.deltaX;
                container.scrollLeft += delta;
                
                // Update reveal effect
                updateReveal(container.scrollLeft);
                
                // If we've completed the horizontal scroll, allow vertical scrolling to continue
                if (container.scrollLeft >= scrollDistance * 0.95) {
                    setIsAtEnd(true);
                    setScrollProgress(1); // Force complete reveal
                }
            }
        };
        
        // Add wheel event listener
        section.addEventListener('wheel', handleWheel, { passive: false });
        
        return () => {
            section.removeEventListener('wheel', handleWheel);
        };
    }, [sectionTop, sectionHeight, scrollDistance, isAtEnd]);

    return (
        <section 
            ref={sectionRef}
            style={{ 
                width: '100%', 
                height: '100vh',
                overflow: 'hidden',
                position: 'relative',
                marginBottom: '350px', // Very large bottom margin
                paddingBottom: '50px', // Additional padding at the bottom
                zIndex: '10' // Higher than other content
            }}
        >
            <div 
                ref={containerRef}
                style={{
                    width: '100%',
                    height: '85%', // Reduced height to leave room for buffer
                    marginTop: '25px',
                    overflowX: 'scroll',
                    overflowY: 'hidden',
                    WebkitOverflowScrolling: 'touch',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                }}
                className="hide-scrollbar"
            >
                <div style={{ 
                    position: 'relative', 
                    width: '200vw', 
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
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
                                height: '85%',
                                width: 'auto',
                                objectFit: 'contain',
                                userSelect: 'none',
                                pointerEvents: 'none',
                                filter: 'grayscale(100%) opacity(40%)'
                            }}
                        />
                    </div>
                    
                    {/* For desktop: Revealing image with clip-path */}
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
                    
                    {/* For mobile: Color image with opacity transition */}
                    {isMobile && (
                        <div 
                            style={{
                                position: 'absolute',
                                inset: 0,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                                opacity: scrollProgress, // Use opacity instead of clip-path
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
            
            {/* Large buffer element to ensure spacing after the horizontal scroll content */}
            <div style={{
                height: '200px', // Very large buffer space
                width: '100%',
                background: 'transparent'
            }}></div>
            
            {/* Scroll indicator */}
            <div style={{
                position: 'absolute',
                bottom: '225px', // Position above the buffer space
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
                    {isMobile ? 'Swipe to continue' : 'Scroll to continue'}
                </div>
            </div>
            
            {/* Hard barrier to prevent content overlap */}
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: '100px',
                background: 'transparent',
                zIndex: '5'
            }}></div>
        </section>
    );
};

// Add this CSS to your stylesheet
// .hide-scrollbar::-webkit-scrollbar {
//     display: none;
// }

export default HorizontalScroll;