import React from 'react'
import { useState, useRef, useEffect } from 'react'
import './rulers.css'

function Rulers({ rulersImagesArray, moveToRulers, setMoveToRulers }) {
    const [inchesRuler, settingsIcon, rulesIcon] = rulersImagesArray
    const [inchesRulerBorderColorVal, setInchesRulerBorderColorVal] = useState('#5F6B6B')
    const mousePosXStart = useRef(0)
    const mousePosYStart = useRef(0)
    const mousePosXDiff = useRef(0)
    const mousePosYDiff = useRef(0)
    const rulersRulesIconRef = useRef(null)
    const rulersRulesBox = useRef(null)
    const rulersSettingsIconRef = useRef(null)
    const rulersSettingsBox = useRef(null)
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
    const onInchesRulerBorderColorChange = (e) => {
        setInchesRulerBorderColorVal(e.target.value)
        rulerRef.current.style.borderColor = inchesRulerBorderColorVal
    }
    const onAdjustWindowWidth = () => {
        if (window.innerWidth <= 740) {
            rulersRulesIconRef.current.style.transform = 'translateX(-260px)'
            rulersRulesBox.current.style.transform = 'translateX(-260px)'
            rulersSettingsIconRef.current.style.transform = 'translateX(180px)'
            rulersSettingsBox.current.style.transform = 'translateX(-45px)'
        } else {
            rulersRulesIconRef.current.style.transform = 'translateX(-367px)'
            rulersRulesBox.current.style.transform = 'translateX(-367px)'
            rulersSettingsIconRef.current.style.transform = 'translateX(285px)'
            rulersSettingsBox.current.style.transform = 'translateX(60px)'
        }
    }
    const animateElements = () => {
        const rulersElements = [rulersTitleRef, rulersRulesIconRef, rulersRulesBox, rulersSettingsIconRef, rulersSettingsBox, rulerRef]
        for (let i = 0; i < rulersElements.length; i++) {
            readyForAnimation(rulersElements[i])
        }
        rulersTitleRef.current.style.animationName = 'appearFromRight'
        if (window.innerWidth > 740) {
            rulersRulesIconRef.current.style.animationName = 'appearFromRightRulersRules'
            rulersRulesBox.current.style.animationName = 'appearFromRightRulersRules'
            rulersSettingsIconRef.current.style.animationName = 'appearFromRightRulersSettingsIcon'
            rulersSettingsBox.current.style.animationName = 'appearFromRightRulersSettingsBox'
        } else {
            rulersRulesIconRef.current.style.animationName = 'appearFromRightRulersRulesSmall'
            rulersRulesBox.current.style.animationName = 'appearFromRightRulersRulesSmall'
            rulersSettingsIconRef.current.style.animationName = 'appearFromRightRulersSettingsIconSmall'
            rulersSettingsBox.current.style.animationName = 'appearFromRightRulersSettingsBoxSmall'
        }
        rulerRef.current.style.animationName = 'appearFromRightRuler'
    }
    const readyForAnimation = (element) => {
        element.current.style.animationName = 'none'
        element.current.classList.remove('readyForAnim')
        element.current.classList.add('readyForAnim')
    }
    const readyForMove = (element) => {
        element.current.style.opacity = '0'
    }
    useEffect(() => {
        if (moveToRulers) {
            rulersTitleRef.current.style.display = 'block'
            rulersRulesIconRef.current.style.display = 'inline'
            rulersRulesBox.current.style.display = 'inline'
            rulersRulesBox.current.style.visibility = 'hidden'
            rulersSettingsIconRef.current.style.display = 'inline'
            rulersSettingsBox.current.style.display = 'inline'
            rulersSettingsBox.current.style.visibility = 'hidden'
            rulerRef.current.style.display = 'block'
            const rulersElements = [rulersTitleRef, rulersRulesIconRef, rulersRulesBox, rulersSettingsIconRef, rulersSettingsBox, rulerRef]
            for (let i = 0; i < rulersElements.length; i++) {
                readyForMove(rulersElements[i])
            }
            allowRulerDrag()
            document.body.style.backgroundColor = 'rgba(191, 248, 248, 0.48)'
            setTimeout(() => {
                animateElements()
            }, 2000)
            setTimeout(() => {
                const rulersAbsoluteElements = [rulersRulesIconRef, rulersRulesBox, rulersSettingsIconRef, rulersSettingsBox]
                for (let i = 0; i < rulersAbsoluteElements.length; i++) {
                    rulersAbsoluteElements[i].current.style.animationName = 'none'
                    rulersAbsoluteElements[i].current.style.opacity = '100'
                }
                window.addEventListener('resize', onAdjustWindowWidth)
            }, 4000)
        }
    }, [moveToRulers])
    useEffect(() => {
        return () => {
            window.removeEventListener("resize", onAdjustWindowWidth)
        }
    }, [])
    useEffect(() => {
        rulersTitleRef.current.style.display = 'none'
        rulersRulesIconRef.current.style.display = 'none'
        rulersRulesBox.current.style.display = 'none'
        rulersSettingsIconRef.current.style.display = 'none'
        rulersSettingsBox.current.style.display = 'none'
        rulerRef.current.style.display = 'none'
    }, [])
    return (
        <div>
            <img onClick={() => openOrClose(rulersRulesBox)} id='rulersRulesIcon' src={rulesIcon} ref={rulersRulesIconRef} alt='rulersRulesIcon' title="rulersRules" />
            <span id='rulersRulesBox' ref={rulersRulesBox}>
                <div id='rulersRulesTitle'>Rules</div>
                <ul>
                    <li>Hover over each ruler or each external button to find out what it is/represents.</li>
                    <li>The Settings tab lets you adjust the rulers that are displayed or hidden, each of their border colors, and more.</li>
                    <li>There are currently 4 rulers: the inches, centimeters, picas, and pixels rulers.</li>
                    <li>When changing color in Settings, drag the pointer around for it to work seamlessly.</li>
                    <li id='lvl2li'></li>
                </ul>
            </span>
            <img onClick={() => openOrClose(rulersSettingsBox)} id='rulersSettingsIcon' src={settingsIcon} ref={rulersSettingsIconRef} alt='rulersSettingsIcon' title="rulersSettings" />
            <span id='rulersSettingsBox' ref={rulersSettingsBox}>
                <div id='rulersSettingsTitle'>Settings</div>
                <ul>
                    <li>Displayed rulers:</li>
                    <p></p>
                    <li>Color of inches ruler border:</li>
                    <input type='color' value={inchesRulerBorderColorVal} onChange={(e) => onInchesRulerBorderColorChange(e)} title='inchesRulerBorderColorPicker' placeholder='inchesRulerBorderColorPicker' />
                    <li>Color of cm ruler border:</li>
                    <input type='color' />
                    <li>Color of picas ruler border:</li>
                    <input type='color' />
                    <li>Color of pixels ruler border:</li>
                    <input type='color' />
                </ul>
            </span>
            <div id='rulersTitle' ref={rulersTitleRef}>Rulers</div>
            <img id='ruler' src={inchesRuler} ref={rulerRef} alt={rulerTitle.current} title={rulerTitle.current}/>
        </div>
    )
}

export default Rulers