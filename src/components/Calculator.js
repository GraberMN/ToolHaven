import React from 'react';
import { useState, useRef, useEffect } from 'react';
import './calculator.css';

function Calculator({ calcImagesArray, moveToRulers, setMoveToRulers, moveToCalc, setMoveToCalc }) {
    const [settingsIcon, historyIcon, rulesIcon, blueRightArrow, homeButton] = calcImagesArray;
    const [calcHistory, setCalcHistory] = useState([]);
    const [maxCharVal, setMaxCarVal] = useState(27);
    const [maxDecimalPlacesVal, setMaxDecimalPlacesVal] = useState(16);
    const [inputFieldBorderColorVal, setInputFieldBorderColorVal] = useState('#4B4B4B');
    const [buttonContainerColorVal, setButtonContainerColorVal] = useState('#808080');
    const [blueRightArrowTransitionDone, setBlueRightArrowTransitionDone] = useState(false);
    const beforeEval = useRef("0");
    const inputField = useRef("0");
    const ansField = useRef("ANS = 0");
    const rulesIconRef = useRef(null);
    const rulesBox = useRef(null);
    const settingsIconRef = useRef(null);
    const settingsBox = useRef(null);
    const historyIconRef = useRef(null);
    const historyBox = useRef(null);
    const calcTitleRef = useRef(null);
    const buttonContainer = useRef(null);
    const ans = useRef("0");
    const blueRightArrowArea = useRef(null);
    const rightBlueArrow = useRef(null);
    const homeButtonRef = useRef(null);
    const appendToDisplay = (input, isNum) => {
        if (inputField.current.value === "Error" || inputField.current.value === "NaN" || inputField.current.value === "undefined" || inputField.current.value === "Infinity") {
            isNum ? inputField.current.value = "" : inputField.current.value = "0";
        }
        if (inputField.current.value === "0" && isNum) {
            inputField.current.value = "";
        }
        if (input === " - " && inputField.current.value.substring(inputField.current.value.length - 1, inputField.current.value.length) === " ") {
            input = "-";
        }
        if (input === " - " && inputField.current.value === "0") {
            inputField.current.value = "";
            input = "-";
        }
        inputField.current.value = inputField.current.value + input;
        if ((input === "π" || input === "e") && inputField.current.value.includes("√")) {
            const termArray = inputField.current.value.split(" ");
            let sqrtPast = false;
            for (let i = 0; i < termArray.length; i++) {
                if (termArray[i].includes("√")) {
                    sqrtPast = false;
                    const symbolArray = termArray[i].split("");
                    for (let j = 0; j < symbolArray.length; j++) {
                        if (sqrtPast && (symbolArray[j] === "e" || symbolArray[j] === "π") && (!isNaN(Number.parseInt(symbolArray[j - 1])) || symbolArray[j - 1] === "e" || symbolArray[j - 1] === "π")) {
                            symbolArray[j] = " * " + symbolArray[j];
                        }
                        if (symbolArray[j] === "√" && !sqrtPast) {
                            sqrtPast = true;
                        }
                    }
                    termArray[i] = symbolArray.join("");
                }
            }
            inputField.current.value = termArray.join(" ");
        }
        displayChange();
    }
    const clearDisplay = () => {
        inputField.current.value = "0";
    }
    const deleteLastFromDisplay = () => {
        if (inputField.current.value.length > 1 && inputField.current.value !== "Error") {
            inputField.current.value = inputField.current.value.substring(0, inputField.current.value.length - 1);
        } else {
            inputField.current.value = "0";
        }
    }
    const calculateDisplay = () => {
        try {
            if (inputField.current.value === "Error") {
                throw new Error();
            }
            beforeEval.current = inputField.current.value
            if (inputField.current.value.includes("-√")) {
                inputField.current.value = inputField.current.value.replaceAll("-√", "-1√");
            }
            if (inputField.current.value.includes("e") || inputField.current.value.includes("π") || inputField.current.value.includes("√")) {
                inputField.current.value = inputField.current.value.replaceAll("e", "Math.E");
                inputField.current.value = inputField.current.value.replaceAll("π", "Math.PI");
                const charArray = inputField.current.value.split("");
                for (let i = 1; i < charArray.length; i++) {
                    if (charArray[i] === "M" && (Number.isInteger(parseInt(charArray[i - 1])) || charArray[i - 1] === "E" || charArray[i - 1] === "I")) {
                        charArray[i] = " * M";
                    }
                    if (charArray[i] === "√" && (Number.isInteger(parseInt(charArray[i - 1])) || charArray[i - 1] === "E" || charArray[i - 1] === "I")) {
                        charArray[i] = " * √";
                    }
                }
                inputField.current.value = charArray.join("");
            }
            if (inputField.current.value.includes("!") || inputField.current.value.includes("√")) {
                const wordArray = inputField.current.value.split(" ");
                for (let i = 0; i < wordArray.length; i++) {
                    if (wordArray[i].includes("√")) {
                        wordArray[i] = squareRoot(wordArray[i].substring(1));
                        if (wordArray[i] === "Error") {
                            throw new Error();
                        }
                    }
                    if (wordArray[i].includes("!")) {
                        wordArray[i] = factorial(wordArray[i].substring(0, wordArray[i].length - 1))
                        if (wordArray[i] === "Error") {
                            throw new Error();
                        }
                    }
                }
                inputField.current.value = wordArray.join(" ");
            }
            inputField.current.value = eval(inputField.current.value)
            if (inputField.current.value.includes(".")) {
                inputField.current.value = Number.parseFloat(inputField.current.value).toFixed(maxDecimalPlacesVal);
                while (inputField.current.value.substring(inputField.current.value.length - 1, inputField.current.value.length) === "0") {
                    inputField.current.value = inputField.current.value.substring(0, inputField.current.value.length - 1);
                }
            }
            ans.current = inputField.current.value;
            ansField.current.value = "ANS = " + ans.current;
            setCalcHistory([...calcHistory, beforeEval.current + " = " + ans.current]);
        }
        catch (error) {
            inputField.current.value = "Error";
        }
    }
    const displayChange = () => {
        if (inputField.current.value.length >= inputField.current.maxLength) {
            inputField.current.value = inputField.current.value.slice(0, inputField.current.maxLength);
        }
    }
    const openOrClose = (element) => {
        if (element.current.style.visibility === "hidden") {
            element.current.style.visibility = "visible";
        } else {
            element.current.style.visibility = "hidden";
        }
    }
    const onInputFieldBorderColorChange = (e) => {
        setInputFieldBorderColorVal(e.target.value);
    }
    const onButtonContainerColorChange = (e) => {
        setButtonContainerColorVal(e.target.value);
    }
    const onAdjustWindowWidth = () => {
        if (window.innerWidth <= 740) {
            rulesIconRef.current.style.transform = 'translateX(-260px)';
            rulesBox.current.style.transform = 'translateX(-260px)';
            settingsIconRef.current.style.transform = 'translateX(180px)';
            settingsBox.current.style.transform = 'translateX(-45px)';
            homeButtonRef.current.style.transform = 'translateX(-260px)';
        } else {
            rulesIconRef.current.style.transform = 'translateX(-367px)';
            rulesBox.current.style.transform = 'translateX(-367px)';
            settingsIconRef.current.style.transform = 'translateX(285px)';
            settingsBox.current.style.transform = 'translateX(60px)';
            homeButtonRef.current.style.transform = 'translateX(-367px)';
        }
    }
    const blurBlueRightArrow = () => {
        rightBlueArrow.current.style.filter = 'blur(1px)';
        blueRightArrowArea.current.style.cursor = 'pointer';
        if (window.innerWidth <= 740) {
            rightBlueArrow.current.style.transform = 'translateX(165px) rotate(0.05turn)';
        } else {
            rightBlueArrow.current.style.transform = 'translateX(270px) rotate(0.05turn)';
        }
    }
    const unBlurBlueRightArrow = () => {
        rightBlueArrow.current.style.filter = 'blur(0px)';
        if (window.innerWidth <= 740) {
            rightBlueArrow.current.style.transform = 'translateX(165px) rotate(0turn)';
        } else {
            rightBlueArrow.current.style.transform = 'translateX(270px) rotate(0turn)';
        }
    }
    const positionBlueRightArrow = () => {
        if (rightBlueArrow.current.style.transform !== "null") {
            if (window.innerWidth <= 740) {
                rightBlueArrow.current.style.transform = 'translateX(165px)';
            } else {
                rightBlueArrow.current.style.transform = 'translateX(270px)';
            }
        }
    }
    const animateElements = () => {
        const calcElements = [inputField, buttonContainer, calcTitleRef, rulesIconRef, rulesBox, settingsIconRef, settingsBox, historyIconRef, historyBox, ansField, rightBlueArrow, homeButtonRef];
        for (let i = 0; i < calcElements.length; i++) {
            readyForAnimation(calcElements[i]);
        }
        calcTitleRef.current.style.animationName = 'appearFromRight';
        inputField.current.style.animationName = 'appearFromRight';
        buttonContainer.current.style.animationName = 'appearFromRight';
        if (window.innerWidth > 740) {
            rulesIconRef.current.style.animationName = 'appearFromRightRules';
            rulesBox.current.style.animationName = 'appearFromRightRules';
            settingsIconRef.current.style.animationName = 'appearFromRightSettingsIcon';
            settingsBox.current.style.animationName = 'appearFromRightSettingsBox';
            homeButtonRef.current.style.animationName = 'appearFromRightRules';
        } else {
            rulesIconRef.current.style.animationName = 'appearFromRightRulesSmall';
            rulesBox.current.style.animationName = 'appearFromRightRulesSmall';
            settingsIconRef.current.style.animationName = 'appearFromRightSettingsIconSmall';
            settingsBox.current.style.animationName = 'appearFromRightSettingsBoxSmall';
            homeButtonRef.current.style.animationName = 'appearFromRightRulesSmall';
        }
        historyIconRef.current.style.animationName = 'appearFromRightHistoryIcon';
        historyBox.current.style.animationName = 'appearFromRightHistoryBox';
        ansField.current.style.animationName = 'appearFromRightAnsField';
    }
    const readyForAnimation = (element) => {
        element.current.style.animationName = 'none';
        element.current.classList.remove('readyForAnim');
        element.current.classList.add('readyForAnim');
    }
    const readyForMove = (element) => {
        element.current.style.opacity = '0';
    }
    const blueRightArrowTransition = (windowWidthBig) => {
        setMoveToRulers(true);
        rulesBox.current.style.visibility = "hidden";
        settingsBox.current.style.visibility = "hidden";
        historyBox.current.style.visibility = "hidden";
        const changedRelativeElements = [inputField, buttonContainer, calcTitleRef];
        for (let i = 0; i < changedRelativeElements.length; i++) {
            readyForAnimation(changedRelativeElements[i]);
            changedRelativeElements[i].current.style.animationName = 'fadeLeft';
        }
        const changedRulesElements = [rulesIconRef, rulesBox, homeButtonRef];
        for (let i = 0; i < changedRulesElements.length; i++) {
            readyForAnimation(changedRulesElements[i]);
            if (windowWidthBig) {
                changedRulesElements[i].current.style.animationName = 'fadeLeftRules';
            } else {
                changedRulesElements[i].current.style.animationName = 'fadeLeftRulesSmall';
            }
        }
        readyForAnimation(settingsIconRef);
        if (windowWidthBig) {
            settingsIconRef.current.style.animationName = 'fadeLeftSettingsIcon';
        } else {
            settingsIconRef.current.style.animationName = 'fadeLeftSettingsIconSmall';
        }
        readyForAnimation(settingsBox)
        if (windowWidthBig) {
            settingsBox.current.style.animationName = 'fadeLeftSettingsBox';
        } else {
            settingsBox.current.style.animationName = 'fadeLeftSettingsBoxSmall';
        }
        readyForAnimation(historyIconRef);
        historyIconRef.current.style.animationName = 'fadeLeftHistoryIcon';
        readyForAnimation(historyBox);
        historyBox.current.style.animationName = 'fadeLeftHistoryBox';
        readyForAnimation(ansField);
        ansField.current.style.animationName = 'fadeLeftAnsField';
        rightBlueArrow.current.style.display = 'none';
        setTimeout(() => setBlueRightArrowTransitionDone(true), 2000);
    }
    const squareRoot = (num) => {
        if (num.includes("-")) {
            return "Error";
        }
        num = eval(num);
        let sqrtNum = Math.sqrt(num); 
        return sqrtNum.toString();
    }
    const factorial = (num) => {
        if (num.includes("-")) {
            return "Error";
        }
        num = eval(num);
        num = Math.round(num);
        let product = 1;
        while (num >= 2) {
            product *= num;
            num--;
        }
        return product.toString();
    }
    useEffect(() => {
        if (blueRightArrowTransitionDone) {
            const animElements = [inputField, buttonContainer, calcTitleRef, rulesIconRef, rulesBox, settingsIconRef, settingsBox, historyIconRef, historyBox, ansField, homeButtonRef];
            for (let i = 0; i < animElements.length; i++) {
                animElements[i].current.style.display = 'none';
            }
        }
    }, [blueRightArrowTransitionDone]);
    useEffect(() => {
        if (moveToCalc) {
            document.body.style.pointerEvents = 'none';
            inputField.current.style.display = 'inline';
            buttonContainer.current.style.display = 'grid';
            calcTitleRef.current.style.display = 'block';
            rulesIconRef.current.style.display = 'inline';
            rulesBox.current.style.display = 'inline';
            settingsIconRef.current.style.display = 'inline';
            settingsBox.current.style.display = 'inline';
            historyIconRef.current.style.display = 'inline';
            historyBox.current.style.display = 'inline';
            ansField.current.style.display = 'inline';
            homeButtonRef.current.style.display = 'inline';
            const calcElements = [inputField, buttonContainer, calcTitleRef, rulesIconRef, rulesBox, settingsIconRef, settingsBox, historyIconRef, historyBox, ansField, homeButtonRef];
            for (let i = 0; i < calcElements.length; i++) {
                readyForMove(calcElements[i]);
            }
            document.body.style.backgroundColor = 'rgba(141, 199, 154, 0.482)';
            setTimeout(() => {
                animateElements();
            }, 2000);
            setTimeout(() => {
                const calcNonCalcElements = [rulesIconRef, rulesBox, settingsIconRef, settingsBox, homeButtonRef];
                for (let i = 0; i < calcNonCalcElements.length; i++) {
                    calcNonCalcElements[i].current.style.animationName = 'none';
                    calcNonCalcElements[i].current.style.opacity = '100';
                }
                window.addEventListener("resize", onAdjustWindowWidth);
                window.addEventListener("resize", positionBlueRightArrow);
                rightBlueArrow.current.style.display = 'inline';
                document.body.style.pointerEvents = 'auto';
                if (window.innerWidth <= 740) {
                    rightBlueArrow.current.style.transform = 'translateX(165px)';
                    rulesIconRef.current.style.transform = 'translateX(-260px)';
                    rulesBox.current.style.transform = 'translateX(-260px)';
                    settingsIconRef.current.style.transform = 'translateX(180px)';
                    settingsBox.current.style.transform = 'translateX(-45px)';
                    homeButtonRef.current.style.transform = 'translateX(-260px)';
                }
            }, 4000);
        }
    }, [moveToCalc]);
    useEffect(() => {
        inputField.current.value = "0";
        ansField.current.value = "ANS = 0";
        rulesBox.current.style.visibility = "hidden";
        settingsBox.current.style.visibility = "hidden";
        historyBox.current.style.visibility = "hidden";
        beforeEval.current = "0";
        ans.current = "0";
        const calcElements = [inputField, buttonContainer, calcTitleRef, rulesIconRef, rulesBox, settingsIconRef, settingsBox, historyIconRef, historyBox, ansField, rightBlueArrow, homeButtonRef];
        for (let i = 0; i < calcElements.length; i++) {
            calcElements[i].current.style.display = 'none';
        }
        return () => {
            window.removeEventListener("resize", positionBlueRightArrow);
        }
    }, []);
    return (
        <div>
            <img onClick={() => openOrClose(rulesBox)} id='rulesIcon' draggable={false} src={rulesIcon} ref={rulesIconRef} alt='calculatorRulesIcon' title="calculatorRules" />
            <span id='rulesBox' draggable={false} ref={rulesBox}>
                <div id='rulesTitle' draggable={false}>Rules</div>
                <ul>
                    <li>Hover over each calculator or external button to find out what it is/represents.</li>
                    <li>The bottom left Home button takes you back to the Home page.</li>
                    <li>The top left clock icon opens the History tab, which shows you all prior valid calculations until page reload.</li>
                    <li>The Settings tab lets you adjust the max decimal places of calculations, the max characters that can be entered, and more.</li>
                    <li>The defaults/maxes for those settings are 16 decimal places and 27 characters.</li>
                    <li>When changing color in Settings, drag the pointer around for it to work seamlessly.</li>
                    <li>When multiplying/dividing (with decimals), the answer can sometimes be off by a tiny and negligible amount, but it is always accurate for the first 5 decimal places.</li>
                    <li>If an Error is generated, keep calculating by pressing any calculator button.</li>
                    <li>"Error", "NaN", "undefined", and "Infinity" answers cannot be interacted with.</li>
                    <li>Calculator Button-Specific Rules:</li>
                    <li id='lvl2li'>Exponentiation: "^" is on the button since it is seen more commonly than "**" for exponentiation.</li>
                    <li id='lvl2li'>Factorial: only positive integers and 0 allowed (0 - ∞), decimals rounded.</li>
                    <li id='lvl2li'>Pi/e: no " * " needed between number and pi/e, always write number first.</li>
                    <li id='lvl2li'>Square root: only 1 positive real number allowed inside, "2π" or "5.2e" count as 2, all allowed in front.</li>
                </ul>
            </span>
            <img onClick={() => openOrClose(settingsBox)} id='settingsIcon' draggable={false} src={settingsIcon} ref={settingsIconRef} alt='settingsIcon' title="calculatorSettings" />
            <span id='settingsBox' draggable={false} ref={settingsBox}>
                <div id='settingsTitle' draggable={false}>Settings</div>
                <ul>
                    <li>Max d. places of calculations:</li>
                    <input type='range' min={2} max={16} value={maxDecimalPlacesVal} onChange={(e) => setMaxDecimalPlacesVal(e.target.value)} title="maxDecimalPlacesSlider" placeholder='maxDecimalPlacesSlider' />
                    <span title={maxDecimalPlacesVal + " decimal places"}>{maxDecimalPlacesVal}</span>
                    <li>Max entered characters:</li>
                    <input type='range' min={5} max={27} value={maxCharVal} onChange={(e) => setMaxCarVal(e.target.value)} title="maxCharSlider" placeholder='maxCharSlider' />
                    <span title={maxCharVal + " characters"}>{maxCharVal}</span>
                    <li>Color of input field border:</li>
                    <input type='color' value={inputFieldBorderColorVal} onChange={(e) => onInputFieldBorderColorChange(e)} title="inputFieldBorderColorPicker" placeholder='inputFieldBorderColorPicker' />
                    <li>Color of button container:</li>
                    <input type='color' value={buttonContainerColorVal} onChange={(e) => onButtonContainerColorChange(e)} title="buttonContainerColorPicker" placeholder='buttonContainerColorPicker' />
                </ul>
            </span>
            <h1 id='calcTitle' draggable={false} ref={calcTitleRef}>Calculator</h1>
            <span id='calculator' draggable={false}>
                <input type='text' id='inputField' style={{ borderColor: inputFieldBorderColorVal }} ref={inputField} maxLength={maxCharVal} title="inputField" placeholder='Loading...' readOnly />
                <input type='text' id='ansField' ref={ansField} title="answerField" placeholder='Loading...' readOnly />
                <img onClick={() => openOrClose(historyBox)} id='historyIcon' draggable={false} src={historyIcon} ref={historyIconRef} alt='historyIcon' title="calculationHistory" />
                <span id='historyBox' draggable={false} ref={historyBox}>
                    <div id='historyTitle'> History </div>
                    {
                        calcHistory.map((historyEntry, index) =>
                            <div key={index}>{historyEntry}</div>
                        )
                    }
                </span>
                <span id='buttons' style={{ backgroundColor: buttonContainerColorVal }} draggable={false} ref={buttonContainer}>
                    <button onClick={() => clearDisplay()} className='deleter' title="clearAll">C</button>
                    <button onClick={() => appendToDisplay('7', true)} title="seven">7</button>
                    <button onClick={() => appendToDisplay('8', true)} title="eight">8</button>
                    <button onClick={() => appendToDisplay('9', true)} title="nine">9</button>
                    <button onClick={() => deleteLastFromDisplay()} className='deleter' title="deleteLast">D</button>
                    <button onClick={() => appendToDisplay(' ** ', false)} className='operator' title="exponentOperator">^</button>
                    <button onClick={() => appendToDisplay('4', true)} title="four">4</button>
                    <button onClick={() => appendToDisplay('5', true)} title="five">5</button>
                    <button onClick={() => appendToDisplay('6', true)} title="six">6</button>
                    <button onClick={() => appendToDisplay(' % ', false)} className='operator' title="modulus">%</button>
                    <button onClick={() => appendToDisplay(' * ', false)} className='operator' title="multiplicationSign">*</button>
                    <button onClick={() => appendToDisplay('1', true)} title="one">1</button>
                    <button onClick={() => appendToDisplay('2', true)} title="two">2</button>
                    <button onClick={() => appendToDisplay('3', true)} title="three">3</button>
                    <button onClick={() => appendToDisplay(' + ', false)} className='operator' title="plusSign">+</button>
                    <button onClick={() => appendToDisplay(' / ', false)} className='operator' title="divisionSign">/</button>
                    <button onClick={() => appendToDisplay('0', true)} title="zero">0</button>
                    <button onClick={() => appendToDisplay('.', false)} title="decimalPoint">.</button>
                    <button onClick={() => calculateDisplay()} id='equals' title="equalSign">=</button>
                    <button onClick={() => appendToDisplay(' - ', false)} className='operator' title="minus/negativeSign">-</button>
                    <button onClick={() => appendToDisplay('√', true)} className='operator' title="squareRoot">√</button>
                    <button onClick={() => appendToDisplay('π', true)} className='irrationalNum' title="pi">π</button>
                    <button onClick={() => appendToDisplay('e', true)} className='irrationalNum' title="euler'sNumber">e</button>
                    <button onClick={() => appendToDisplay(ans.current, true)} id='ans' title="previousAnswer">ANS</button>
                    <button onClick={() => appendToDisplay('!', false)} className='operator' title="factorial">!</button>
                </span>
            </span>
            <img onClick={() => window.location.reload()} id='homeButton' draggable={false} ref={homeButtonRef} src={homeButton} alt='toHome' title="toHome"/>
            <map name='toRulersMap'>
                <area onClick={() => window.innerWidth > 740 ? blueRightArrowTransition(true) : blueRightArrowTransition(false)} onMouseOver={() => blurBlueRightArrow()} onMouseOut={() => unBlurBlueRightArrow()} id='toRulersMap' ref={blueRightArrowArea} shape='poly' coords='34, 103.4, 29, 96.8, 23, 89, 20, 78.1, 20, 67.1, 22, 57.2, 26, 48.4, 32, 42.9, 38, 38.5, 45, 36.3, 54, 34.1, 66, 34.1, 66, 42.9, 70, 45.1, 92, 24.2, 71, 5.5, 67, 7.7, 67, 17.6, 55, 17.6, 45, 17.6, 35, 20.9, 25, 29.7, 15, 39.6, 9, 59.4, 12, 74.8, 16, 85.8, 22, 96.8, 30, 103.4' alt='toRulers' title="toRulers"></area>
            </map>
            <img id='toRulers' useMap='#toRulersMap' draggable={false} ref={rightBlueArrow} src={blueRightArrow} alt='toRulers' />
        </div>
    );
}

export default Calculator;