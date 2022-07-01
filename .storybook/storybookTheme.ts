import { create } from '@storybook/theming';

export const storybookTheme = create({
  base: 'light',

  colorPrimary: '#3dbd7d',
  colorSecondary: '#5678a4',

  // UI
  appBg: '#f5f7fa',
  appContentBg: '#f5f7fa',
  appBorderColor: '#b0b0ba',
  appBorderRadius: 4,

  // Typography
  fontBase: '"Nunito Sans", sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: '#12243C',
  textInverseColor: 'rgba(255,255,255,0.9)',

  // Toolbar default and active colors
  barTextColor: '#12243C',
  barSelectedColor: '#3dbd7d',
  barBg: '#f5f7fa',

  // Form colors
  inputBg: 'white',
  inputBorder: '#b0b0ba',
  inputTextColor: '#12243C',
  inputBorderRadius: 4,
});
