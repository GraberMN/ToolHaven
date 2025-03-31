import React from 'react';
import { useState, useRef, useEffect } from 'react';
import './rulers.css';

function Rulers({ rulersImagesArray, moveToRulers, setMoveToRulers }) {
    const [inchesRuler, centimetersRuler, picasRuler, pixelsRuler, settingsIcon, rulesIcon] = rulersImagesArray;
    const [inchesRulerCheckboxChecked, setInchesRulerCheckboxChecked] = useState(true);
    const [centimetersRulerCheckboxChecked, setCentimetersRulerCheckboxChecked] = useState(false);
    const [picasRulerCheckboxChecked, setPicasRulerCheckboxChecked] = useState(false);
    const [pixelsRulerCheckboxChecked, setPixelsRulerCheckboxChecked] = useState(false);
    const [inchesRulerBorderColorVal, setInchesRulerBorderColorVal] = useState('#5F6B6B');
    const [centimetersRulerBorderColorVal, setCentimetersRulerBorderColorVal] = useState('#5F6B6B');
    const [picasRulerBorderColorVal, setPicasRulerBorderColorVal] = useState('#5F6B6B');
    const [pixelsRulerBorderColorVal, setPixelsRulerBorderColorVal] = useState('#5F6B6B');
    const inchesRulerMousePosXStart = useRef(0);
    const inchesRulerMousePosYStart = useRef(0);
    const inchesRulerMousePosXDiff = useRef(0);
    const inchesRulerMousePosYDiff = useRef(0);
    const centimetersRulerMousePosXStart = useRef(0);
    const centimetersRulerMousePosYStart = useRef(0);
    const centimetersRulerMousePosXDiff = useRef(0);
    const centimetersRulerMousePosYDiff = useRef(0);
    const picasRulerMousePosXStart = useRef(0);
    const picasRulerMousePosYStart = useRef(0);
    const picasRulerMousePosXDiff = useRef(0);
    const picasRulerMousePosYDiff = useRef(0);
    const pixelsRulerMousePosXStart = useRef(0);
    const pixelsRulerMousePosYStart = useRef(0);
    const pixelsRulerMousePosXDiff = useRef(0);
    const pixelsRulerMousePosYDiff = useRef(0);
    const inchesRulerRotationTracker = useRef('0deg');
    const centimetersRulerRotationTracker = useRef('0deg');
    const picasRulerRotationTracker = useRef('0deg');
    const pixelsRulerRotationTracker = useRef('0deg');
    const rulersRulesIconRef = useRef(null);
    const rulersRulesBox = useRef(null);
    const rulersSettingsIconRef = useRef(null);
    const rulersSettingsBox = useRef(null);
    const rulersTitleRef = useRef(null);
    const inchesRulerRef = useRef(null);
    const centimetersRulerRef = useRef(null);
    const picasRulerRef = useRef(null);
    const pixelsRulerRef = useRef(null);
    const inchesRulerCheckbox = useRef(null);
    const rulersResetButtonRef = useRef(null);
    const allowRulerDrag = () => {
        inchesRulerRef.current.addEventListener('mousedown', startInchesRulerDrag);
        centimetersRulerRef.current.addEventListener('mousedown', startCentimetersRulerDrag);
        picasRulerRef.current.addEventListener('mousedown', startPicasRulerDrag);
        pixelsRulerRef.current.addEventListener('mousedown', startPixelsRulerDrag);
    }
    const startInchesRulerDrag = (e) => {
        e.preventDefault();
        inchesRulerMousePosXStart.current = e.clientX;
        inchesRulerMousePosYStart.current = e.clientY;
        document.addEventListener('mouseup', stopInchesRulerDrag);
        document.addEventListener('mousemove', inchesRulerDrag);
    }
    const inchesRulerDrag = (e) => {
        e.preventDefault();
        inchesRulerMousePosXDiff.current = inchesRulerMousePosXStart.current - e.clientX;
        inchesRulerMousePosYDiff.current = inchesRulerMousePosYStart.current - e.clientY;
        inchesRulerMousePosXStart.current = e.clientX;
        inchesRulerMousePosYStart.current = e.clientY;
        inchesRulerRef.current.style.top = (inchesRulerRef.current.offsetTop - inchesRulerMousePosYDiff.current) + 'px';
        inchesRulerRef.current.style.left = (inchesRulerRef.current.offsetLeft - inchesRulerMousePosXDiff.current) + 'px';
    }
    const stopInchesRulerDrag = () => {
        document.removeEventListener('mouseup', stopInchesRulerDrag);
        document.removeEventListener('mousemove', inchesRulerDrag);
    }
    const startCentimetersRulerDrag = (e) => {
        e.preventDefault();
        centimetersRulerMousePosXStart.current = e.clientX;
        centimetersRulerMousePosYStart.current = e.clientY;
        document.addEventListener('mouseup', stopCentimetersRulerDrag);
        document.addEventListener('mousemove', centimetersRulerDrag);
    }
    const centimetersRulerDrag = (e) => {
        e.preventDefault();
        centimetersRulerMousePosXDiff.current = centimetersRulerMousePosXStart.current - e.clientX;
        centimetersRulerMousePosYDiff.current = centimetersRulerMousePosYStart.current - e.clientY;
        centimetersRulerMousePosXStart.current = e.clientX;
        centimetersRulerMousePosYStart.current = e.clientY;
        centimetersRulerRef.current.style.top = (centimetersRulerRef.current.offsetTop - centimetersRulerMousePosYDiff.current) + 'px';
        centimetersRulerRef.current.style.left = (centimetersRulerRef.current.offsetLeft - centimetersRulerMousePosXDiff.current) + 'px';
    }
    const stopCentimetersRulerDrag = () => {
        document.removeEventListener('mouseup', stopCentimetersRulerDrag);
        document.removeEventListener('mousemove', centimetersRulerDrag);
    }
    const startPicasRulerDrag = (e) => {
        e.preventDefault();
        picasRulerMousePosXStart.current = e.clientX;
        picasRulerMousePosYStart.current = e.clientY;
        document.addEventListener('mouseup', stopPicasRulerDrag);
        document.addEventListener('mousemove', picasRulerDrag);
    }
    const picasRulerDrag = (e) => {
        e.preventDefault();
        picasRulerMousePosXDiff.current = picasRulerMousePosXStart.current - e.clientX;
        picasRulerMousePosYDiff.current = picasRulerMousePosYStart.current - e.clientY;
        picasRulerMousePosXStart.current = e.clientX;
        picasRulerMousePosYStart.current = e.clientY;
        picasRulerRef.current.style.top = (picasRulerRef.current.offsetTop - picasRulerMousePosYDiff.current) + 'px';
        picasRulerRef.current.style.left = (picasRulerRef.current.offsetLeft - picasRulerMousePosXDiff.current) + 'px';
    }
    const stopPicasRulerDrag = () => {
        document.removeEventListener('mouseup', stopPicasRulerDrag);
        document.removeEventListener('mousemove', picasRulerDrag);
    }
    const startPixelsRulerDrag = (e) => {
        e.preventDefault();
        pixelsRulerMousePosXStart.current = e.clientX;
        pixelsRulerMousePosYStart.current = e.clientY;
        document.addEventListener('mouseup', stopPixelsRulerDrag);
        document.addEventListener('mousemove', pixelsRulerDrag);
    }
    const pixelsRulerDrag = (e) => {
        e.preventDefault();
        pixelsRulerMousePosXDiff.current = pixelsRulerMousePosXStart.current - e.clientX;
        pixelsRulerMousePosYDiff.current = pixelsRulerMousePosYStart.current - e.clientY;
        pixelsRulerMousePosXStart.current = e.clientX;
        pixelsRulerMousePosYStart.current = e.clientY;
        pixelsRulerRef.current.style.top = (pixelsRulerRef.current.offsetTop - pixelsRulerMousePosYDiff.current) + 'px';
        pixelsRulerRef.current.style.left = (pixelsRulerRef.current.offsetLeft - pixelsRulerMousePosXDiff.current) + 'px';
    }
    const stopPixelsRulerDrag = () => {
        document.removeEventListener('mouseup', stopPixelsRulerDrag);
        document.removeEventListener('mousemove', pixelsRulerDrag);
    }
    const allowRulerRotate = () => {
        const rulers = [inchesRulerRef, centimetersRulerRef, picasRulerRef, pixelsRulerRef];
        for (let i = 0; i < rulers.length; i++) {
            rulers[i].current.style.animationName = 'none';
            rulers[i].current.transformOrigin = 'center';
            rulers[i].current.style.opacity = '100';
        }
        inchesRulerRef.current.addEventListener('mouseover', inchesRulerRotate);
        inchesRulerRef.current.addEventListener('mouseleave', stopInchesRulerRotate);
        centimetersRulerRef.current.addEventListener('mouseover', centimetersRulerRotate);
        centimetersRulerRef.current.addEventListener('mouseleave', stopCentimetersRulerRotate);
        picasRulerRef.current.addEventListener('mouseover', picasRulerRotate);
        picasRulerRef.current.addEventListener('mouseleave', stopPicasRulerRotate);
        pixelsRulerRef.current.addEventListener('mouseover', pixelsRulerRotate);
        pixelsRulerRef.current.addEventListener('mouseleave', stopPixelsRulerRotate);
    }
    const inchesRulerHandleKeyDown = (e) => inchesRulerRotateByKey(e);
    const inchesRulerRotate = () => {
        inchesRulerRef.current.tabIndex = '0';
        inchesRulerRef.current.focus();
        inchesRulerRef.current.removeEventListener('keydown', inchesRulerHandleKeyDown);
        inchesRulerRef.current.addEventListener('keydown', inchesRulerHandleKeyDown);
    }
    const inchesRulerRotateByKey = (e) => {
        switch (e.key) {
            case 'a':
                inchesRulerRotationTracker.current = (parseInt(inchesRulerRotationTracker.current) - 1).toString() + 'deg';
                inchesRulerRef.current.style.transform = `translateX(calc(50vw - 50%)) rotate(${inchesRulerRotationTracker.current})`;
                break;
            case 'd':
                inchesRulerRotationTracker.current = (parseInt(inchesRulerRotationTracker.current) + 1).toString() + 'deg';
                inchesRulerRef.current.style.transform = `translateX(calc(50vw - 50%)) rotate(${inchesRulerRotationTracker.current})`;
                break;
            default:
                return;
        }
    }
    const stopInchesRulerRotate = () => {
        inchesRulerRef.current.removeEventListener('keydown', inchesRulerHandleKeyDown);
    }
    const centimetersRulerHandleKeyDown = (e) => centimetersRulerRotateByKey(e);
    const centimetersRulerRotate = () => {
        centimetersRulerRef.current.tabIndex = '0';
        centimetersRulerRef.current.focus();
        centimetersRulerRef.current.removeEventListener('keydown', centimetersRulerHandleKeyDown);
        centimetersRulerRef.current.addEventListener('keydown', centimetersRulerHandleKeyDown);
    }
    const centimetersRulerRotateByKey = (e) => {
        switch (e.key) {
            case 'a':
                centimetersRulerRotationTracker.current = (parseInt(centimetersRulerRotationTracker.current) - 1).toString() + 'deg';
                centimetersRulerRef.current.style.transform = `translateX(calc(50vw - 50%)) rotate(${centimetersRulerRotationTracker.current})`;
                break;
            case 'd':
                centimetersRulerRotationTracker.current = (parseInt(centimetersRulerRotationTracker.current) + 1).toString() + 'deg';
                centimetersRulerRef.current.style.transform = `translateX(calc(50vw - 50%)) rotate(${centimetersRulerRotationTracker.current})`;
                break;
            default:
                return;
        }
    }
    const stopCentimetersRulerRotate = () => {
        centimetersRulerRef.current.removeEventListener('keydown', centimetersRulerHandleKeyDown);
    }
    const picasRulerHandleKeyDown = (e) => picasRulerRotateByKey(e);
    const picasRulerRotate = () => {
        picasRulerRef.current.tabIndex = '0';
        picasRulerRef.current.focus();
        picasRulerRef.current.removeEventListener('keydown', picasRulerHandleKeyDown);
        picasRulerRef.current.addEventListener('keydown', picasRulerHandleKeyDown);
    }
    const picasRulerRotateByKey = (e) => {
        switch (e.key) {
            case 'a':
                picasRulerRotationTracker.current = (parseInt(picasRulerRotationTracker.current) - 1).toString() + 'deg';
                picasRulerRef.current.style.transform = `translateX(calc(50vw - 50%)) rotate(${picasRulerRotationTracker.current})`;
                break;
            case 'd':
                picasRulerRotationTracker.current = (parseInt(picasRulerRotationTracker.current) + 1).toString() + 'deg';
                picasRulerRef.current.style.transform = `translateX(calc(50vw - 50%)) rotate(${picasRulerRotationTracker.current})`;
                break;
            default:
                return;
        }
    }
    const stopPicasRulerRotate = () => {
        picasRulerRef.current.removeEventListener('keydown', picasRulerHandleKeyDown);
    }
    const pixelsRulerHandleKeyDown = (e) => pixelsRulerRotateByKey(e);
    const pixelsRulerRotate = () => {
        pixelsRulerRef.current.tabIndex = '0';
        pixelsRulerRef.current.focus();
        pixelsRulerRef.current.removeEventListener('keydown', pixelsRulerHandleKeyDown);
        pixelsRulerRef.current.addEventListener('keydown', pixelsRulerHandleKeyDown);
    }
    const pixelsRulerRotateByKey = (e) => {
        switch (e.key) {
            case 'a':
                pixelsRulerRotationTracker.current = (parseInt(pixelsRulerRotationTracker.current) - 1).toString() + 'deg';
                pixelsRulerRef.current.style.transform = `translateX(calc(50vw - 50%)) rotate(${pixelsRulerRotationTracker.current})`;
                break;
            case 'd':
                pixelsRulerRotationTracker.current = (parseInt(pixelsRulerRotationTracker.current) + 1).toString() + 'deg';
                pixelsRulerRef.current.style.transform = `translateX(calc(50vw - 50%)) rotate(${pixelsRulerRotationTracker.current})`;
                break;
            default:
                return;
        }
    }
    const stopPixelsRulerRotate = () => {
        pixelsRulerRef.current.removeEventListener('keydown', pixelsRulerHandleKeyDown);
    }
    const resetRulers = () => {
        const rulerRefs = [inchesRulerRef, centimetersRulerRef, picasRulerRef, pixelsRulerRef];
        const rotationTrackers = [inchesRulerRotationTracker, centimetersRulerRotationTracker, picasRulerRotationTracker, pixelsRulerRotationTracker]
        for (let i = 0; i < rulerRefs.length; i++) {
            rulerRefs[i].current.style.top = '135px';
            rulerRefs[i].current.style.left = '0px';
            rotationTrackers[i].current = '0deg';
            rulerRefs[i].current.style.animationName = 'none';
            rulerRefs[i].current.style.transform = `translateX(calc(50vw - 50%)) rotate(${rotationTrackers[i].current})`;
        }
    }
    const openOrClose = (element) => {
        if (element.current.style.visibility === "hidden") {
            element.current.style.visibility = "visible";
        } else {
            element.current.style.visibility = "hidden";
        }
    }
    const onInchesRulerBorderColorChange = (e) => {
        setInchesRulerBorderColorVal(e.target.value);
        inchesRulerRef.current.style.borderColor = inchesRulerBorderColorVal;
    }
    const onCentimetersRulerBorderColorChange = (e) => {
        setCentimetersRulerBorderColorVal(e.target.value);
        centimetersRulerRef.current.style.borderColor = centimetersRulerBorderColorVal;
    }
    const onPicasRulerBorderColorChange = (e) => {
        setPicasRulerBorderColorVal(e.target.value);
        picasRulerRef.current.style.borderColor = picasRulerBorderColorVal;
    }
    const onPixelsRulerBorderColorChange = (e) => {
        setPixelsRulerBorderColorVal(e.target.value);
        pixelsRulerRef.current.style.borderColor = pixelsRulerBorderColorVal;
    }
    const onAdjustWindowWidth = () => {
        if (window.innerWidth <= 740) {
            rulersRulesIconRef.current.style.transform = 'translateX(-260px)';
            rulersRulesBox.current.style.transform = 'translateX(-260px)';
            rulersSettingsIconRef.current.style.transform = 'translateX(180px)';
            rulersSettingsBox.current.style.transform = 'translateX(-45px)';
        } else {
            rulersRulesIconRef.current.style.transform = 'translateX(-367px)';
            rulersRulesBox.current.style.transform = 'translateX(-367px)';
            rulersSettingsIconRef.current.style.transform = 'translateX(285px)';
            rulersSettingsBox.current.style.transform = 'translateX(60px)';
        }
    }
    const animateElements = () => {
        const rulersElements = [rulersTitleRef, rulersRulesIconRef, rulersRulesBox, rulersSettingsIconRef, rulersSettingsBox, inchesRulerRef, centimetersRulerRef, picasRulerRef, pixelsRulerRef, rulersResetButtonRef];
        for (let i = 0; i < rulersElements.length; i++) {
            readyForAnimation(rulersElements[i]);
        }
        rulersTitleRef.current.style.animationName = 'appearFromRight';
        if (window.innerWidth > 740) {
            rulersRulesIconRef.current.style.animationName = 'appearFromRightRulersRules';
            rulersRulesBox.current.style.animationName = 'appearFromRightRulersRules';
            rulersSettingsIconRef.current.style.animationName = 'appearFromRightRulersSettingsIcon';
            rulersSettingsBox.current.style.animationName = 'appearFromRightRulersSettingsBox';
        } else {
            rulersRulesIconRef.current.style.animationName = 'appearFromRightRulersRulesSmall';
            rulersRulesBox.current.style.animationName = 'appearFromRightRulersRulesSmall';
            rulersSettingsIconRef.current.style.animationName = 'appearFromRightRulersSettingsIconSmall';
            rulersSettingsBox.current.style.animationName = 'appearFromRightRulersSettingsBoxSmall';
        }
        inchesRulerRef.current.style.animationName = 'appearFromRightRulersInchesRuler';
        centimetersRulerRef.current.style.animationName = 'appearFromRightRulersOtherRulers';
        picasRulerRef.current.style.animationName = 'appearFromRightRulersOtherRulers';
        pixelsRulerRef.current.style.animationName = 'appearFromRightRulersOtherRulers';
        rulersResetButtonRef.current.style.animationName = 'appearFromRight';
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
        if (inchesRulerCheckboxChecked) {
            inchesRulerRef.current.style.animationName = 'none';
            inchesRulerRef.current.style.visibility = 'visible';
            inchesRulerRef.current.style.transform = `translateX(calc(50vw - 50%)) rotate(${inchesRulerRotationTracker.current})`;
            inchesRulerRef.current.style.opacity = '100';
        } else {
            inchesRulerRef.current.style.opacity = '0';
            inchesRulerRef.current.style.visibility = 'hidden';
            inchesRulerRotationTracker.current = '0deg';
        }
    }, [inchesRulerCheckboxChecked]);
    useEffect(() => {
        if (centimetersRulerCheckboxChecked) {
            centimetersRulerRef.current.style.animationName = 'none';
            centimetersRulerRef.current.style.visibility = 'visible';
            centimetersRulerRef.current.style.transform = `translateX(calc(50vw - 50%)) rotate(${centimetersRulerRotationTracker.current})`;
            centimetersRulerRef.current.style.opacity = '100';
        } else {
            centimetersRulerRef.current.style.opacity = '0';
            centimetersRulerRef.current.style.visibility = 'hidden';
            centimetersRulerRotationTracker.current = '0deg'
        }
    }, [centimetersRulerCheckboxChecked]);
    useEffect(() => {
        if (picasRulerCheckboxChecked) {
            picasRulerRef.current.style.animationName = 'none';
            picasRulerRef.current.style.visibility = 'visible';
            picasRulerRef.current.style.transform = `translateX(calc(50vw - 50%)) rotate(${picasRulerRotationTracker.current})`;
            picasRulerRef.current.style.opacity = '100';
        } else {
            picasRulerRef.current.style.opacity = '0';
            picasRulerRef.current.style.visibility = 'hidden';
            picasRulerRotationTracker.current = '0deg'
        }
    }, [picasRulerCheckboxChecked]);
    useEffect(() => {
        if (pixelsRulerCheckboxChecked) {
            pixelsRulerRef.current.style.animationName = 'none';
            pixelsRulerRef.current.style.visibility = 'visible';
            pixelsRulerRef.current.style.transform = `translateX(calc(50vw - 50%)) rotate(${pixelsRulerRotationTracker.current})`;
            pixelsRulerRef.current.style.opacity = '100';
        } else {
            pixelsRulerRef.current.style.opacity = '0';
            pixelsRulerRef.current.style.visibility = 'hidden';
            pixelsRulerRotationTracker.current = '0deg'
        }
    }, [pixelsRulerCheckboxChecked]);
    useEffect(() => {
        if (moveToRulers) {
            rulersTitleRef.current.style.display = 'block';
            rulersRulesIconRef.current.style.display = 'inline';
            rulersRulesBox.current.style.display = 'inline';
            rulersRulesBox.current.style.visibility = 'hidden';
            rulersSettingsIconRef.current.style.display = 'inline';
            rulersSettingsBox.current.style.display = 'inline';
            rulersSettingsBox.current.style.visibility = 'hidden';
            inchesRulerRef.current.style.display = 'block';
            inchesRulerRef.current.style.visibility = 'visible';
            centimetersRulerRef.current.style.display = 'block';
            centimetersRulerRef.current.style.visibility = 'hidden';
            picasRulerRef.current.style.display = 'block';
            picasRulerRef.current.style.visibility = 'hidden';
            pixelsRulerRef.current.style.display = 'block';
            pixelsRulerRef.current.style.visibility = 'hidden';
            rulersResetButtonRef.current.style.display = 'block';
            const rulersElements = [rulersTitleRef, rulersRulesIconRef, rulersRulesBox, rulersSettingsIconRef, rulersSettingsBox, inchesRulerRef, centimetersRulerRef, picasRulerRef, pixelsRulerRef, rulersResetButtonRef];
            for (let i = 0; i < rulersElements.length; i++) {
                readyForMove(rulersElements[i]);
            }
            inchesRulerCheckbox.current.checked = true;
            allowRulerDrag();
            document.body.style.backgroundColor = 'rgba(191, 248, 248, 0.48)';
            setTimeout(() => {
                animateElements();
            }, 2000);
            setTimeout(() => {
                const rulersNonRulerElements = [rulersRulesIconRef, rulersRulesBox, rulersSettingsIconRef, rulersSettingsBox];
                for (let i = 0; i < rulersNonRulerElements.length; i++) {
                    rulersNonRulerElements[i].current.style.animationName = 'none';
                    rulersNonRulerElements[i].current.style.opacity = '100';
                }
                window.addEventListener('resize', onAdjustWindowWidth);
                allowRulerRotate();
            }, 4000);
        }
    }, [moveToRulers]);
    useEffect(() => {
        rulersTitleRef.current.style.display = 'none';
        rulersRulesIconRef.current.style.display = 'none';
        rulersRulesBox.current.style.display = 'none';
        rulersSettingsIconRef.current.style.display = 'none';
        rulersSettingsBox.current.style.display = 'none';
        inchesRulerRef.current.style.display = 'none';
        centimetersRulerRef.current.style.display = 'none';
        picasRulerRef.current.style.display = 'none';
        pixelsRulerRef.current.style.display = 'none';
        rulersResetButtonRef.current.style.display = 'none';
        return () => {
            window.removeEventListener("resize", onAdjustWindowWidth);
        }
    }, []);
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
                    <li>To rotate each ruler, hover over it and press/hold 'a' for counterclockwise rotation and 'd' for clockwise rotation.</li>
                    <li>A ruler's rotation resets when it is hidden and displayed once again.</li>
                    <li>The Reset button resets all 4 rulers' position and rotation, whether they are visible or not; not border colors though.</li>
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
                        in.: <input type='checkbox' onClick={(e) => setInchesRulerCheckboxChecked(e.target.checked)} ref={inchesRulerCheckbox} title='inchesRulerCheckbox' placeholder='inchesRulerCheckbox' />
                        cm: <input type='checkbox' onClick={(e) => setCentimetersRulerCheckboxChecked(e.target.checked)} title='centimetersRulerCheckbox' placeholder='centimetersRulerCheckbox' />
                        picas: <input type='checkbox' onClick={(e) => setPicasRulerCheckboxChecked(e.target.checked)} title='picasRulerCheckbox' placeholder='picasRulerCheckbox' />
                        px: <input type='checkbox' onClick={(e) => setPixelsRulerCheckboxChecked(e.target.checked)} title='pixelsRulerCheckbox' placeholder='pixelsRulerCheckbox' />
                    </li>
                    <li>Color of inches ruler border:</li>
                    <input type='color' value={inchesRulerBorderColorVal} onChange={(e) => onInchesRulerBorderColorChange(e)} id='inchesRulerBorderColorPicker' title='inchesRulerBorderColorPicker' placeholder='inchesRulerBorderColorPicker' />
                    <li>Color of cm ruler border:</li>
                    <input type='color' value={centimetersRulerBorderColorVal} onChange={(e) => onCentimetersRulerBorderColorChange(e)} id='centimetersRulerBorderColorPicker' title='centimetersRulerBorderColorPicker' placeholder='centimetersRulerBorderColorPicker' />
                    <li>Color of picas ruler border:</li>
                    <input type='color' value={picasRulerBorderColorVal} onChange={(e) => onPicasRulerBorderColorChange(e)} id='picasRulerBorderColorPicker' title='picasRulerBorderColorPicker' placeholder='picasRulerBorderColorPicker' />
                    <li>Color of pixels ruler border:</li>
                    <input type='color' value={pixelsRulerBorderColorVal} onChange={(e) => onPixelsRulerBorderColorChange(e)} id='pixelsRulerBorderColorPicker' title='pixelsRulerBorderColorPicker' placeholder='pixelsRulerBorderColorPicker' />
                </ul>
            </span>
            <div id='rulersTitle' ref={rulersTitleRef}>Rulers</div>
            <img id='inchesRuler' src={inchesRuler} ref={inchesRulerRef} alt='inchesRuler' title='inchesRuler' />
            <img id='centimetersRuler' src={centimetersRuler} ref={centimetersRulerRef} alt='centimetersRuler' title='centimetersRuler' />
            <img id='picasRuler' src={picasRuler} ref={picasRulerRef} alt='picasRuler' title='picasRuler' />
            <img id='pixelsRuler' src={pixelsRuler} ref={pixelsRulerRef} alt='pixelsRuler' title='pixelsRuler' />
            <button onClick={() => resetRulers()} id='rulersResetButton' ref={rulersResetButtonRef}>Reset</button>
        </div>
    );
}

export default Rulers;