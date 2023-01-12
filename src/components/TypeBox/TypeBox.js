import React, { useEffect, useState, useMemo } from "react";
import useSound from "use-sound";
import RefreshIcon from '@mui/icons-material/Refresh';

import {
  wordsGenerator, 
} from "../scripts/wordsGenerator"; 

import Stats from "./Stats";
import { Dialog } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import {
  DEFAULT_COUNT_DOWN, 
  DEFAULT_WORDS_COUNT,
  DEFAULT_DIFFICULTY,  
  PACING, 
} from "../constants/Constants";

import typeSoft from "../../assets/typeSoft.wav";

const TypeBox = ({
  textInputRef, 
  soundMode, 
  handleInputFocus,
}) => {

  const [play] = useSound( typeSoft, { volume: 0.5 });

  // local timer
  const [countDownConstant, setCountDownConstant] =  useState(DEFAULT_COUNT_DOWN)

  // local pacing style
  const [pacingStyle] = useState(PACING);
  // local difficulty
  const [difficulty, setDifficulty] = useState(DEFAULT_DIFFICULTY);
   // tab-enter restart dialog
  const [openRestart, setOpenRestart] = useState(false);

  const EnterkeyPressReset = (e) => {
    // press enter/or tab to reset;
    if (e.keyCode === 13 || e.keyCode === 9) {
      e.preventDefault();
      setOpenRestart(false);
      reset(countDownConstant, difficulty);
    } 
  };

  const handleTabKeyOpen = () => {
    setOpenRestart(true);
  };

  // set up words state
  const [wordsDict, setWordsDict] = useState(() => { 
      return wordsGenerator(DEFAULT_WORDS_COUNT); 
  });

  const words = useMemo(() => {
    return wordsDict.map((e) => e.val);
  }, [wordsDict]);


  const wordSpanRefs = useMemo(
    () =>
      Array(words.length)
        .fill(0)
        .map((i) => React.createRef()),
    [words]
  );

  // set up timer state
  const [countDown, setCountDown] = useState(countDownConstant);
  const [intervalId, setIntervalId] = useState(null);

  // set up game loop status state
  const [status, setStatus] = useState("waiting");


  // set up hidden input input val state
  const [currInput, setCurrInput] = useState("");
  // set up world advancing index
  const [currWordIndex, setCurrWordIndex] = useState(0);
  // set up char advancing index
  const [currCharIndex, setCurrCharIndex] = useState(-1);
  const [prevInput, setPrevInput] = useState("");

  // set up words examine history
  const [wordsCorrect, setWordsCorrect] = useState(new Set());
  const [wordsInCorrect, setWordsInCorrect] = useState(new Set());
  const [inputWordsHistory, setInputWordsHistory] = useState({});

  // setup stats
  const [rawKeyStrokes, setRawKeyStrokes] = useState(0);
  const [wpmKeyStrokes, setWpmKeyStrokes] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [statsCharCount, setStatsCharCount] = useState([]);

  // set up char examine hisotry
  const [history, setHistory] = useState({});
  const keyString = currWordIndex + "." + currCharIndex;
  const [currChar, setCurrChar] = useState("");

  useEffect(() => {
    if (currWordIndex === DEFAULT_WORDS_COUNT - 1) {      
      const generatedEng = wordsGenerator( DEFAULT_WORDS_COUNT );
      setWordsDict((currentArray) => [...currentArray, ...generatedEng]); 
    }
    if (
      currWordIndex !== 0 &&
      wordSpanRefs[currWordIndex].current.offsetLeft <
        wordSpanRefs[currWordIndex - 1].current.offsetLeft
    ) {
      wordSpanRefs[currWordIndex - 1].current.scrollIntoView();
    } else {
      return;
    }
  }, [currWordIndex, wordSpanRefs, difficulty ]);

  const reset = (newCountDown, difficulty ) => {
    setStatus("waiting");    
    setWordsDict(wordsGenerator(DEFAULT_WORDS_COUNT ));     
    setCountDownConstant(newCountDown);
    setCountDown(newCountDown);
    setDifficulty(difficulty); 
    clearInterval(intervalId);
    setWpm(0);
    setRawKeyStrokes(0);
    setWpmKeyStrokes(0);
    setCurrInput("");
    setPrevInput("");
    setIntervalId(null);
    setCurrWordIndex(0);
    setCurrCharIndex(-1);
    setCurrChar("");
    setHistory({});
    setInputWordsHistory({});
    setWordsCorrect(new Set());
    setWordsInCorrect(new Set());
    textInputRef.current.focus();
    // console.log("fully reset waiting for next inputs");
    wordSpanRefs[0].current.scrollIntoView();
  };

  const start = () => {
    if (status === "finished") {
      setCurrInput("");
      setPrevInput("");
      setCurrWordIndex(0);
      setCurrCharIndex(-1);
      setCurrChar("");
      setHistory({});
      setInputWordsHistory({});
      setWordsCorrect(new Set());
      setWordsInCorrect(new Set());
      setStatus("waiting");
      textInputRef.current.focus();
    }

    if (status !== "started") {
      setStatus("started");
      let intervalId = setInterval(() => {
        setCountDown((prevCountdown) => {
          if (prevCountdown === 0) {
            clearInterval(intervalId);
            // current total extra inputs char count
            const currCharExtraCount = Object.values(history)
              .filter((e) => typeof e === "number")
              .reduce((a, b) => a + b, 0);

            // current correct inputs char count
            const currCharCorrectCount = Object.values(history).filter(
              (e) => e === true
            ).length;

            // current correct inputs char count
            const currCharIncorrectCount = Object.values(history).filter(
              (e) => e === false
            ).length;

            // current missing inputs char count
            const currCharMissingCount = Object.values(history).filter(
              (e) => e === undefined
            ).length;

            // current total advanced char counts
            const currCharAdvancedCount =
              currCharCorrectCount +
              currCharMissingCount +
              currCharIncorrectCount;

            // When total inputs char count is 0,
            // that is to say, both currCharCorrectCount and currCharAdvancedCount are 0,
            // accuracy turns out to be 0 but NaN.
            const accuracy =
              currCharCorrectCount === 0
                ? 0
                : (currCharCorrectCount / currCharAdvancedCount) * 100;

            setStatsCharCount([
              accuracy,
              currCharCorrectCount,
              currCharIncorrectCount,
              currCharMissingCount,
              currCharAdvancedCount,
              currCharExtraCount,
            ]);

            checkPrev();
            setStatus("finished");

            return countDownConstant;
          } else {
            return prevCountdown - 1;
          }
        });
      }, 1000);
      setIntervalId(intervalId);
    }
  };

  const UpdateInput = (e) => {
    if (status === "finished") {
      return;
    }
    setCurrInput(e.target.value);
    inputWordsHistory[currWordIndex] = e.target.value.trim();
    setInputWordsHistory(inputWordsHistory);
  };

 

  const handleKeyDown = (e) => {

    if (status !== "finished" && soundMode) {
      play();
    }
    const key = e.key;
    const keyCode = e.keyCode; 

    // keydown count for KPM calculations to all types of operations
    if (status === "started") {
      setRawKeyStrokes(rawKeyStrokes + 1);
      if (keyCode >= 65 && keyCode <= 90) {
        setWpmKeyStrokes(wpmKeyStrokes + 1);
      }
    }

    // disable Caps Lock key
    if (keyCode === 20) {
      e.preventDefault();
      return;
    }

    // disable shift alt ctrl
    if (keyCode >= 16 && keyCode <= 18) {
      e.preventDefault();
      return;
    }

    // disable tab key
    if (keyCode === 9) {
      e.preventDefault();
      handleTabKeyOpen();
      return;
    }

    if (status === "finished") {
      setCurrInput("");
      setPrevInput("");
      return;
    }

    // update stats when typing unless there is no effective wpm
    if (wpmKeyStrokes !== 0) {
      const currWpm =
        (wpmKeyStrokes / 5 / (countDownConstant - countDown)) * 60.0;
      setWpm(currWpm);
    }

    // start the game by typing any thing
    if (status !== "started" && status !== "finished") {
      start();
    }

    // space bar
    if (keyCode === 32) {
      const prevCorrectness = checkPrev();
      // advance to next regardless prev correct/not
      if (prevCorrectness === true || prevCorrectness === false) {
        // reset currInput
        setCurrInput("");
        // advance to next
        setCurrWordIndex(currWordIndex + 1);
        setCurrCharIndex(-1);
        return;
      } else {
        // but don't allow entire word skip
        // console.log("entire word skip not allowed");
        return;
      }

      // backspace
    } else if (keyCode === 8) {
      // delete the mapping match records
      delete history[keyString];

      // avoid over delete
      if (currCharIndex < 0) {
        // only allow delete prev word, rewind to previous
        if (wordsInCorrect.has(currWordIndex - 1)) {
          // console.log("detected prev incorrect, rewinding to previous");
          const prevInputWord = inputWordsHistory[currWordIndex - 1];
          // console.log(prevInputWord + " ")
          setCurrInput(prevInputWord + " ");
          setCurrCharIndex(prevInputWord.length - 1);
          setCurrWordIndex(currWordIndex - 1);
          setPrevInput(prevInputWord);
        }
        return;
      }
      setCurrCharIndex(currCharIndex - 1);
      setCurrChar("");
      return;
    } else {
      setCurrCharIndex(currCharIndex + 1);
      setCurrChar(key);
      return;
      // if (keyCode >= 65 && keyCode <= 90) {
      //   setCurrCharIndex(currCharIndex + 1);
      //   setCurrChar(key);
      // } else {
      //   return;
      // }
    }
  };

  const getExtraCharsDisplay = (word, i) => {
    let input = inputWordsHistory[i];
    if (!input) {
      input = currInput.trim();
    }
    if (i > currWordIndex) {
      return null;
    }
    if (input.length <= word.length) {
      return null;
    } else {
      const extra = input.slice(word.length, input.length).split("");
      history[i] = extra.length;
      return extra.map((c, idx) => (
        <span key={idx} >
          {c}
        </span>
      ));
    }
  };

  const checkPrev = () => {
    const wordToCompare = words[currWordIndex];
    const currInputWithoutSpaces = currInput.trim();
    const isCorrect = wordToCompare === currInputWithoutSpaces;
    if (!currInputWithoutSpaces || currInputWithoutSpaces.length === 0) {
      return null;
    }
    if (isCorrect) {
      // console.log("detected match");
      wordsCorrect.add(currWordIndex);
      wordsInCorrect.delete(currWordIndex);
      let inputWordsHistoryUpdate = { ...inputWordsHistory };
      inputWordsHistoryUpdate[currWordIndex] = currInputWithoutSpaces;
      setInputWordsHistory(inputWordsHistoryUpdate);
      // reset prevInput to empty (will not go back)
      setPrevInput("");

      // here count the space as effective wpm.
      setWpmKeyStrokes(wpmKeyStrokes + 1);
      return true;
    } else {
      // console.log("detected unmatch");
      wordsInCorrect.add(currWordIndex);
      wordsCorrect.delete(currWordIndex);
      let inputWordsHistoryUpdate = { ...inputWordsHistory };
      inputWordsHistoryUpdate[currWordIndex] = currInputWithoutSpaces;
      setInputWordsHistory(inputWordsHistoryUpdate);
      // append currInput to prevInput
      setPrevInput(prevInput + " " + currInputWithoutSpaces);
      return false;
    }
  };

  const getWordClassName = (wordIdx) => {
    if (wordsInCorrect.has(wordIdx)) {
      if (currWordIndex === wordIdx) {
        if (pacingStyle === PACING) {
          return "word error-word active-word";
        } else {
          return "word error-word active-word-no-PACING";
        }
      }
      return "word error-word";
    } else {
      if (currWordIndex === wordIdx) {
        if (pacingStyle === PACING) {
          return "word active-word";
        } else {
          return "word active-word-no-PACING";
        }
      }
      return "word";
    }
  };

  const getCharClassName = (wordIdx, charIdx, char, word) => {
    const keyString = wordIdx + "." + charIdx;
    if ( 
      wordIdx === currWordIndex &&
      charIdx === currCharIndex + 1 &&
      status !== "finished"
    ) {
      return "caret-char-left";
    }
    if (history[keyString] === true) {
      if ( 
        wordIdx === currWordIndex &&
        word.length - 1 === currCharIndex &&
        charIdx === currCharIndex &&
        status !== "finished"
      ) {
        return "caret-char-right-correct";
      }
      return "correct-char";
    }
    if (history[keyString] === false) {
      if ( 
        wordIdx === currWordIndex &&
        word.length - 1 === currCharIndex &&
        charIdx === currCharIndex &&
        status !== "finished"
      ) {
        return "caret-char-right-error";
      }
      return "error-char";
    }
    if (
      wordIdx === currWordIndex &&
      charIdx === currCharIndex &&
      currChar &&
      status !== "finished"
    ) {
      if (char === currChar) {
        history[keyString] = true;
        return "correct-char";
      } else {
        history[keyString] = false;
        return "error-char";
      }
    } else {
      if (wordIdx < currWordIndex) {
        // missing chars
        history[keyString] = undefined;
      }

      return "char";
    }
  };



  return (
    <div onClick={handleInputFocus}>

      <div className="type-box">
        <div className="words">
          {words.map((word, i) => (
            <span
              key={i}
              ref={wordSpanRefs[i]}
              className={getWordClassName(i)}
            >
              {word.split("").map((char, idx) => (
                <span
                  key={"word" + idx}
                  className={getCharClassName(i, idx, char, word)}
                >
                  {char}
                </span>
              ))}
              {getExtraCharsDisplay(word, i)}
            </span>
          ))}
        </div>
      </div> 
   
      <div className="stats">
        <Stats
          status={status}
          wpm={wpm}
          countDown={countDown}
          countDownConstant={countDownConstant}
          statsCharCount={statsCharCount}
          rawKeyStrokes={rawKeyStrokes}
          >
        </Stats>  
        <RefreshIcon fontSize={`large`} onClick={ () => reset(countDownConstant, difficulty) } />            
      </div>

      <input
        key="hidden-input"
        ref={textInputRef}
        type="text"
        className="hidden-input"
        onKeyDown={(e) => handleKeyDown(e)} 
        value={currInput}
        onChange={(e) => UpdateInput(e)}
      />

      <Dialog
        PaperProps={{
          style: {
            backgroundColor: "transparent",
            boxShadow: "none",
          },
        }}
        open={openRestart}
        onKeyDown={EnterkeyPressReset}
      >
        <DialogTitle>        
          <div>
            <span className="key-note"> pressTab / Enter to restart</span>
          </div>
        </DialogTitle>
      </Dialog>
    </div>
  );
};

export default TypeBox;
