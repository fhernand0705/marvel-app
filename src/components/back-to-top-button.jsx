import React, { useState, useEffect } from 'react';
import ArrowUpButton from './common/arrow-up-button';

function BackToTopBtn() {
    const [showScrollBtn, setShowScrollBtn] = useState(false); 
    
    useEffect(() => {
        window.addEventListener('scroll', () => {
            const scrollPosY = window.scrollY;
            
            if (scrollPosY > 2500) {
                return setShowScrollBtn(true); 
            } 
            setShowScrollBtn(false);            
        })
    }, [])

    const handleScroll = () => {
        const currentScrollPos = document.documentElement.scrollTop || document.body.scrollTop; 

        if (currentScrollPos > 0) {
            window.requestAnimationFrame(handleScroll); 
            window.scrollTo(0, currentScrollPos - currentScrollPos / 10);
        }
    }

    return (
        <React.Fragment>
            {showScrollBtn && <ArrowUpButton scrollToTop={handleScroll}/>}
        </React.Fragment>
    )
}

export default BackToTopBtn;