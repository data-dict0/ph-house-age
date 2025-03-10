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
    }, [isMobile]); // Added isMobile dependency to recalculate when device type changes

    // Update the reveal effect based on scroll position
    const updateReveal = (scrollLeft) => {
        if (containerRef.current && imageContainerRef.current) {
            const maxScroll = containerRef.current.scrollWidth - containerRef.current.clientWidth;
            const scrollPercentage = (scrollLeft / maxScroll) * 100;
            
            // Update the scroll progress state for both mobile and desktop
            const newProgress = Math.min(1, scrollPercentage / 100);
            setScrollProgress(newProgress);
            
            // For desktop: Update the clip path based on scroll percentage
            if (!isMobile && imageContainerRef.current) {
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
                nextSection.style.opacity = '0'; // Ensure it's invisible
            } else {
                // Reset position when horizontal scroll is complete
                nextSection.style.position = 'relative';
                nextSection.style.top = 'auto';
                nextSection.style.opacity = '1';
            }
            
            // 5. Apply styles to parent container if needed
            const parentElement = thisSection.parentElement;
            if (parentElement) {
                parentElement.style.position = 'relative';
                parentElement.style.overflow = 'hidden';
            }
            
            // 6. Apply styles to all following siblings to ensure they're hidden during scroll
            let sibling = nextSection.nextElementSibling;
            while (sibling) {
                if (!isAtEnd) {
                    sibling.style.position = 'absolute';
                    sibling.style.top = '2000vh'; // Push even further below
                    sibling.style.visibility = 'hidden';
                    sibling.style.opacity = '0';
                } else {
                    sibling.style.position = 'relative';
                    sibling.style.top = 'auto';
                    sibling.style.visibility = 'visible';
                    sibling.style.opacity = '1';
                }
                sibling = sibling.nextElementSibling;
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
                
                // Make sure section positioning is reset
                section.style.position = 'relative';
                section.style.top = 'auto';
                section.style.left = 'auto';
                section.style.width = 'auto';
                
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
                
                const targetScrollLeft = scrollProgress * scrollDistance;
                
                // Update horizontal scroll - this reveals the image
                container.scrollLeft = targetScrollLeft;
                
                // Update reveal effect for both mobile and desktop
                updateReveal(targetScrollLeft);
                
                // Add a virtual placeholder to maintain scroll position
                // This is critical to prevent content jumping
                const bodyPlaceholder = document.createElement('div');
                bodyPlaceholder.id = 'scroll-placeholder';
                bodyPlaceholder.style.height = `${sectionHeight}px`;
                bodyPlaceholder.style.display = 'none';
                
                // If a placeholder doesn't exist, add it
                if (!document.getElementById('scroll-placeholder')) {
                    document.body.appendChild(bodyPlaceholder);
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
                    
                    // Force a slight delay to ensure smooth transition to next section
                    setTimeout(() => {
                        applySectionSeparation();
                    }, 100);
                }
            } else {
                // If horizontal scroll is complete, unpin the section
                section.style.position = 'relative';
                section.style.top = 'auto';
                section.style.left = 'auto';
                
                // Remove the placeholder if it exists
                const placeholder = document.getElementById('scroll-placeholder');
                if (placeholder) {
                    placeholder.remove();
                }
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
        if (!section || !container || !isMobile) return; // Only apply for mobile
        
        let touchStartY = 0;
        let touchLastY = 0;
        let lastScrollY = 0;
        let isTouchScrolling = false;
        
        // Record the initial touch position
        const handleTouchStart = (e) => {
            touchStartY = e.touches[0].clientY;
            touchLastY = touchStartY;
            lastScrollY = window.scrollY;
            isTouchScrolling = true;
            
            // Make sure the next section is properly hidden during touch scrolling
            if (!isAtEnd) {
                applySectionSeparation();
            }
        };
        
        // Handle touch movement for mobile reveal
        const handleTouchMove = (e) => {
            if (!isMobile || isAtEnd || !isTouchScrolling) return;
            
            const currentY = e.touches[0].clientY;
            const deltaY = touchLastY - currentY;
            
            // Prevent default only within the horizontal scroll section
            // This helps prevent the vertical content from scrolling prematurely
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                e.preventDefault();
            }
            
            // Update scroll position
            if (window.scrollY >= sectionTop && !isAtEnd) {
                // Calculate new scroll progress based on vertical scroll
                const newScrollY = lastScrollY + deltaY;
                const effectiveScrollY = Math.max(sectionTop, Math.min(sectionTop + sectionHeight, newScrollY));
                const newProgress = (effectiveScrollY - sectionTop) / sectionHeight;
                
                // Apply the scroll progress directly for mobile
                setScrollProgress(Math.min(1, newProgress));
                
                // Update horizontal scroll position
                const targetScrollLeft = newProgress * scrollDistance;
                if (container.scrollLeft !== targetScrollLeft) {
                    container.scrollLeft = targetScrollLeft;
                }
                
                // Block vertical scrolling movement until horizontal is complete
                if (newScrollY > sectionTop + sectionHeight * 0.5 && !isAtEnd) {
                    window.scrollTo({
                        top: sectionTop + sectionHeight * 0.5,
                        behavior: 'auto'
                    });
                }
                
                // Check if we've reached the end
                if (newProgress >= 0.95 && !isAtEnd) {
                    setIsAtEnd(true);
                    setScrollProgress(1);
                    
                    // Force immediate application of section separation
                    setTimeout(() => {
                        applySectionSeparation();
                    }, 50);
                }
            }
            
            // Update tracking variables
            touchLastY = currentY;
        };
        
        // Handle touch end event
        const handleTouchEnd = () => {
            isTouchScrolling = false;
            
            // Ensure next section visibility is correctly set
            if (isAtEnd) {
                applySectionSeparation();
            }
        };
        
        // Add touch event listeners
        section.addEventListener('touchstart', handleTouchStart, { passive: true });
        section.addEventListener('touchmove', handleTouchMove, { passive: true });
        section.addEventListener('touchend', handleTouchEnd, { passive: true });
        
        return () => {
            section.removeEventListener('touchstart', handleTouchStart);
            section.removeEventListener('touchmove', handleTouchMove);
            section.removeEventListener('touchend', handleTouchEnd);
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
                marginBottom: isMobile ? '450px' : '350px', // Even larger margin on mobile
                paddingBottom: '50px', // Additional padding at the bottom
                zIndex: '10', // Higher than other content
                isolation: 'isolate' // Create a new stacking context
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
                                opacity: scrollProgress, // Use scrollProgress for opacity
                                transition: 'opacity 0.1s ease-out', // Added transition
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
                zIndex: '1'
            }}></div>
        </section>
    );
};

// Add this CSS to your stylesheet
// .hide-scrollbar::-webkit-scrollbar {
//     display: none;
// }

export default HorizontalScroll;