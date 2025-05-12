import React from 'react';
import { useState, useRef, useEffect } from 'react';
import './aiChatbot.css';

function AIChatbot({ aiChatbotImagesArray, moveToAIChatbot, setMoveToAIChatbot }) {
    const [settingsIcon, rulesIcon, homeButton] = aiChatbotImagesArray;
    const aiChatbotRulesIconRef = useRef(null);
    const aiChatbotRulesBox = useRef(null);
    const aiChatbotSettingsIconRef = useRef(null);
    const aiChatbotSettingsBox = useRef(null);
    const aiChatbotTitleRef = useRef(null);

    const aiChatbotContainerRef = useRef(null);

    const aiChatbotHomeButtonRef = useRef(null);
    const openOrClose = (element) => {
        if (element.current.style.visibility === "hidden") {
            element.current.style.visibility = "visible";
        } else {
            element.current.style.visibility = "hidden";
        }
    }
    const onAdjustWindowWidthAIChatbot = () => {
        if (window.innerWidth <= 740) {
            aiChatbotRulesIconRef.current.style.transform = 'translateX(-260px)';
            aiChatbotRulesBox.current.style.transform = 'translateX(-260px)';
            aiChatbotSettingsIconRef.current.style.transform = 'translateX(180px)';
            aiChatbotSettingsBox.current.style.transform = 'translateX(-45px)';
            aiChatbotHomeButtonRef.current.style.transform = 'translateX(-260px)';
        } else {
            aiChatbotRulesIconRef.current.style.transform = 'translateX(-367px)';
            aiChatbotRulesBox.current.style.transform = 'translateX(-367px)';
            aiChatbotSettingsIconRef.current.style.transform = 'translateX(285px)';
            aiChatbotSettingsBox.current.style.transform = 'translateX(60px)';
            aiChatbotHomeButtonRef.current.style.transform = 'translateX(-367px)';
        }
    }
    const animateElements = () => {
        const aiChatbotElements = [aiChatbotTitleRef, aiChatbotRulesIconRef, aiChatbotRulesBox, aiChatbotSettingsIconRef, aiChatbotSettingsBox, aiChatbotContainerRef, aiChatbotHomeButtonRef];
        for (let i = 0; i < aiChatbotElements.length; i++) {
            readyForAnimation(aiChatbotElements[i]);
        }
        aiChatbotTitleRef.current.style.animationName = 'appearFromRightAIChatbot';
        if (window.innerWidth > 740) {
            aiChatbotRulesIconRef.current.style.animationName = 'appearFromRightAIChatbotRules';
            aiChatbotRulesBox.current.style.animationName = 'appearFromRightAIChatbotRules';
            aiChatbotSettingsIconRef.current.style.animationName = 'appearFromRightAIChatbotSettingsIcon';
            aiChatbotSettingsBox.current.style.animationName = 'appearFromRightAIChatbotSettingsBox';
            aiChatbotHomeButtonRef.current.style.animationName = 'appearFromRightAIChatbotRules';
        } else {
            aiChatbotRulesIconRef.current.style.animationName = 'appearFromRightAIChatbotRulesSmall';
            aiChatbotRulesBox.current.style.animationName = 'appearFromRightAIChatbotRulesSmall';
            aiChatbotSettingsIconRef.current.style.animationName = 'appearFromRightAIChatbotSettingsIconSmall';
            aiChatbotSettingsBox.current.style.animationName = 'appearFromRightAIChatbotSettingsBoxSmall';
            aiChatbotHomeButtonRef.current.style.animationName = 'appearFromRightAIChatbotRulesSmall';
        }
        aiChatbotContainerRef.current.style.animationName = 'appearFromRightAIChatbot';
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
        if (moveToAIChatbot) {
            aiChatbotTitleRef.current.style.display = 'block';
            aiChatbotRulesIconRef.current.style.display = 'inline';
            aiChatbotRulesBox.current.style.display = 'inline';
            aiChatbotRulesBox.current.style.visibility = 'hidden';
            aiChatbotSettingsIconRef.current.style.display = 'inline';
            aiChatbotSettingsBox.current.style.display = 'inline';
            aiChatbotSettingsBox.current.style.visibility = 'hidden';
            aiChatbotContainerRef.current.style.display = 'block';
            aiChatbotHomeButtonRef.current.style.display = 'inline';
            const aiChatbotElements = [aiChatbotTitleRef, aiChatbotRulesIconRef, aiChatbotRulesBox, aiChatbotSettingsIconRef, aiChatbotSettingsBox, aiChatbotContainerRef, aiChatbotHomeButtonRef];
            for (let i = 0; i < aiChatbotElements.length; i++) {
                readyForMove(aiChatbotElements[i]);
            }
            document.body.style.backgroundColor = 'hsl(304, 100.00%, 91.60%)';
            setTimeout(() => {
                animateElements();
            }, 2000);
            setTimeout(() => {
                const aiChatbotNonAIChatbotElements = [aiChatbotRulesIconRef, aiChatbotRulesBox, aiChatbotSettingsIconRef, aiChatbotSettingsBox, aiChatbotHomeButtonRef];
                for (let i = 0; i < aiChatbotNonAIChatbotElements.length; i++) {
                    aiChatbotNonAIChatbotElements[i].current.style.animationName = 'none';
                    aiChatbotNonAIChatbotElements[i].current.style.opacity = '100';
                }
                window.addEventListener("resize", onAdjustWindowWidthAIChatbot);
                if (window.innerWidth <= 740) {
                    aiChatbotRulesIconRef.current.style.transform = 'translateX(-260px)';
                    aiChatbotRulesBox.current.style.transform = 'translateX(-260px)';
                    aiChatbotSettingsIconRef.current.style.transform = 'translateX(180px)';
                    aiChatbotSettingsBox.current.style.transform = 'translateX(-45px)';
                    aiChatbotHomeButtonRef.current.style.transform = 'translateX(-260px)';
                }
            }, 4000);
        }
    }, [moveToAIChatbot]);
    useEffect(() => {
        const goneElements = [aiChatbotTitleRef, aiChatbotRulesIconRef, aiChatbotRulesBox, aiChatbotSettingsIconRef, aiChatbotSettingsBox, aiChatbotContainerRef, aiChatbotHomeButtonRef];
        for (let i = 0; i < goneElements.length; i++) {
            goneElements[i].current.style.display = 'none';
        }
        return () => {
            window.removeEventListener("resize", onAdjustWindowWidthAIChatbot);
        }
    }, []);
    return (
        <div>
            <img onClick={() => openOrClose(aiChatbotRulesBox)} id='aiChatbotRulesIcon' draggable={false} src={rulesIcon} ref={aiChatbotRulesIconRef} alt='aiChatbotRulesIcon' title="aiChatbotRules" />
            <span id='aiChatbotRulesBox' draggable={false} ref={aiChatbotRulesBox}>
                <div id='aiChatbotRulesTitle' draggable={false}>Rules</div>
                <ul>
                    <li>Hover over the AI Chatbot or each external button to find out what it is/represents.</li>
                    <li>The bottom left Home button takes you back to the Home page.</li>
                    <li>The Settings tab lets you .</li>
                    <li>When changing color in Settings, drag the pointer around for it to work seamlessly.</li>
                    <li>-Specific Rules:</li>
                    <li id='lvl2li'></li>
                </ul>
            </span>
            <img onClick={() => openOrClose(aiChatbotSettingsBox)} id='aiChatbotSettingsIcon' draggable={false} src={settingsIcon} ref={aiChatbotSettingsIconRef} alt='aiChatbotSettingsIcon' title="aiChatbotSettings" />
            <span id='aiChatbotSettingsBox' draggable={false} ref={aiChatbotSettingsBox}>
                <div id='aiChatbotSettingsTitle' draggable={false}>Settings</div>
                <ul>
                    <li></li>
                </ul>
            </span>
            <div id='aiChatbotTitle' draggable={false} ref={aiChatbotTitleRef}>AI Chatbot</div>
            <span id='aiChatbotContainer' draggable={false} ref={aiChatbotContainerRef}>

            </span>
            <img onClick={() => window.location.reload()} id='aiChatbotHomeButton' draggable={false} ref={aiChatbotHomeButtonRef} src={homeButton} alt='toHome' title="toHome" />
        </div>
    );
}

export default AIChatbot;