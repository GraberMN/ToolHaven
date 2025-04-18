import React from 'react';
import { useState, useRef, useEffect } from 'react';
import './timers.css';

function Timers({ timersImagesArray, moveToTimers, setMoveToTimers }) {
    const [settingsIcon, rulesIcon, homeButton] = timersImagesArray;
    const [countdownBorderColorVal, setCountdownBorderColorVal] = useState('#352f2ffd');
    const [stopwatchBorderColorVal, setStopwatchBorderColorVal] = useState('#352f2ffd');
    const timersRulesIconRef = useRef(null);
    const timersRulesBox = useRef(null);
    const timersSettingsIconRef = useRef(null);
    const timersSettingsBox = useRef(null);
    const timersTitleRef = useRef(null);
    const timersContainerRef = useRef(null);
    const countdownSettingsListRef = useRef(null);
    const stopwatchSettingsListRef = useRef(null);
    const countdownSettingsTitleRef = useRef(null);
    const stopwatchSettingsTitleRef = useRef(null);
    const countdownContentRef = useRef(null);
    const stopwatchContentRef = useRef(null);
    const countdownTimerRef = useRef(null);
    const stopwatchTimerRef = useRef(null);
    const timersHomeButtonRef = useRef(null);
    const openOrClose = (element) => {
        if (element.current.style.visibility === "hidden") {
            element.current.style.visibility = "visible";
        } else {
            element.current.style.visibility = "hidden";
        }
    }
    const onCountdownBorderColorChange = (e) => {
        setCountdownBorderColorVal(e.target.value);
        countdownTimerRef.current.style.borderColor = countdownBorderColorVal;
    }
    const onStopwatchBorderColorChange = (e) => {
        setStopwatchBorderColorVal(e.target.value);
        stopwatchTimerRef.current.style.borderColor = stopwatchBorderColorVal;
    }
    const highlight = (element) => {
        element.current.style.fontWeight = '600';
        element.current.style.textDecoration = 'solid 4px';
        element.current.style.textDecorationLine = 'underline'
    }
    const unhighlight = (element) => {
        element.current.style.fontWeight = '500';
        element.current.style.textDecoration = 'none';
        element.current.style.textDecorationLine = 'none';
    }
    const onCountdownTabClick = () => {
        countdownSettingsListRef.current.style.display = 'block';
        stopwatchSettingsListRef.current.style.display = 'none';
        highlight(countdownSettingsTitleRef);
        unhighlight(stopwatchSettingsTitleRef);
        countdownContentRef.current.style.display = 'block';
        stopwatchContentRef.current.style.display = 'none';
        timersContainerRef.current.style.backgroundColor = 'rgb(255, 246, 162)';
    }
    const onStopwatchTabClick = () => {
        countdownSettingsListRef.current.style.display = 'none';
        stopwatchSettingsListRef.current.style.display = 'block';
        highlight(stopwatchSettingsTitleRef);
        unhighlight(countdownSettingsTitleRef);
        countdownContentRef.current.style.display = 'none';
        stopwatchContentRef.current.style.display = 'block';
        timersContainerRef.current.style.backgroundColor = 'rgb(228, 214, 92)';
    }
    const onAdjustWindowWidthTimers = () => {
        if (window.innerWidth <= 740) {
            timersRulesIconRef.current.style.transform = 'translateX(-260px)';
            timersRulesBox.current.style.transform = 'translateX(-260px)';
            timersSettingsIconRef.current.style.transform = 'translateX(180px)';
            timersSettingsBox.current.style.transform = 'translateX(-45px)';
            timersHomeButtonRef.current.style.transform = 'translateX(-260px)';
        } else {
            timersRulesIconRef.current.style.transform = 'translateX(-367px)';
            timersRulesBox.current.style.transform = 'translateX(-367px)';
            timersSettingsIconRef.current.style.transform = 'translateX(285px)';
            timersSettingsBox.current.style.transform = 'translateX(60px)';
            timersHomeButtonRef.current.style.transform = 'translateX(-367px)';
        }
    }
    const animateElements = () => {
        const timersElements = [timersTitleRef, timersRulesIconRef, timersRulesBox, timersSettingsIconRef, timersSettingsBox, timersContainerRef, timersHomeButtonRef];
        for (let i = 0; i < timersElements.length; i++) {
            readyForAnimation(timersElements[i]);
        }
        timersTitleRef.current.style.animationName = 'appearFromRightTimers';
        if (window.innerWidth > 740) {
            timersRulesIconRef.current.style.animationName = 'appearFromRightTimersRules';
            timersRulesBox.current.style.animationName = 'appearFromRightTimersRules';
            timersSettingsIconRef.current.style.animationName = 'appearFromRightTimersSettingsIcon';
            timersSettingsBox.current.style.animationName = 'appearFromRightTimersSettingsBox';
            timersHomeButtonRef.current.style.animationName = 'appearFromRightTimersRules';
        } else {
            timersRulesIconRef.current.style.animationName = 'appearFromRightTimersRulesSmall';
            timersRulesBox.current.style.animationName = 'appearFromRightTimersRulesSmall';
            timersSettingsIconRef.current.style.animationName = 'appearFromRightTimersSettingsIconSmall';
            timersSettingsBox.current.style.animationName = 'appearFromRightTimersSettingsBoxSmall';
            timersHomeButtonRef.current.style.animationName = 'appearFromRightTimersRulesSmall';
        }
        timersContainerRef.current.style.animationName = 'appearFromRightTimers';
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
            timersRulesIconRef.current.style.display = 'inline';
            timersRulesBox.current.style.display = 'inline';
            timersRulesBox.current.style.visibility = 'hidden';
            timersSettingsIconRef.current.style.display = 'inline';
            timersSettingsBox.current.style.display = 'inline';
            timersSettingsBox.current.style.visibility = 'hidden';
            timersContainerRef.current.style.display = 'block';
            countdownSettingsListRef.current.style.display = 'block';
            stopwatchSettingsListRef.current.style.display = 'none';
            countdownContentRef.current.style.display = 'block';
            stopwatchContentRef.current.style.display = 'none';
            timersHomeButtonRef.current.style.display = 'inline';
            const timersElements = [timersTitleRef, timersRulesIconRef, timersRulesBox, timersSettingsIconRef, timersSettingsBox, timersContainerRef, timersHomeButtonRef];
            for (let i = 0; i < timersElements.length; i++) {
                readyForMove(timersElements[i]);
            }
            document.body.style.backgroundColor = 'hsl(28, 77.80%, 85.90%)';
            timersContainerRef.current.style.backgroundColor = 'rgb(255, 246, 162)';
            setTimeout(() => {
                animateElements();
            }, 2000);
            setTimeout(() => {
                const timersNonTimerElements = [timersRulesIconRef, timersRulesBox, timersSettingsIconRef, timersSettingsBox, timersHomeButtonRef];
                for (let i = 0; i < timersNonTimerElements.length; i++) {
                    timersNonTimerElements[i].current.style.animationName = 'none';
                    timersNonTimerElements[i].current.style.opacity = '100';
                }
                window.addEventListener('resize', onAdjustWindowWidthTimers);
                if (window.innerWidth <= 740) {
                    timersRulesIconRef.current.style.transform = 'translateX(-260px)';
                    timersRulesBox.current.style.transform = 'translateX(-260px)';
                    timersSettingsIconRef.current.style.transform = 'translateX(180px)';
                    timersSettingsBox.current.style.transform = 'translateX(-45px)';
                    timersHomeButtonRef.current.style.transform = 'translateX(-260px)';
                }
            }, 4000);
        }
    }, [moveToTimers])
    useEffect(() => {
        const goneElements = [timersTitleRef, timersRulesIconRef, timersRulesBox, timersSettingsIconRef, timersSettingsBox, timersContainerRef, countdownContentRef, stopwatchContentRef, timersHomeButtonRef];
        for (let i = 0; i < goneElements.length; i++) {
            goneElements[i].current.style.display = 'none';
        }
        return () => {
            window.removeEventListener("resize", onAdjustWindowWidthTimers);
        }
    }, [])
    return (
        <div>
            <img onClick={() => openOrClose(timersRulesBox)} id='timersRulesIcon' draggable={false} src={rulesIcon} ref={timersRulesIconRef} alt='timersRulesIcon' title="timersRules" />
            <span id='timersRulesBox' draggable={false} ref={timersRulesBox}>
                <div id='timersRulesTitle' draggable={false}>Rules</div>
                <ul>
                    <li>Hover over each timer or each item/ button to find out what it is/represents.</li>
                    <li>The bottom left Home button takes you back to the Home page.</li>
                    <li>The Settings tab lets you  .</li>
                    <li>When changing color in Settings, drag the pointer around for it to work seamlessly.</li>
                    <li>Timer-Specific Rules:</li>
                    <li id='lvl2li'></li>
                </ul>
            </span>
            <img onClick={() => openOrClose(timersSettingsBox)} id='timersSettingsIcon' draggable={false} src={settingsIcon} ref={timersSettingsIconRef} alt='timersSettingsIcon' title="timersSettings" />
            <span id='timersSettingsBox' draggable={false} ref={timersSettingsBox}>
                <div id='timersSettingsTitle'>Settings</div>
                <span id='settingsTitleContainer'>
                    <div id='countdownSettingsTitle' ref={countdownSettingsTitleRef}>Countdown</div>
                    <div id='stopwatchSettingsTitle' ref={stopwatchSettingsTitleRef}>Stopwatch</div>
                </span>
                <ul id='countdownSettingsList' ref={countdownSettingsListRef}>
                    <li>Color of countdown border:</li>
                    <input type='color' value={countdownBorderColorVal} onChange={(e) => onCountdownBorderColorChange(e)} id='countdownBorderColorPicker' title='countdownBorderColorPicker' placeholder='countdownBorderColorPicker' />
                </ul>
                <ul id='stopwatchSettingsList' ref={stopwatchSettingsListRef}>
                    <li>Color of stopwatch border:</li>
                    <input type='color' value={stopwatchBorderColorVal} onChange={(e) => onStopwatchBorderColorChange(e)} id='stopwatchBorderColorPicker' title='stopwatchBorderColorPicker' placeholder='stopwatchBorderColorPicker' />
                </ul>
            </span>
            <div id='timersTitle' draggable={false} ref={timersTitleRef}>Timers</div>
            <span id='timersContainer' draggable={false} ref={timersContainerRef}>
                <span onClick={() => onCountdownTabClick()} id='countdownTab' draggable={false} title='countdownTab'>Countdown</span>
                <span onClick={() => onStopwatchTabClick()} id='stopwatchTab' draggable={false} title='stopwatchTab'>Stopwatch</span>
                <div id='countdownContent' ref={countdownContentRef}>
                    <div id='countdownTimer' ref={countdownTimerRef} title='countdownTimer'>
                        00:00:00
                    </div>
                    <span id='countdownTimerButtons'>
                        <span class='countdownTimerButton'>Start</span>
                        <span class='countdownTimerButton'>Pause</span>
                        <span class='countdownTimerButton'>Reset</span>
                        <span class='countdownTimerButton'>+1 sec</span>
                        <span class='countdownTimerButton'>+5 sec</span>
                        <span class='countdownTimerButton'>+10 sec</span>
                        <span class='countdownTimerButton'>+30 sec</span>
                        <span class='countdownTimerButton'>+1 min</span>
                        <span class='countdownTimerButton'>+5 min</span>
                        <span class='countdownTimerButton'>+30 min</span>
                        <span class='countdownTimerButton'>+1 hr</span>
                        <span class='countdownTimerButton'>+3 hr</span>
                    </span>
                </div>
                <div id='stopwatchContent' ref={stopwatchContentRef}>
                    <div id='stopwatchTimer' ref={stopwatchTimerRef} title='stopwatchTimer'>
                        00:00:00
                    </div>
                    <span id='stopwatchTimerButtons'>

                    </span>
                </div>
            </span>
            <img onClick={() => window.location.reload()} id='timersHomeButton' draggable={false} ref={timersHomeButtonRef} src={homeButton} alt='toHome' title='toHome' />
        </div>
    )
}

export default Timers