/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { useEffect, useState } from 'react';
import { Story } from '@storybook/react';
import StartIcon from '@zendeskgarden/svg-icons/src/16/search-stroke.svg';
import EndIcon from '@zendeskgarden/svg-icons/src/16/leaf-stroke.svg';
import {
  Combobox,
  IComboboxProps,
  IDropdownProps,
  IMenuProps
} from '@zendeskgarden/react-dropdowns';
import { DropdownFieldStory } from './DropdownFieldStory';
import { IMenuItem } from './types';

interface IArgs extends IComboboxProps {
  downshiftProps?: IDropdownProps['downshiftProps'];
  inputValue: IDropdownProps['inputValue'];
  onInputValueChange: IDropdownProps['onInputValueChange'];
  onStateChange: IDropdownProps['onStateChange'];
  isOpen?: IDropdownProps['isOpen'];
  label?: string;
  isLabelRegular?: boolean;
  isLabelHidden?: boolean;
  isAutocomplete?: boolean;
  hasHint?: boolean;
  hint?: string;
  hasMessage?: boolean;
  message?: string;
  items: IMenuItem[];
  placement: IMenuProps['placement'];
}

export const ComboboxStory: Story<IArgs> = ({
  label,
  isLabelRegular,
  isLabelHidden,
  hasHint,
  hint,
  hasMessage,
  message,
  downshiftProps,
  onSelect,
  inputValue,
  onInputValueChange,
  onStateChange,
  isAutocomplete,
  isOpen,
  placement,
  start,
  end,
  items,
  ...args
}) => {
  const [filteredItems, setFilteredItems] = useState(items);

  useEffect(
    () =>
      setFilteredItems(
        isAutocomplete
          ? items.filter(item => item.text.match(new RegExp(inputValue!, 'gui')))
          : items
      ),
    [isAutocomplete, items, inputValue]
  );

  return (
    <DropdownFieldStory
      dropdownProps={{
        downshiftProps,
        inputValue,
        onSelect,
        onInputValueChange,
        onStateChange,
        isOpen
      }}
      label={label}
      isLabelRegular={isLabelRegular}
      isLabelHidden={isLabelHidden}
      hasHint={hasHint}
      hint={hint}
      hasMessage={hasMessage}
      message={message}
      validation={args.validation}
      menuProps={{ isCompact: args.isCompact, placement }}
      items={
        filteredItems.length === 0
          ? [{ text: 'No matches found', value: null, disabled: true }]
          : filteredItems
      }
      itemProps={{ disabled: args.disabled }}
    >
      <Combobox
        {...args}
        isAutocomplete={isAutocomplete}
        start={start ? <StartIcon /> : undefined}
        end={end ? <EndIcon /> : undefined}
      />
    </DropdownFieldStory>
  );
};
