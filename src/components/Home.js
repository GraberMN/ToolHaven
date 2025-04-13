import React from 'react';
import { useState, useRef, useEffect } from 'react';
import './home.css';

function Home({ homeImagesArray, moveToCalc, setMoveToCalc }) {
    const [calculatorThumbnail, rulerThumbnail, timerThumbnail, greenRightArrow] = homeImagesArray;
    const [greenRightArrowTransitionDone, setGreenRightArrowTransitionDone] = useState(false);
    const homeTitleRef = useRef(null);
    const projectNameRef = useRef(null);
    const toolsContainerRef = useRef(null);
    const byContainerRef = useRef(null);
    const rightGreenArrow = useRef(null);
    const greenRightArrowArea = useRef(null);
    const blurGreenRightArrow = () => {
        rightGreenArrow.current.style.filter = 'blur(1px)';
        greenRightArrowArea.current.style.cursor = 'pointer';
        if (window.innerWidth <= 740) {
            rightGreenArrow.current.style.transform = 'translateX(165px) rotate(0.05turn)';
        } else {
            rightGreenArrow.current.style.transform = 'translateX(270px) rotate(0.05turn)';
        }
    }
    const unBlurGreenRightArrow = () => {
        rightGreenArrow.current.style.filter = 'blur(0px)';
        if (window.innerWidth <= 740) {
            rightGreenArrow.current.style.transform = 'translateX(165px) rotate(0turn)';
        } else {
            rightGreenArrow.current.style.transform = 'translateX(270px) rotate(0turn)';
        }
    }
    const positionGreenRightArrow = () => {
        if (rightGreenArrow.current.style.transform !== "null") {
            if (window.innerWidth <= 740) {
                rightGreenArrow.current.style.transform = 'translateX(165px)';
            } else {
                rightGreenArrow.current.style.transform = 'translateX(270px)';
            }
        }
    }
    const readyForAnimation = (element) => {
        element.current.style.animationName = 'none';
        element.current.classList.remove('readyForAnim');
        element.current.classList.add('readyForAnim');
    }
    const greenRightArrowTransition = (screenWidthBig) => {
        setMoveToCalc(true);
        const changedRelativeElements = [homeTitleRef, projectNameRef, toolsContainerRef, byContainerRef];
        for (let i = 0; i < changedRelativeElements.length; i++) {
            readyForAnimation(changedRelativeElements[i]);
            changedRelativeElements[i].current.style.animationName = 'fadeLeft';
        }
        rightGreenArrow.current.style.display = 'none';
        setTimeout(() => setGreenRightArrowTransitionDone(true), 2000);
    }
    useEffect(() => {
        if (greenRightArrowTransitionDone) {
            const homeElements = [homeTitleRef, projectNameRef, toolsContainerRef, byContainerRef];
            for (let i = 0; i < homeElements.length; i++) {
                homeElements[i].current.style.display = 'none';
            }
        }
    }, [greenRightArrowTransitionDone]);
    useEffect(() => {
        window.addEventListener("resize", positionGreenRightArrow);
        if (window.innerWidth <= 740) {
            rightGreenArrow.current.style.transform = 'translateX(165px)';
        }
        return () => {
            window.removeEventListener("resize", positionGreenRightArrow);
        }
    }, []);
    return (
        <div>
            <div id='homeTitle' draggable={false} ref={homeTitleRef}> Welcome to</div>
            <div id='projectName' draggable={false} ref={projectNameRef}>ToolHaven</div>
            <div id='toolsContainer' draggable={false} ref={toolsContainerRef}>
                <div id='toolsTitle'>Tools:</div>
                <span id='toolGrid'>
                    <img class='tool' id='calcTool' src={calculatorThumbnail} title='Calculator'></img>
                    <img class='tool' id='rulerTool' src={rulerThumbnail} title='Rulers'></img>
                    <img class='tool' id='timerTool' src={timerThumbnail} title='Timers'></img>
                    <img class='tool'></img>
                </span>
            </div>
            <div id='byContainer' draggable={false} ref={byContainerRef}>
                <div id='toolsTitle'>By:</div>
                Placeholder
            </div>
            <map name='toCalcMap'>
                <area onClick={() => window.innerWidth > 740 ? greenRightArrowTransition(true) : greenRightArrowTransition(false)} onMouseOver={() => blurGreenRightArrow()} onMouseOut={() => unBlurGreenRightArrow()} id='toCalcMap' ref={greenRightArrowArea} shape='poly' coords='34, 103.4, 29, 96.8, 23, 89, 20, 78.1, 20, 67.1, 22, 57.2, 26, 48.4, 32, 42.9, 38, 38.5, 45, 36.3, 54, 34.1, 66, 34.1, 66, 42.9, 70, 45.1, 92, 24.2, 71, 5.5, 67, 7.7, 67, 17.6, 55, 17.6, 45, 17.6, 35, 20.9, 25, 29.7, 15, 39.6, 9, 59.4, 12, 74.8, 16, 85.8, 22, 96.8, 30, 103.4' alt='toCalc' title='toCalculator'></area>
            </map>
            <img id='toCalc' useMap='#toCalcMap' draggable={false} ref={rightGreenArrow} src={greenRightArrow} alt='toCalc'></img>
        </div>
    );
}

export default Home;