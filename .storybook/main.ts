// eslint-disable-next-line import/no-import-module-exports
import type { StorybookViteConfig } from '@storybook/builder-vite';

const { loadConfigFromFile } = require('vite');

const config: StorybookViteConfig = {
  stories: ['../packages/*/@(src|stories)/**/*.stories.@(ts|tsx|mdx)'],
  addons: [
    'storybook-addon-designs',

    /// //////////////////////////////////////////////////////////////
    //  Basically '@storybook/addon-essentials' but reordered
    '@storybook/addon-actions',
    '@storybook/addon-interactions', // Added
    '@storybook/addon-controls',

    {
      name: '@storybook/addon-docs',
      options: {
        configureJSX: true,
        babelOptions: {},
        sourceLoaderOptions: null,
        transcludeMarkdown: true,
      },
    },

    //  Dev accessories
    '@storybook/addon-viewport',
    '@storybook/addon-toolbars',
    '@storybook/addon-measure',
    '@storybook/addon-outline',
    '@storybook/addon-links',
    'storybook-mobile', //  Add great information for mobile devices
    //
    /// //////////////////////////////////////////////////////////////

    //  playwright addon fully buggy today
    // "@storybook/addon-knobs",
    // "storybook-addon-playwright/preset",
    // "storybook-addon-playwright/register",
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-vite',
    disableTelemetry: true,
    enableCrashReports: true,
  },
  features: {
    buildStoriesJson: true,
    interactionsDebugger: true,

    previewCsfV3: true,
    previewMdx2: true,

    babelModeV7: false,
    argTypeTargetsV7: true,
    breakingChangesV7: true,
    storyStoreV7: !global.navigator?.userAgent?.match?.('jsdom'),

    modernInlineRender: true,
  },

  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop: any) =>
        prop.parent && /node_modules/.test(prop.parent.fileName)
          ? //  Filter out too generic properties inherited from DOM
            !/^(aria-|form|item|dangerouslySetInnerHTML|on.+Capture|sx$)/.test(prop.name)
          : true,
    },
  },

  async viteFinal(conf) {
    const { mergeConfig } = await import('vite');
    const { config: viteConfig } = await loadConfigFromFile({ command: 'serve', mode: 'development' }, 'vite.config.ts');

    //  Remove old react vite config
    if (conf.plugins) {
      const idx = conf.plugins.findIndex(
        (elm) => Array.isArray(elm) && ['vite:react-babel', 'vite:react-refresh', 'vite:react-jsx'].includes((elm[0] as any).name),
      );
      conf.plugins.splice(idx, 1);
    }

    //  Merge configs
    const final: typeof conf = mergeConfig(conf, viteConfig);

    //  Preload additional extensions
    final.optimizeDeps?.include?.push(
      '@storybook/jest',
      '@storybook/theming',
      '@storybook/components',
      '@storybook/react/dist/esm/client/preview/config',
      '@storybook/react/dist/esm/client/docs/config',
      '@storybook/addon-actions/preview.js',
      '@storybook/addon-interactions/preview.js',
      '@storybook/addon-docs/preview.js',
      '@storybook/addon-measure/preview.js',
      '@storybook/addon-outline/preview.js',
      '@storybook/addon-links/preview.js',
    );

    return final;
  },
};

module.exports = config;
