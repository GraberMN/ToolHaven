import React from 'react';
import { useState, useRef, useEffect } from 'react';
import './imgIdentifier.css';

function ImgIdentifier({ imgIdentifierImagesArray, moveToImgIdentifier, setMoveToImgIdentifier }) {
    const [settingsIcon, rulesIcon, imgIdentifierThumbnailTransparent, homeButton] = imgIdentifierImagesArray;
    const [imgSource, setImgSource] = useState('');
    const imgIdentifierRulesIconRef = useRef(null);
    const imgIdentifierRulesBox = useRef(null);
    const imgIdentifierSettingsIconRef = useRef(null);
    const imgIdentifierSettingsBox = useRef(null);
    const imgIdentifierTitleRef = useRef(null);
    const imgIdentifierRef = useRef(null);
    const imgIdentifierPicContainerRef = useRef(null);
    const chooseImgButtonRef = useRef(null);
    const imgSelectedRef = useRef(null);

    const imgIdentifierHomeButtonRef = useRef(null);
    const onFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!(file.name.includes(".png")) && !(file.name.includes(".jpg")) && !(file.name.includes(".jpeg")) && !(file.name.includes(".svg")) && !(file.name.includes(".gif")) && !(file.name.includes(".PNG")) && !(file.name.includes(".webp")) && !(file.name.includes(".ico")) && !(file.name.includes(".bmp")) && !(file.name.includes(".tif")) && !(file.name.includes(".xbm")) && !(file.name.includes(".pjp")) && !(file.name.includes(".apng")) && !(file.name.includes(".heif")) && !(file.name.includes(".tiff")) && !(file.name.includes(".jfif")) && !(file.name.includes(".heic")) && !(file.name.includes(".pjpeg")) && !(file.name.includes(".avif"))) {
                alert("This chosen file's file extension indicates that it is not an image. Please try again.");
                return;
            }
            let fileNameHolder = file.name;
            let shortenString = false;
            let k = -1;
            const fileNameCharArray = fileNameHolder.split("");
            for (let i = 0; i < fileNameCharArray.length; i++) {
                if (fileNameCharArray[i] === "." && i >= fileNameCharArray.length - 6) {
                    if (i >= 13) {
                        shortenString = true;
                        k = i;
                        break;
                    }
                }
            }
            if (shortenString) {
                let firstPart = fileNameHolder.substring(0, 7) + "..." + fileNameHolder.substring(k - 2, k);
                let secondPart = fileNameHolder.substring(k);
                fileNameHolder = firstPart + secondPart;
            }
            imgSelectedRef.current.innerHTML = fileNameHolder;
            const reader = new FileReader();
            reader.onload = (e) => {
                setImgSource(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    }
    const openOrClose = (element) => {
        if (element.current.style.visibility === "hidden") {
            element.current.style.visibility = "visible";
        } else {
            element.current.style.visibility = "hidden";
        }
    }
    const onAdjustWindowWidthImgIdentifier = () => {
        if (window.innerWidth <= 740) {
            imgIdentifierRulesIconRef.current.style.transform = 'translateX(-260px)';
            imgIdentifierRulesBox.current.style.transform = 'translateX(-260px)';
            imgIdentifierSettingsIconRef.current.style.transform = 'translateX(180px)';
            imgIdentifierSettingsBox.current.style.transform = 'translateX(-45px)';
            imgIdentifierHomeButtonRef.current.style.transform = 'translateX(-260px)';
        } else {
            imgIdentifierRulesIconRef.current.style.transform = 'translateX(-367px)';
            imgIdentifierRulesBox.current.style.transform = 'translateX(-367px)';
            imgIdentifierSettingsIconRef.current.style.transform = 'translateX(285px)';
            imgIdentifierSettingsBox.current.style.transform = 'translateX(60px)';
            imgIdentifierHomeButtonRef.current.style.transform = 'translateX(-367px)';
        }
    }
    const animateElements = () => {
        const imgIdentifierElements = [imgIdentifierTitleRef, imgIdentifierRulesIconRef, imgIdentifierRulesBox, imgIdentifierSettingsIconRef, imgIdentifierSettingsBox, imgIdentifierRef, imgIdentifierHomeButtonRef];
        for (let i = 0; i < imgIdentifierElements.length; i++) {
            readyForAnimation(imgIdentifierElements[i]);
        }
        imgIdentifierTitleRef.current.style.animationName = 'appearFromRightImgIdentifier';
        if (window.innerWidth > 740) {
            imgIdentifierRulesIconRef.current.style.animationName = 'appearFromRightImgIdentifierRules';
            imgIdentifierRulesBox.current.style.animationName = 'appearFromRightImgIdentifierRules';
            imgIdentifierSettingsIconRef.current.style.animationName = 'appearFromRightImgIdentifierSettingsIcon';
            imgIdentifierSettingsBox.current.style.animationName = 'appearFromRightImgIdentifierSettingsBox';
            imgIdentifierHomeButtonRef.current.style.animationName = 'appearFromRightImgIdentifierRules';
        } else {
            imgIdentifierRulesIconRef.current.style.animationName = 'appearFromRightImgIdentifierRulesSmall';
            imgIdentifierRulesBox.current.style.animationName = 'appearFromRightImgIdentifierRulesSmall';
            imgIdentifierSettingsIconRef.current.style.animationName = 'appearFromRightImgIdentifierSettingsIconSmall';
            imgIdentifierSettingsBox.current.style.animationName = 'appearFromRightImgIdentifierSettingsBoxSmall';
            imgIdentifierHomeButtonRef.current.style.animationName = 'appearFromRightImgIdentifierRulesSmall';
        }
        imgIdentifierRef.current.style.animationName = 'appearFromRightImgIdentifier';
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
        if (moveToImgIdentifier) {
            imgIdentifierTitleRef.current.style.display = 'block';
            imgIdentifierRulesIconRef.current.style.display = 'inline';
            imgIdentifierRulesBox.current.style.display = 'inline';
            imgIdentifierRulesBox.current.style.visibility = 'hidden';
            imgIdentifierSettingsIconRef.current.style.display = 'inline';
            imgIdentifierSettingsBox.current.style.display = 'inline';
            imgIdentifierSettingsBox.current.style.visibility = 'hidden';
            imgIdentifierRef.current.style.display = 'block';
            imgIdentifierHomeButtonRef.current.style.display = 'inline';
            const imgIdentifierElements = [imgIdentifierTitleRef, imgIdentifierRulesIconRef, imgIdentifierRulesBox, imgIdentifierSettingsIconRef, imgIdentifierSettingsBox, imgIdentifierRef, imgIdentifierHomeButtonRef];
            for (let i = 0; i < imgIdentifierElements.length; i++) {
                readyForMove(imgIdentifierElements[i]);
            }
            document.body.style.backgroundColor = 'hsl(0, 100.00%, 85.00%)';
            setTimeout(() => {
                animateElements();
            }, 2000);
            setTimeout(() => {
                const imgIdentifierNonImgIdentifierElements = [imgIdentifierRulesIconRef, imgIdentifierRulesBox, imgIdentifierSettingsIconRef, imgIdentifierSettingsBox, imgIdentifierHomeButtonRef];
                for (let i = 0; i < imgIdentifierNonImgIdentifierElements.length; i++) {
                    imgIdentifierNonImgIdentifierElements[i].current.style.animationName = 'none';
                    imgIdentifierNonImgIdentifierElements[i].current.style.opacity = '100';
                }
                window.addEventListener("resize", onAdjustWindowWidthImgIdentifier);
                if (window.innerWidth <= 740) {
                    imgIdentifierRulesIconRef.current.style.transform = 'translateX(-260px)';
                    imgIdentifierRulesBox.current.style.transform = 'translateX(-260px)';
                    imgIdentifierSettingsIconRef.current.style.transform = 'translateX(180px)';
                    imgIdentifierSettingsBox.current.style.transform = 'translateX(-45px)';
                    imgIdentifierHomeButtonRef.current.style.transform = 'translateX(-260px)';
                }
            }, 4000);
        }
    }, [moveToImgIdentifier]);
    useEffect(() => {
        const goneElements = [imgIdentifierTitleRef, imgIdentifierRulesIconRef, imgIdentifierRulesBox, imgIdentifierSettingsIconRef, imgIdentifierSettingsBox, imgIdentifierRef, imgIdentifierHomeButtonRef];
        for (let i = 0; i < goneElements.length; i++) {
            goneElements[i].current.style.display = 'none';
        }
    }, []);
    return (
        <div>
            <img onClick={() => openOrClose(imgIdentifierRulesBox)} id='imgIdentifierRulesIcon' draggable={false} src={rulesIcon} ref={imgIdentifierRulesIconRef} alt='imgIdentifierRulesIcon' title="imgIdentifierRules" />
            <span id='imgIdentifierRulesBox' draggable={false} ref={imgIdentifierRulesBox}>
                <div id='imgIdentifierRulesTitle' draggable={false}>Rules</div>
                <ul>
                    <li>Hover over the Identifier or any external button to find out what it is/represents.</li>
                    <li>The bottom left Home button takes you back to the Home page.</li>
                    <li>The Settings tab lets you </li>
                    <li></li>
                    <li>When changing color in Settings, drag the pointer around for it to work seamlessly.</li>
                    <li>AI Model-Specific Rules:</li>
                    <li id='lvl2li'>This Img Identifier </li>
                </ul>
            </span>
            <img onClick={() => openOrClose(imgIdentifierSettingsBox)} id='imgIdentifierSettingsIcon' draggable={false} src={settingsIcon} ref={imgIdentifierSettingsIconRef} alt='imgIdentifierSettingsIcon' title="imgIdentifierSettings" />
            <span id='imgIdentifierSettingsBox' draggable={false} ref={imgIdentifierSettingsBox}>
                <div id='imgIdentifierSettingsTitle' draggable={false}>Settings</div>
                <ul>
                    <li></li>
                </ul>
            </span>
            <div id='imgIdentifierTitle' draggable={false} ref={imgIdentifierTitleRef}>Img Identifier</div>
            <span id='imgIdentifier' draggable={false} ref={imgIdentifierRef}>
                <div id='imgIdentifierImgChooser' draggable={false}>
                    <div id='imgIdentifierPicContainer' draggable={false} ref={imgIdentifierPicContainerRef}>
                        <img id='imgIdentifierPic' draggable={false} src={imgSource} alt='imgIdentifierImage' title="imgIdentifierImage" />
                    </div>
                    <input type='file' onChange={(e) => onFileChange(e)} id='chooseImgButton' ref={chooseImgButtonRef} accept='image/*' alt='chooseImgButton' title="chooseImgButton" hidden />
                    <div style={{ display: 'flex' }}>
                        <label for='chooseImgButton' id='chooseImgButtonVisible' alt='chooseImgButton' title="chooseImgButton">Choose Image</label>
                        <span id='imgSelected' ref={imgSelectedRef} alt='selectedImg' title="selectedImg">No image chosen</span>
                    </div>
                </div>
                <div id='imgIdentifierImgIdentifier' draggable={false}>
                    <img id='imgIdentifierTransparentImg' draggable={false} src={imgIdentifierThumbnailTransparent} alt='imgIdentifierPic' title="imgIdentifierPic" />
                    <span id='startIdentificationButton' alt='startIdentificationButton' title="startIdentificationButton">Start</span>
                    <span id='imgIdentifierIdentificationTitle'>Identification:</span>
                    <span id='imgIdentifierIdentificationText' wrap='hard'></span>
                </div>
            </span>
            <img onClick={() => window.location.reload()} id='imgIdentifierHomeButton' draggable={false} ref={imgIdentifierHomeButtonRef} src={homeButton} alt='toHome' title="toHome" />

        </div>
    );
}

export default ImgIdentifier;