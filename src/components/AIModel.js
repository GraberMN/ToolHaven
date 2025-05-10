import React from 'react';
import { useState, useRef, useEffect } from 'react';
import './aiModel.css';

function AIModel({ aiModelImagesArray, moveToAIModel, setMoveToAIModel }) {
    const [settingsIcon, rulesIcon, homeButton] = aiModelImagesArray;
    const aiModelRulesIconRef = useRef(null);
    const aiModelRulesBox = useRef(null);
    const aiModelSettingsIconRef = useRef(null);
    const aiModelSettingsBox = useRef(null);
    const aiModelTitleRef = useRef(null);

    const aiModelContainerRef = useRef(null);

    const aiModelHomeButtonRef = useRef(null);
    const openOrClose = (element) => {
        if (element.current.style.visibility === "hidden") {
            element.current.style.visibility = "visible";
        } else {
            element.current.style.visibility = "hidden";
        }
    }
    const onAdjustWindowWidthAIModel = () => {
        if (window.innerWidth <= 740) {
            aiModelRulesIconRef.current.style.transform = 'translateX(-260px)';
            aiModelRulesBox.current.style.transform = 'translateX(-260px)';
            aiModelSettingsIconRef.current.style.transform = 'translateX(180px)';
            aiModelSettingsBox.current.style.transform = 'translateX(-45px)';
            aiModelHomeButtonRef.current.style.transform = 'translateX(-260px)';
        } else {
            aiModelRulesIconRef.current.style.transform = 'translateX(-367px)';
            aiModelRulesBox.current.style.transform = 'translateX(-367px)';
            aiModelSettingsIconRef.current.style.transform = 'translateX(285px)';
            aiModelSettingsBox.current.style.transform = 'translateX(60px)';
            aiModelHomeButtonRef.current.style.transform = 'translateX(-367px)';
        }
    }
    const animateElements = () => {
        const aiModelElements = [aiModelTitleRef, aiModelRulesIconRef, aiModelRulesBox, aiModelSettingsIconRef, aiModelSettingsBox, aiModelContainerRef, aiModelHomeButtonRef];
        for (let i = 0; i < aiModelElements.length; i++) {
            readyForAnimation(aiModelElements[i]);
        }
        aiModelTitleRef.current.style.animationName = 'appearFromRightAIModel';
        if (window.innerWidth > 740) {
            aiModelRulesIconRef.current.style.animationName = 'appearFromRightAIModelRules';
            aiModelRulesBox.current.style.animationName = 'appearFromRightAIModelRules';
            aiModelSettingsIconRef.current.style.animationName = 'appearFromRightAIModelSettingsIcon';
            aiModelSettingsBox.current.style.animationName = 'appearFromRightAIModelSettingsBox';
            aiModelHomeButtonRef.current.style.animationName = 'appearFromRightAIModelRules';
        } else {
            aiModelRulesIconRef.current.style.animationName = 'appearFromRightAIModelRulesSmall';
            aiModelRulesBox.current.style.animationName = 'appearFromRightAIModelRulesSmall';
            aiModelSettingsIconRef.current.style.animationName = 'appearFromRightAIModelSettingsIconSmall';
            aiModelSettingsBox.current.style.animationName = 'appearFromRightAIModelSettingsBoxSmall';
            aiModelHomeButtonRef.current.style.animationName = 'appearFromRightAIModelRulesSmall';
        }
        aiModelContainerRef.current.style.animationName = 'appearFromRightAIModel';
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
        if (moveToAIModel) {
            aiModelTitleRef.current.style.display = 'block';
            aiModelRulesIconRef.current.style.display = 'inline';
            aiModelRulesBox.current.style.display = 'inline';
            aiModelRulesBox.current.style.visibility = 'hidden';
            aiModelSettingsIconRef.current.style.display = 'inline';
            aiModelSettingsBox.current.style.display = 'inline';
            aiModelSettingsBox.current.style.visibility = 'hidden';
            aiModelContainerRef.current.style.display = 'block';
            aiModelHomeButtonRef.current.style.display = 'inline';
            const aiModelElements = [aiModelTitleRef, aiModelRulesIconRef, aiModelRulesBox, aiModelSettingsIconRef, aiModelSettingsBox, aiModelContainerRef, aiModelHomeButtonRef];
            for (let i = 0; i < aiModelElements.length; i++) {
                readyForMove(aiModelElements[i]);
            }
            document.body.style.backgroundColor = 'hsl(304, 100.00%, 91.60%)';
            setTimeout(() => {
                animateElements();
            }, 2000);
            setTimeout(() => {
                const aiModelNonAIModelElements = [aiModelRulesIconRef, aiModelRulesBox, aiModelSettingsIconRef, aiModelSettingsBox, aiModelHomeButtonRef];
                for (let i = 0; i < aiModelNonAIModelElements.length; i++) {
                    aiModelNonAIModelElements[i].current.style.animationName = 'none';
                    aiModelNonAIModelElements[i].current.style.opacity = '100';
                }
                window.addEventListener("resize", onAdjustWindowWidthAIModel);
                if (window.innerWidth <= 740) {
                    aiModelRulesIconRef.current.style.transform = 'translateX(-260px)';
                    aiModelRulesBox.current.style.transform = 'translateX(-260px)';
                    aiModelSettingsIconRef.current.style.transform = 'translateX(180px)';
                    aiModelSettingsBox.current.style.transform = 'translateX(-45px)';
                    aiModelHomeButtonRef.current.style.transform = 'translateX(-260px)';
                }
            }, 4000);
        }
    }, [moveToAIModel]);
    useEffect(() => {
        const goneElements = [aiModelTitleRef, aiModelRulesIconRef, aiModelRulesBox, aiModelSettingsIconRef, aiModelSettingsBox, aiModelContainerRef, aiModelHomeButtonRef];
        for (let i = 0; i < goneElements.length; i++) {
            goneElements[i].current.style.display = 'none';
        }
        return () => {
            window.removeEventListener("resize", onAdjustWindowWidthAIModel);
        }
    }, []);
    return (
        <div>
            <img onClick={() => openOrClose(aiModelRulesBox)} id='aiModelRulesIcon' draggable={false} src={rulesIcon} ref={aiModelRulesIconRef} alt='aiModelRulesIcon' title="aiModelRules" />
            <span id='aiModelRulesBox' draggable={false} ref={aiModelRulesBox}>
                <div id='aiModelRulesTitle' draggable={false}>Rules</div>
                <ul>
                    <li>Hover over the AI Model or each external button to find out what it is/represents.</li>
                    <li>The bottom left Home button takes you back to the Home page.</li>
                    <li>The Settings tab lets you .</li>
                    <li>When changing color in Settings, drag the pointer around for it to work seamlessly.</li>
                    <li>-Specific Rules:</li>
                    <li id='lvl2li'></li>
                </ul>
            </span>
            <img onClick={() => openOrClose(aiModelSettingsBox)} id='aiModelSettingsIcon' draggable={false} src={settingsIcon} ref={aiModelSettingsIconRef} alt='aiModelSettingsIcon' title="aiModelSettings" />
            <span id='aiModelSettingsBox' draggable={false} ref={aiModelSettingsBox}>
                <div id='aiModelSettingsTitle' draggable={false}>Settings</div>
                <ul>
                    <li></li>
                </ul>
            </span>
            <div id='aiModelTitle' draggable={false} ref={aiModelTitleRef}>AI Model</div>
            <span id='aiModelContainer' draggable={false} ref={aiModelContainerRef}>

            </span>
            <img onClick={() => window.location.reload()} id='aiModelHomeButton' draggable={false} ref={aiModelHomeButtonRef} src={homeButton} alt='toHome' title="toHome" />
        </div>
    );
}

export default AIModel;