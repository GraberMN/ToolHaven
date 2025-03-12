import React from 'react'
import { useState, useRef, useEffect } from 'react'
import './rulers.css'

function Rulers({moveToRulers, setMoveToRulers}) {
    const rulersTitleRef = useRef(null)
    const rulerRef = useRef(null)
    const readyForAnimation = (element) => {
        element.current.style.animationName = 'none'
        element.current.classList.remove('readyForAnim')
        element.current.classList.add('readyForAnim')
    }
    useEffect(() => {
        if (moveToRulers) {
            rulersTitleRef.current.style.display = 'block'
            rulersTitleRef.current.style.opacity = '0'
            rulerRef.current.style.display = 'block'
            rulerRef.current.style.opacity = '0'
            document.body.style.backgroundColor = 'rgba(191, 248, 248, 0.48)'
            setTimeout(() => {
                const changedRelativeElements = [rulersTitleRef, rulerRef]
                for (let i = 0; i < changedRelativeElements.length; i++) {
                    readyForAnimation(changedRelativeElements[i])
                    changedRelativeElements[i].current.style.animationName = 'appearFromRight'
                }
            }, 2000)
        }
    }, [moveToRulers])
    useEffect(() => {
        rulersTitleRef.current.style.display = 'none'
        rulerRef.current.style.display = 'none'
    }, [])
    return (
        <div>
            <div id='rulersTitle' ref={rulersTitleRef}>Rulers</div>
            <div id='ruler' ref={rulerRef}>Ruler Placeholder</div>
        </div>
    )
}

export default Rulers