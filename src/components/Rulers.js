import React from 'react'
import { useState, useRef, useEffect } from 'react'
import './rulers.css'

function Rulers({ rulersImagesArray, moveToRulers, setMoveToRulers }) {
    const [inchesRuler, centimetersRuler, picasRuler, pixelsRuler, settingsIcon, rulesIcon] = rulersImagesArray
    const [inchesRulerCheckboxChecked, setInchesRulerCheckboxChecked] = useState(true)
    const [centimetersRulerCheckboxChecked, setCentimetersRulerCheckboxChecked] = useState(false)
    const [picasRulerCheckboxChecked, setPicasRulerCheckboxChecked] = useState(false)
    const [pixelsRulerCheckboxChecked, setPixelsRulerCheckboxChecked] = useState(false)
    const [inchesRulerBorderColorVal, setInchesRulerBorderColorVal] = useState('#5F6B6B')
    const [centimetersRulerBorderColorVal, setCentimetersRulerBorderColorVal] = useState('#5F6B6B')
    const [picasRulerBorderColorVal, setPicasRulerBorderColorVal] = useState('#5F6B6B')
    const [pixelsRulerBorderColorVal, setPixelsRulerBorderColorVal] = useState('#5F6B6B')
    const inchesRulerMousePosXStart = useRef(0)
    const inchesRulerMousePosYStart = useRef(0)
    const inchesRulerMousePosXDiff = useRef(0)
    const inchesRulerMousePosYDiff = useRef(0)
    const centimetersRulerMousePosXStart = useRef(0)
    const centimetersRulerMousePosYStart = useRef(0)
    const centimetersRulerMousePosXDiff = useRef(0)
    const centimetersRulerMousePosYDiff = useRef(0)
    const picasRulerMousePosXStart = useRef(0)
    const picasRulerMousePosYStart = useRef(0)
    const picasRulerMousePosXDiff = useRef(0)
    const picasRulerMousePosYDiff = useRef(0)
    const pixelsRulerMousePosXStart = useRef(0)
    const pixelsRulerMousePosYStart = useRef(0)
    const pixelsRulerMousePosXDiff = useRef(0)
    const pixelsRulerMousePosYDiff = useRef(0)
    const rulersRulesIconRef = useRef(null)
    const rulersRulesBox = useRef(null)
    const rulersSettingsIconRef = useRef(null)
    const rulersSettingsBox = useRef(null)
    const rulersTitleRef = useRef(null)
    const inchesRulerRef = useRef(null)
    const centimetersRulerRef = useRef(null)
    const picasRulerRef = useRef(null)
    const pixelsRulerRef = useRef(null)
    const inchesRulerCheckbox = useRef(null)
    const allowRulerDrag = () => {
        inchesRulerRef.current.addEventListener('mousedown', startInchesRulerDrag)
        centimetersRulerRef.current.addEventListener('mousedown', startCentimetersRulerDrag)
        picasRulerRef.current.addEventListener('mousedown', startPicasRulerDrag)
        pixelsRulerRef.current.addEventListener('mousedown', startPixelsRulerDrag)
    }
    const startInchesRulerDrag = (e) => {
        e.preventDefault()
        inchesRulerMousePosXStart.current = e.clientX
        inchesRulerMousePosYStart.current = e.clientY
        document.addEventListener('mouseup', stopInchesRulerDrag)
        document.addEventListener('mousemove', inchesRulerDrag)
    }
    const inchesRulerDrag = (e) => {
        e.preventDefault()
        inchesRulerMousePosXDiff.current = inchesRulerMousePosXStart.current - e.clientX
        inchesRulerMousePosYDiff.current = inchesRulerMousePosYStart.current - e.clientY
        inchesRulerMousePosXStart.current = e.clientX
        inchesRulerMousePosYStart.current = e.clientY
        inchesRulerRef.current.style.top = (inchesRulerRef.current.offsetTop - inchesRulerMousePosYDiff.current) + 'px'
        inchesRulerRef.current.style.left = (inchesRulerRef.current.offsetLeft - inchesRulerMousePosXDiff.current) + 'px'
    }
    const stopInchesRulerDrag = () => {
        document.removeEventListener('mouseup', stopInchesRulerDrag)
        document.removeEventListener('mousemove', inchesRulerDrag)
    }
    const startCentimetersRulerDrag = (e) => {
        e.preventDefault()
        centimetersRulerMousePosXStart.current = e.clientX
        centimetersRulerMousePosYStart.current = e.clientY
        document.addEventListener('mouseup', stopCentimetersRulerDrag)
        document.addEventListener('mousemove', centimetersRulerDrag)
    }
    const centimetersRulerDrag = (e) => {
        e.preventDefault()
        centimetersRulerMousePosXDiff.current = centimetersRulerMousePosXStart.current - e.clientX
        centimetersRulerMousePosYDiff.current = centimetersRulerMousePosYStart.current - e.clientY
        centimetersRulerMousePosXStart.current = e.clientX
        centimetersRulerMousePosYStart.current = e.clientY
        centimetersRulerRef.current.style.top = (centimetersRulerRef.current.offsetTop - centimetersRulerMousePosYDiff.current) + 'px'
        centimetersRulerRef.current.style.left = (centimetersRulerRef.current.offsetLeft - centimetersRulerMousePosXDiff.current) + 'px'
    }
    const stopCentimetersRulerDrag = () => {
        document.removeEventListener('mouseup', stopCentimetersRulerDrag)
        document.removeEventListener('mousemove', centimetersRulerDrag)
    }
    const startPicasRulerDrag = (e) => {
        e.preventDefault()
        picasRulerMousePosXStart.current = e.clientX
        picasRulerMousePosYStart.current = e.clientY
        document.addEventListener('mouseup', stopPicasRulerDrag)
        document.addEventListener('mousemove', picasRulerDrag)
    }
    const picasRulerDrag = (e) => {
        e.preventDefault()
        picasRulerMousePosXDiff.current = picasRulerMousePosXStart.current - e.clientX
        picasRulerMousePosYDiff.current = picasRulerMousePosYStart.current - e.clientY
        picasRulerMousePosXStart.current = e.clientX
        picasRulerMousePosYStart.current = e.clientY
        picasRulerRef.current.style.top = (picasRulerRef.current.offsetTop - picasRulerMousePosYDiff.current) + 'px'
        picasRulerRef.current.style.left = (picasRulerRef.current.offsetLeft - picasRulerMousePosXDiff.current) + 'px'
    }
    const stopPicasRulerDrag = () => {
        document.removeEventListener('mouseup', stopPicasRulerDrag)
        document.removeEventListener('mousemove', picasRulerDrag)
    }
    const startPixelsRulerDrag = (e) => {
        e.preventDefault()
        pixelsRulerMousePosXStart.current = e.clientX
        pixelsRulerMousePosYStart.current = e.clientY
        document.addEventListener('mouseup', stopPixelsRulerDrag)
        document.addEventListener('mousemove', pixelsRulerDrag)
    }
    const pixelsRulerDrag = (e) => {
        e.preventDefault()
        pixelsRulerMousePosXDiff.current = pixelsRulerMousePosXStart.current - e.clientX
        pixelsRulerMousePosYDiff.current = pixelsRulerMousePosYStart.current - e.clientY
        pixelsRulerMousePosXStart.current = e.clientX
        pixelsRulerMousePosYStart.current = e.clientY
        pixelsRulerRef.current.style.top = (pixelsRulerRef.current.offsetTop - pixelsRulerMousePosYDiff.current) + 'px'
        pixelsRulerRef.current.style.left = (pixelsRulerRef.current.offsetLeft - pixelsRulerMousePosXDiff.current) + 'px'
    }
    const stopPixelsRulerDrag = () => {
        document.removeEventListener('mouseup', stopPixelsRulerDrag)
        document.removeEventListener('mousemove', pixelsRulerDrag)
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
        inchesRulerRef.current.style.borderColor = inchesRulerBorderColorVal
    }
    const onCentimetersRulerBorderColorChange = (e) => {
        setCentimetersRulerBorderColorVal(e.target.value)
        centimetersRulerRef.current.style.borderColor = centimetersRulerBorderColorVal
    }
    const onPicasRulerBorderColorChange = (e) => {
        setPicasRulerBorderColorVal(e.target.value)
        picasRulerRef.current.style.borderColor = picasRulerBorderColorVal
    }
    const onPixelsRulerBorderColorChange = (e) => {
        setPixelsRulerBorderColorVal(e.target.value)
        pixelsRulerRef.current.style.borderColor = pixelsRulerBorderColorVal
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
        const rulersElements = [rulersTitleRef, rulersRulesIconRef, rulersRulesBox, rulersSettingsIconRef, rulersSettingsBox, inchesRulerRef, centimetersRulerRef, picasRulerRef, pixelsRulerRef]
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
        inchesRulerRef.current.style.animationName = 'appearFromRightRulersInchesRuler'
        centimetersRulerRef.current.style.animationName = 'appearFromRightRulersOtherRulers'
        picasRulerRef.current.style.animationName = 'appearFromRightRulersOtherRulers'
        pixelsRulerRef.current.style.animationName = 'appearFromRightRulersOtherRulers'
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
        const booleanStates = [inchesRulerCheckboxChecked, centimetersRulerCheckboxChecked, picasRulerCheckboxChecked, pixelsRulerCheckboxChecked]
        const rulersRulers = [inchesRulerRef, centimetersRulerRef, picasRulerRef, pixelsRulerRef]
        for (let i = 0; i < rulersRulers.length; i++) {
            if (booleanStates[i]) {
                rulersRulers[i].current.style.animationName = 'none'
                rulersRulers[i].current.style.visibility = 'visible'
                rulersRulers[i].current.style.transform = 'translateX(calc(50vw - 50%))'
                rulersRulers[i].current.style.opacity = '100'
            } else {
                rulersRulers[i].current.style.opacity = '0'
                rulersRulers[i].current.style.visibility = 'hidden'
            }
        }
    }, [inchesRulerCheckboxChecked, centimetersRulerCheckboxChecked, picasRulerCheckboxChecked, pixelsRulerCheckboxChecked])
    useEffect(() => {
        if (moveToRulers) {
            rulersTitleRef.current.style.display = 'block'
            rulersRulesIconRef.current.style.display = 'inline'
            rulersRulesBox.current.style.display = 'inline'
            rulersRulesBox.current.style.visibility = 'hidden'
            rulersSettingsIconRef.current.style.display = 'inline'
            rulersSettingsBox.current.style.display = 'inline'
            rulersSettingsBox.current.style.visibility = 'hidden'
            inchesRulerRef.current.style.display = 'block'
            inchesRulerRef.current.style.visibility = 'visible'
            centimetersRulerRef.current.style.display = 'block'
            centimetersRulerRef.current.style.visibility = 'hidden'
            picasRulerRef.current.style.display = 'block'
            picasRulerRef.current.style.visibility = 'hidden'
            pixelsRulerRef.current.style.display = 'block'
            pixelsRulerRef.current.style.visibility = 'hidden'
            const rulersElements = [rulersTitleRef, rulersRulesIconRef, rulersRulesBox, rulersSettingsIconRef, rulersSettingsBox, inchesRulerRef, centimetersRulerRef, picasRulerRef, pixelsRulerRef]
            for (let i = 0; i < rulersElements.length; i++) {
                readyForMove(rulersElements[i])
            }
            inchesRulerCheckbox.current.checked = true
            allowRulerDrag()
            document.body.style.backgroundColor = 'rgba(191, 248, 248, 0.48)'
            setTimeout(() => {
                animateElements()
            }, 2000)
            setTimeout(() => {
                const rulersNonRulerElements = [rulersRulesIconRef, rulersRulesBox, rulersSettingsIconRef, rulersSettingsBox]
                for (let i = 0; i < rulersNonRulerElements.length; i++) {
                    rulersNonRulerElements[i].current.style.animationName = 'none'
                    rulersNonRulerElements[i].current.style.opacity = '100'
                }
                window.addEventListener('resize', onAdjustWindowWidth)
            }, 4000)
        }
    }, [moveToRulers])
    useEffect(() => {
        rulersTitleRef.current.style.display = 'none'
        rulersRulesIconRef.current.style.display = 'none'
        rulersRulesBox.current.style.display = 'none'
        rulersSettingsIconRef.current.style.display = 'none'
        rulersSettingsBox.current.style.display = 'none'
        inchesRulerRef.current.style.display = 'none'
        centimetersRulerRef.current.style.display = 'none'
        picasRulerRef.current.style.display = 'none'
        pixelsRulerRef.current.style.display = 'none'
        return () => {
            window.removeEventListener("resize", onAdjustWindowWidth)
        }
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
                    <li>The inches ruler is the only ruler that is displayed when switching to Rulers.</li>
                    <li>When changing color in Settings, drag the pointer around for it to work seamlessly.</li>
                    <li>Ruler-Specific Rules:</li>
                    <li id='lvl2li'>Inches: "in." is shorthand for inches, each ruler gap is 1/8 inch.</li>
                    <li id='lvl2li'>Centimeters: "cm" is shorthand for centimeters, each ruler gap is 1 mm.</li>
                    <li id='lvl2li'>Picas: each small ruler gap is 1 pica, each large ruler gap is 1 inch.</li>
                    <li id='lvl2li'>Pixels: each small ruler gap is 5 px, each large ruler gap is 50 px.</li>
                </ul>
            </span>
            <img onClick={() => openOrClose(rulersSettingsBox)} id='rulersSettingsIcon' src={settingsIcon} ref={rulersSettingsIconRef} alt='rulersSettingsIcon' title="rulersSettings" />
            <span id='rulersSettingsBox' ref={rulersSettingsBox}>
                <div id='rulersSettingsTitle'>Settings</div>
                <ul>
                    <li>Displayed rulers:</li>
                    <li id='invisLi'>
                        in.: <input type='checkbox' onClick={(e) => setInchesRulerCheckboxChecked(e.target.checked)} ref={inchesRulerCheckbox} />
                        cm: <input type='checkbox' onClick={(e) => setCentimetersRulerCheckboxChecked(e.target.checked)} />
                        picas: <input type='checkbox' onClick={(e) => setPicasRulerCheckboxChecked(e.target.checked)} />
                        px: <input type='checkbox' onClick={(e) => setPixelsRulerCheckboxChecked(e.target.checked)} />
                    </li>
                    <li>Color of inches ruler border:</li>
                    <input type='color' value={inchesRulerBorderColorVal} onChange={(e) => onInchesRulerBorderColorChange(e)} title='inchesRulerBorderColorPicker' placeholder='inchesRulerBorderColorPicker' />
                    <li>Color of cm ruler border:</li>
                    <input type='color' value={centimetersRulerBorderColorVal} onChange={(e) => onCentimetersRulerBorderColorChange(e)} title='centimetersRulerBorderColorPicker' placeholder='centimetersRulerBorderColorPicker' />
                    <li>Color of picas ruler border:</li>
                    <input type='color' value={picasRulerBorderColorVal} onChange={(e) => onPicasRulerBorderColorChange(e)} title='picasRulerBorderColorPicker' placeholder='picasRulerBorderColorPicker' />
                    <li>Color of pixels ruler border:</li>
                    <input type='color' value={pixelsRulerBorderColorVal} onChange={(e) => onPixelsRulerBorderColorChange(e)} title='pixelsRulerBorderColorPicker' placeholder='pixelsRulerBorderColorPicker' />
                </ul>
            </span>
            <div id='rulersTitle' ref={rulersTitleRef}>Rulers</div>
            <img id='inchesRuler' src={inchesRuler} ref={inchesRulerRef} alt='inchesRuler' title='inchesRuler' />
            <img id='centimetersRuler' src={centimetersRuler} ref={centimetersRulerRef} alt='centimetersRuler' title='centimetersRuler' />
            <img id='picasRuler' src={picasRuler} ref={picasRulerRef} alt='picasRuler' title='picasRuler' />
            <img id='pixelsRuler' src={pixelsRuler} ref={pixelsRulerRef} alt='pixelsRuler' title='pixelsRuler' />
        </div>
    )
}

export default Rulers