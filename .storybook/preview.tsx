import { storybookTheme } from './storybookTheme';

export { decorators } from './decorators';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
    expanded: true,
  },
  docs: {
    theme: storybookTheme,
  },
  options: {
    // See https://github.com/storybookjs/storybook/issues/548#issuecomment-1099949201
    storySort: function storySort(a, b) {
      return a.title === b.title ? 0 : a.id.localeCompare(b.id, undefined, { numeric: true });
    },
  },
};

// https://storybook.js.org/docs/react/essentials/toolbars-and-globals#advanced-usage
export const globalTypes = {
  interaction: {
    name: 'Test Interaction',
    description: 'Test Interaction',
    defaultValue: process.env.STORYBOOK_TESTING ? 'test' : 'demo',
    toolbar: {
      icon: 'play',
      items: [
        {
          value: 'demo',
          title: 'Demo mode',
        },
        {
          value: 'test',
          title: 'Test Mode',
        },
      ],
      showName: true,
      dynamicTitle: true,
    },
  },
};
