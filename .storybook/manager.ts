import { addons } from '@storybook/addons';

import { storybookTheme } from './storybookTheme';

addons.setConfig({
  isFullscreen: false,
  showNav: true,
  showPanel: true,
  panelPosition: 'bottom',
  enableShortcuts: false,
  showToolbar: true,
  theme: storybookTheme,
  selectedPanel: 'STORYBOOK_ADDON_DESIGNS/panel',
  initialActive: 'sidebar',
  toolbar: {
    title: { hidden: false },
    zoom: { hidden: false },
    eject: { hidden: false },
    copy: { hidden: false },
    fullscreen: { hidden: false },
  },
});
