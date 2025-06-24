import React from 'react';
import { useState, useRef, useEffect } from 'react';
import './paintbrush.css';

function Paintbrush({ paintbrushImagesArray, moveToPaintbrush, setMoveToPaintbrush }) {
    const [settingsIcon, rulesIcon, homeButton] = paintbrushImagesArray;
    const [strokeWidth, setStrokeWidth] = useState(5);
    const [canvasBGColorVal, setCanvasBGColorVal] = useState('#FFFFFF');
    const [paintbrushStrokeColorVal, setPaintbrushStrokeColorVal] = useState('#000000')
    const ctx = useRef(null);
    const canvasOffsetTracker = useRef(0);
    const canvasShapeTracker = useRef('square');
    const isPainting = useRef(false);
    const paintingStartX = useRef(0);
    const paintingStartY = useRef(0);
    const firstCanvasShapeOption = useRef(null);
    const firstCanvasToolOption = useRef(null);
    const paintbrushRulesIconRef = useRef(null);
    const paintbrushRulesBox = useRef(null);
    const paintbrushSettingsIconRef = useRef(null);
    const paintbrushSettingsBox = useRef(null);
    const paintbrushTitleRef = useRef(null);
    const paintbrushCanvasRef = useRef(null);
    const canvasButtons = useRef(null);
    const downloadButtonRef = useRef(null);
    const clearButtonRef = useRef(null);
    const paintbrushHomeButtonRef = useRef(null);
    const startPainting = (e) => {
        isPainting.current = true;
        paintingStartX.current = e.clientX;
        paintingStartY.current = e.clientY;
    }
    const paint = (e) => {
        if (isPainting.current) {
            ctx.current.lineWidth = strokeWidth;
            ctx.current.lineCap = 'butt';
            ctx.current.lineTo(e.clientX - canvasOffsetTracker.current.left, e.clientY - canvasOffsetTracker.current.top);
            ctx.current.stroke();
        }
    }
    const finishLine = () => {
        isPainting.current = false;
        ctx.current.stroke();
        ctx.current.beginPath();
    }
    const clearCanvas = () => {
        if (ctx.current !== null) {
            ctx.current.clearRect(0, 0, paintbrushCanvasRef.current.width, paintbrushCanvasRef.current.height);
        }
    }
    const changeCanvasShapeToSquare = (isChecked) => {
        if (isChecked) {
            if (canvasShapeTracker.current === 'square') {
                return;
            }
            paintbrushCanvasRef.current.style.width = '600px';
            ctx.current.scale(2, 1);
            canvasShapeTracker.current = 'square';
            canvasOffsetTracker.current = paintbrushCanvasRef.current.getBoundingClientRect();
        }
    }
    const changeCanvasShapeToRectangular = (isChecked) => {
        if (isChecked) {
            if (canvasShapeTracker.current === 'rectangular') {
                return;
            }
            paintbrushCanvasRef.current.style.width = '1200px';
            ctx.current.scale(0.5, 1);
            canvasShapeTracker.current = 'rectangular';
            canvasOffsetTracker.current = paintbrushCanvasRef.current.getBoundingClientRect();
        }
    }
    const changeCanvasToolToPaintbrush = () => {

    }
    const changeCanvasToolToEraser = () => {

    }
    const openOrClose = (element) => {
        if (element.current.style.visibility === "hidden") {
            element.current.style.visibility = "visible";
        } else {
            element.current.style.visibility = "hidden";
        }
    }
    const onCanvasBGColorChange = (e) => {
        setCanvasBGColorVal(e.target.value);
    }
    const onPaintbrushStrokeColorChange = (e) => {
        setPaintbrushStrokeColorVal(e.target.value);
    }
    const onAdjustWindowWidthPaintbrush = () => {
        canvasOffsetTracker.current = paintbrushCanvasRef.current.getBoundingClientRect();
        if (window.innerWidth <= 740) {
            paintbrushRulesIconRef.current.style.transform = 'translateX(-260px)';
            paintbrushRulesBox.current.style.transform = 'translateX(-260px)';
            paintbrushSettingsIconRef.current.style.transform = 'translateX(180px)';
            paintbrushSettingsBox.current.style.transform = 'translateX(-45px)';
            paintbrushHomeButtonRef.current.style.transform = 'translateX(-260px)';
        } else {
            paintbrushRulesIconRef.current.style.transform = 'translateX(-367px)';
            paintbrushRulesBox.current.style.transform = 'translateX(-367px)';
            paintbrushSettingsIconRef.current.style.transform = 'translateX(285px)';
            paintbrushSettingsBox.current.style.transform = 'translateX(60px)';
            paintbrushHomeButtonRef.current.style.transform = 'translateX(-367px)';
        }
    }
    const animateElements = () => {
        const paintbrushElements = [paintbrushTitleRef, paintbrushRulesIconRef, paintbrushRulesBox, paintbrushSettingsIconRef, paintbrushSettingsBox, paintbrushCanvasRef, canvasButtons, paintbrushHomeButtonRef];
        for (let i = 0; i < paintbrushElements.length; i++) {
            readyForAnimation(paintbrushElements[i]);
        }
        paintbrushTitleRef.current.style.animationName = 'appearFromRightPaintbrush';
        if (window.innerWidth > 740) {
            paintbrushRulesIconRef.current.style.animationName = 'appearFromRightPaintbrushRules';
            paintbrushRulesBox.current.style.animationName = 'appearFromRightPaintbrushRules';
            paintbrushSettingsIconRef.current.style.animationName = 'appearFromRightPaintbrushSettingsIcon';
            paintbrushSettingsBox.current.style.animationName = 'appearFromRightPaintbrushSettingsBox';
            paintbrushHomeButtonRef.current.style.animationName = 'appearFromRightPaintbrushRules';
        } else {
            paintbrushRulesIconRef.current.style.animationName = 'appearFromRightPaintbrushRulesSmall';
            paintbrushRulesBox.current.style.animationName = 'appearFromRightPaintbrushRulesSmall';
            paintbrushSettingsIconRef.current.style.animationName = 'appearFromRightPaintbrushSettingsIconSmall';
            paintbrushSettingsBox.current.style.animationName = 'appearFromRightPaintbrushSettingsBoxSmall';
            paintbrushHomeButtonRef.current.style.animationName = 'appearFromRightPaintbrushRulesSmall';
        }
        paintbrushCanvasRef.current.style.animationName = 'appearFromRightPaintbrush';
        canvasButtons.current.style.animationName = 'appearFromRightPaintbrush';
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
        if (ctx.current !== null) {
            ctx.current.lineWidth = strokeWidth;
        }
    }, [strokeWidth]);
    useEffect(() => {
        if (ctx.current !== null) {
            ctx.current.strokeStyle = paintbrushStrokeColorVal;
        }
    }, [paintbrushStrokeColorVal]);
    useEffect(() => {
        if (moveToPaintbrush) {
            document.body.style.pointerEvents = 'none';
            paintbrushTitleRef.current.style.display = 'block';
            paintbrushRulesIconRef.current.style.display = 'inline';
            paintbrushRulesBox.current.style.display = 'inline';
            paintbrushRulesBox.current.style.visibility = 'hidden';
            paintbrushSettingsIconRef.current.style.display = 'inline';
            paintbrushSettingsBox.current.style.display = 'inline';
            paintbrushSettingsBox.current.style.visibility = 'hidden';
            paintbrushCanvasRef.current.style.display = 'block';
            canvasButtons.current.style.display = 'block';
            paintbrushHomeButtonRef.current.style.display = 'inline';
            const paintbrushElements = [paintbrushTitleRef, paintbrushRulesIconRef, paintbrushRulesBox, paintbrushSettingsIconRef, paintbrushSettingsBox, paintbrushCanvasRef, canvasButtons, paintbrushHomeButtonRef];
            for (let i = 0; i < paintbrushElements.length; i++) {
                readyForMove(paintbrushElements[i]);
            }
            firstCanvasShapeOption.current.checked = 'true';
            firstCanvasToolOption.current.checked = 'true';
            document.body.style.backgroundColor = 'hsl(274, 25.30%, 83.70%)';
            setTimeout(() => {
                animateElements();
            }, 2000);
            setTimeout(() => {
                const paintbrushNonPaintbrushElements = [paintbrushRulesIconRef, paintbrushRulesBox, paintbrushSettingsIconRef, paintbrushSettingsBox, paintbrushHomeButtonRef];
                for (let i = 0; i < paintbrushNonPaintbrushElements.length; i++) {
                    paintbrushNonPaintbrushElements[i].current.style.animationName = 'none';
                    paintbrushNonPaintbrushElements[i].current.style.opacity = '100';
                }
                window.addEventListener("resize", onAdjustWindowWidthPaintbrush);
                ctx.current = paintbrushCanvasRef.current.getContext("2d");
                canvasOffsetTracker.current = paintbrushCanvasRef.current.getBoundingClientRect();
                ctx.current.scale(0.5, 0.25);
                document.body.style.pointerEvents = 'auto';
                if (window.innerWidth <= 740) {
                    paintbrushRulesIconRef.current.style.transform = 'translateX(-260px)';
                    paintbrushRulesBox.current.style.transform = 'translateX(-260px)';
                    paintbrushSettingsIconRef.current.style.transform = 'translateX(180px)';
                    paintbrushSettingsBox.current.style.transform = 'translateX(-45px)';
                    paintbrushHomeButtonRef.current.style.transform = 'translateX(-260px)';
                }
            }, 4000);
        }
    }, [moveToPaintbrush]);
    useEffect(() => {
        const goneElements = [paintbrushTitleRef, paintbrushRulesIconRef, paintbrushRulesBox, paintbrushSettingsIconRef, paintbrushSettingsBox, paintbrushCanvasRef, canvasButtons, paintbrushHomeButtonRef];
        for (let i = 0; i < goneElements.length; i++) {
            goneElements[i].current.style.display = 'none';
        }
        return () => {
            window.removeEventListener("resize", onAdjustWindowWidthPaintbrush);
        }
    }, []);
    return (
        <div>
            <img onClick={() => openOrClose(paintbrushRulesBox)} id='paintbrushRulesIcon' draggable={false} src={rulesIcon} ref={paintbrushRulesIconRef} alt='paintbrushRulesIcon' title="paintbrushRules" />
            <span id='paintbrushRulesBox' draggable={false} ref={paintbrushRulesBox}>
                <div id='paintbrushRulesTitle' draggable={false}>Rules</div>
                <ul>
                    <li>Hover over the Paintbrush canvas or any button to find out what it is/represents.</li>
                    <li>The bottom left Home button takes you back to the Home page.</li>
                    <li>The Settings tab lets you .</li>
                    <li>The produced masterpiece is downloaded as a .</li>
                    <li>Square canvas is 600px x 600px, while rectangular canvas is 1200px x 600px.</li>
                    <li></li>
                    <li></li>
                    <li>When changing color in Settings, drag the pointer around for it to work seamlessly.</li>
                    <li>Paint Tool-Specific Rules:</li>
                    <li id='lvl2li'></li>
                    <li id='lvl2li'></li>
                </ul>
            </span>
            <img onClick={() => openOrClose(paintbrushSettingsBox)} id='paintbrushSettingsIcon' draggable={false} src={settingsIcon} ref={paintbrushSettingsIconRef} alt='paintbrushSettingsIcon' title="paintbrushSettings" />
            <span id='paintbrushSettingsBox' draggable={false} ref={paintbrushSettingsBox}>
                <div id='paintbrushSettingsTitle' draggable={false}>Settings</div>
                <ul>
                    <li>Dimensions/shape of canvas:</li>
                    <li id='paintbrushInvisLiRadio'>
                        <input type='radio' onClick={(e) => changeCanvasShapeToSquare(e.target.checked)} name='canvasDimensionsShapeOptions' ref={firstCanvasShapeOption} title="squareCanvasShapeRadio" placeholder='squareCanvasShapeRadio' /><span id='squareCanvasText'>square</span>
                        <input type='radio' onClick={(e) => changeCanvasShapeToRectangular(e.target.checked)} name='canvasDimensionsShapeOptions' title="rectangularCanvasShapeRadio" placeholder='rectangularCanvasShapeRadio' /><span id='rectangularCanvasText'>rectangular</span>
                    </li>
                    <li>Color of canvas background:</li>
                    <input type='color' value={canvasBGColorVal} onChange={(e) => onCanvasBGColorChange(e)} id='canvasBGColorPicker' title="canvasBGColorPicker" placeholder='canvasBGColorPicker' />
                    <li>Canvas tool options:</li>
                    <li id='paintbrushInvisLiRadio'>
                        <input type='radio' onClick={(e) => changeCanvasToolToPaintbrush(e.target.checked)} name='canvasToolOptions' ref={firstCanvasToolOption} title="paintbrushCanvasToolRadio" placeholder='paintbrushCanvasToolRadio' /><span id='paintbrushToolText'>paintbrush</span>
                        <input type='radio' onClick={(e) => changeCanvasToolToEraser(e.target.checked)} name='canvasToolOptions' title="eraserCanvasToolRadio" placeholder='eraserCanvasToolRadio' /><span id='eraserToolText'>eraser</span>
                    </li>
                    <li>Stroke width of both tools:</li>
                    <input type='range' min={1} max={30} value={strokeWidth} onChange={(e) => setStrokeWidth(e.target.value)} title="strokeWidthSlider" placeholder='strokeWidthSlider' />
                    <span title={strokeWidth + " pixels"}>{strokeWidth}</span>
                    <li>Stroke color of paintbrush:</li>
                    <input type='color' value={paintbrushStrokeColorVal} onChange={(e) => onPaintbrushStrokeColorChange(e)} id='paintbrushStrokeColorPicker' title="paintbrushStrokeColorPicker" placeholder='paintbrushStrokeColorPicker' />
                </ul>
            </span>
            <div id='paintbrushTitle' draggable={false} ref={paintbrushTitleRef}>Paintbrush</div>
            <canvas id='paintbrushCanvas' style={{ backgroundColor: canvasBGColorVal }} onMouseDown={(e) => startPainting(e)} onMouseMove={(e) => paint(e)} onMouseUp={() => finishLine()} draggable={false} ref={paintbrushCanvasRef} alt='paintbrushCanvas' title="paintbrushCanvas"></canvas>
            <div style={{ display: 'flex', justifyContent: 'center' }} ref={canvasButtons}>
                <button id='downloadButton' draggable={false} ref={downloadButtonRef} title="downloadButton">Download Masterpiece</button>
                <button onClick={() => clearCanvas()} id='clearButton' draggable={false} ref={clearButtonRef} title="clearCanvasButton">Clear</button>
            </div>
            <img onClick={() => window.location.reload()} id='paintbrushHomeButton' draggable={false} ref={paintbrushHomeButtonRef} src={homeButton} alt='toHome' title="toHome" />
        </div>
    )
}

export default Paintbrush