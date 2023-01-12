import React, { useState, useEffect } from "react";
import { Box } from "@mui/system"; 


import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';


const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const Stats = ({
  status,
  wpm,
  countDown,
  countDownConstant,
  statsCharCount,
  rawKeyStrokes,
}) => {

   const [open, setOpen] = useState(false);

  useEffect( () => { 
    if ( status === "finished" ) {
        setOpen(true); 
    }
    },[status]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>        
      <h3>{countDown} s </h3>
      <Box display="flex" flexDirection="row">
        <h3>WPM: {Math.round(wpm)}</h3>        
      </Box>         
      <Dialog
        open={ status === "finished" && open === true }
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{`Typing test result`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <b> WPM: </b> {Math.round(wpm)} <br/>
            <b> Accuracy: </b> {Math.round(statsCharCount[0])} %
          </DialogContentText>
        </DialogContent>
        <DialogActions> 
          <Button onClick={handleClose}>close</Button>
        </DialogActions> 
      </Dialog> 
    </>
  );
};

export default Stats;
