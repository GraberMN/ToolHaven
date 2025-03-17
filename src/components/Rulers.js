import React from 'react'
import { useState, useRef, useEffect } from 'react'
import './rulers.css'

function Rulers({ moveToRulers, setMoveToRulers }) {
    const mousePosXStart = useRef(0)
    const mousePosYStart = useRef(0)
    const mousePosXDiff = useRef(0)
    const mousePosYDiff = useRef(0)
    const rulersTitleRef = useRef(null)
    const rulerRef = useRef(null)
    const allowRulerDrag = () => {
        mousePosXStart.current = 0
        mousePosYStart.current = 0
        mousePosXDiff.current = 0
        mousePosYDiff.current = 0
        rulerRef.current.addEventListener('mousedown', startRulerDrag)
    }
    const startRulerDrag = (e) => {
        e.preventDefault()
        mousePosXStart.current = e.clientX
        mousePosYStart.current = e.clientY
        document.addEventListener('mouseup', stopRulerDrag)
        document.addEventListener('mousemove', rulerDrag)
    }
    const rulerDrag = (e) => {
        e.preventDefault()
        mousePosXDiff.current = mousePosXStart.current - e.clientX
        mousePosYDiff.current = mousePosYStart.current - e.clientY
        mousePosXStart.current = e.clientX
        mousePosYStart.current = e.clientY
        rulerRef.current.style.top = (rulerRef.current.offsetTop - mousePosYDiff.current) + 'px'
        rulerRef.current.style.left = (rulerRef.current.offsetLeft - mousePosXDiff.current) + 'px'
    }
    const stopRulerDrag = () => {
        document.removeEventListener('mouseup', stopRulerDrag)
        document.removeEventListener('mousemove', rulerDrag)
    }
    const animateElements = () => {
        const rulersElements = [rulersTitleRef, rulerRef]
        for (let i = 0; i < rulersElements.length; i++) {
            readyForAnimation(rulersElements[i])
        }
        rulersTitleRef.current.style.animationName = 'appearFromRight'
        rulerRef.current.style.animationName = 'appearFromRightRuler'
    }
    const readyForMove = (element) => {
        element.current.style.opacity = '0'
    }
    const readyForAnimation = (element) => {
        element.current.style.animationName = 'none'
        element.current.classList.remove('readyForAnim')
        element.current.classList.add('readyForAnim')
    }
    useEffect(() => {
        if (moveToRulers) {
            rulersTitleRef.current.style.display = 'block'
            rulerRef.current.style.display = 'block'
            const rulersElements = [rulersTitleRef, rulerRef]
            for (let i = 0; i < rulersElements.length; i++) {
                readyForMove(rulersElements[i])
            }
            allowRulerDrag()
            document.body.style.backgroundColor = 'rgba(191, 248, 248, 0.48)'
            setTimeout(() => {
                animateElements()
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
            <div id='ruler' ref={rulerRef}></div>
        </div>
    )
}

export default Rulers