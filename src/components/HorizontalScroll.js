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
            // Ensure full reveal by using a threshold of 0.9
            const scrollPercentage = Math.min(100, (scrollLeft / (maxScroll * 0.9)) * 100);
            
            // Direct style update
            imageContainerRef.current.style.clipPath = `inset(0 ${Math.max(0, 100 - scrollPercentage)}% 0 0)`;
            
            // Set end state when we're at 99% or more
            if (scrollPercentage >= 99 && !isAtEnd) {
                // Force full reveal
                imageContainerRef.current.style.clipPath = `inset(0 0% 0 0)`;
                setIsAtEnd(true);
            }
        }
    };

    // Reset function to allow going back to start
    const resetScroll = () => {
        // Only reset if we've scrolled back above the section
        if (window.scrollY < sectionTop - 50) {
            setIsAtEnd(false);
            if (containerRef.current) {
                containerRef.current.scrollLeft = 0;
            }
            if (imageContainerRef.current) {
                imageContainerRef.current.style.clipPath = 'inset(0 100% 0 0)';
            }
        }
    };

    // Force separation between sections
    const applySectionSeparation = () => {
        const thisSection = sectionRef.current;
        const nextSection = thisSection?.nextElementSibling;
        
        if (nextSection) {
            if (!isAtEnd) {
                // Hide next section during horizontal scroll
                nextSection.style.position = 'absolute';
                nextSection.style.top = '9999px';
                nextSection.style.visibility = 'hidden';
                nextSection.style.pointerEvents = 'none';
            } else {
                // Show next section after horizontal scroll
                nextSection.style.position = 'relative';
                nextSection.style.top = 'auto';
                nextSection.style.visibility = 'visible';
                nextSection.style.pointerEvents = 'auto';
                nextSection.style.marginTop = '350px';
            }
            
            // Parent container styles
            const parentElement = thisSection.parentElement;
            if (parentElement) {
                parentElement.style.position = 'relative';
                parentElement.style.overflow = 'visible';
            }
        }
    };

    // Apply section separation on end state change
    useEffect(() => {
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
            }
        };
    }, [isAtEnd]);

    // Main scroll handler - controls horizontal scrolling
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
        
        // Main scroll handler
        const handleScroll = () => {
            // Check if we've scrolled above the section
            if (window.scrollY < sectionTop - 50) {
                resetScroll();
            }
            
            // If we haven't reached the section yet, reset
            if (window.scrollY < sectionTop) {
                container.scrollLeft = 0;
                updateReveal(0);
                return;
            }
            
            // If we're at the end and below the section, do nothing
            if (isAtEnd && window.scrollY > sectionTop + sectionHeight) {
                return;
            }
            
            // When in the section and not at end
            if (!isAtEnd) {
                // Pin the section to viewport
                section.style.position = 'fixed';
                section.style.top = '0';
                section.style.left = '0';
                section.style.width = '100%';
                section.style.zIndex = '100';
                
                // Calculate progress through the section
                const progress = Math.min(1, (window.scrollY - sectionTop) / sectionHeight);
                const targetScrollLeft = progress * scrollDistance;
                
                // Update horizontal scroll position
                container.scrollLeft = targetScrollLeft;
                updateReveal(targetScrollLeft);
                
                // CRITICAL: Prevent vertical scrolling during horizontal phase
                // If trying to scroll past the section height, reset to section height
                if (window.scrollY > sectionTop + sectionHeight) {
                    window.scrollTo({
                        top: sectionTop + sectionHeight,
                        behavior: 'auto'
                    });
                }
            } else {
                // Once horizontal scroll is complete, unpin the section
                section.style.position = 'relative';
                section.style.top = 'auto';
                section.style.left = 'auto';
                section.style.width = '100%';
            }
        };
        
        // Window resize handler
        const handleResize = () => {
            updateSectionMetrics();
            setScrollDistance(container.scrollWidth - container.clientWidth);
            handleScroll();
        };
        
        // Add event listeners
        window.addEventListener('scroll', handleScroll, { passive: false });
        window.addEventListener('resize', handleResize, { passive: true });
        window.addEventListener('orientationchange', handleResize, { passive: true });
        
        // Initial state setup
        handleScroll();
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('orientationchange', handleResize);
            
            // Reset styles
            if (section) {
                section.style.position = 'relative';
                section.style.top = 'auto';
                section.style.left = 'auto';
                section.style.width = '100%';
            }
        };
    }, [sectionTop, sectionHeight, scrollDistance, isAtEnd]);

    // Handle horizontal scroll events directly
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

    // Desktop wheel event handler
    useEffect(() => {
        if (isMobile) return; // Skip for mobile
        
        const section = sectionRef.current;
        const container = containerRef.current;
        if (!section || !container) return;
        
        const handleWheel = (e) => {
            // Only handle wheel events when in section and not at end
            if (!isAtEnd && window.scrollY >= sectionTop && window.scrollY <= sectionTop + sectionHeight) {
                e.preventDefault();
                
                // Update horizontal scroll based on wheel delta
                const delta = e.deltaY || e.deltaX;
                container.scrollLeft += delta;
                
                // Update image reveal
                updateReveal(container.scrollLeft);
            }
        };
        
        section.addEventListener('wheel', handleWheel, { passive: false });
        
        return () => {
            section.removeEventListener('wheel', handleWheel);
        };
    }, [sectionTop, sectionHeight, isAtEnd, isMobile]);

    // Mobile handling uses standard scroll events
    // This is handled in the main scroll handler

    return (
        <section 
            ref={sectionRef}
            style={{ 
                width: '100%', 
                height: '100vh',
                overflow: 'hidden',
                position: 'relative',
                marginBottom: '350px', // Bottom margin
                zIndex: '10'
            }}
        >
            <div 
                ref={containerRef}
                style={{
                    width: '100%',
                    height: '80%', 
                    marginTop: '25px',
                    overflowX: 'scroll',
                    overflowY: 'hidden',
                    WebkitOverflowScrolling: 'touch',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    touchAction: 'auto', // Allow standard touch actions
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
                                height: '80%',
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
                            willChange: 'clip-path',
                            transition: 'none'
                        }}
                    >
                        <img 
                            src={totalAgeSvg}
                            alt="main content"
                            style={{
                                height: '80%',
                                width: 'auto',
                                objectFit: 'contain',
                                userSelect: 'none',
                                pointerEvents: 'none'
                            }}
                        />
                    </div>
                </div>
            </div>
            
            {/* Buffer space */}
            <div style={{
                height: '200px', 
                width: '100%',
                background: 'transparent'
            }}></div>
            
            {/* Scroll indicator */}
            <div style={{
                position: 'absolute',
                bottom: '225px',
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
                    fontWeight: 'bold'
                }}>
                    {isMobile ? 'Scroll to continue' : 'Scroll to continue'}
                </div>
            </div>
        </section>
    );
};

export default HorizontalScroll;