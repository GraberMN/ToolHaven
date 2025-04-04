import React from 'react';
import { useState, useRef, useEffect } from 'react';
import './timers.css';

function Timers({ timersImagesArray, moveToTimers, setMoveToTimers }) {
    const [rulesIcon, settingsIcon] = timersImagesArray;
    const timersTitleRef = useRef(null);
    const animateElements = () => {
        const timersElements = [timersTitleRef];
        for (let i = 0; i < timersElements.length; i++) {
            readyForAnimation(timersElements[i]);
        }
        timersTitleRef.current.style.animationName = 'appearFromRight';
        if (window.innerWidth > 740) {
            
        } else {
            
        }
        
    }
    const readyForAnimation = (element) => {
        element.current.style.animationName = 'none';
        element.current.classList.remove('readyForAnim');
        element.current.classList.add('readyForAnim');
    }
    const readyForMove = (element) => {
        element.current.style.opacity = '0';
    }
    useEffect(() => {
        if (moveToTimers) {
            timersTitleRef.current.style.display = 'block';
            const timersElements = [timersTitleRef];
            for (let i = 0; i < timersElements.length; i++) {
                readyForMove(timersElements[i]);
            }
            document.body.style.backgroundColor = 'hsl(29, 55.80%, 77.80%)';
            setTimeout(() => {
                animateElements();
            }, 2000);
        }
    }, [moveToTimers])
    useEffect(() => {
        timersTitleRef.current.style.display = 'none';
    }, [])
    return (
        <div>
            <div id='timersTitle' ref={timersTitleRef}>Timers</div>
        </div>
    )
}

export default Timers