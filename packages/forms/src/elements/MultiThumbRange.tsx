/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { useEffect, useRef, useContext, forwardRef, HTMLAttributes } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';
import { useSlider } from '@zendeskgarden/container-slider';
import { useDocument, useText } from '@zendeskgarden/react-theming';
import { IMultiThumbRangeProps } from '../types';
import {
  StyledSlider,
  StyledSliderTrack,
  StyledSliderTrackRail,
  StyledSliderThumb
} from '../styled';
import useFieldContext from '../utils/useFieldContext';

const MIN = 0;
const MAX = 100;

/**
 * @extends HTMLAttributes<HTMLDivElement>
 */
export const MultiThumbRange = forwardRef<HTMLDivElement, IMultiThumbRangeProps>(
  (
    {
      min = MIN,
      max = MAX,
      minValue,
      maxValue,
      minLabel,
      maxLabel,
      disabled,
      step,
      jump,
      onChange,
      onMouseDown,
      ...props
    },
    ref
  ) => {
    const theme = useContext(ThemeContext);
    const environment = useDocument(theme);
    const trackRailRef = useRef<HTMLDivElement>(null);
    const minThumbRef = useRef<HTMLDivElement>(null);
    const maxThumbRef = useRef<HTMLDivElement>(null);
    const {
      getTrackProps,
      getMinThumbProps,
      getMaxThumbProps,
      trackRect,
      minValue: updatedMinValue,
      maxValue: updatedMaxValue
    } = useSlider({
      trackRef: trackRailRef,
      minThumbRef,
      maxThumbRef,
      min,
      max,
      minValue,
      maxValue,
      onChange,
      step,
      jump,
      disabled,
      rtl: theme.rtl,
      environment
    });
    const { onMouseDown: onSliderMouseDown, ...trackProps } = getTrackProps({ onMouseDown });
    const fieldContext = useFieldContext();
    const { isLabelHovered, isLabelActive, multiThumbRangeRef } = fieldContext || {};

    useEffect(() => {
      if (multiThumbRangeRef) {
        multiThumbRangeRef.current = minThumbRef.current;
      }
    }, [multiThumbRangeRef]);

    const minPosition = ((updatedMinValue - min) / (max - min)) * trackRect.width;
    const maxPosition = ((updatedMaxValue - min) / (max - min)) * trackRect.width;
    const sliderBackgroundSize = Math.abs(maxPosition) - Math.abs(minPosition);

    const minAriaLabel = useText(MultiThumbRange, { minLabel }, 'minLabel', 'Minimum value');
    const maxAriaLabel = useText(MultiThumbRange, { maxLabel }, 'maxLabel', 'Maximum value');

    return (
      <StyledSlider ref={ref} data-test-id="slider" onMouseDown={onSliderMouseDown} {...props}>
        <StyledSliderTrack
          backgroundSize={sliderBackgroundSize}
          backgroundPosition={theme.rtl ? trackRect.width - maxPosition : minPosition}
          data-test-id="track"
          isDisabled={disabled}
        >
          <StyledSliderTrackRail
            data-test-id="rail"
            {...(trackProps as HTMLAttributes<HTMLDivElement>)}
            ref={trackRailRef}
          >
            <StyledSliderThumb
              data-test-id="thumb"
              {...(getMinThumbProps({
                'aria-label': minAriaLabel
              }) as HTMLAttributes<HTMLDivElement>)}
              isDisabled={disabled}
              position={minPosition}
              ref={minThumbRef}
              data-garden-active={isLabelActive}
              data-garden-hover={isLabelHovered}
            />
            <StyledSliderThumb
              data-test-id="thumb"
              {...(getMaxThumbProps({
                'aria-label': maxAriaLabel
              }) as HTMLAttributes<HTMLDivElement>)}
              isDisabled={disabled}
              position={maxPosition}
              ref={maxThumbRef}
            />
          </StyledSliderTrackRail>
        </StyledSliderTrack>
      </StyledSlider>
    );
  }
);

MultiThumbRange.displayName = 'MultiThumbRange';

MultiThumbRange.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
  step: PropTypes.number,
  jump: PropTypes.number,
  disabled: PropTypes.bool,
  onChange: PropTypes.func
};

MultiThumbRange.defaultProps = {
  min: MIN,
  max: MAX,
  step: 1
};
