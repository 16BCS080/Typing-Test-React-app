import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  background: ${({ theme })=>theme.background
}

;
color: ${({ theme })=>theme.text
}

;
padding: 0;
margin: 0;
font-family: ${({ theme })=>theme.fontFamily
}

;
transition: all 0.25s linear;
text-shadow: ${({ theme })=>theme.textShadow
}

;
}

.bottom-info {
  color: ${({ theme })=>theme.title
}

;
margin: 4px;
}

h1 {
  color: ${({ theme })=>theme.title
}

;
opacity: 0.9;
margin-top: 10px;
margin-bottom: 10px;
}

.stats {
  display: block;
  max-width: 1000px;
  margin-top: 50px;
  margin-bottom: 20px;
  margin-left: auto;
  margin-right: auto;
  color: ${({ theme })=>theme.stats
}

;
bottom: 10%;
}

.wordscard-UI-info {
  margin-top: 50px;
  margin-bottom: 20px;
  margin-left: auto;
  margin-right: auto;
  color: ${({ theme })=>theme.textTypeBox
}

;
bottom: 10%;
}

.keyboard-stats {
  display: flex;
  max-width: 1000px;
  margin-top: 50px;
  margin-bottom: 20px;
  margin-left: auto;
  margin-right: auto;
  color: ${({ theme })=>theme.stats
}

;
bottom: 10%;
justify-content: center;
text-align: center;
}

.sub-header {
  color: ${({ theme })=>theme.textTypeBox
}

;
opacity: 0.5;
border-right: 2px solid;
animation: blinkingCursor 2s infinite;
;

@keyframes blinkingCursor {
  0% {
    border-right-color: ${({ theme })=>theme.stats
  }

  ;
}

25% {
  border-right-color: transparent;
}

50% {
  border-right-color: ${({ theme })=>theme.stats
}

;
}

75% {
  border-right-color: transparent;
}

100% {
  border-right-color: ${({ theme })=>theme.stats
}

;
}
}
}

.words {
  color: ${({ theme })=>theme.textTypeBox
}

;
font-size: 28px;
display: flex;
flex-wrap: wrap;
width: 100%;
align-content: center;
user-select: none;
}

.active-word {
  animation: blinkingBackground 2s infinite;
  border-top: 1px solid transparent;
  border-bottom: 1px solid;

  @keyframes blinkingBackground {
    0% {
      border-bottom-color: ${({ theme })=>theme.stats
    }

    ;
  }

  25% {
    border-bottom-color: ${({ theme })=>theme.textTypeBox
  }

  ;
}

50% {
  border-bottom-color: ${({ theme })=>theme.stats
}

;
}

75% {
  border-bottom-color: ${({ theme })=>theme.textTypeBox
}

;
}

100% {
  border-bottom-color: ${({ theme })=>theme.stats
}

;
}
}

;
scroll-margin: 4px;
}

.correct-char {
  border-left: 1px solid transparent;
  border-right: 1px solid transparent;
  color: ${({ theme })=>theme.text
}

;
}

.caret-char-left {
  border-left: 1px solid ${({ theme })=>theme.stats
}

;
border-right: 1px solid transparent;
}

.caret-char-left-start {
  border-left: 1px solid;
  border-right: 1px solid transparent;
  animation: blinkingCaretLeft 2s infinite;
  animation-timing-function: ease;

  @keyframes blinkingCaretLeft {
    0% {
      border-left-color: ${({ theme })=>theme.stats
    }

    ;
  }

  25% {
    border-left-color: ${({ theme })=>theme.textTypeBox
  }

  ;
}

50% {
  border-left-color: ${({ theme })=>theme.stats
}

;
}

75% {
  border-left-color: ${({ theme })=>theme.textTypeBox
}

;
}

100% {
  border-left-color: ${({ theme })=>theme.stats
}

;
}
}
}

.caret-char-right {
  border-right: 1px solid ${({ theme })=>theme.stats
}

;
border-left: 1x solid transparent;
}

.caret-char-right-correct {
  color: ${({ theme })=>theme.text
}

;
border-right: 1px solid ${({ theme })=>theme.stats
}

;
border-left: 1px solid transparent;
}

.caret-char-right-error {
  color: red;
  border-right: 1px solid ${({ theme })=>theme.stats
}

;
border-left: 1px solid transparent;
}

.caret-extra-char-right-error {
  color: red;
  border-right: 1px solid ${({ theme })=>theme.stats
}

;
border-left: 1px solid transparent;
}

.select {
  color: ${({ theme })=>theme.text
}

;
background: ${({ theme })=>theme.background
}

;
border: none;
min-width: 5%;
}

.alert {
  opacity: 0.3;
  background-image: ${({ theme })=>theme.gradient
}

;
}

.correct-char-stats {
  color: ${({ theme })=>theme.text
}

;
}

.incorrect-char-stats {
  color: red;
}

.missing-char-stats {
  color: ${({ theme })=>theme.textTypeBox
}

;
}

.speedbar {
  opacity: 0.3;
  color: ${({ theme })=>theme.stats
}

;
}

.active-button {
  color: ${({ theme })=>theme.stats
}

;
}

.inactive-button {
  color: ${({ theme })=>theme.textTypeBox
}

;
}

.zen-button {
  color: ${({ theme })=>theme.stats
}

;
}

.zen-button-deactive {
  color: ${({ theme })=>theme.textTypeBox
}

;
}

.menu-separater {
  color: ${({ theme })=>theme.textTypeBox
}

;
background-color: none;
font-size: 16px;
}

.chinese-word-key {
  margin: 4px 4px;
  color: ${({ theme })=>theme.textTypeBox
}

;
background-color: none;
display: flex;
justify-content: center;
font-size: 20px;
scroll-margin: 4px;
text-align: center;
}

.active-chinese {
  color: ${({ theme })=>theme.stats
}

;
}

.dialog {
  background: ${({ theme })=>theme.background
}

;
}

.key-type {
  background: ${({ theme })=>theme.textTypeBox
}

;
color: ${({ theme })=>theme.stats
}

;
border-radius: 4px;
}

.key-note {
  color: ${({ theme })=>theme.stats
}

;
background: transparent;
}

.textarea {
  color: ${({ theme })=>theme.textTypeBox
}

;
font-size: 28px;
background: transparent;
border: none;
caret-color: ${({ theme })=>theme.stats
}

;
font-family: ${({ theme })=>theme.fontFamily
}

;
overflow: auto;
resize: none;
width: 100%;
height: 80%;
margin-left: auto;
margin-right: auto;
position: relative;
outline: none;
border-radius: 4px;

@media only screen and (min-device-width: 375px) and (max-device-width: 812px) and (-webkit-min-device-pixel-ratio: 3) {
  top: 200px;
  width: 60%;
}
}

.active-game-mode-button {
  color: ${({ theme })=>theme.stats
}

;
font-size: 16px;
}

.sentence-char {
  color: ${({ theme })=>theme.textTypeBox
}

;
}

.correct-sentence-char {
  color: ${({ theme })=>theme.text
}

;
}

.sentence-input-field {
  color: ${({ theme })=>theme.textTypeBox
}

;
font-size: 28px;
background: transparent;
border: none;
caret-color: ${({ theme })=>theme.stats
}

;
outline: none;
padding: 0;
font-family: ${({ theme })=>theme.fontFamily
}

;
}

.next-sentence-display {
  font-family: ${({ theme })=>theme.fontFamily
}

;
color: ${({ theme })=>theme.textTypeBox
}

;
display: block;
margin-top: 10px;
font-size: 16px;
}

.SPACEKEY {
  height: 3em;
  width: 21em;
  color: ${({ theme })=>theme.text
}

;
font-family: ${({ theme })=>theme.fontFamily
}

;
border-radius: 0.4em;
line-height: 3em;
letter-spacing: 1px;
margin: 0.4em;
transition: 0.3s;
text-align: center;
font-size: 1em;
background-color: ${({ theme })=>theme.background
}

;
border: 2px solid ${({ theme })=>theme.textTypeBox
}

;
opacity: 0.8;
}

.UNITKEY {
  height: 3em;
  width: 3em;
  color: rgba(0, 0, 0, 0.7);
  border-radius: 0.4em;
  line-height: 3em;
  letter-spacing: 1px;
  margin: 0.4em;
  transition: 0.3s;
  text-align: center;
  font-size: 1em;
  font-family: ${({ theme })=>theme.fontFamily
}

;
background-color: ${({ theme })=>theme.background
}

;
border: 2px solid ${({ theme })=>theme.textTypeBox
}

;
opacity: 1;
color: ${({ theme })=>theme.text
}

;
opacity: 0.8;
}

.VIBRATE {
  background-color: ${({ theme })=>theme.textTypeBox
}

;
-webkit-animation: vibrate-1 0.8s linear infinite both;
animation: vibrate-1 0.8s linear infinite both;
}

.NOVIBRATE-CORRECT {
  background-color: ${({ theme })=>theme.textTypeBox
}

;
}

.words-card-catalog {
  width: 10%;
  float: left;
  text-align: left;
  border-left: 2px groove ${({ theme })=>theme.stats
}

;
border-top: 1px solid ${({ theme })=>theme.stats
}

;
border-radius: 12px;
padding-left: 20px;
}

.Catalog::-webkit-scrollbar-thumb {
  background:${({ theme })=>theme.stats
}

;
border-radius:12px;
}

.Catalog-li {
  cursor: pointer;
  margin-bottom: 10px;
  color: ${({ theme })=>theme.textTypeBox
}

;
}

.Catalog-li-Activated {
  cursor: default;
  margin-bottom: 10px;
  color: ${({ theme })=>theme.stats
}

;
}

.inactive-game-mode-button {
  color: ${({ theme })=>theme.textTypeBox
}

;
font-size: 16px;
}

.wordcard-char {
  color: ${({ theme })=>theme.textTypeBox
}

;
padding-right: 4px;
}

.correct-wordcard-char {
  color: ${({ theme })=>theme.text
}

;
padding-right: 4px;
}


.Catalog-Button {
  background-color: ${({ theme })=>theme.background
}

;
color: ${({ theme })=>theme.textTypeBox
}

;
}

.Catalog-Button-Activated {
  background-color: ${({ theme })=>theme.background
}

;
color: ${({ theme })=>theme.stats
}

;
}

.Catalog-Selected {
  background-color: ${({ theme })=>theme.background
}

;
color: ${({ theme })=>theme.textTypeBox
}

;
margin-top: 20px;
}
`;
