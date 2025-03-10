import React from 'react'
import { useState, useRef, useEffect } from 'react'
import './rulers.css'

function Rulers({moveToRulers, setMoveToRulers}) {
    const rulersTitleRef = useRef(null)
    const rulerRef = useRef(null)
    useEffect(() => {
        if (moveToRulers) {
            rulersTitleRef.current.style.display = 'block'
            rulerRef.current.style.display = 'inline'
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