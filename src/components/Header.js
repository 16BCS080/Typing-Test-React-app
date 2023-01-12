import React from "react"; 
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';

export default function Header(props){
  return (
    <div className="header">
      <h1>
        Typing Test
      </h1>
      <p>
      {
        props.sound_state && <VolumeUpIcon onClick= { () => props.statechange(!props.sound_state) } />
      } 
      {
        ! props.sound_state && <VolumeOffIcon onClick= { () => props.statechange(!props.sound_state) } />
      }          
      </p>
    </div>
  );
};
