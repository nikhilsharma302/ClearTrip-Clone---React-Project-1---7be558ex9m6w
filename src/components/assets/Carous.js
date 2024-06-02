import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views-react-18-fix';
import { autoPlay } from 'react-swipeable-views-utils';
import { useState, useEffect } from 'react';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

function Carous({offerarr}) {
  //console.log(offerarr)
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = offerarr.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prevActiveStep) => (prevActiveStep + 1) % maxSteps);
    }, 5000);
    return () => clearInterval(timer);
  }, [maxSteps]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep + 1) % maxSteps);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) =>
      prevActiveStep === 0 ? maxSteps - 1 : prevActiveStep - 1
    );
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Box sx={{ maxWidth: 
    300, flexGrow: 1,marginLeft:10 }}>
      <Paper
        square
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
      </Paper>
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {offerarr.map((step, index) => (
          <div key={index}>
            <Box
              sx={{
                width:'100%',
                position: 'relative',
                height:"30vh",
                // maxHeight:"fit-content",
                display: 'flex',
                alignItems: 'space-between',
                justifyContent: 'center',
                overflow: 'hidden',
              }}
            >
              <img
                src={step.heroUrl}
                alt={step.id}
                style={{
                  width: '100%',
                  height: '20vh',
                  position:"absolute",
                  top:0
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top:"20vh",
                  left: 0,
                  width: '100%',
                  textAlign: 'center',
                  color: 'white',
                  fontSize: 'xx-small',
                  textShadow: '1px 1px 2px black',
                  backgroundColor:"black",
                  height:"fit-content"
                }}
              >
                <div>{step.pTl}</div><div>{step.pTx}</div>
              </div>
            </Box>
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={3}
        position="static"
        variant="dots"
        activeStep={activeStep % 3}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={maxSteps === 0}
          >
            Next
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>
        }
        backButton={
          <Button
            size="small"
            onClick={handleBack}
            disabled={maxSteps === 0}
          >
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            Back
          </Button>
        }
      />
    </Box>
  );
}

export default Carous;
