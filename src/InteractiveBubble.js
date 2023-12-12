import React, { useEffect } from 'react';
import './styles/gradient.css';

function InteractiveBubble() {
    useEffect(() => {
        const interBubble = document.querySelector('.interactive');
        let curX = 0;
        let curY = 0;
        let tgX = 0;
        let tgY = 0;

        function move() {
            if (interBubble) {
                curX += (tgX - curX) / 5;
                curY += (tgY - curY) / 5;
                interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
            }
            requestAnimationFrame(move);
        }

        function handleMouseMove(event) {
            tgX = event.clientX;
            tgY = event.clientY;
        }

        window.addEventListener('mousemove', handleMouseMove);
        move();

        // Cleanup function to remove event listener
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div className='interactive'>
            {/* Other content */}
        </div>
    );
}

export default InteractiveBubble;
