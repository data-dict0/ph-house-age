import React, { useRef, useState, useEffect } from 'react';
// Import your SVG directly
import totalAgeSvg from '../assets/total_age.svg';

const HorizontalScroll = () => {
    const containerRef = useRef(null);
    const imageContainerRef = useRef(null);
    const sectionRef = useRef(null);
    const [isAtEnd, setIsAtEnd] = useState(false);
    const [scrollDistance, setScrollDistance] = useState(0);
    const [sectionHeight, setSectionHeight] = useState(0);
    const [sectionTop, setSectionTop] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [forceRender, setForceRender] = useState(0); // Added to force re-renders
    
    
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
            // Use a more aggressive calculation to ensure full reveal
            // Using 0.9 instead of 0.98 means the image will be fully colored at 90% of the way
            const scrollPercentage = Math.min(100, (scrollLeft / (maxScroll * 0.9)) * 100);
            
            // Force direct style update
            imageContainerRef.current.style.clipPath = `inset(0 ${Math.max(0, 100 - scrollPercentage)}% 0 0)`;
            
            // Determine if we're at the end - when scrollPercentage is close to 100
            const reachedEnd = scrollPercentage >= 99;
            
            if (reachedEnd && !isAtEnd) {
                // Force full reveal when we reach the end
                imageContainerRef.current.style.clipPath = `inset(0 0% 0 0)`;
                setIsAtEnd(true);
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
            if (!isAtEnd) {
                // When scrolling horizontally, next section is completely hidden
                nextSection.style.position = 'absolute';
                nextSection.style.top = '9999px'; // Push far below viewport
                nextSection.style.visibility = 'hidden';
                nextSection.style.pointerEvents = 'none';
            } else {
                // Reset position when horizontal scroll is complete
                nextSection.style.position = 'relative';
                nextSection.style.top = 'auto';
                nextSection.style.visibility = 'visible';
                nextSection.style.pointerEvents = 'auto';
                
                // Add significant spacing between sections (350px)
                nextSection.style.marginTop = '350px';
            }
            
            // Apply styles to parent container if needed
            const parentElement = thisSection.parentElement;
            if (parentElement) {
                parentElement.style.position = 'relative';
                parentElement.style.overflow = 'visible'; // Changed from hidden to visible
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
                updateReveal(targetScrollLeft);
                
                // Block any attempt to scroll below the section
                if (window.scrollY > sectionTop + sectionHeight && !isAtEnd) {
                    window.scrollTo({
                        top: sectionTop + sectionHeight,
                        behavior: 'auto'
                    });
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
    }, [sectionTop, sectionHeight, scrollDistance, isAtEnd]);

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

    // Simplified mobile touch handling
    useEffect(() => {
        if (!isMobile) return; // Only run on mobile
        
        const section = sectionRef.current;
        const container = containerRef.current;
        if (!section || !container) return;
        
        let startY = 0;
        let currentY = 0;
        let scrolling = false;
        
        // Mobile scroll handler that maps vertical scroll to horizontal scroll
        const handleScroll = () => {
            if (isAtEnd) return;
            
            // Pin the section when in horizontal scroll mode
            section.style.position = 'fixed';
            section.style.top = '0';
            section.style.width = '100%';
            section.style.zIndex = '100';
            
            // Calculate scroll progress (how far down the section we've scrolled)
            const scrollProgress = Math.min(1, Math.max(0, (window.scrollY - sectionTop) / sectionHeight));
            
            // Map scroll progress to horizontal scroll distance
            const targetScrollLeft = scrollProgress * scrollDistance;
            container.scrollLeft = targetScrollLeft;
            
            // Update the image reveal
            if (imageContainerRef.current) {
                const revealPercentage = Math.min(100, (targetScrollLeft / (scrollDistance * 0.9)) * 100);
                imageContainerRef.current.style.clipPath = `inset(0 ${Math.max(0, 100 - revealPercentage)}% 0 0)`;
            }
            
            // Check if we're near the end
            if (scrollProgress >= 0.9 && !isAtEnd) {
                // Force full image reveal
                if (imageContainerRef.current) {
                    imageContainerRef.current.style.clipPath = `inset(0 0% 0 0)`;
                }
                setIsAtEnd(true);
                
                // Unpin the section
                section.style.position = 'relative';
                section.style.top = 'auto';
                
                // Apply section separation
                applySectionSeparation();
            }
        };
        
        // Add scroll event listener
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
            
            if (section) {
                section.style.position = 'relative';
                section.style.top = 'auto';
            }
        };
    }, [isMobile, isAtEnd, scrollDistance, sectionTop, sectionHeight]);

    // Add wheel event handler to convert vertical scroll to horizontal (DESKTOP ONLY)
    useEffect(() => {
        if (isMobile) return; // Skip for mobile devices - they use normal scrolling
        
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
                if (container.scrollLeft >= scrollDistance * 0.9) {
                    // Force full reveal
                    updateReveal(scrollDistance * 1.5); // Overestimate to ensure 100% reveal
                    
                    // Force clip path directly for immediate full reveal
                    if (imageContainerRef.current) {
                        imageContainerRef.current.style.clipPath = `inset(0 0% 0 0)`;
                    }
                    
                    setIsAtEnd(true);
                }
            }
        };
        
        // Add wheel event listener
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
                marginBottom: '350px', // Bottom margin
                paddingBottom: '50px', // Additional padding
                zIndex: '10' // Higher than other content
            }}
        >
            <div 
                ref={containerRef}
                style={{
                    width: '100%',
                    height: '90%', 
                    marginTop: '25px',
                    overflowX: 'scroll',
                    overflowY: 'hidden',
                    WebkitOverflowScrolling: 'touch',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    touchAction: 'auto', // Enable default touch actions for mobile scrolling
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
                                height: '90%',
                                width: 'auto',
                                objectFit: 'contain',
                                userSelect: 'none',
                                pointerEvents: 'none',
                                filter: 'grayscale(100%) opacity(40%)'
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
                            willChange: 'clip-path', // Performance optimization
                            // Remove any transition for immediate updates on mobile
                            transition: 'none'
                        }}
                    >
                        <img 
                            src={totalAgeSvg}
                            alt="main content"
                            style={{
                                height: '90%',
                                width: 'auto',
                                objectFit: 'contain',
                                userSelect: 'none',
                                pointerEvents: 'none'
                            }}
                        />
                    </div>
                </div>
            </div>
            
            {/* Buffer element to ensure spacing after the horizontal scroll content */}
            <div style={{
                height: '200px', // Buffer space
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
                    fontSize: '14px',
                    fontWeight: 'bold' // Added bold for better visibility
                }}>
                    {isMobile ? 'Swipe up to continue' : 'Scroll to continue'}
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