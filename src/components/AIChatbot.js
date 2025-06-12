import React from 'react';
import { useState, useRef, useEffect } from 'react';
import './aiChatbot.css';
import { pipeline, TextStreamer } from '@huggingface/transformers';

function AIChatbot({ aiChatbotImagesArray, moveToAIChatbot, setMoveToAIChatbot, moveToImgIdentifier, setMoveToImgIdentifier }) {
    const [settingsIcon, rulesIcon, aiChatbotThumbnailTransparent, redRightArrow, homeButton] = aiChatbotImagesArray;
    const [messageArray, setMessageArray] = useState([]);
    const [initialAIMessage, setInitialAIMessage] = useState('Hello. What can I help you with?');
    const [profileBGColorVal, setProfileBGColorVal] = useState('#E6E6FA');
    const [chatBGColorVal, setChatBGColorVal] = useState('#F0F8FF');
    const [redRightArrowTransitionDone, setRedRightArrowTransitionDone] = useState(false);
    const aiMessage = useRef("");
    const userMessage = useRef(null);
    const messageArrayLength = useRef(0);
    const firstInitialAIMessageOption = useRef(null);
    const aiChatbotRulesIconRef = useRef(null);
    const aiChatbotRulesBox = useRef(null);
    const aiChatbotSettingsIconRef = useRef(null);
    const aiChatbotSettingsBox = useRef(null);
    const aiChatbotTitleRef = useRef(null);
    const aiChatbotContainerRef = useRef(null);
    const aiChatbotProfileRef = useRef(null);
    const disclaimerBox = useRef(null);
    const disclaimerButtonRef = useRef(null);
    const disclaimerButtonCheckboxRef = useRef(null);
    const citationBox = useRef(null);
    const citationButtonRef = useRef(null);
    const citationButtonCheckboxRef = useRef(null);
    const thinkingMessageRef = useRef(null);
    const humanAIConvoContainerRef = useRef(null);
    const userInputFieldRef = useRef(null);
    const redRightArrowArea = useRef(null);
    const rightRedArrow = useRef(null);
    const aiChatbotHomeButtonRef = useRef(null);
    const generateResponse = async () => {
        try {
            const textGenerator = await pipeline('text-generation', 'HuggingFaceTB/SmolLM2-360M-Instruct', { dtype: 'q8' });
            const messagesArray = [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: userMessage.current }
            ];
            const textStreamer = new TextStreamer(textGenerator.tokenizer, {
                skip_prompt: true,
                callback_function: (text) => {
                    aiMessage.current = aiMessage.current + text;
                }
            });
            const result = await textGenerator(messagesArray, { max_new_tokens: 75, do_sample: false, streamer: textStreamer });
            setMessageArray((prevMessages) => {
                return prevMessages.map((messageObj, index) => {
                    if (index === prevMessages.length - 1) {
                        return { message: aiMessage.current, class: 'aiChatBubble' };
                    }
                    return messageObj;
                });
            });
            thinkingMessageRef.current.style.visibility = 'hidden';
        }
        catch (error) {
            console.error(`Error generating response: ${error}`);
        }
    }
    const limitLines = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (userInputFieldRef.current.value === "") {
                return;
            }
            userMessage.current = "";
            aiMessage.current = "";
            if (messageArrayLength.current === 16) {
                alert('You have reached the maximum amount of messages that this AI model allows in 1 sitting (8). To converse with it more, go back to the Home page and make your way back here.');
                return;
            }
            userInputFieldRef.current.value = userInputFieldRef.current.value.trim();
            const userMessageWordArray = userInputFieldRef.current.value.split(" ");
            for (let i = 0; i < userMessageWordArray.length; i++) {
                if (userMessageWordArray[i].length > 21 && userMessageWordArray[i].length <= 41) {
                    userMessageWordArray[i] = userMessageWordArray[i].substring(0, 21) + "-" + userMessageWordArray[i].substring(21);
                    continue;
                }
                if (userMessageWordArray[i].length > 41 && userMessageWordArray[i].length <= 45) {
                    userMessageWordArray[i] = userMessageWordArray[i].substring(0, 21) + "-" + userMessageWordArray[i].substring(21, 42) + "-" + userMessageWordArray[i].substring(42);
                    continue;
                }
                if (userMessageWordArray[i].length > 45) {
                    alert('Your message contains a word too long to be in the English language. Please try again.');
                    return;
                }
            }
            userInputFieldRef.current.value = userMessageWordArray.join(" ");
            userMessage.current = userInputFieldRef.current.value;
            userInputFieldRef.current.value = "";
            if (userMessage.current !== null) {
                thinkingMessageRef.current.style.visibility = 'visible';
                setMessageArray((prevMessages) => [...prevMessages, { message: userMessage.current, class: 'userChatBubble' }, { message: aiMessage.current, class: 'aiChatBubble' }]);
            }
        }
        while (userInputFieldRef.current.scrollHeight > userInputFieldRef.current.clientHeight) {
            userInputFieldRef.current.value = userInputFieldRef.current.value.substring(0, userInputFieldRef.current.value.length - 1);
        }
    }
    const changeInitialAIMessageToHelpful = (isChecked) => {
        if (isChecked) {
            setInitialAIMessage('Hello. What can I help you with?');
        }
    }
    const changeInitialAIMessageToAnnoyed = (isChecked) => {
        if (isChecked) {
            setInitialAIMessage('You need my help again? What is it now?');
        }
    }
    const changeInitialAIMessageToRobotic = (isChecked) => {
        if (isChecked) {
            setInitialAIMessage('*NEED. TO. HELP. USER. NOW.*');
        }
    }
    const openOrClose = (element) => {
        if (element.current.style.visibility === "hidden") {
            element.current.style.visibility = "visible";
        } else {
            element.current.style.visibility = "hidden";
        }
    }
    const onProfileBGColorChange = (e) => {
        setProfileBGColorVal(e.target.value);
    }
    const onChatBGColorChange = (e) => {
        setChatBGColorVal(e.target.value);
    }
    const onDisclaimerCheck = () => {
        openOrClose(disclaimerButtonRef);
        disclaimerBox.current.style.visibility = 'hidden';
    }
    const onCitationCheck = () => {
        openOrClose(citationButtonRef);
        citationBox.current.style.visibility = 'hidden';
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
    const blurRedRightArrow = () => {
        rightRedArrow.current.style.filter = 'blur(1px)';
        redRightArrowArea.current.style.cursor = 'pointer';
        if (window.innerWidth <= 740) {
            rightRedArrow.current.style.transform = 'translateX(165px) rotate(0.05turn)';
        } else {
            rightRedArrow.current.style.transform = 'translateX(270px) rotate(0.05turn)';
        }
    }
    const unBlurRedRightArrow = () => {
        rightRedArrow.current.style.filter = 'blur(0px)';
        if (window.innerWidth <= 740) {
            rightRedArrow.current.style.transform = 'translateX(165px) rotate(0turn)';
        } else {
            rightRedArrow.current.style.transform = 'translateX(270px) rotate(0turn)';
        }
    }
    const positionRedRightArrow = () => {
        if (rightRedArrow.current.style.transform !== "null") {
            if (window.innerWidth <= 740) {
                rightRedArrow.current.style.transform = 'translateX(165px)';
            } else {
                rightRedArrow.current.style.transform = 'translateX(270px)';
            }
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
    const redRightArrowTransition = (windowWidthBig) => {
        setMoveToImgIdentifier(true);
        const hiddenElements = [aiChatbotRulesBox, aiChatbotSettingsBox, disclaimerBox, citationBox];
        for (let i = 0; i < hiddenElements.length; i++) {
            hiddenElements[i].current.style.visibility = 'hidden';
        }
        const shownElements = [disclaimerButtonRef, citationButtonRef];
        for (let i = 0; i < shownElements.length; i++) {
            shownElements[i].current.style.visibility = 'visible';
        }
        const centeredElements = [aiChatbotTitleRef, aiChatbotContainerRef];
        for (let i = 0; i < centeredElements.length; i++) {
            readyForAnimation(centeredElements[i]);
            centeredElements[i].current.style.animationName = 'fadeLeftAIChatbot';
        }
        const aiChatbotRulesElements = [aiChatbotRulesIconRef, aiChatbotRulesBox, aiChatbotHomeButtonRef];
        for (let i = 0; i < aiChatbotRulesElements.length; i++) {
            readyForAnimation(aiChatbotRulesElements[i]);
            if (windowWidthBig) {
                aiChatbotRulesElements[i].current.style.animationName = 'fadeLeftAIChatbotRules';
            } else {
                aiChatbotRulesElements[i].current.style.animationName = 'fadeLeftAIChatbotRulesSmall';
            }
        }
        readyForAnimation(aiChatbotSettingsIconRef);
        if (windowWidthBig) {
            aiChatbotSettingsIconRef.current.style.animationName = 'fadeLeftAIChatbotSettingsIcon';
        } else {
            aiChatbotSettingsIconRef.current.style.animationName = 'fadeLeftAIChatbotSettingsIconSmall';
        }
        readyForAnimation(aiChatbotSettingsBox);
        if (windowWidthBig) {
            aiChatbotSettingsBox.current.style.animationName = 'fadeLeftAIChatbotSettingsBox';
        } else {
            aiChatbotSettingsBox.current.style.animationName = 'fadeLeftAIChatbotSettingsBoxSmall';
        }
        rightRedArrow.current.style.display = 'none';
        setTimeout(() => setRedRightArrowTransitionDone(true), 2000);
    }
    useEffect(() => {
        if (messageArray.length > 0 && messageArray.length % 2 === 0 && messageArray.length !== messageArrayLength.current) {
            messageArrayLength.current = messageArray.length;
            generateResponse();
        }
    }, [messageArray]);
    useEffect(() => {
            if (redRightArrowTransitionDone) {
                const animAIChatbotElements = [aiChatbotTitleRef, aiChatbotRulesIconRef, aiChatbotRulesBox, aiChatbotSettingsIconRef, aiChatbotSettingsBox, aiChatbotContainerRef, disclaimerBox, citationBox, rightRedArrow, aiChatbotHomeButtonRef];
                for (let i = 0; i < animAIChatbotElements.length; i++) {
                    animAIChatbotElements[i].current.style.display = 'none';
                }
            }
        }, [redRightArrowTransitionDone]);
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
            citationBox.current.style.visibility = 'hidden';
            disclaimerBox.current.style.visibility = 'hidden';
            thinkingMessageRef.current.style.visibility = 'hidden';
            aiChatbotHomeButtonRef.current.style.display = 'inline';
            const aiChatbotElements = [aiChatbotTitleRef, aiChatbotRulesIconRef, aiChatbotRulesBox, aiChatbotSettingsIconRef, aiChatbotSettingsBox, aiChatbotContainerRef, aiChatbotHomeButtonRef];
            for (let i = 0; i < aiChatbotElements.length; i++) {
                readyForMove(aiChatbotElements[i]);
            }
            firstInitialAIMessageOption.current.checked = true;
            disclaimerButtonCheckboxRef.current.checked = true;
            citationButtonCheckboxRef.current.checked = true;
            document.body.style.backgroundColor = 'hsl(304, 100.00%, 91.60%)';
            setTimeout(() => {
                animateElements();
                citationBox.current.innerHTML = `@misc{allal2025smollm2smolgoesbig,
        title={SmolLM2: When Smol Goes Big -- Data-Centric Training of a Small Language Model},
        author={Loubna Ben Allal and Anton Lozhkov and Elie Bakouch and Gabriel Martín Blázquez and Guilherme Penedo and Lewis Tunstall and Andrés Marafioti and Hynek Kydlíček and Agustín Piqueres Lajarín and Vaibhav Srivastav and Joshua Lochner and Caleb Fahlgren and Xuan-Son Nguyen and Clémentine Fourrier and Ben Burtenshaw and Hugo Larcher and Haojun Zhao and Cyril Zakka and Mathieu Morlon and Colin Raffel and Leandro von Werra and Thomas Wolf}, 
        year={2025},
        eprint={2502.02737},
        archivePrefix={arXiv},
        primaryClass={cs.CL},
        url={https://arxiv.org/abs/2502.02737},
}`;
            }, 2000);
            setTimeout(() => {
                const aiChatbotNonAIChatbotElements = [aiChatbotRulesIconRef, aiChatbotRulesBox, aiChatbotSettingsIconRef, aiChatbotSettingsBox, aiChatbotHomeButtonRef];
                for (let i = 0; i < aiChatbotNonAIChatbotElements.length; i++) {
                    aiChatbotNonAIChatbotElements[i].current.style.animationName = 'none';
                    aiChatbotNonAIChatbotElements[i].current.style.opacity = '100';
                }
                window.addEventListener("resize", onAdjustWindowWidthAIChatbot);
                window.addEventListener("resize", positionRedRightArrow);
                userInputFieldRef.current.addEventListener("keydown", (e) => limitLines(e));
                userInputFieldRef.current.addEventListener("input", (e) => limitLines(e));
                rightRedArrow.current.style.display = 'inline';
                if (window.innerWidth <= 740) {
                    rightRedArrow.current.style.transform = 'translateX(165px)';
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
        const goneElements = [aiChatbotTitleRef, aiChatbotRulesIconRef, aiChatbotRulesBox, aiChatbotSettingsIconRef, aiChatbotSettingsBox, aiChatbotContainerRef, rightRedArrow, aiChatbotHomeButtonRef];
        for (let i = 0; i < goneElements.length; i++) {
            goneElements[i].current.style.display = 'none';
        }
        return () => {
            window.removeEventListener("resize", onAdjustWindowWidthAIChatbot);
            window.removeEventListener("resize", positionRedRightArrow);
        }
    }, []);
    return (
        <div>
            <img onClick={() => openOrClose(aiChatbotRulesBox)} id='aiChatbotRulesIcon' draggable={false} src={rulesIcon} ref={aiChatbotRulesIconRef} alt='aiChatbotRulesIcon' title="aiChatbotRules" />
            <span id='aiChatbotRulesBox' draggable={false} ref={aiChatbotRulesBox}>
                <div id='aiChatbotRulesTitle' draggable={false}>Rules</div>
                <ul>
                    <li>Hover over the Chatbot or each external button to find out what it is/represents.</li>
                    <li>The bottom left Home button takes you back to the Home page.</li>
                    <li>The Settings tab lets you change the initial AI message, show/hide the disclaimer/citation buttons, and change the profile and chat background colors.</li>
                    <li>The input field allows any English word, but words longer than 21 letters are hyphened in chat to prevent text overflow. </li>
                    <li>Highlighting and copy/pasting the text inside of the chat bubbles is allowed.</li>
                    <li>When changing color in Settings, drag the pointer around for it to work seamlessly.</li>
                    <li>AI Model-Specific Rules:</li>
                    <li id='lvl2li'>This AI Chatbot uses the SmolLM2-360M-Instruct AI Model, a free compact model for devices/websites.</li>
                    <li id='lvl2li'>It allows 8 user inputs/messages before requiring the user to go to Home and come back to this page.</li>
                </ul>
            </span>
            <img onClick={() => openOrClose(aiChatbotSettingsBox)} id='aiChatbotSettingsIcon' draggable={false} src={settingsIcon} ref={aiChatbotSettingsIconRef} alt='aiChatbotSettingsIcon' title="aiChatbotSettings" />
            <span id='aiChatbotSettingsBox' draggable={false} ref={aiChatbotSettingsBox}>
                <div id='aiChatbotSettingsTitle' draggable={false}>Settings</div>
                <ul>
                    <li>Initial AI message options:</li>
                    <li id='aiChatbotInvisLiFirst'>
                        <input type='radio' onClick={(e) => changeInitialAIMessageToHelpful(e.target.checked)} name='initialAIMessageOptions' ref={firstInitialAIMessageOption} title='helpfulInitialAIMessageRadio' placeholder='helpfulInitialAIMessageRadio' /><span class='initialAIMessageType'>helpful</span>
                        <input type='radio' onClick={(e) => changeInitialAIMessageToAnnoyed(e.target.checked)} name='initialAIMessageOptions' title='annoyedInitialAIMessageRadio' placeholder='annoyedInitialAIMessageRadio' /><span class='initialAIMessageType'>annoyed</span>
                        <input type='radio' onClick={(e) => changeInitialAIMessageToRobotic(e.target.checked)} name='initialAIMessageOptions' title='roboticInitialAIMessageRadio' placeholder='roboticInitialAIMessageRadio' /><span class='initialAIMessageType'>robotic</span>
                    </li>
                    <li>Show/hide certain buttons:</li>
                    <li id='aiChatbotInvisLi'>
                        <input type='checkbox' onClick={() => onDisclaimerCheck()} id='disclaimerButtonCheckbox' ref={disclaimerButtonCheckboxRef} title='disclaimerButtonCheckbox' placeholder='disclaimerButtonCheckbox' /><span id='disclaimerSettingsText'>Disclaimer</span>
                        <input type='checkbox' onClick={() => onCitationCheck()} id='citationButtonCheckbox' ref={citationButtonCheckboxRef} title='citationButtonCheckbox' placeholder='citationButtonCheckbox' /><span id='citationSettingsText'>Citation</span>
                    </li>
                    <li>Color of profile background:</li>
                    <input type='color' value={profileBGColorVal} onChange={(e) => onProfileBGColorChange(e)} id='profileBGColorPicker' title='profileBGColorPicker' placeholder='profileBGColorPicker' />
                    <li>Color of chat background:</li>
                    <input type='color' value={chatBGColorVal} onChange={(e) => onChatBGColorChange(e)} id='chatBGColorPicker' title='chatBGColorPicker' placeholder='chatBGColorPicker' />
                </ul>
            </span>
            <div id='aiChatbotTitle' draggable={false} ref={aiChatbotTitleRef}>AI Chatbot</div>
            <span id='aiChatbotContainer' draggable={false} ref={aiChatbotContainerRef}>
                <div id='aiChatbotProfile' style={{ backgroundColor: profileBGColorVal }} ref={aiChatbotProfileRef}>
                    <div onClick={() => openOrClose(disclaimerBox)} id='disclaimerButton' ref={disclaimerButtonRef} title='toDisclaimer'>Disclaimer</div>
                    <span id='disclaimerBox' draggable={false} ref={disclaimerBox}>
                        The compact SmolLM2 model used for this AI Chatbot is much better at comprehending and outputing in English.
                        The content that it generates may not always be correct, logical, or impartial. As a result, it should
                        be used only to assist rather than as a conclusive source of knowledge. Users of this AI Chatbot should
                        always make sure to verify its answers and generated information with their own logic and credible sources.
                    </span>
                    <span id='thinkingMessage' ref={thinkingMessageRef}>Thinking...</span>
                    <img id='aiChatbotPic' draggable={false} src={aiChatbotThumbnailTransparent} alt='aiChatbotPic' title='aiChatbotPic' />
                    <div onClick={() => openOrClose(citationBox)} id='citationButton' ref={citationButtonRef} title='toCitation'>Citation</div>
                    <span id='citationBox' draggable={false} ref={citationBox}></span>
                </div>
                <div id='humanAIConvoContainer' style={{backgroundColor: chatBGColorVal}} ref={humanAIConvoContainerRef}>
                    <div class='aiChatBubble'>{initialAIMessage}</div>
                    {
                        messageArray.map((messageObj, index) => 
                            <div key={index} class={messageObj.class}>{messageObj.message}</div>
                        )
                    }
                </div>
                <textarea type='text' id='userInputField' wrap='hard' ref={userInputFieldRef} title='userInputField' placeholder={'Type here to converse with AI Chatbot\nPress ENTER to send'}></textarea>
            </span>
            <img onClick={() => window.location.reload()} id='aiChatbotHomeButton' draggable={false} ref={aiChatbotHomeButtonRef} src={homeButton} alt='toHome' title="toHome" />
            <map name='toImgIdentifierMap'>
                <area onClick={() => window.innerWidth > 740 ? redRightArrowTransition(true) : redRightArrowTransition(false)} onMouseOver={() => blurRedRightArrow()} onMouseOut={() => unBlurRedRightArrow()} id='toImgIdentifierMap' ref={redRightArrowArea} shape='poly' coords='34, 103.4, 29, 96.8, 23, 89, 20, 78.1, 20, 67.1, 22, 57.2, 26, 48.4, 32, 42.9, 38, 38.5, 45, 36.3, 54, 34.1, 66, 34.1, 66, 42.9, 70, 45.1, 92, 24.2, 71, 5.5, 67, 7.7, 67, 17.6, 55, 17.6, 45, 17.6, 35, 20.9, 25, 29.7, 15, 39.6, 9, 59.4, 12, 74.8, 16, 85.8, 22, 96.8, 30, 103.4' alt='toImgIdentifier' title="toImgIdentifier"></area>
            </map>
            <img id='toImgIdentifier' useMap='#toImgIdentifierMap' draggable={false} ref={rightRedArrow} src={redRightArrow} alt='toImgIdentifier' />
        </div>
    );
}

export default AIChatbot;