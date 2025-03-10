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

    // Clean up and handle section visibility when component mounts/unmounts
    useEffect(() => {
        // Get the next section (to manage its visibility)
        const thisSection = containerRef.current?.closest('section');
        const nextSection = thisSection?.nextElementSibling;
        
        // Initially hide the next section until horizontal scroll is complete
        if (nextSection && !isAtEnd) {
            nextSection.style.visibility = 'hidden';
            nextSection.style.pointerEvents = 'none'; // Prevent any interaction
        }
        
        // Cleanup - ensure next section is visible when component unmounts
        return () => {
            if (nextSection) {
                nextSection.style.visibility = 'visible';
                nextSection.style.pointerEvents = 'auto';
            }
        };
    }, [isAtEnd]);
    
    // Watch for changes in isAtEnd to manage next section visibility
    useEffect(() => {
        const thisSection = containerRef.current?.closest('section');
        const nextSection = thisSection?.nextElementSibling;
        
        if (nextSection) {
            // Only show next section when horizontal scroll is complete
            nextSection.style.visibility = isAtEnd ? 'visible' : 'hidden';
            nextSection.style.pointerEvents = isAtEnd ? 'auto' : 'none'; // Prevent any interaction
        }
    }, [isAtEnd]);

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

    // Integrated vertical and horizontal scrolling effect
    useEffect(() => {
        // Get current window scroll position
        let lastScrollY = window.scrollY;
        let isManuallyScrolling = false;
        let scrollingTimer = null;
        
        // Get the scroll range for our section
        const getSectionScrollRange = () => {
            const thisSection = containerRef.current?.closest('section');
            if (!thisSection) return { top: 0, height: 0 };
            
            const rect = thisSection.getBoundingClientRect();
            return {
                top: window.scrollY + rect.top,
                height: rect.height
            };
        };
        
        // Calculate horizontal scroll from vertical position
        const updateHorizontalFromVertical = () => {
            const container = containerRef.current;
            if (!container) return;
            
            const { top, height } = getSectionScrollRange();
            const maxScroll = container.scrollWidth - container.clientWidth;
            
            // If we're within the section's scroll range
            if (window.scrollY >= top && window.scrollY <= top + height) {
                // Calculate progress through section (0 to 1)
                const progress = Math.min(1, (window.scrollY - top) / height);
                
                // Apply to horizontal scroll
                const targetScrollLeft = progress * maxScroll;
                container.scrollLeft = targetScrollLeft;
                updateReveal(targetScrollLeft);
                
                // Set end status when near the end
                if (progress >= 0.95 && !isAtEnd) {
                    setIsAtEnd(true);
                    setHasCompletedOnce(true);
                } else if (progress < 0.95 && isAtEnd) {
                    setIsAtEnd(false);
                }
            }
        };

        const handleWheel = (e) => {
            // Get the headline element
            const headline = document.querySelector('header') || 
                             document.querySelector('.headline') || 
                             document.querySelector('h1');
            
            // Get the section after this one
            const thisSection = containerRef.current?.closest('section');
            const nextSection = thisSection?.nextElementSibling;
            
            // Check if headline is still visible
            let headlineVisible = false;
            if (headline) {
                const headlineRect = headline.getBoundingClientRect();
                headlineVisible = (headlineRect.bottom > 0);
            } else {
                headlineVisible = (window.scrollY < 120);
            }
            
            // If headline is still visible, allow normal scrolling
            if (headlineVisible) {
                return;
            }
            
            // Let the page scroll naturally - horizontal will update from scroll position
            if (!isAtEnd) {
                // Just make sure next section isn't visible during horizontal scroll
                if (nextSection) {
                    nextSection.style.visibility = 'hidden';
                    nextSection.style.pointerEvents = 'none';
                }
            } 
            // If at end, make next section visible
            else if (isAtEnd) {
                if (nextSection) {
                    nextSection.style.visibility = 'visible';
                    nextSection.style.pointerEvents = 'auto';
                }
            }
        };

        // Watch page scrolling to update horizontal scroll
        const handleWindowScroll = () => {
            // Update horizontal scroll based on vertical position
            updateHorizontalFromVertical();
            
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

        // Initial setup on mount
        updateHorizontalFromVertical();

        // Add event listeners
        window.addEventListener('wheel', handleWheel, { passive: true }); // Allow natural scrolling
        window.addEventListener('scroll', handleWindowScroll, { passive: true });
        
        return () => {
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('scroll', handleWindowScroll);
            clearTimeout(window.scrollTimer);
            clearTimeout(scrollingTimer);
        };
    }, [isAtEnd]);

    // Mobile touch support - Integrated with vertical page scrolling
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let touchStartX = 0;
        let touchStartY = 0;
        let initialScrollY = 0;
        let lastTouchY = 0;
        
        // Get the scroll range for our section
        const getSectionScrollRange = () => {
            const thisSection = containerRef.current?.closest('section');
            if (!thisSection) return { top: 0, height: 0, bottom: 0 };
            
            const rect = thisSection.getBoundingClientRect();
            return {
                top: window.scrollY + rect.top,
                height: rect.height,
                bottom: window.scrollY + rect.bottom
            };
        };
        
        // Check if headline is visible
        const headlineIsVisible = () => {
            const headline = document.querySelector('header') || 
                             document.querySelector('.headline') || 
                             document.querySelector('h1');
            
            if (headline) {
                const headlineRect = headline.getBoundingClientRect();
                return (headlineRect.bottom > 0);
            }
            return (window.scrollY < 120);
        };

        // Get the next section
        const getNextSection = () => {
            const thisSection = containerRef.current?.closest('section');
            return thisSection?.nextElementSibling;
        };

        // Convert a vertical scroll position to horizontal scroll position
        const verticalToHorizontal = (scrollY) => {
            const { top, height } = getSectionScrollRange();
            const maxScroll = container.scrollWidth - container.clientWidth;
            
            // Calculate progress through section (0 to 1)
            const progress = Math.min(1, Math.max(0, (scrollY - top) / height));
            
            // Apply to horizontal scroll
            return progress * maxScroll;
        };

        const handleTouchStart = (e) => {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
            lastTouchY = touchStartY;
            initialScrollY = window.scrollY;
        };

        const handleTouchMove = (e) => {
            if (e.touches.length !== 1) return;
            
            const touchX = e.touches[0].clientX;
            const touchY = e.touches[0].clientY;
            const movementY = lastTouchY - touchY;
            lastTouchY = touchY;
            
            const nextSection = getNextSection();
            const range = getSectionScrollRange();
            
            // Update vertical scroll
            window.scrollBy(0, movementY);
            
            // If we're in our section
            if (window.scrollY >= range.top && window.scrollY <= range.bottom) {
                // Hide next section until horizontal scroll is complete
                if (nextSection && !isAtEnd) {
                    nextSection.style.visibility = 'hidden';
                    nextSection.style.pointerEvents = 'none';
                } else if (nextSection && isAtEnd) {
                    nextSection.style.visibility = 'visible';
                    nextSection.style.pointerEvents = 'auto';
                }
                
                // Convert vertical scroll to horizontal
                const targetScrollLeft = verticalToHorizontal(window.scrollY);
                container.scrollLeft = targetScrollLeft;
                updateReveal(targetScrollLeft);
            }
        };

        // Add event listeners
        container.addEventListener('touchstart', handleTouchStart, { passive: true });
        document.addEventListener('touchmove', handleTouchMove, { passive: true });
        
        return () => {
            container.removeEventListener('touchstart', handleTouchStart);
            document.removeEventListener('touchmove', handleTouchMove);
        };
    }, [isAtEnd]);

    return (
        <div style={{ 
            width: '100%', 
            height: '100%', 
            overflow: 'hidden',
            position: 'relative'
        }}>
            <div 
                ref={containerRef}
                style={{
                    width: '100%',
                    height: '100%',
                    marginTop: '25px',
                    overflowX: 'scroll',
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
        </div>
    );
};

// Add this CSS to your stylesheet
// .hide-scrollbar::-webkit-scrollbar {
//     display: none;
// }

export default HorizontalScroll;