import React from 'react'
import { useState, useRef, useEffect } from 'react'
import './calculator.css'

function Calculator({ settingsIcon, historyIcon }) {
    const [calcHistory, setCalcHistory] = useState([])
    const beforeEval = useRef("0")
    const inputField = useRef("0")
    const ansField = useRef("ANS = 0")
    const settingsBox = useRef(null)
    const historyBox = useRef(null)
    const ans = useRef("0")
    const appendToDisplay = (input, isNum) => {
        if (inputField.current.value === "Error" || inputField.current.value === "NaN") {
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
            beforeEval.current = inputField.current.value
            if (inputField.current.value.includes("e") || inputField.current.value.includes("π")) {
                inputField.current.value = inputField.current.value.replaceAll("e", "Math.E")
                inputField.current.value = inputField.current.value.replaceAll("π", "Math.PI")
                const charArray = inputField.current.value.split("")
                for (let i = 1; i < charArray.length; i++) {
                    if (charArray[i] === "M" && (Number.isInteger(parseInt(charArray[i - 1])) || charArray[i - 1] === "E" || charArray[i - 1] === "I")) {
                        charArray[i] = " * M"
                    }
                }
                inputField.current.value = charArray.join("")
            }
            inputField.current.value = eval(inputField.current.value)
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
    const settingsOpenOrClose = () => {
        if (settingsBox.current.style.visibility === "hidden") {
            settingsBox.current.style.visibility = "visible"
        } else {
            settingsBox.current.style.visibility = "hidden"
        }
    }
    const historyOpenOrClose = () => {
        if (historyBox.current.style.visibility === "hidden") {
            historyBox.current.style.visibility = "visible"
        } else {
            historyBox.current.style.visibility = "hidden"
        }
    }
    useEffect(() => {
        inputField.current.value = "0"
        ansField.current.value = "ANS = 0"
        settingsBox.current.style.visibility = "hidden"
        historyBox.current.style.visibility = "hidden"
        beforeEval.current = "0"
        ans.current = "0"
        setCalcHistory([])
    }, [])
    return (
        <div>
            <img onClick={() => settingsOpenOrClose()} id='settingsIcon' src={settingsIcon} alt='settingsIconOut' title="calculatorSettings" />
            <span id='settingsBox' ref={settingsBox}>
                <div id='settingsTitle'>Settings</div>

            </span>
            <h1 id="calcTitle">Calculator</h1>
            <span id="calculator">
                <input type="text" id='inputField' ref={inputField} maxLength={27} readOnly />
                <input type='text' id='ansField' ref={ansField} readOnly />
                <img onClick={() => historyOpenOrClose()} id='historyIcon' src={historyIcon} alt='historyIcon' title='calculationHistory' />
                <span id='historyBox' ref={historyBox}>
                    <div id='historyTitle'> History </div>
                    {
                        calcHistory.map((historyEntry, index) => 
                            <div key={index}>{historyEntry}</div>
                        )
                    }
                </span>
                <span id="buttons">
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
                    <button onClick={() => appendToDisplay('√', false)} className='operator' title='squareRoot'>√</button>
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