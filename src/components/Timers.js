import React from 'react';
import { useState, useRef, useEffect } from 'react';
import './timers.css';

function Timers({ timersImagesArray, moveToTimers, setMoveToTimers, moveToAIModel, setMoveToAIModel }) {
    const [settingsIcon, rulesIcon, bedsideCountdownAlarm, digitalCountdownAlarm, chaoticCountdownAlarm, coinStopwatchLapSound, joyousStopwatchLapSound, notifStopwatchLapSound, pinkRightArrow, homeButton] = timersImagesArray;
    const [lapHistory, setLapHistory] = useState([]);
    const [countdownAlarmSource, setCountdownAlarmSource] = useState(null);
    const [stopwatchLapSoundSource, setStopwatchLapSoundSource] = useState(null);
    const [countdownAlarmVolume, setCountdownAlarmVolume] = useState(20);
    const [stopwatchLapSoundVolume, setStopwatchLapSoundVolume] = useState(20);
    const [countdownBorderColorVal, setCountdownBorderColorVal] = useState('#352f2ffd');
    const [stopwatchBorderColorVal, setStopwatchBorderColorVal] = useState('#352f2ffd');
    const [pinkRightArrowTransitionDone, setPinkRightArrowTransitionDone] = useState(false);
    const countdownInterval = useRef(null);
    const hoursVal = useRef(0);
    const minutesVal = useRef(0);
    const secondsVal = useRef(0);
    const hoursValHolder = useRef(null);
    const minutesValHolder = useRef(null);
    const secondsValHolder = useRef(null);
    const countdownAlarm = useRef(null);
    const firstCountdownAlarmOption = useRef(null);
    const stopwatchInterval = useRef(null);
    const stopwatchHoursVal = useRef(0);
    const stopwatchMinutesVal = useRef(0);
    const stopwatchSecondsVal = useRef(0);
    const stopwatchHoursValHolder = useRef(null);
    const stopwatchMinutesValHolder = useRef(null);
    const stopwatchSecondsValHolder = useRef(null);
    const stopwatchLapSound = useRef(null);
    const firstStopwatchLapSoundOption = useRef(null);
    const startLapArray = useRef([0, 0, 0]);
    const endLapArray = useRef([0, 0, 0]);
    const bestLapDiv = useRef(null);
    const worstLapDiv = useRef(null);
    const lapSecArray = useRef([]);
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
    const pinkRightArrowArea = useRef(null);
    const rightPinkArrow = useRef(null);
    const timersHomeButtonRef = useRef(null);
    const startCountdown = () => {
        if (countdownInterval.current !== null) {
            return;
        }
        if (countdownTimerRef.current.style.backgroundColor = 'red') {
            countdownTimerRef.current.style.backgroundColor = 'azure';
            countdownAlarm.current.load();
        }
        if (hoursVal.current !== 0 || minutesVal.current !== 0 || secondsVal.current !== 0) {
            countdownTimerRef.current.style.backgroundColor = 'powderblue';
            countdownInterval.current = setInterval(() => {
                if (hoursVal.current === 0 && minutesVal.current === 0 && secondsVal.current === 0) {
                    clearInterval(countdownInterval.current);
                    countdownInterval.current = null;
                    countdownTimerRef.current.style.backgroundColor = 'red';
                    countdownAlarm.current.play();
                    return;
                }
                if (secondsVal.current === 0) {
                    secondsVal.current = 59;
                    if (minutesVal.current === 0) {
                        minutesVal.current = 59;
                        hoursVal.current = hoursVal.current - 1;
                    } else {
                        minutesVal.current = minutesVal.current - 1;
                    }
                } else {
                    secondsVal.current = secondsVal.current - 1;
                }
                hoursValHolder.current.innerHTML = hoursVal.current.toString();
                minutesValHolder.current.innerHTML = minutesVal.current.toString();
                secondsValHolder.current.innerHTML = secondsVal.current.toString();
            }, 1000);
        }
    }
    const pauseCountdown = () => {
        if (countdownInterval.current !== null) {
            clearInterval(countdownInterval.current);
            countdownInterval.current = null;
            countdownTimerRef.current.style.backgroundColor = 'azure';
        }
        if (countdownTimerRef.current.style.backgroundColor = 'red') {
            countdownTimerRef.current.style.backgroundColor = 'azure';
            countdownAlarm.current.load();
        }
    }
    const resetCountdown = () => {
        hoursVal.current = 0;
        minutesVal.current = 0;
        secondsVal.current = 0;
        hoursValHolder.current.innerHTML = hoursVal.current.toString();
        minutesValHolder.current.innerHTML = minutesVal.current.toString();
        secondsValHolder.current.innerHTML = secondsVal.current.toString();
        clearInterval(countdownInterval.current);
        countdownInterval.current = null;
        countdownTimerRef.current.style.backgroundColor = 'azure';
        if (countdownTimerRef.current.style.backgroundColor = 'red') {
            countdownTimerRef.current.style.backgroundColor = 'azure';
            countdownAlarm.current.load();
        }
    }
    const plusArbitrarySec = (secIncrement) => {
        if (secondsVal.current >= (60 - secIncrement)) {
            secondsVal.current = secondsVal.current + secIncrement - 60;
            if (minutesVal.current === 59) {
                minutesVal.current = 0;
                if (hoursVal.current === 99) {
                    hoursVal.current = 99;
                    minutesVal.current = 59;
                    secondsVal.current = 59;
                } else {
                    hoursVal.current = hoursVal.current + 1;
                }
            } else {
                minutesVal.current = minutesVal.current + 1;
            }
        } else {
            secondsVal.current = secondsVal.current + secIncrement;
        }
        hoursValHolder.current.innerHTML = hoursVal.current.toString();
        minutesValHolder.current.innerHTML = minutesVal.current.toString();
        secondsValHolder.current.innerHTML = secondsVal.current.toString();
        if (countdownAlarm.current.currentTime !== 0) {
            countdownTimerRef.current.style.backgroundColor = 'azure';
            countdownAlarm.current.load();
        }
    }
    const plus1Sec = () => {
        plusArbitrarySec(1);
    }
    const plus5Sec = () => {
        plusArbitrarySec(5);
    }
    const plus10Sec = () => {
        plusArbitrarySec(10);
    }
    const plus30Sec = () => {
        plusArbitrarySec(30);
    }
    const plusArbitraryMin = (minIncrement) => {
        if (minutesVal.current >= (60 - minIncrement)) {
            minutesVal.current = minutesVal.current + minIncrement - 60;
            if (hoursVal.current === 99) {
                hoursVal.current = 99;
                minutesVal.current = 59;
                secondsVal.current = 59;
            } else {
                hoursVal.current = hoursVal.current + 1;
            }
        } else {
            minutesVal.current = minutesVal.current + minIncrement;
        }
        hoursValHolder.current.innerHTML = hoursVal.current.toString();
        minutesValHolder.current.innerHTML = minutesVal.current.toString();
        secondsValHolder.current.innerHTML = secondsVal.current.toString();
        if (countdownAlarm.current.currentTime !== 0) {
            countdownTimerRef.current.style.backgroundColor = 'azure';
            countdownAlarm.current.load();
        }
    }
    const plus1Min = () => {
        plusArbitraryMin(1);
    }
    const plus5Min = () => {
        plusArbitraryMin(5);
    }
    const plus30Min = () => {
        plusArbitraryMin(30);
    }
    const plusArbitraryHour = (hourIncrement) => {
        if (hoursVal.current >= (100 - hourIncrement)) {
            hoursVal.current = 99;
            minutesVal.current = 59;
            secondsVal.current = 59;
        } else {
            hoursVal.current = hoursVal.current + hourIncrement;
        }
        hoursValHolder.current.innerHTML = hoursVal.current.toString();
        minutesValHolder.current.innerHTML = minutesVal.current.toString();
        secondsValHolder.current.innerHTML = secondsVal.current.toString();
        if (countdownAlarm.current.currentTime !== 0) {
            countdownTimerRef.current.style.backgroundColor = 'azure';
            countdownAlarm.current.load();
        }
    }
    const plus1Hr = () => {
        plusArbitraryHour(1);
    }
    const plus3Hr = () => {
        plusArbitraryHour(3);
    }
    const startStopwatch = () => {
        if (stopwatchInterval.current !== null) {
            return;
        }
        if (stopwatchHoursVal.current === 0 && stopwatchMinutesVal.current === 0 && stopwatchSecondsVal.current === 0) {
            setLapHistory([]);
            startLapArray.current = [0, 0, 0];
            endLapArray.current = [0, 0, 0];
            bestLapDiv.current.style.display = 'none';
            worstLapDiv.current.style.display = 'none';
            lapSecArray.current = [];
        }
        stopwatchTimerRef.current.style.backgroundColor = 'powderblue';
        stopwatchInterval.current = setInterval(() => {
            if (stopwatchSecondsVal.current === 59) {
                stopwatchSecondsVal.current = 0;
                if (stopwatchMinutesVal.current === 59) {
                    stopwatchMinutesVal.current = 0;
                    if (stopwatchHoursVal.current === 99) {
                        stopwatchHoursVal.current = 99;
                        stopwatchMinutesVal.current = 59;
                        stopwatchSecondsVal.current = 59;
                        stopwatchTimerRef.current.style.backgroundColor = 'azure';
                        clearInterval(stopwatchInterval.current);
                        stopwatchInterval.current = null;
                    } else {
                        stopwatchHoursVal.current = stopwatchHoursVal.current + 1;
                    }
                } else {
                    stopwatchMinutesVal.current = stopwatchMinutesVal.current + 1;
                }
            } else {
                stopwatchSecondsVal.current = stopwatchSecondsVal.current + 1;
            }
            stopwatchHoursValHolder.current.innerHTML = stopwatchHoursVal.current.toString();
            stopwatchMinutesValHolder.current.innerHTML = stopwatchMinutesVal.current.toString();
            stopwatchSecondsValHolder.current.innerHTML = stopwatchSecondsVal.current.toString();
        }, 1000);
    }
    const pauseStopwatch = () => {
        if (stopwatchInterval.current !== null) {
            stopwatchTimerRef.current.style.backgroundColor = 'azure';
            clearInterval(stopwatchInterval.current);
            stopwatchInterval.current = null;
        }
    }
    const nextLap = () => {
        if (stopwatchInterval.current !== null) {
            endLapArray.current = [stopwatchHoursVal.current, stopwatchMinutesVal.current, stopwatchSecondsVal.current];
            stopwatchLapSound.current.load();
            stopwatchLapSound.current.play();
            let secDiff = convertToSeconds(endLapArray.current) - convertToSeconds(startLapArray.current);
            lapSecArray.current = [secDiff, ...lapSecArray.current];
            const thisLapArray = convertToHrMinSec(secDiff);
            startLapArray.current = endLapArray.current;
            setLapHistory([`Lap ${lapHistory.length + 1}: ${thisLapArray[0]}hr ${thisLapArray[1]}min ${thisLapArray[2]}sec`, ...lapHistory]);
        }
    }
    const resetStopwatch = () => {
        if (stopwatchHoursVal.current !== 0 || stopwatchMinutesVal.current !== 0 || stopwatchSecondsVal.current !== 0) {
            stopwatchHoursVal.current = 0;
            stopwatchMinutesVal.current = 0;
            stopwatchSecondsVal.current = 0;
            stopwatchHoursValHolder.current.innerHTML = stopwatchHoursVal.current.toString();
            stopwatchMinutesValHolder.current.innerHTML = stopwatchMinutesVal.current.toString();
            stopwatchSecondsValHolder.current.innerHTML = stopwatchSecondsVal.current.toString();
            clearInterval(stopwatchInterval.current);
            stopwatchInterval.current = null;
            stopwatchTimerRef.current.style.backgroundColor = 'azure';
            bestLapDiv.current.style.display = 'block';
            worstLapDiv.current.style.display = 'block';
            if (lapHistory.length >= 1) {
                let fastestLap = 360000;
                let fastestLapIndex = -1;
                let slowestLap = -1;
                let slowestLapIndex = -1;
                for (let i = lapSecArray.current.length - 1; i >= 0; i--) {
                    if (lapSecArray.current[i] < fastestLap) {
                        fastestLap = lapSecArray.current[i];
                        fastestLapIndex = i;
                    }
                }
                for (let i = lapSecArray.current.length - 1; i >= 0; i--) {
                    if (lapSecArray.current[i] > slowestLap) {
                        slowestLap = lapSecArray.current[i];
                        slowestLapIndex = i;
                    }
                }
                bestLapDiv.current.innerHTML = `Best Lap: ${lapHistory[fastestLapIndex]}`;
                worstLapDiv.current.innerHTML = `Worst Lap: ${lapHistory[slowestLapIndex]}`;
            } else {
                bestLapDiv.current.innerHTML = 'Best Lap: N/A';
                worstLapDiv.current.innerHTML = 'Worst Lap: N/A';
            }
        }
    }
    const convertToSeconds = (hrMinSecArray) => {
        const [hrNum, minNum, secNum] = hrMinSecArray;
        let numSec = hrNum * 3600 + minNum * 60 + secNum;
        return numSec;
    }
    const convertToHrMinSec = (numSec) => {
        let hrNum = Math.floor(numSec / 3600);
        let minNum = Math.floor((numSec % 3600) / 60);
        let secNum = Math.floor((numSec % 3600) % 60);
        const hrMinSecArray = [hrNum, minNum, secNum];
        return hrMinSecArray;
    }
    const changeCountdownAlarmToBedside = (isChecked) => {
        if (isChecked) {
            setCountdownAlarmSource(bedsideCountdownAlarm);
        }
    }
    const changeCountdownAlarmToDigital = (isChecked) => {
        if (isChecked) {
            setCountdownAlarmSource(digitalCountdownAlarm);
        }
    }
    const changeCountdownAlarmToChaotic = (isChecked) => {
        if (isChecked) {
            setCountdownAlarmSource(chaoticCountdownAlarm);
        }
    }
    const changeStopwatchLapSoundToCoin = (isChecked) => {
        if (isChecked) {
            setStopwatchLapSoundSource(coinStopwatchLapSound);
        }
    }
    const changeStopwatchLapSoundToJoyous = (isChecked) => {
        if (isChecked) {
            setStopwatchLapSoundSource(joyousStopwatchLapSound);
        }
    }
    const changeStopwatchLapSoundToNotif = (isChecked) => {
        if (isChecked) {
            setStopwatchLapSoundSource(notifStopwatchLapSound);
        }
    }
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
        setLapHistory([]);
        resetStopwatch();
        bestLapDiv.current.style.display = 'none';
        worstLapDiv.current.style.display = 'none';
    }
    const onStopwatchTabClick = () => {
        countdownSettingsListRef.current.style.display = 'none';
        stopwatchSettingsListRef.current.style.display = 'block';
        highlight(stopwatchSettingsTitleRef);
        unhighlight(countdownSettingsTitleRef);
        countdownContentRef.current.style.display = 'none';
        stopwatchContentRef.current.style.display = 'block';
        timersContainerRef.current.style.backgroundColor = 'rgb(228, 214, 92)';
        resetCountdown();
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
    const blurPinkRightArrow = () => {
        rightPinkArrow.current.style.filter = 'blur(1px)';
        pinkRightArrowArea.current.style.cursor = 'pointer';
        if (window.innerWidth <= 740) {
            rightPinkArrow.current.style.transform = 'translateX(165px) rotate(0.05turn)';
        } else {
            rightPinkArrow.current.style.transform = 'translateX(270px) rotate(0.05turn)';
        }
    }
    const unBlurPinkRightArrow = () => {
        rightPinkArrow.current.style.filter = 'blur(0px)';
        if (window.innerWidth <= 740) {
            rightPinkArrow.current.style.transform = 'translateX(165px) rotate(0turn)';
        } else {
            rightPinkArrow.current.style.transform = 'translateX(270px) rotate(0turn)';
        }
    }
    const positionPinkRightArrow = () => {
        if (rightPinkArrow.current.style.transform !== "null") {
            if (window.innerWidth <= 740) {
                rightPinkArrow.current.style.transform = 'translateX(165px)';
            } else {
                rightPinkArrow.current.style.transform = 'translateX(270px)';
            }
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
    const pinkRightArrowTransition = (screenWidthBig) => {
        setMoveToAIModel(true);
        resetCountdown();
        onCountdownTabClick();
        const hiddenElements = [timersRulesBox, timersSettingsBox];
        for (let i = 0; i < hiddenElements.length; i++) {
            hiddenElements[i].current.style.visibility = 'hidden';
        }
        const centeredElements = [timersTitleRef, timersContainerRef];
        for (let i = 0; i < centeredElements.length; i++) {
            readyForAnimation(centeredElements[i]);
            centeredElements[i].current.style.animationName = 'fadeLeftTimers';
        }
        const timersRulesElements = [timersRulesIconRef, timersRulesBox, timersHomeButtonRef];
        for (let i = 0; i < timersRulesElements.length; i++) {
            readyForAnimation(timersRulesElements[i]);
            if (screenWidthBig) {
                timersRulesElements[i].current.style.animationName = 'fadeLeftTimersRules';
            } else {
                timersRulesElements[i].current.style.animationName = 'fadeLeftTimersRulesSmall';
            }
        }
        readyForAnimation(timersSettingsIconRef);
        if (screenWidthBig) {
            timersSettingsIconRef.current.style.animationName = 'fadeLeftTimersSettingsIcon';
        } else {
            timersSettingsIconRef.current.style.animationName = 'fadeLeftTimersSettingsIconSmall';
        }
        readyForAnimation(timersSettingsBox);
        if (screenWidthBig) {
            timersSettingsBox.current.style.animationName = 'fadeLeftTimersSettingsBox';
        } else {
            timersSettingsBox.current.style.animationName = 'fadeLeftTimersSettingsBoxSmall';
        }
        rightPinkArrow.current.style.display = 'none';
        setTimeout(() => setPinkRightArrowTransitionDone(true), 2000);
    }
    useEffect(() => {
        if (pinkRightArrowTransitionDone) {
            const animTimersElements = [timersTitleRef, timersRulesIconRef, timersRulesBox, timersSettingsIconRef, timersSettingsBox, timersContainerRef, countdownContentRef, stopwatchContentRef, rightPinkArrow, timersHomeButtonRef];
            for (let i = 0; i < animTimersElements.length; i++) {
                animTimersElements[i].current.style.display = 'none';
            }
        }
    }, [pinkRightArrowTransitionDone]);
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
            firstCountdownAlarmOption.current.checked = true;
            firstStopwatchLapSoundOption.current.checked = true;
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
                rightPinkArrow.current.style.display = 'inline';
                if (window.innerWidth <= 740) {
                    rightPinkArrow.current.style.transform = 'translateX(165px)';
                    timersRulesIconRef.current.style.transform = 'translateX(-260px)';
                    timersRulesBox.current.style.transform = 'translateX(-260px)';
                    timersSettingsIconRef.current.style.transform = 'translateX(180px)';
                    timersSettingsBox.current.style.transform = 'translateX(-45px)';
                    timersHomeButtonRef.current.style.transform = 'translateX(-260px)';
                }
            }, 4000);
        }
    }, [moveToTimers]);
    useEffect(() => {
        countdownAlarm.current.volume = countdownAlarmVolume / 100.0;
    }, [countdownAlarmVolume]);
    useEffect(() => {
        stopwatchLapSound.current.volume = stopwatchLapSoundVolume / 100.0;
    }, [stopwatchLapSoundVolume]);
    useEffect(() => {
        hoursValHolder.current.innerHTML = "0";
        minutesValHolder.current.innerHTML = "0";
        secondsValHolder.current.innerHTML = "0";
        setCountdownAlarmSource(bedsideCountdownAlarm);
        setStopwatchLapSoundSource(coinStopwatchLapSound);
        window.addEventListener("resize", positionPinkRightArrow);
        return () => {
            window.removeEventListener("resize", positionPinkRightArrow);
        }
    }, []);
    useEffect(() => {
        const goneElements = [timersTitleRef, timersRulesIconRef, timersRulesBox, timersSettingsIconRef, timersSettingsBox, timersContainerRef, countdownContentRef, stopwatchContentRef, rightPinkArrow, timersHomeButtonRef];
        for (let i = 0; i < goneElements.length; i++) {
            goneElements[i].current.style.display = 'none';
        }
        return () => {
            window.removeEventListener("resize", onAdjustWindowWidthTimers);
        }
    }, []);
    return (
        <div>
            <img onClick={() => openOrClose(timersRulesBox)} id='timersRulesIcon' draggable={false} src={rulesIcon} ref={timersRulesIconRef} alt='timersRulesIcon' title="timersRules" />
            <span id='timersRulesBox' draggable={false} ref={timersRulesBox}>
                <div id='timersRulesTitle' draggable={false}>Rules</div>
                <ul>
                    <li>Hover over each timer or each item/ button to find out what it is/represents.</li>
                    <li>The bottom left Home button takes you back to the Home page.</li>
                    <li>The Settings tab lets you adjust the countdown's alarm sound, the stopwatch's lap sound effect, their volumes, and more.</li>
                    <li>Whichever timer tab you are on dictates which timer's settings show up.</li>
                    <li>Switching timer tabs causes the timer and all that was just left behind to reset.</li>
                    <li>When changing color in Settings, drag the pointer around for it to work seamlessly.</li>
                    <li>Timer-Specific Rules:</li>
                    <li id='lvl2li'>Countdown: 3 alarm options (bedtime, digital, & chaotic), all last 9-11 sec.</li>
                    <li id='lvl2li'>Countdown: any of the 12 buttons can be pressed to stop alarm instantly.</li>
                    <li id='lvl2li'>Stopwatch: 3 lap sound options (coin, joyous, & notif), all last about 1 sec.</li>
                    <li id='lvl2li'>Stopwatch: press Reset to display best & worst lap, tie goes to earliest lap.</li>
                    <li id='lvl2li'>Stopwatch: press Reset then Start to reset the displayed laps and lap times.</li>
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
                    <li>Alarm options for countdown:</li>
                    <li id='timerInvisLi'>
                        <input type='radio' onClick={(e) => changeCountdownAlarmToBedside(e.target.checked)} name='countdownAlarmOptions' ref={firstCountdownAlarmOption} title='bedsideCountdownAlarmRadio' placeholder='bedsideCountdownAlarmRadio' /><span class='countdownAlarmType'>bedside</span>
                        <input type='radio' onClick={(e) => changeCountdownAlarmToDigital(e.target.checked)} name='countdownAlarmOptions' title='digitalCountdownAlarmRadio' placeholder='digitalCountdownAlarmRadio' /><span class='countdownAlarmType'>digital</span>
                        <input type='radio' onClick={(e) => changeCountdownAlarmToChaotic(e.target.checked)} name='countdownAlarmOptions' title='chaoticCountdownAlarmRadio' placeholder='chaoticCountdownAlarmRadio' /><span class='countdownAlarmType'>chaotic</span>
                    </li>
                    <audio src={countdownAlarmSource} ref={countdownAlarm}></audio>
                    <li>Volume of countdown alarm:</li>
                    <input type='range' min={0} max={100} value={countdownAlarmVolume} onChange={(e) => setCountdownAlarmVolume(e.target.value)} title='countdownAlarmVolumeSlider' placeholder='countdownAlarmVolumeSlider' />
                    <span title={countdownAlarmVolume + "% volume"}>{countdownAlarmVolume}</span>
                    <li>Color of countdown border:</li>
                    <input type='color' value={countdownBorderColorVal} onChange={(e) => onCountdownBorderColorChange(e)} id='countdownBorderColorPicker' title='countdownBorderColorPicker' placeholder='countdownBorderColorPicker' />
                </ul>
                <ul id='stopwatchSettingsList' ref={stopwatchSettingsListRef}>
                    <li>Lap sounds for stopwatch:</li>
                    <li id='timerInvisLi'>
                        <input type='radio' onClick={(e) => changeStopwatchLapSoundToCoin(e.target.checked)} name='stopwatchLapSoundOptions' ref={firstStopwatchLapSoundOption} title='coinStopwatchLapSoundRadio' placeholder='coinStopwatchLapSoundRadio' /><span class='stopwatchLapSoundType'>coin</span>
                        <input type='radio' onClick={(e) => changeStopwatchLapSoundToJoyous(e.target.checked)} name='stopwatchLapSoundOptions' title='joyousStopwatchLapSoundRadio' placeholder='joyousStopwatchLapSoundRadio' /><span class='stopwatchLapSoundType'>joyous</span>
                        <input type='radio' onClick={(e) => changeStopwatchLapSoundToNotif(e.target.checked)} name='stopwatchLapSoundOptions' title='notifStopwatchLapSoundRadio' placeholder='notifStopwatchLapSoundRadio' /><span class='stopwatchLapSoundType'>notif</span>
                    </li>
                    <audio src={stopwatchLapSoundSource} ref={stopwatchLapSound}></audio>
                    <li>Volume of stopwatch lap sound:</li>
                    <input type='range' min={0} max={100} value={stopwatchLapSoundVolume} onChange={(e) => setStopwatchLapSoundVolume(e.target.value)} title='stopwatchLapSoundVolumeSlider' placeholder='stopwatchLapSoundVolumeSlider' />
                    <span title={stopwatchLapSoundVolume + "% volume"}>{stopwatchLapSoundVolume}</span>
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
                        <span ref={hoursValHolder}>{hoursVal.current}</span><span class='timeMeasurement'>hr</span> <span ref={minutesValHolder}>{minutesVal.current}</span><span class='timeMeasurement'>min</span> <span ref={secondsValHolder}>{secondsVal.current}</span><span class='timeMeasurement'>sec</span>
                    </div>
                    <span id='countdownTimerButtons'>
                        <span onClick={() => startCountdown()} class='countdownTimerButton' id='countdownStart' title='countdownStart'>Start</span>
                        <span onClick={() => pauseCountdown()} class='countdownTimerButton' id='countdownPause' title='countdownPause'>Pause</span>
                        <span onClick={() => resetCountdown()} class='countdownTimerButton' id='countdownReset' title='countdownReset'>Reset</span>
                        <span onClick={() => plus1Sec()} class='countdownTimerButton' id='countdown+1sec' title='countdown+1sec'>+1 sec</span>
                        <span onClick={() => plus5Sec()} class='countdownTimerButton' id='countdown+5sec' title='countdown+5sec'>+5 sec</span>
                        <span onClick={() => plus10Sec()} class='countdownTimerButton' id='countdown+10sec' title='countdown+10sec'>+10 sec</span>
                        <span onClick={() => plus30Sec()} class='countdownTimerButton' id='countdown+30sec' title='countdown+30sec'>+30 sec</span>
                        <span onClick={() => plus1Min()} class='countdownTimerButton' id='countdown+1min' title='countdown+1min'>+1 min</span>
                        <span onClick={() => plus5Min()} class='countdownTimerButton' id='countdown+5min' title='countdown+5min'>+5 min</span>
                        <span onClick={() => plus30Min()} class='countdownTimerButton' id='countdown+30min' title='countdown+30min'>+30 min</span>
                        <span onClick={() => plus1Hr()} class='countdownTimerButton' id='countdown+1hr' title='countdown+1hr'>+1 hr</span>
                        <span onClick={() => plus3Hr()} class='countdownTimerButton' id='countdown+3hr' title='countdown+3hr'>+3 hr</span>
                    </span>
                </div>
                <div id='stopwatchContent' ref={stopwatchContentRef}>
                    <div id='stopwatchTimer' ref={stopwatchTimerRef} title='stopwatchTimer'>
                        <span ref={stopwatchHoursValHolder}>{stopwatchHoursVal.current}</span><span class='timeMeasurement'>hr</span> <span ref={stopwatchMinutesValHolder}>{stopwatchMinutesVal.current}</span><span class='timeMeasurement'>min</span> <span ref={stopwatchSecondsValHolder}>{stopwatchSecondsVal.current}</span><span class='timeMeasurement'>sec</span>
                    </div>
                    <span id='stopwatchTimerButtons'>
                        <span onClick={() => startStopwatch()} class='stopwatchTimerButton' id='stopwatchStart' title='stopwatchStart'>Start</span>
                        <span onClick={() => pauseStopwatch()} class='stopwatchTimerButton' id='stopwatchPause' title='stopwatchPause'>Pause</span>
                        <span onClick={() => nextLap()} class='stopwatchTimerButton' id='stopwatchNextLap' title='stopwatchNextLap'>Next Lap</span>
                        <span onClick={() => resetStopwatch()} class='stopwatchTimerButton' id='stopwatchReset' title='stopwatchReset'>Reset</span>
                    </span>
                    <div id='lapContainer' title='stopwatchLaps'>
                        <div id='lapContainerTitle'>Laps</div>
                        <div id='bestLap' ref={bestLapDiv}></div>
                        <div id='worstLap' ref={worstLapDiv}></div>
                        {
                            lapHistory.map((lapEntry, index) =>
                                <div key={index}>{lapEntry}</div>
                            )
                        }
                    </div>
                </div>
            </span>
            <img onClick={() => window.location.reload()} id='timersHomeButton' draggable={false} ref={timersHomeButtonRef} src={homeButton} alt='toHome' title='toHome' />
            <map name='toAIModelMap'>
                <area onClick={() => window.innerWidth > 740 ? pinkRightArrowTransition(true) : pinkRightArrowTransition(false)} onMouseOver={() => blurPinkRightArrow()} onMouseOut={() => unBlurPinkRightArrow()} id='toAIModelMap' ref={pinkRightArrowArea} shape='poly' coords='34, 103.4, 29, 96.8, 23, 89, 20, 78.1, 20, 67.1, 22, 57.2, 26, 48.4, 32, 42.9, 38, 38.5, 45, 36.3, 54, 34.1, 66, 34.1, 66, 42.9, 70, 45.1, 92, 24.2, 71, 5.5, 67, 7.7, 67, 17.6, 55, 17.6, 45, 17.6, 35, 20.9, 25, 29.7, 15, 39.6, 9, 59.4, 12, 74.8, 16, 85.8, 22, 96.8, 30, 103.4' alt='toAIModel' title='toAIModel'></area>
            </map>
            <img id='toAIModel' useMap='#toAIModelMap' draggable={false} ref={rightPinkArrow} src={pinkRightArrow} alt='toAIModel'></img>
        </div>
    );
}

export default Timers