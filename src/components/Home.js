import React from 'react';
import { useState, useRef, useEffect } from 'react';
import './home.css';

function Home({ homeImagesArray, moveToCalc, setMoveToCalc, moveToRulers, setMoveToRulers, moveToTimers, setMoveToTimers }) {
    const [calculatorThumbnail, rulerThumbnail, timerThumbnail, bioPic, mateosPortfolio, gitHub, linkedIn, gmail, instagram, facebook, greenRightArrow] = homeImagesArray;
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
    const toCalcTransition = () => {
        setMoveToCalc(true);
        const changedRelativeElements = [homeTitleRef, projectNameRef, toolsContainerRef, byContainerRef];
        for (let i = 0; i < changedRelativeElements.length; i++) {
            readyForAnimation(changedRelativeElements[i]);
            changedRelativeElements[i].current.style.animationName = 'fadeLeft';
        }
        rightGreenArrow.current.style.display = 'none';
        setTimeout(() => setGreenRightArrowTransitionDone(true), 2000);
    }
    const toRulersTransition = () => {
        setMoveToRulers(true);
        const changedRelativeElements = [homeTitleRef, projectNameRef, toolsContainerRef, byContainerRef];
        for (let i = 0; i < changedRelativeElements.length; i++) {
            readyForAnimation(changedRelativeElements[i]);
            changedRelativeElements[i].current.style.animationName = 'fadeLeft';
        }
        rightGreenArrow.current.style.display = 'none';
        setTimeout(() => setGreenRightArrowTransitionDone(true), 2000);
    }
    const toTimersTransition = () => {
        setMoveToTimers(true);
        const changedRelativeElements = [homeTitleRef, projectNameRef, toolsContainerRef, byContainerRef];
        for (let i = 0; i < changedRelativeElements.length; i++) {
            readyForAnimation(changedRelativeElements[i]);
            changedRelativeElements[i].current.style.animationName = 'fadeLeft';
        }
        rightGreenArrow.current.style.display = 'none';
        setTimeout(() => setGreenRightArrowTransitionDone(true), 2000);
    }
    const greenRightArrowTransition = () => {
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
                    <img onClick={() => toCalcTransition()} class='tool' id='calcTool' src={calculatorThumbnail} draggable={false} title='Calculator'></img>
                    <img onClick={() => toRulersTransition()} class='tool' id='rulerTool' src={rulerThumbnail} draggable={false} title='Rulers'></img>
                    <img onClick={() => toTimersTransition()} class='tool' id='timerTool' src={timerThumbnail} draggable={false} title='Timers'></img>
                    <img class='tool'></img>
                </span>
            </div>
            <div id='byContainer' draggable={false} ref={byContainerRef}>
                <div id='byTitle'>By: Mateo Graber, </div>
                <div id='byTitlePt2'>UF Comp Sci Freshman</div>
                <span id='bioContents'>
                    <img id='bioPic' draggable={false} src={bioPic} />
                    <span id='contactGrid'>
                        <a href='https://mateos-portfolio.vercel.app/' target='_blank'><img class='contact' id='myPortfolioContact' src={mateosPortfolio} draggable={false} alt='MyPortfolio' title='MyPortfolio' /></a>
                        <a href='https://github.com/GraberMN' target='_blank'><img class='contact' id='gitHubContact' src={gitHub} draggable={false} alt='MyGitHub' title='MyGitHub' /></a>
                        <a href='https://www.linkedin.com/in/mateo-g-33a20230b/' target='_blank'><img class='contact' id='linkedInContact' src={linkedIn} draggable={false} alt='myLinkedIn' title='MyLinkedIn' /></a>
                        <a href='mailto:grabermn3@gmail.com' target='_blank'><img class='contact' id='gmailContact' src={gmail} draggable={false} alt='MyGmail' title='MyGmail' /></a>
                        <a href='https://www.instagram.com/mayothebrotho' target='_blank'><img class='contact' id='instagramContact' src={instagram} draggable={false} alt='MyInstagram' title='MyInstagram' /></a>
                        <a href='https://www.facebook.com/profile.php?id=100086580240269' target='_blank'><img class='contact' id='facebookContact' src={facebook} draggable={false} alt='MyFacebook' title='MyFacebook' /></a>
                    </span>
                </span>
            </div>
            <map name='toCalcMap'>
                <area onClick={() => greenRightArrowTransition()} onMouseOver={() => blurGreenRightArrow()} onMouseOut={() => unBlurGreenRightArrow()} id='toCalcMap' ref={greenRightArrowArea} shape='poly' coords='34, 103.4, 29, 96.8, 23, 89, 20, 78.1, 20, 67.1, 22, 57.2, 26, 48.4, 32, 42.9, 38, 38.5, 45, 36.3, 54, 34.1, 66, 34.1, 66, 42.9, 70, 45.1, 92, 24.2, 71, 5.5, 67, 7.7, 67, 17.6, 55, 17.6, 45, 17.6, 35, 20.9, 25, 29.7, 15, 39.6, 9, 59.4, 12, 74.8, 16, 85.8, 22, 96.8, 30, 103.4' alt='toCalculator' title='toCalculator'></area>
            </map>
            <img id='toCalc' useMap='#toCalcMap' draggable={false} ref={rightGreenArrow} src={greenRightArrow} alt='toCalc'></img>
        </div>
    );
}

export default Home;