//DEFAULT
import React, { useState, useRef } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ThemeProvider } from "styled-components"; 

//CONST
import { THEME } from './components/constants/DefaultTheme';

//OTHERS
import { GlobalStyles } from "./components/style/global";
import TypeBox from "./components/TypeBox/TypeBox";  

//css
import "./App.css"

function App() {
  // local persist game mode setting
  const [soundMode, setSoundMode] = useState(true); 
  const textInputRef = useRef(null);  
  const focusTextInput = () => {
    textInputRef.current.focus();
  };

  return (
    <>
      <ThemeProvider theme={THEME}> 
        <div className="canvas">
          <GlobalStyles />
          <Header sound_state={soundMode} statechange={ setSoundMode } >
          </Header>           
          <TypeBox  textInputRef={textInputRef} 
              soundMode={soundMode} 
              key="type-box"
              handleInputFocus={() => focusTextInput()}
              >
          </TypeBox> 
          <Footer>
          </Footer>
        </div> 
      </ThemeProvider>
    </>
  );
}

export default App;
