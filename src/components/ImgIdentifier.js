import React from 'react';
import { useState, useRef, useEffect } from 'react';
import './imgIdentifier.css';

function ImgIdentifier({ imgIdentifierImagesArray, moveToImgIdentifier, setMoveToImgIdentifier }) {
    const [rulesIcon, settingsIcon, homeButton] = imgIdentifierImagesArray;
    const imgIdentifierRulesIconRef = useRef(null);
    const imgIdentifierRulesBox = useRef(null);
    const openOrClose = (element) => {
        if (element.current.style.visibility === "hidden") {
            element.current.style.visibility = "visible";
        } else {
            element.current.style.visibility = "hidden";
        }
    }
    const onAdjustWindowWidthImgIdentifier = () => {
        if (window.innerWidth <= 740) {
            imgIdentifierRulesIconRef.current.style.transform = 'translateX(-260px)';
            imgIdentifierRulesBox.current.style.transform = 'translateX(-260px)';
            
        } else {
            imgIdentifierRulesIconRef.current.style.transform = 'translateX(-367px)';
            imgIdentifierRulesBox.current.style.transform = 'translateX(-367px)';
        }
    }
    const animateElements = () => {
        const imgIdentifierElements = [imgIdentifierRulesIconRef, imgIdentifierRulesBox];
        for (let i = 0; i < imgIdentifierElements.length; i++) {
            readyForAnimation(imgIdentifierElements[i]);
        }

        if (window.innerWidth > 740) {
            imgIdentifierRulesIconRef.current.style.animationName = 'appearFromRightImgIdentifierRules';
            imgIdentifierRulesBox.current.style.animationName = 'appearFromRightImgIdentifierRules';
        } else {
            imgIdentifierRulesIconRef.current.style.animationName = 'appearFromRightImgIdentifierRulesSmall';
            imgIdentifierRulesBox.current.style.animationName = 'appearFromRightImgIdentifierRulesSmall';
        }
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
        if (moveToImgIdentifier) {
            imgIdentifierRulesIconRef.current.style.display = 'inline';
            imgIdentifierRulesBox.current.style.display = 'inline';
            const imgIdentifierElements = [imgIdentifierRulesIconRef, imgIdentifierRulesBox];
            for (let i = 0; i < imgIdentifierElements.length; i++) {
                readyForMove(imgIdentifierElements[i]);
            }
            document.body.style.backgroundColor = 'hsl(0, 100.00%, 85.00%)';
            setTimeout(() => {
                animateElements();
            }, 2000);
            setTimeout(() => {
                const imgIdentifierNonImgIdentifierElements = [imgIdentifierRulesIconRef, imgIdentifierRulesBox];
                for (let i = 0; i < imgIdentifierNonImgIdentifierElements.length; i++) {
                    imgIdentifierNonImgIdentifierElements[i].current.style.animationName = 'none';
                    imgIdentifierNonImgIdentifierElements[i].current.style.opacity = '100';
                }
                window.addEventListener("resize", onAdjustWindowWidthImgIdentifier);
                if (window.innerWidth <= 740) {
                    imgIdentifierRulesIconRef.current.style.transform = 'translateX(-260px)';
                    imgIdentifierRulesBox.current.style.transform = 'translateX(-260px)';
                }
            }, 4000);
        }
    }, [moveToImgIdentifier]);
    useEffect(() => {
        const goneElements = [imgIdentifierRulesIconRef, imgIdentifierRulesBox];
        for (let i = 0; i < goneElements.length; i++) {
            goneElements[i].current.style.display = 'none';
        }
    }, []);
    return (
        <div>
            <img onClick={() => openOrClose(imgIdentifierRulesBox)} id='imgIdentifierRulesIcon' draggable={false} src={rulesIcon} ref={imgIdentifierRulesIconRef} alt='imgIdentifierRulesIcon' title="imgIdentifierRules" />
            <span id='imgIdentifierRulesBox' draggable={false} ref={imgIdentifierRulesBox}>
                <div id='imgIdentifierRulesTitle' draggable={false}>Rules</div>
                <ul>
                    <li>Hover over the Identifier or any external button to find out what it is/represents.</li>
                    <li>The bottom left Home button takes you back to the Home page.</li>
                    <li>The Settings tab lets you </li>
                    <li></li>
                    <li>When changing color in Settings, drag the pointer around for it to work seamlessly.</li>
                    <li>AI Model-Specific Rules:</li>
                    <li id='lvl2li'>This Img Identifier </li>
                </ul>
            </span>
        </div>
    );
}

export default ImgIdentifier;