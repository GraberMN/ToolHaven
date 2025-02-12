import React from 'react'
import { useState, useRef } from 'react'
import './calculator.css'

function Calculator() {
    const inputField = useRef("")
    const appendToDisplay = (input) => {
        inputField.current.value = inputField.current.value + input
    }
    const clearDisplay = () => {
        inputField.current.value = ""
    }
    const deleteLastFromDisplay = () => {
        inputField.current.value = inputField.current.value.substring(0, inputField.current.value.length - 1)
    }
    const calculateDisplay = () => {
        try {
            inputField.current.value = eval(inputField.current.value)
        }
        catch (error) {
            inputField.current.value = "Error"
        }
    }
    return (
        <div>
            <h1 id="calcTitle">Calculator</h1>
            <span id="calculator">
                <input type="text" ref={inputField} readOnly />
                <span id="buttons">
                    <button onClick={() => clearDisplay()} className='deleter' title='clearAll'>C</button>
                    <button onClick={() => appendToDisplay('7')} title='seven'>7</button>
                    <button onClick={() => appendToDisplay('8')} title='eight'>8</button>
                    <button onClick={() => appendToDisplay('9')} title='nine'>9</button>
                    <button onClick={() => deleteLastFromDisplay()} className='deleter' title='deleteLast'>D</button>
                    <button onClick={() => appendToDisplay(' ** ')} className='operator' title='exponentOperator'>^</button>
                    <button onClick={() => appendToDisplay('4')} title='four'>4</button>
                    <button onClick={() => appendToDisplay('5')} title='five'>5</button>
                    <button onClick={() => appendToDisplay('6')} title='six'>6</button>
                    <button onClick={() => appendToDisplay(' % ')} className='operator' title='modulus'>%</button>
                    <button onClick={() => appendToDisplay(' * ')} className='operator' title='multiplicationSign'>*</button>
                    <button onClick={() => appendToDisplay('1')} title='one'>1</button>
                    <button onClick={() => appendToDisplay('2')} title='two'>2</button>
                    <button onClick={() => appendToDisplay('3')} title='three'>3</button>
                    <button onClick={() => appendToDisplay(' + ')} className='operator' title='plusSign'>+</button>
                    <button onClick={() => appendToDisplay(' / ')} className='operator' title='divisionSign'>/</button>
                    <button onClick={() => appendToDisplay('0')} title='zero'>0</button>
                    <button onClick={() => appendToDisplay('.')} title='decimalPoint'>.</button>
                    <button onClick={() => calculateDisplay()} id='equals' title='equalSign'>=</button>
                    <button onClick={() => appendToDisplay(' - ')} className='operator' title='minusSign'>-</button>
                </span>
            </span>
        </div>
    )
}

export default Calculator