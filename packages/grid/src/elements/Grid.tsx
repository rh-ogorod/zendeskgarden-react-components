/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { IGridProps, SPACE } from '../types';
import { GridContext } from '../utils/useGridContext';
import { StyledGrid } from '../styled';

/**
 * @extends HTMLAttributes<HTMLDivElement>
 */
export const Grid = React.forwardRef<HTMLDivElement, IGridProps>(
  ({ columns, debug, ...props }, ref) => {
    const value = useMemo(
      () => ({ columns, gutters: props.gutters!, debug }),
      [columns, props.gutters, debug]
    );

    return (
      <GridContext.Provider value={value}>
        <StyledGrid debug={debug} ref={ref} {...props} />
      </GridContext.Provider>
    );
  }
);

Grid.displayName = 'Grid';

Grid.propTypes = {
  columns: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  gutters: PropTypes.oneOf(SPACE),
  debug: PropTypes.bool
};

Grid.defaultProps = {
  columns: 12,
  gutters: 'md'
};
