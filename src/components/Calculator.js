import React from 'react'
import { useState, useRef, useEffect } from 'react'
import './calculator.css'

function Calculator({ settingsIcon, historyIcon, rulesIcon }) {
    const [calcHistory, setCalcHistory] = useState([])
    const [maxCharVal, setMaxCarVal] = useState(27)
    const [maxDecimalPlacesVal, setMaxDecimalPlacesVal] = useState(16)
    const [inputFieldBorderColorVal, setInputFieldBorderColorVal] = useState('#4B4B4B')
    const [buttonContainerColorVal, setButtonContainerColorVal] = useState('#808080')
    const beforeEval = useRef("0")
    const inputField = useRef("0")
    const ansField = useRef("ANS = 0")
    const rulesBox = useRef(null)
    const settingsBox = useRef(null)
    const historyBox = useRef(null)
    const buttonContainer = useRef(null)
    const ans = useRef("0")
    const appendToDisplay = (input, isNum) => {
        if (inputField.current.value === "Error" || inputField.current.value === "NaN" || inputField.current.value === "undefined" || inputField.current.value === "Infinity") {
            isNum ? inputField.current.value = "" : inputField.current.value = "0"
        }
        if (inputField.current.value === "0" && isNum) {
            inputField.current.value = ""
        }
        if (input === " - " && inputField.current.value.substring(inputField.current.value.length - 1, inputField.current.value.length) === " ") {
            input = "-"
        }
        if (input === " - " && inputField.current.value === "0") {
            inputField.current.value = ""
            input = "-"
        }
        inputField.current.value = inputField.current.value + input
        if ((input === "π" || input === "e") && inputField.current.value.includes("√")) {
            const termArray = inputField.current.value.split(" ")
            let sqrtPast = false
            for (let i = 0; i < termArray.length; i++) {
                if (termArray[i].includes("√")) {
                    sqrtPast = false
                    const symbolArray = termArray[i].split("")
                    for (let j = 0; j < symbolArray.length; j++) {
                        if (sqrtPast && (symbolArray[j] === "e" || symbolArray[j] === "π") && (!isNaN(Number.parseInt(symbolArray[j - 1])) || symbolArray[j - 1] === "e" || symbolArray[j - 1] === "π")) {
                            symbolArray[j] = " * " + symbolArray[j]
                        }
                        if (symbolArray[j] === "√" && !sqrtPast) {
                            sqrtPast = true
                        }
                    }
                    termArray[i] = symbolArray.join("")
                }
            }
            inputField.current.value = termArray.join(" ")
        }
        displayChange()
    }
    const clearDisplay = () => {
        inputField.current.value = "0"
    }
    const deleteLastFromDisplay = () => {
        if (inputField.current.value.length > 1 && inputField.current.value !== "Error") {
            inputField.current.value = inputField.current.value.substring(0, inputField.current.value.length - 1)
        } else {
            inputField.current.value = "0"
        }
    }
    const calculateDisplay = () => {
        try {
            if (inputField.current.value === "Error") {
                throw new Error()
            }
            beforeEval.current = inputField.current.value
            if (inputField.current.value.includes("-√")) {
                inputField.current.value = inputField.current.value.replaceAll("-√", "-1√")
            }
            if (inputField.current.value.includes("e") || inputField.current.value.includes("π") || inputField.current.value.includes("√")) {
                inputField.current.value = inputField.current.value.replaceAll("e", "Math.E")
                inputField.current.value = inputField.current.value.replaceAll("π", "Math.PI")
                const charArray = inputField.current.value.split("")
                for (let i = 1; i < charArray.length; i++) {
                    if (charArray[i] === "M" && (Number.isInteger(parseInt(charArray[i - 1])) || charArray[i - 1] === "E" || charArray[i - 1] === "I")) {
                        charArray[i] = " * M"
                    }
                    if (charArray[i] === "√" && (Number.isInteger(parseInt(charArray[i - 1])) || charArray[i - 1] === "E" || charArray[i - 1] === "I")) {
                        charArray[i] = " * √"
                    }
                }
                inputField.current.value = charArray.join("")
            }
            if (inputField.current.value.includes("!") || inputField.current.value.includes("√")) {
                const wordArray = inputField.current.value.split(" ")
                for (let i = 0; i < wordArray.length; i++) {
                    if (wordArray[i].includes("√")) {
                        wordArray[i] = squareRoot(wordArray[i].substring(1))
                        if (wordArray[i] === "Error") {
                            throw new Error()
                        }
                    }
                    if (wordArray[i].includes("!")) {
                        wordArray[i] = factorial(wordArray[i].substring(0, wordArray[i].length - 1))
                        if (wordArray[i] === "Error") {
                            throw new Error()
                        }
                    }
                }
                inputField.current.value = wordArray.join(" ")
            }
            inputField.current.value = eval(inputField.current.value)
            if (inputField.current.value.includes(".")) {
                inputField.current.value = Number.parseFloat(inputField.current.value).toFixed(maxDecimalPlacesVal)
                while (inputField.current.value.substring(inputField.current.value.length - 1, inputField.current.value.length) === "0") {
                    inputField.current.value = inputField.current.value.substring(0, inputField.current.value.length - 1)
                }
            }
            ans.current = inputField.current.value
            ansField.current.value = "ANS = " + ans.current
            setCalcHistory([...calcHistory, beforeEval.current + " = " + ans.current])
        }
        catch (error) {
            inputField.current.value = "Error"
        }
    }
    const displayChange = () => {
        if (inputField.current.value.length >= inputField.current.maxLength) {
            inputField.current.value = inputField.current.value.slice(0, inputField.current.maxLength)
        }
    }
    const openOrClose = (element) => {
        if (element.current.style.visibility === "hidden") {
            element.current.style.visibility = "visible"
        } else {
            element.current.style.visibility = "hidden"
        }
    }
    const onInputFieldBorderColorChange = (e) => {
        setInputFieldBorderColorVal(e.target.value)
        inputField.current.style.borderColor = inputFieldBorderColorVal
    }
    const onButtonContainerColorChange = (e) => {
        setButtonContainerColorVal(e.target.value)
        buttonContainer.current.style.backgroundColor = buttonContainerColorVal
    }
    const squareRoot = (num) => {
        if (num.includes("-")) {
            return "Error"
        }
        num = eval(num)
        let sqrtNum = Math.sqrt(num) 
        return sqrtNum.toString()
    }
    const factorial = (num) => {
        if (num.includes("-")) {
            return "Error"
        }
        num = eval(num)
        num = Math.round(num)
        let product = 1
        while (num >= 2) {
            product *= num
            num--
        }
        return product.toString()
    }
    useEffect(() => {
        inputField.current.value = "0"
        ansField.current.value = "ANS = 0"
        rulesBox.current.style.visibility = "hidden"
        settingsBox.current.style.visibility = "hidden"
        historyBox.current.style.visibility = "hidden"
        beforeEval.current = "0"
        ans.current = "0"
    }, [])
    return (
        <div>
            <img onClick={() => openOrClose(rulesBox)} id='rulesIcon' src={rulesIcon} alt='rulesIcon' title="calculatorRules" />
            <span id='rulesBox' ref={rulesBox}>
                <div id='rulesTitle'>Rules</div>
                <ul>
                    <li>Hover over each calculator or external button to find out what it is/represents.</li>
                    <li>The top left clock icon opens the History tab, which shows you all prior valid calculations until page reload.</li>
                    <li>The Settings tab lets you adjust the max decimal places of calculations, the max characters that can be entered, and more.</li>
                    <li>The defaults/maxes for those settings are 16 decimal places and 27 characters.</li>
                    <li>When multiplying or dividing with decimals, the answer can sometimes be off by a tiny and negligible amount, but it is always accurate for the first 5 decimal places.</li>
                    <li>If an Error is generated, keep calculating by pressing any calculator button.</li>
                    <li>"Error", "NaN", "undefined", and "Infinity" answers cannot be interacted with.</li>
                    <li>Calculator Button-Specific Rules:</li>
                    <li id='lvl2li'>Exponentiation: "^" is on the button since it is seen more commonly than "**" for exponentiation.</li>
                    <li id='lvl2li'>Factorial: only positive integers and 0 allowed (0 - ∞), decimals rounded.</li>
                    <li id='lvl2li'>Pi/e: no " * " needed between number and pi/e, always write number first.</li>
                    <li id='lvl2li'>Square root: only 1 positive real number allowed inside, "2π" or "5.2e" count as 2, all allowed in front.</li>
                </ul>
            </span>
            <img onClick={() => openOrClose(settingsBox)} id='settingsIcon' src={settingsIcon} alt='settingsIcon' title="calculatorSettings" />
            <span id='settingsBox' ref={settingsBox}>
                <div id='settingsTitle'>Settings</div>
                <ul>
                    <li>Max d. places of calculations:</li>
                    <input type='range' min={2} max={16} value={maxDecimalPlacesVal} onChange={(e) => setMaxDecimalPlacesVal(e.target.value)} title='maxDecimalPlacesSlider' placeholder='maxDecimalPlacesSlider'></input>
                    <span title={maxDecimalPlacesVal + " decimal places"}>{maxDecimalPlacesVal}</span>
                    <li>Max entered characters:</li>
                    <input type='range' min={5} max={27} value={maxCharVal} onChange={(e) => setMaxCarVal(e.target.value)} title='maxCharSlider' placeholder='maxCharSlider'></input>
                    <span title={maxCharVal + " characters"}>{maxCharVal}</span>
                    <li>Color of input field border:</li>
                    <input type='color' value={inputFieldBorderColorVal} onChange={(e) => onInputFieldBorderColorChange(e)} title='inputFieldBorderColorPicker' placeholder='inputFieldBorderColorPicker'></input>
                    <li>Color of button container:</li>
                    <input type='color' value={buttonContainerColorVal} onChange={(e) => onButtonContainerColorChange(e)} title='buttonContainerColorPicker' placeholder='buttonContainerColorPicker'></input>
                </ul>
            </span>
            <h1 id="calcTitle">Calculator</h1>
            <span id="calculator">
                <input type="text" id='inputField' ref={inputField} maxLength={maxCharVal} title='inputField' placeholder='Loading...' readOnly />
                <input type='text' id='ansField' ref={ansField} title='answerField' placeholder='Loading...' readOnly />
                <img onClick={() => openOrClose(historyBox)} id='historyIcon' src={historyIcon} alt='historyIcon' title='calculationHistory' />
                <span id='historyBox' ref={historyBox}>
                    <div id='historyTitle'> History </div>
                    {
                        calcHistory.map((historyEntry, index) => 
                            <div key={index}>{historyEntry}</div>
                        )
                    }
                </span>
                <span id="buttons" ref={buttonContainer}>
                    <button onClick={() => clearDisplay()} className='deleter' title='clearAll'>C</button>
                    <button onClick={() => appendToDisplay('7', true)} title='seven'>7</button>
                    <button onClick={() => appendToDisplay('8', true)} title='eight'>8</button>
                    <button onClick={() => appendToDisplay('9', true)} title='nine'>9</button>
                    <button onClick={() => deleteLastFromDisplay()} className='deleter' title='deleteLast'>D</button>
                    <button onClick={() => appendToDisplay(' ** ', false)} className='operator' title='exponentOperator'>^</button>
                    <button onClick={() => appendToDisplay('4', true)} title='four'>4</button>
                    <button onClick={() => appendToDisplay('5', true)} title='five'>5</button>
                    <button onClick={() => appendToDisplay('6', true)} title='six'>6</button>
                    <button onClick={() => appendToDisplay(' % ', false)} className='operator' title='modulus'>%</button>
                    <button onClick={() => appendToDisplay(' * ', false)} className='operator' title='multiplicationSign'>*</button>
                    <button onClick={() => appendToDisplay('1', true)} title='one'>1</button>
                    <button onClick={() => appendToDisplay('2', true)} title='two'>2</button>
                    <button onClick={() => appendToDisplay('3', true)} title='three'>3</button>
                    <button onClick={() => appendToDisplay(' + ', false)} className='operator' title='plusSign'>+</button>
                    <button onClick={() => appendToDisplay(' / ', false)} className='operator' title='divisionSign'>/</button>
                    <button onClick={() => appendToDisplay('0', true)} title='zero'>0</button>
                    <button onClick={() => appendToDisplay('.', false)} title='decimalPoint'>.</button>
                    <button onClick={() => calculateDisplay()} id='equals' title='equalSign'>=</button>
                    <button onClick={() => appendToDisplay(' - ', false)} className='operator' title='minus/negativeSign'>-</button>
                    <button onClick={() => appendToDisplay('√', true)} className='operator' title='squareRoot'>√</button>
                    <button onClick={() => appendToDisplay('π', true)} className='irrationalNum' title='pi'>π</button>
                    <button onClick={() => appendToDisplay('e', true)} className='irrationalNum' title="euler'sNumber">e</button>
                    <button onClick={() => appendToDisplay(ans.current, true)} id='ans' title='previousAnswer'>ANS</button>
                    <button onClick={() => appendToDisplay('!', false)} className='operator' title='factorial'>!</button>
                </span>
            </span>
        </div>
    )
}

export default Calculator