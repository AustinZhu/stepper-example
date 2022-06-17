import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Stepper from './Stepper';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Example/Stepper',
    component: Stepper,
} as ComponentMeta<typeof Stepper>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Stepper> = (args) => <Stepper {...args} />;

export const Example = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Example.args = {
    steps: [
        {label: '已提交', status: '-', datetime: new Date()},
        {label: 'Risk初审', datetime: new Date()},
        {label: '资料审查'},
        {label: '姓名审查'},
        {label: 'AML审查'},
        {label: 'Risk复审'}
    ],
    activeStep: 2,
};
