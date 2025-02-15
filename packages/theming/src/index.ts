/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

export { ThemeProvider } from './elements/ThemeProvider';
export { default as DEFAULT_THEME } from './elements/theme';
export { default as PALETTE } from './elements/palette';
export { default as isRtl } from './utils/isRtl';
export {
  default as retrieveComponentStyles,
  /** `retrieveTheme` is a deprecated usage for v7 compatability */
  default as retrieveTheme
} from './utils/retrieveComponentStyles';
export { default as withTheme } from './utils/withTheme';
export { default as getDocument } from './utils/getDocument';
export { default as getColor } from './utils/getColor';
export { default as getLineHeight } from './utils/getLineHeight';
export { default as mediaQuery } from './utils/mediaQuery';
export { default as arrowStyles } from './utils/arrowStyles';
export { useDocument } from './utils/useDocument';
export { useText } from './utils/useText';
export { default as menuStyles } from './utils/menuStyles';

export {
  ARROW_POSITION as ARRAY_ARROW_POSITION,
  MENU_POSITION as ARRAY_MENU_POSITION
} from './types';

export type {
  IGardenTheme,
  IThemeProviderProps,
  ArrowPosition as ARROW_POSITION,
  MenuPosition as MENU_POSITION
} from './types';
