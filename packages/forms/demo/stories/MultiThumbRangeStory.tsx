/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import { Story } from '@storybook/react';
import { IMultiThumbRangeProps, MultiThumbRange, Fieldset, Hint } from '@zendeskgarden/react-forms';
import { FieldStory, IFieldArgs } from './FieldStory';

interface IArgs extends IMultiThumbRangeProps, IFieldArgs {
  legend: string;
  isLegendHidden: boolean;
}

export const MultiThumbRangeStory: Story<IArgs> = ({
  // legend,
  // isLegendHidden,
  label,
  isLabelHidden,
  hasHint,
  hint,
  hasMessage,
  message,
  validationLabel,
  ...args
}) => (
  <Fieldset {...args}>
    <Fieldset.Legend hidden={isLabelHidden}>{label}</Fieldset.Legend>
    {hasHint && <Hint>{hint}</Hint>}
    <FieldStory
      // label={label}
      // isLabelRegular={isLabelRegular}
      // isLabelHidden={isLabelHidden}
      hasLabel={false}
      hasHint={false}
      hint={hint}
      hasMessage={hasMessage}
      message={message}
      validation={args.validation}
      validationLabel={validationLabel}
    >
      <MultiThumbRange {...args} />
    </FieldStory>
  </Fieldset>
);
