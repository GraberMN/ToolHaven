import React from 'react'
import { useState, useRef } from 'react'
import './calculator.css'

function Calculator() {
    const inputField = useRef("")
    const appendToDisplay = (input) => {
        inputField.current.value = inputField.current.value + input
    }
    return (
        <div>
            <h1 id="calcTitle">Calculator</h1>
            <span id="calculator">
                <input type="text" ref={inputField} readOnly />
                <span id="buttons">
                    <button className='deleter' title='clearAll'>C</button>
                    <button onClick={() => appendToDisplay('7')} title='seven'>7</button>
                    <button onClick={() => appendToDisplay('8')} title='eight'>8</button>
                    <button onClick={() => appendToDisplay('9')} title='nine'>9</button>
                    <button className='deleter' title='deleteLast'>D</button>
                    <button className='operator' title='exponentOperator'>^</button>
                    <button onClick={() => appendToDisplay('4')} title='four'>4</button>
                    <button onClick={() => appendToDisplay('5')} title='five'>5</button>
                    <button onClick={() => appendToDisplay('6')} title='six'>6</button>
                    <button className='operator' title='modulus'>%</button>
                    <button className='operator' title='multiplicationSign'>*</button>
                    <button onClick={() => appendToDisplay('1')} title='one'>1</button>
                    <button onClick={() => appendToDisplay('2')} title='two'>2</button>
                    <button onClick={() => appendToDisplay('3')} title='three'>3</button>
                    <button className='operator' title='plusSign'>+</button>
                    <button className='operator' title='divisionSign'>/</button>
                    <button onClick={() => appendToDisplay('0')} title='zero'>0</button>
                    <button onClick={() => appendToDisplay('.')} title='decimalPoint'>.</button>
                    <button id='equals' title='equalSign'>=</button>
                    <button className='operator' title='minusSign'>-</button>
                </span>
            </span>
        </div>
    )
}

export default Calculator