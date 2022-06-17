import { Stepper, Step, StepLabel, StepContent, Typography, Paper, Button, Stack, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { CircleOutlined, CheckCircleOutlined } from '@mui/icons-material';
import React from 'react';

const PREFIX = 'Stepper';

const classes = {
  root: `${PREFIX}-root`,
  button: `${PREFIX}-button`,
  actionsContainer: `${PREFIX}-actionsContainer`,
  resetContainer: `${PREFIX}-resetContainer`
};

interface StepLabelProps {
  label: string;
  status?: '-' | '通过' | '未通过' | '未开始' | '进行中';
  datetime?: Date;
}

interface StepperProps {
  steps: StepLabelProps[],
  activeStep?: number,
}

const Root = styled('div')(({ theme }) => ({
  [`&.${classes.root}`]: {
    width: '100%',
  },

  [`& .${classes.button}`]: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },

  [`& .${classes.actionsContainer}`]: {
    marginBottom: theme.spacing(2),
  },

  [`& .${classes.resetContainer}`]: {
    padding: theme.spacing(3),
  }
}));

function getStepContent(step: number) {
  return '';
}

function getStepLabel(step: StepLabelProps) {
  return <Stack direction="row" spacing={2}>
    <Box component='b' sx={{ width: '10em' }}>{step.label}</Box>
    <Box component='b' sx={{ width: '5em' }}>{step.status ?? '未通过'}</Box>
    <Box component='p' sx={{ width: '20em' }}>{step.datetime?.toLocaleString() ?? ''}</Box>
  </Stack>
}

export default function (props: StepperProps) {
  const activeStep = props.activeStep ?? 0;
  const stepLabels = props.steps.map((step, index) => {
    if (!step.status && index < activeStep) {
      step.status = '通过';
    }
    if (!step.status && index === activeStep) {
      step.status = '进行中';
    }
    if (!step.status && index > activeStep) {
      step.status = '未开始';
    }
    return getStepLabel(step);
  });

  const CheckIcon = () => <CheckCircleOutlined color="primary" />;

  return (
    <Root className={classes.root}>
      <h1>KYC Checking Process</h1>
      <Stepper activeStep={activeStep} orientation="vertical">
        {stepLabels.map((label, index) => (
          <Step key={label.key}>
            <StepLabel StepIconComponent={index < activeStep ? CheckIcon : CircleOutlined}>
              {label}
            </StepLabel>
            <StepContent>{getStepContent(index)}</StepContent>
          </Step>
        ))}
      </Stepper>
    </Root>
  );
}
