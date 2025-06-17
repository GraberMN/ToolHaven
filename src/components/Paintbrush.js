import React from 'react';
import { useState, useRef, useEffect } from 'react';
import './paintbrush.css';

function Paintbrush({ paintbrushImagesArray, moveToPaintbrush, setMoveToPaintbrush }) {
    const [settingsIcon, rulesIcon, homeButton] = paintbrushImagesArray;
    const paintbrushRulesIconRef = useRef(null);
    const paintbrushRulesBox = useRef(null);
    const paintbrushSettingsIconRef = useRef(null);
    const paintbrushSettingsBox = useRef(null);
    const paintbrushTitleRef = useRef(null);
    const paintbrushCanvasRef = useRef(null);
    const downloadButtonRef = useRef(null);
    const paintbrushHomeButtonRef = useRef(null);
    const openOrClose = (element) => {
        if (element.current.style.visibility === "hidden") {
            element.current.style.visibility = "visible";
        } else {
            element.current.style.visibility = "hidden";
        }
    }
    const onAdjustWindowWidthPaintbrush = () => {
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
        const paintbrushElements = [paintbrushTitleRef, paintbrushRulesIconRef, paintbrushRulesBox, paintbrushSettingsIconRef, paintbrushSettingsBox, paintbrushCanvasRef, downloadButtonRef, paintbrushHomeButtonRef];
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
        downloadButtonRef.current.style.animationName = 'appearFromRightPaintbrush';
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
            downloadButtonRef.current.style.display = 'block';
            paintbrushHomeButtonRef.current.style.display = 'inline';
            const paintbrushElements = [paintbrushTitleRef, paintbrushRulesIconRef, paintbrushRulesBox, paintbrushSettingsIconRef, paintbrushSettingsBox, paintbrushCanvasRef, downloadButtonRef, paintbrushHomeButtonRef];
            for (let i = 0; i < paintbrushElements.length; i++) {
                readyForMove(paintbrushElements[i]);
            }
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
        const goneElements = [paintbrushTitleRef, paintbrushRulesIconRef, paintbrushRulesBox, paintbrushSettingsIconRef, paintbrushSettingsBox, paintbrushCanvasRef, downloadButtonRef, paintbrushHomeButtonRef];
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
                    <li>The supported file extensions for download are .</li>
                    <li></li>
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
                    <li></li>
                </ul>
            </span>
            <div id='paintbrushTitle' draggable={false} ref={paintbrushTitleRef}>Paintbrush</div>
            <span id='paintbrushCanvas' draggable={false} ref={paintbrushCanvasRef} alt='paintbrushCanvas' title='paintbrushCanvas'></span>
            <button id='downloadButton' ref={downloadButtonRef}>Download Masterpiece</button>
            <img onClick={() => window.location.reload()} id='paintbrushHomeButton' draggable={false} ref={paintbrushHomeButtonRef} src={homeButton} alt='toHome' title="toHome" />
        </div>
    )
}

export default Paintbrush