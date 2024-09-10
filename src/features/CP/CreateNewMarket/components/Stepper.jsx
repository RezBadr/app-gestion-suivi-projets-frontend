import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import { postNewMarket } from '../services';
import Step2 from './Step2';
import Step1 from './Step1';
import Step0 from './Step0'
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';





const steps = ['Entrez les informations du marché', 'Assinger les acteurs'];

export default function StepperForcreatingNewMarket() {
  const navigate =useNavigate();
  const [loadingfetch, setLoadingfetch] = React.useState(false);


  const handleFinishClick = async (mainObject) => {
    setLoadingfetch(true); // Start loading
    console.log(mainObject.formData.companyName);
    
    try {
      const response = await postNewMarket(mainObject.formData, mainObject.file);
      console.log('Market created successfully:', response.data);
      navigate('/CP/home'); 
    } catch (error) {
      console.error("Failed to create market:", error.response ? error.response.data : error.message);
      // Handle the error or notify the user
    } finally {
      setLoadingfetch(false); // Stop loading
    }
  };


  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const [allowed, setAllowed] = React.useState([]);
  const [mainObject, setMainObject] = React.useState({
    formData: {
      marketName: '',
      marketNumber: '',
      companyName: '',
      usersRole: {
        QUALITICIEN: '',
        CHEFDEQUALITE: '',
        CHEFDELOT: '',
        // 'TECHNICIENDETRAVAUX': ''
      }
    },
    file: null
  });
  const stepComponents = [
    // <Step0 allowed={allowed} mainObject={mainObject} setMainObject={setMainObject} />,
    <Step1 allowed={allowed} mainObject={mainObject} setMainObject={setMainObject} setAllowed={setAllowed}/>,
    <Step2 allowed={allowed} mainObject={mainObject} setMainObject={setMainObject} setAllowed={setAllowed}/>
  ];

  const totalSteps = () => steps.length;
  const completedSteps = () => Object.keys(completed).length;
  const isLastStep = () => activeStep === totalSteps() - 1;
  const allStepsCompleted = () => completedSteps() === totalSteps();
  
  const handleNext = () => {
    const newActiveStep =
      !isLastStep() && (allowed.includes(activeStep)) ? activeStep+1 : activeStep;
    if(allowed.includes(activeStep)){
    setCompleted((prevCompleted) => ({ ...prevCompleted, [activeStep]: true }));
    }
    setActiveStep(newActiveStep);
  };

  const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);
  // const handleStep = (step) => () => setActiveStep(step);
  // const handleComplete = () => {
  //   setCompleted((prevCompleted) => ({ ...prevCompleted, [activeStep]: true }));
  //   handleNext();
  // };
  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent : 'space-between',width: '100%', height: '100%' }}>
      <Box sx={{ flex: '0 0 15%' }}>
        <Stepper nonLinear activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepButton color="inherit" >
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
      </Box>

      <Box sx={{ flex: '0 0 70%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {stepComponents[activeStep]}
      </Box>

      <Box sx={{ flex: '0 0 15%', display: 'flex', flexDirection: 'row', pt: 2 }}>
        <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 , height: 'fit-content'}}>
          précedent
        </Button>
        <Box sx={{ flex: '1 1 auto' }} />
        {!isLastStep() ? 
        (<Button onClick={handleNext} sx={{ mr: 1 , height: 'fit-content' }}>
          Suivant
        </Button>) 
        : (
          <Button  sx={{ mr: 1 , height: 'fit-content' }} onClick={()=>{handleFinishClick(mainObject)}} disabled={loadingfetch}>
          Finir
        </Button>
        )
        }
        {/* {
          completed.hasOwnProperty(activeStep) && !isLastStep() && (
          <Button  sx={{ mr: 1 }}>
            Reset
          </Button>
          ) */}
        {/* } */}
        {/* {activeStep !== steps.length && (
          completed[activeStep] ? (
            <Typography variant="caption" sx={{ display: 'inline-block' }}>
              Step {activeStep + 1} already completed
            </Typography>
          ) : (
            <Button onClick={handleComplete}>
              {completedSteps() === totalSteps() - 1 ? 'Finish' : 'Complete Step'}
            </Button>
          )
        )} */}
        {loadingfetch && <CircularProgress size={24} sx={{ ml: 2 }} />}
      </Box>
    </Box>
  );
}
