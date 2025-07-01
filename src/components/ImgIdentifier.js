import React from 'react';
import { useState, useRef, useEffect } from 'react';
import './imgIdentifier.css';
import { pipeline, TextStreamer } from '@huggingface/transformers';

function ImgIdentifier({ imgIdentifierImagesArray, moveToImgIdentifier, setMoveToImgIdentifier, moveToPaintbrush, setMoveToPaintbrush }) {
    const [settingsIcon, rulesIcon, imgIdentifierThumbnailTransparent, purpleRightArrow, homeButton] = imgIdentifierImagesArray;
    const [imgSource, setImgSource] = useState(null);
    const [imgBGStyling, setImgBGStyling] = useState('white');
    const [imgBorderColorVal, setImgBorderColorVal] = useState('#363030');
    const [profileBGColorVal, setProfileBGColorVal] = useState('#FFFFFF');
    const [purpleRightArrowTransitionDone, setPurpleRightArrowTransitionDone] = useState(false);
    const generateIdentificationCounter = useRef(0);
    const firstImageSizeOption = useRef(null);
    const firstImageStyleOption = useRef(null);
    const imgIdentifierRulesIconRef = useRef(null);
    const imgIdentifierRulesBox = useRef(null);
    const imgIdentifierSettingsIconRef = useRef(null);
    const imgIdentifierSettingsBox = useRef(null);
    const imgIdentifierTitleRef = useRef(null);
    const imgIdentifierRef = useRef(null);
    const imgIdentifierPicContainerRef = useRef(null);
    const imgIdentifierPicRef = useRef(null);
    const chooseImgButtonRef = useRef(null);
    const imgSelectedRef = useRef(null);
    const imgIdentifierDisclaimerBox = useRef(null);
    const imgIdentifierDisclaimerButtonRef = useRef(null);
    const imgIdentifierDisclaimerCheckboxRef = useRef(null);
    const imgIdentifierCitationBox = useRef(null);
    const imgIdentifierCitationButtonRef = useRef(null);
    const imgIdentifierCitationCheckboxRef = useRef(null);
    const imgIdentifierThumbnailTransparentRef = useRef(null);
    const imgIdentifierThinkingMessageRef = useRef(null);
    const imgIdentifierIdentificationTextRef = useRef(null);
    const purpleRightArrowArea = useRef(null);
    const rightPurpleArrow = useRef(null);
    const imgIdentifierHomeButtonRef = useRef(null);
    const copyrightNoticeImgIdentifierRef = useRef(null);
    const generateIdentification = async () => {
        try {
            if (imgSource === null || imgSource === '') {
                alert('Please choose an image before attempting to start the identification.');
                return;
            }
            (generateIdentificationCounter.current)++;
            if (generateIdentificationCounter.current > 43) {
                alert('You have reached the maximum amount of images that this AI model identifies in 1 sitting (43). To identify more images, go back to the Home page and make your way back here.');
                return;
            }
            imgIdentifierThinkingMessageRef.current.style.visibility = 'visible';
            const imageIdentifier = await pipeline('image-classification', 'Xenova/vit-base-patch16-224', { dtype: 'q8' });
            const url = imgSource;
            const textStreamer = new TextStreamer(imageIdentifier.tokenizer, {
                skip_prompt: true
            });
            const result = await imageIdentifier(url, { max_new_tokens: 20, do_sample: false, streamer: textStreamer });
            imgIdentifierIdentificationTextRef.current.innerHTML = `<strong>${result[0].label}</strong><br>Confidence: ${Math.floor(result[0].score * 100)}%`;
            imgIdentifierThinkingMessageRef.current.style.visibility = 'hidden';
        }
        catch (error) {
            console.error(`Error generating identification: ${error}`);
        }
    }
    const onFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!(file.name.includes(".png")) && !(file.name.includes(".jpg")) && !(file.name.includes(".jpeg")) && !(file.name.includes(".svg")) && !(file.name.includes(".gif")) && !(file.name.includes(".PNG")) && !(file.name.includes(".webp")) && !(file.name.includes(".JPG")) && !(file.name.includes(".ico")) && !(file.name.includes(".JPEG")) && !(file.name.includes(".bmp")) && !(file.name.includes(".tif")) && !(file.name.includes(".xbm")) && !(file.name.includes(".pjp")) && !(file.name.includes(".apng")) && !(file.name.includes(".heif")) && !(file.name.includes(".jfif")) && !(file.name.includes(".heic")) && !(file.name.includes(".avif"))) {
                alert("This chosen file's file extension indicates that it is not an image. Please try again.");
                return;
            }
            if (file.name.includes(".xbm") || file.name.includes(".tif") || file.name.includes(".svg") || file.name.includes(".heif") || file.name.includes(".heic")) {
                alert("This chosen file's file extension may indicate that it is an image, but it is not supported. Convert it to a supported file extension to continue. See Rules for a complete list of supported file extensions.");
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
            imgSelectedRef.current.title = file.name;
            const reader = new FileReader();
            reader.onload = (e) => {
                setImgSource(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    }
    const changeImageSizeToFitContainer = (isChecked) => {
        if (isChecked) {
            imgIdentifierPicRef.current.style.width = '375px';
            imgIdentifierPicRef.current.style.height = '375px';
            imgIdentifierPicRef.current.style.minWidth = 'none';
            imgIdentifierPicRef.current.style.minHeight = 'none';
        }
    }
    const changeImageSizeToRealSize = (isChecked) => {
        if (isChecked) {
            imgIdentifierPicRef.current.style.width = 'fit-content';
            imgIdentifierPicRef.current.style.height = 'auto';
            imgIdentifierPicRef.current.style.minWidth = '375px';
            imgIdentifierPicRef.current.style.minHeight = '375px';
        }
    }
    const changeImageStyleToVisible = (isChecked) => {
        if (isChecked) {
            setImgBGStyling('white');
        }
    }
    const changeImageStyleToInvisible = (isChecked) => {
        if (isChecked) {
            setImgBGStyling('transparent');
        }
    }
    const openOrClose = (element) => {
        if (element.current.style.visibility === "hidden") {
            element.current.style.visibility = "visible";
            if (element === imgIdentifierDisclaimerBox && window.innerWidth <= 740) {
                imgIdentifierHomeButtonRef.current.style.visibility = 'hidden';
            }
            if (element === imgIdentifierCitationBox && window.innerWidth <= 740) {
                rightPurpleArrow.current.style.visibility = 'hidden';
            }
        } else {
            element.current.style.visibility = "hidden";
            if (element === imgIdentifierDisclaimerBox && window.innerWidth <= 740) {
                imgIdentifierHomeButtonRef.current.style.visibility = 'visible';
            }
            if (element === imgIdentifierCitationBox && window.innerWidth <= 740) {
                rightPurpleArrow.current.style.visibility = 'visible';
            }
        }
    }
    const onImgBorderColorChange = (e) => {
        setImgBorderColorVal(e.target.value);
    }
    const onProfileBGColorChange = (e) => {
        setProfileBGColorVal(e.target.value);
    }
    const onDisclaimerCheck = () => {
        openOrClose(imgIdentifierDisclaimerButtonRef);
        imgIdentifierDisclaimerBox.current.style.visibility = 'hidden';
        imgIdentifierHomeButtonRef.current.style.visibility = 'visible';
    }
    const onCitationCheck = () => {
        openOrClose(imgIdentifierCitationButtonRef);
        imgIdentifierCitationBox.current.style.visibility = 'hidden';
        rightPurpleArrow.current.style.visibility = 'visible';
    }
    const onAdjustWindowWidthImgIdentifier = () => {
        if (window.innerWidth <= 740) {
            imgIdentifierRulesIconRef.current.style.transform = 'translateX(-260px)';
            imgIdentifierRulesBox.current.style.transform = 'translateX(-260px)';
            imgIdentifierSettingsIconRef.current.style.transform = 'translateX(180px)';
            imgIdentifierSettingsBox.current.style.transform = 'translateX(-45px)';
            imgIdentifierHomeButtonRef.current.style.transform = 'translateX(-260px)';
            if (imgIdentifierDisclaimerBox.current.style.visibility === 'visible') {
                imgIdentifierHomeButtonRef.current.style.visibility = 'hidden';
            }
        } else {
            imgIdentifierRulesIconRef.current.style.transform = 'translateX(-367px)';
            imgIdentifierRulesBox.current.style.transform = 'translateX(-367px)';
            imgIdentifierSettingsIconRef.current.style.transform = 'translateX(285px)';
            imgIdentifierSettingsBox.current.style.transform = 'translateX(60px)';
            imgIdentifierHomeButtonRef.current.style.transform = 'translateX(-367px)';
            imgIdentifierHomeButtonRef.current.style.visibility = 'visible';
        }
    }
    const blurPurpleRightArrow = () => {
        rightPurpleArrow.current.style.filter = 'blur(1px)';
        purpleRightArrowArea.current.style.cursor = 'pointer';
        if (window.innerWidth <= 740) {
            rightPurpleArrow.current.style.transform = 'translateX(165px) rotate(0.05turn)';
        } else {
            rightPurpleArrow.current.style.transform = 'translateX(270px) rotate(0.05turn)';
        }
    }
    const unBlurPurpleRightArrow = () => {
        rightPurpleArrow.current.style.filter = 'blur(0px)';
        if (window.innerWidth <= 740) {
            rightPurpleArrow.current.style.transform = 'translateX(165px) rotate(0turn)';
        } else {
            rightPurpleArrow.current.style.transform = 'translateX(270px) rotate(0turn)';
        }
    }
    const positionPurpleRightArrow = () => {
        if (rightPurpleArrow.current.style.transform !== "null") {
            if (window.innerWidth <= 740) {
                rightPurpleArrow.current.style.transform = 'translateX(165px)';
                if (imgIdentifierCitationBox.current.style.visibility === 'visible') {
                    rightPurpleArrow.current.style.visibility = 'hidden';
                }
            } else {
                rightPurpleArrow.current.style.transform = 'translateX(270px)';
                rightPurpleArrow.current.style.visibility = 'visible';
            }
        }
    }
    const animateElements = () => {
        const imgIdentifierElements = [imgIdentifierTitleRef, imgIdentifierRulesIconRef, imgIdentifierRulesBox, imgIdentifierSettingsIconRef, imgIdentifierSettingsBox, imgIdentifierRef, imgIdentifierHomeButtonRef, copyrightNoticeImgIdentifierRef];
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
        copyrightNoticeImgIdentifierRef.current.style.animationName = 'appearFromRightCopyrightImgIdentifier';
    }
    const readyForAnimation = (element) => {
        element.current.style.animationName = 'none';
        element.current.classList.remove('readyForAnim');
        element.current.classList.add('readyForAnim');
    }
    const readyForMove = (element) => {
        element.current.style.opacity = '0';
    }
    const purpleRightArrowTransition = (windowWidthBig) => {
        setMoveToPaintbrush(true);
        setImgSource(null);
        imgSelectedRef.current.innerHTML = 'No image chosen';
        imgIdentifierIdentificationTextRef.current.innerHTML = '';
        changeImageSizeToFitContainer(true);
        changeImageStyleToVisible(true);
        const hiddenElements = [imgIdentifierRulesBox, imgIdentifierSettingsBox, imgIdentifierDisclaimerBox, imgIdentifierCitationBox];
        for (let i = 0; i < hiddenElements.length; i++) {
            hiddenElements[i].current.style.visibility = 'hidden';
        }
        const shownElements = [imgIdentifierDisclaimerButtonRef, imgIdentifierCitationButtonRef];
        for (let i = 0; i < shownElements.length; i++) {
            shownElements[i].current.style.visibility = 'visible';
        }
        const centeredPurpleElements = [imgIdentifierTitleRef, imgIdentifierRef];
        for (let i = 0; i < centeredPurpleElements.length; i++) {
            readyForAnimation(centeredPurpleElements[i]);
            centeredPurpleElements[i].current.style.animationName = 'fadeLeftImgIdentifier';
        }
        const imgIdentifierRulesElements = [imgIdentifierRulesIconRef, imgIdentifierRulesBox, imgIdentifierHomeButtonRef];
        for (let i = 0; i < imgIdentifierRulesElements.length; i++) {
            readyForAnimation(imgIdentifierRulesElements[i]);
            if (windowWidthBig) {
                imgIdentifierRulesElements[i].current.style.animationName = 'fadeLeftImgIdentifierRules';
            } else {
                imgIdentifierRulesElements[i].current.style.animationName = 'fadeLeftImgIdentifierRulesSmall';
            }
        }
        readyForAnimation(imgIdentifierSettingsIconRef);
        if (windowWidthBig) {
            imgIdentifierSettingsIconRef.current.style.animationName = 'fadeLeftImgIdentifierSettingsIcon';
        } else {
            imgIdentifierSettingsIconRef.current.style.animationName = 'fadeLeftImgIdentifierSettingsIconSmall';
        }
        readyForAnimation(imgIdentifierSettingsBox);
        if (windowWidthBig) {
            imgIdentifierSettingsBox.current.style.animationName = 'fadeLeftImgIdentifierSettingsBox';
        } else {
            imgIdentifierSettingsBox.current.style.animationName = 'fadeLeftImgIdentifierSettingsBoxSmall';
        }
        readyForAnimation(copyrightNoticeImgIdentifierRef);
        copyrightNoticeImgIdentifierRef.current.style.animationName = 'fadeLeftCopyrightImgIdentifier';
        rightPurpleArrow.current.style.display = 'none';
        setTimeout(() => setPurpleRightArrowTransitionDone(true), 2000);
    }
    useEffect(() => {
        if (purpleRightArrowTransitionDone) {
            const animImgIdentifierElements = [imgIdentifierTitleRef, imgIdentifierRulesIconRef, imgIdentifierRulesBox, imgIdentifierSettingsIconRef, imgIdentifierSettingsBox, imgIdentifierRef, imgIdentifierDisclaimerBox, imgIdentifierCitationBox, rightPurpleArrow, imgIdentifierHomeButtonRef, copyrightNoticeImgIdentifierRef];
            for (let i = 0; i < animImgIdentifierElements.length; i++) {
                animImgIdentifierElements[i].current.style.display = 'none';
            }
        }
    }, [purpleRightArrowTransitionDone]);
    useEffect(() => {
        if (moveToImgIdentifier) {
            document.body.style.pointerEvents = 'none';
            imgIdentifierTitleRef.current.style.display = 'block';
            imgIdentifierRulesIconRef.current.style.display = 'inline';
            imgIdentifierRulesBox.current.style.display = 'inline';
            imgIdentifierRulesBox.current.style.visibility = 'hidden';
            imgIdentifierSettingsIconRef.current.style.display = 'inline';
            imgIdentifierSettingsBox.current.style.display = 'inline';
            imgIdentifierSettingsBox.current.style.visibility = 'hidden';
            imgIdentifierRef.current.style.display = 'block';
            imgIdentifierCitationBox.current.style.visibility = 'hidden';
            imgIdentifierDisclaimerBox.current.style.visibility = 'hidden';
            imgIdentifierThinkingMessageRef.current.style.visibility = 'hidden';
            imgIdentifierHomeButtonRef.current.style.display = 'inline';
            copyrightNoticeImgIdentifierRef.current.style.display = 'inline';
            const imgIdentifierElements = [imgIdentifierTitleRef, imgIdentifierRulesIconRef, imgIdentifierRulesBox, imgIdentifierSettingsIconRef, imgIdentifierSettingsBox, imgIdentifierRef, imgIdentifierHomeButtonRef, copyrightNoticeImgIdentifierRef];
            for (let i = 0; i < imgIdentifierElements.length; i++) {
                readyForMove(imgIdentifierElements[i]);
            }
            firstImageSizeOption.current.checked = true;
            firstImageStyleOption.current.checked = true;
            imgIdentifierDisclaimerCheckboxRef.current.checked = true;
            imgIdentifierCitationCheckboxRef.current.checked = true;
            document.body.style.backgroundColor = 'hsl(0, 100.00%, 89.00%)';
            setTimeout(() => {
                animateElements();
                imgIdentifierCitationBox.current.innerHTML = `@misc{dosovitskiy2021imageworth16x16words,
        title={An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale},
        author={Alexey Dosovitskiy and Lucas Beyer and Alexander Kolesnikov and Dirk Weissenborn and Xiaohua Zhai and Thomas Unterthiner and Mostafa Dehghani and Matthias Minderer and Georg Heigold and Sylvain Gelly and Jakob Uszkoreit and Neil Houlsby}, 
        year={2021},
        eprint={2010.11929},
        archivePrefix={arXiv},
        primaryClass={cs.CV}, 
        url={https://arxiv.org/abs/2010.11929},
}`;
            }, 2000);
            setTimeout(() => {
                const imgIdentifierNonImgIdentifierElements = [imgIdentifierRulesIconRef, imgIdentifierRulesBox, imgIdentifierSettingsIconRef, imgIdentifierSettingsBox, imgIdentifierHomeButtonRef];
                for (let i = 0; i < imgIdentifierNonImgIdentifierElements.length; i++) {
                    imgIdentifierNonImgIdentifierElements[i].current.style.animationName = 'none';
                    imgIdentifierNonImgIdentifierElements[i].current.style.opacity = '100';
                }
                window.addEventListener("resize", onAdjustWindowWidthImgIdentifier);
                window.addEventListener("resize", positionPurpleRightArrow);
                rightPurpleArrow.current.style.display = 'inline';
                document.body.style.pointerEvents = 'auto';
                if (window.innerWidth <= 740) {
                    rightPurpleArrow.current.style.transform = 'translateX(165px)';
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
        const goneElements = [imgIdentifierTitleRef, imgIdentifierRulesIconRef, imgIdentifierRulesBox, imgIdentifierSettingsIconRef, imgIdentifierSettingsBox, imgIdentifierRef, rightPurpleArrow, imgIdentifierHomeButtonRef, copyrightNoticeImgIdentifierRef];
        for (let i = 0; i < goneElements.length; i++) {
            goneElements[i].current.style.display = 'none';
        }
        return () => {
            window.removeEventListener("resize", onAdjustWindowWidthImgIdentifier);
            window.removeEventListener("resize", positionPurpleRightArrow);
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
                    <li>The Settings tab lets you change the image size and styling, show/hide the disclaimer/citation buttons, and change the profile background color.</li>
                    <li>The supported file extensions for this Image Identifier are .jpg, .jpeg, .png, their all caps equivalents, .jfif, .webp, .gif, .ico, .bmp, .apng, .pjp, .pjpeg, and .avif.</li>
                    <li>The image background's styling only makes a difference if the image is transparent.</li>
                    <li>If the chosen image is square and smaller than or equal to 375px x 375px, both image size settings are identical.</li>
                    <li>Highlighting and copy/pasting the identification text is always permitted.</li>
                    <li>When changing color in Settings, drag the pointer around for it to work seamlessly.</li>
                    <li>AI Model-Specific Rules:</li>
                    <li id='lvl2li'>This Img Identifier uses the Xenova/vit-base-patch16-224 AI Model for image classification.</li>
                    <li id='lvl2li'>It allows 43 image identifications before requiring the user to go to Home and come back to this page.</li>
                </ul>
            </span>
            <img onClick={() => openOrClose(imgIdentifierSettingsBox)} id='imgIdentifierSettingsIcon' draggable={false} src={settingsIcon} ref={imgIdentifierSettingsIconRef} alt='imgIdentifierSettingsIcon' title="imgIdentifierSettings" />
            <span id='imgIdentifierSettingsBox' draggable={false} ref={imgIdentifierSettingsBox}>
                <div id='imgIdentifierSettingsTitle' draggable={false}>Settings</div>
                <ul>
                    <li>Size of image in container:</li>
                    <li id='imgIdentifierInvisLiRadio'>
                        <input type='radio' onClick={(e) => changeImageSizeToFitContainer(e.target.checked)} name='imageSizeOptions' ref={firstImageSizeOption} title="fitContainerImageSizeRadio" placeholder='fitContainerImageSizeRadio' /><span id='fitContainerSizeText'>fit container</span>
                        <input type='radio' onClick={(e) => changeImageSizeToRealSize(e.target.checked)} name='imageSizeOptions' title="realImageSizeRadio" placeholder='realImageSizeRadio' /><span id='realSizeText'>real size</span>
                    </li>
                    <li>Styling of image background:</li>
                    <li id='imgIdentifierInvisLiRadio'>
                        <input type='radio' onClick={(e) => changeImageStyleToVisible(e.target.checked)} name='imageStyleOptions' ref={firstImageStyleOption} title="visibleImageStyleRadio" placeholder='visibleImageStyleRadio' /><span id='visibleStyleText'>visible (white)</span>
                        <input type='radio' onClick={(e) => changeImageStyleToInvisible(e.target.checked)} name='imageStyleOptions' title="invisibleImageStyleRadio" placeholder='invisibleImageStyleRadio' /><span id='invisibleStyleText'>invisible</span>
                    </li>
                    <li>Show/hide certain buttons:</li>
                    <li id='imgIdentifierInvisLi'>
                        <input type='checkbox' onClick={() => onDisclaimerCheck()} id='disclaimerButtonCheckbox' ref={imgIdentifierDisclaimerCheckboxRef} title="disclaimerButtonCheckbox" placeholder='disclaimerButtonCheckbox' /><span id='disclaimerSettingsText'>Disclaimer</span>
                        <input type='checkbox' onClick={() => onCitationCheck()} id='citationButtonCheckbox' ref={imgIdentifierCitationCheckboxRef} title="citationButtonCheckbox" placeholder='citationButtonCheckbox' /><span id='citationSettingsText'>Citation</span>
                    </li>
                    <li>Color of image border:</li>
                    <input type='color' value={imgBorderColorVal} onChange={(e) => onImgBorderColorChange(e)} id='imgBorderColorPicker' title="imgBorderColorPicker" placeholder='imgBorderColorPicker' />
                    <li>Color of profile background:</li>
                    <input type='color' value={profileBGColorVal} onChange={(e) => onProfileBGColorChange(e)} id='profileBGColorPicker' title="profileBGColorPicker" placeholder='profileBGColorPicker' />
                </ul>
            </span>
            <div id='imgIdentifierTitle' draggable={false} ref={imgIdentifierTitleRef}>Img Identifier</div>
            <span id='imgIdentifier' draggable={false} ref={imgIdentifierRef}>
                <div id='imgIdentifierImgChooser' draggable={false}>
                    <div id='imgIdentifierPicContainer' style={{ borderColor: imgBorderColorVal, backgroundColor: imgBGStyling }} draggable={false} ref={imgIdentifierPicContainerRef}>
                        <img id='imgIdentifierPic' draggable={false} ref={imgIdentifierPicRef} src={imgSource} alt='chosenImage' title="chosenImage" />
                    </div>
                    <input type='file' onChange={(e) => onFileChange(e)} id='chooseImgButton' ref={chooseImgButtonRef} accept='.png, .apng, .jpg, .jpeg, .ico, .webp, .jfif, .gif, .pjp, .bmp, .pjpeg, .avif' alt='chooseImgButton' title="chooseImgButton" hidden />
                    <div style={{ display: 'flex' }}>
                        <label for='chooseImgButton' id='chooseImgButtonVisible' alt='chooseImgButton' title="chooseImgButton">Choose Image</label>
                        <span id='imgSelected' ref={imgSelectedRef} alt='selectedImg' title="selectedImg">No image chosen</span>
                    </div>
                    <div onClick={() => openOrClose(imgIdentifierDisclaimerBox)} id='imgIdentifierDisclaimerButton' ref={imgIdentifierDisclaimerButtonRef} title='toDisclaimer'>Disclaimer</div>
                    <span id='imgIdentifierDisclaimerBox' draggable={false} ref={imgIdentifierDisclaimerBox}>
                        The Xenova model used for this Img Identifier is much better at identifying 1-object images, especially animals.
                        Its generated content may not always be correct or logical. As a result, it should be used only to assist
                        instead of as a conclusive source of knowledge. Users of this Img Identifier should always make sure to verify
                        its answers and generated identifications with their own logic and the Internet (perhaps Google Images).
                    </span>
                    <div onClick={() => openOrClose(imgIdentifierCitationBox)} id='imgIdentifierCitationButton' ref={imgIdentifierCitationButtonRef} title="toCitation">Citation</div>
                    <span id='imgIdentifierCitationBox' draggable={false} ref={imgIdentifierCitationBox}></span>
                </div>
                <div id='imgIdentifierImgIdentifier' draggable={false}>
                    <div id='transparentImgContainer' draggable={false}>
                        <img id='imgIdentifierTransparentImg' style={{ backgroundColor: profileBGColorVal }} draggable={false} ref={imgIdentifierThumbnailTransparentRef} src={imgIdentifierThumbnailTransparent} alt='imgIdentifierPic' title="imgIdentifierPic" />
                    </div>
                    <span id='imgIdentifierThinkingMessage' ref={imgIdentifierThinkingMessageRef}>Thinking...</span>
                    <span onClick={() => generateIdentification()} id='startIdentificationButton' draggable={false} alt='startIdentificationButton' title="startIdentificationButton">Start</span>
                    <span id='imgIdentifierIdentificationTitle' draggable={false}>Identification:</span>
                    <span id='imgIdentifierIdentificationText' wrap='hard' draggable={false} ref={imgIdentifierIdentificationTextRef}></span>
                </div>
            </span>
            <img onClick={() => window.location.reload()} id='imgIdentifierHomeButton' draggable={false} ref={imgIdentifierHomeButtonRef} src={homeButton} alt='toHome' title="toHome" />
            <map name='toPaintbrushMap'>
                <area onClick={() => window.innerWidth > 740 ? purpleRightArrowTransition(true) : purpleRightArrowTransition(false)} onMouseOver={() => blurPurpleRightArrow()} onMouseOut={() => unBlurPurpleRightArrow()} id='toPaintbrushMap' ref={purpleRightArrowArea} shape='poly' coords='34, 103.4, 29, 96.8, 23, 89, 20, 78.1, 20, 67.1, 22, 57.2, 26, 48.4, 32, 42.9, 38, 38.5, 45, 36.3, 54, 34.1, 66, 34.1, 66, 42.9, 70, 45.1, 92, 24.2, 71, 5.5, 67, 7.7, 67, 17.6, 55, 17.6, 45, 17.6, 35, 20.9, 25, 29.7, 15, 39.6, 9, 59.4, 12, 74.8, 16, 85.8, 22, 96.8, 30, 103.4' alt='toPaintbrush' title="toPaintbrush"></area>
            </map>
            <img id='toPaintbrush' useMap='#toPaintbrushMap' draggable={false} ref={rightPurpleArrow} src={purpleRightArrow} alt='toPaintbrush' />
            <div id='copyrightNoticeImgIdentifier' ref={copyrightNoticeImgIdentifierRef}> © 2025 Mateo Graber. All rights reserved. </div>
        </div>
    );
}

export default ImgIdentifier;