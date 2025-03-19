import React from 'react'
import { useState, useRef, useEffect } from 'react'
import './rulers.css'

function Rulers({ rulersImagesArray, moveToRulers, setMoveToRulers }) {
    const [inchesRuler, settingsIcon, rulesIcon] = rulersImagesArray
    const mousePosXStart = useRef(0)
    const mousePosYStart = useRef(0)
    const mousePosXDiff = useRef(0)
    const mousePosYDiff = useRef(0)
    const rulersRulesIconRef = useRef(null)
    const settingsIconRef = useRef(null)
    const rulerTitle = useRef('inchesRuler')
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
    const openOrClose = (element) => {
        if (element.current.style.visibility === "hidden") {
            element.current.style.visibility = "visible"
        } else {
            element.current.style.visibility = "hidden"
        }
    }
    const animateElements = () => {
        const rulersElements = [rulersTitleRef, rulersRulesIconRef, rulerRef]
        for (let i = 0; i < rulersElements.length; i++) {
            readyForAnimation(rulersElements[i])
        }
        rulersTitleRef.current.style.animationName = 'appearFromRight'
        rulerRef.current.style.animationName = 'appearFromRightRuler'
        rulersRulesIconRef.current.style.animationName = 'appearFromRightRulersRules'
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
            rulersRulesIconRef.current.style.display = 'inline'
            rulerRef.current.style.display = 'block'
            const rulersElements = [rulersTitleRef, rulersRulesIconRef, rulerRef]
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
        rulersRulesIconRef.current.style.display = 'none'
    }, [])
    return (
        <div>
            <img onClick='{() => openOrClose(rulesBox)}' id='rulersRulesIcon' src={rulesIcon} ref={rulersRulesIconRef} alt='rulersRulesIcon' title="rulersRules" />
            <div id='rulersTitle' ref={rulersTitleRef}>Rulers</div>
            <img id='ruler' src={inchesRuler} ref={rulerRef} alt={rulerTitle.current} title={rulerTitle.current}/>
        </div>
    )
}

export default Rulers