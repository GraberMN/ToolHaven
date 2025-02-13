import React from 'react'
import { useState, useRef, useEffect } from 'react'
import './calculator.css'

function Calculator({settingsIcon}) {
    const inputField = useRef("0")
    const appendToDisplay = (input, isNum) => {
        if (inputField.current.value == "Error" || inputField.current.value == "NaN") {
            isNum ? inputField.current.value = "" : inputField.current.value = "0"
        }
        if (inputField.current.value == "0" && isNum) {
            inputField.current.value = ""
        }
        inputField.current.value = inputField.current.value + input
    }
    const clearDisplay = () => {
        inputField.current.value = "0"
    }
    const deleteLastFromDisplay = () => {
        if (inputField.current.value.length > 1 && inputField.current.value != "Error") {
            inputField.current.value = inputField.current.value.substring(0, inputField.current.value.length - 1)
        } else {
            inputField.current.value = "0"
        }
    }
    const calculateDisplay = () => {
        try {
            inputField.current.value = eval(inputField.current.value)
        }
        catch (error) {
            inputField.current.value = "Error"
        }
    }
    useEffect(() => {
        inputField.current.value = "0"
    }, [])
    return (
        <div>
            <img id='settingsIcon' src={settingsIcon} alt='settingsIcon'/>
            <h1 id="calcTitle">Calculator</h1>
            <span id="calculator">
                <input type="text" ref={inputField} readOnly />
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
                    <button onClick={() => appendToDisplay(' - ', false)} className='operator' title='minusSign'>-</button>
                </span>
            </span>
        </div>
    )
}

export default Calculator