import { Stepper, Step, StepLabel, StepContent, Stack, Box, Collapse } from '@mui/material';
import { styled } from '@mui/material/styles';
import { CircleOutlined, CheckCircleOutlined } from '@mui/icons-material';
import {DateTime} from 'luxon'
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
  content?: JSX.Element;
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

function getStepContent(step: StepLabelProps) {
  return step.content ?? <Box></Box>;
}

function getStepLabel(step: StepLabelProps) {
  const datetime = step.datetime ? DateTime.fromJSDate(step.datetime).toFormat('yyyy-MM-dd HH:mm:ss') : '';
  return <Stack direction="row" spacing={2}>
    <Box component='b' sx={{ width: '10em' }}>{step.label}</Box>
    <Box component='b' sx={{ width: '5em' }}>{step.status ?? '未通过'}</Box>
    <Box component='p' sx={{ width: '20em' }}>{datetime}</Box>
  </Stack>
}

export default function (props: StepperProps) {
  const activeStep = props.activeStep ?? 0;
  const steps = props.steps.map((step, index) => {
    if (!step.status && index < activeStep) {
      step.status = '通过';
    }
    if (!step.status && index === activeStep) {
      step.status = '进行中';
    }
    if (!step.status && index > activeStep) {
      step.status = '未开始';
    }
    return {
      label: getStepLabel(step),
      content: getStepContent(step),
    };
  });

  const CheckIcon = () => <CheckCircleOutlined color="primary" />;

  return (
    <Root className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label.key}>
            <StepLabel StepIconComponent={index < activeStep ? CheckIcon : CircleOutlined}>
              {step.label}
            </StepLabel>
            <StepContent TransitionProps={{ in: true }}>{step.content}</StepContent>
          </Step>
        ))}
      </Stepper>
    </Root>
  );
}
