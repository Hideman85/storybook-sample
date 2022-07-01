module.exports = {
  sourceType: 'unambiguous',
  presets: [
    [
      require.resolve('@babel/preset-react'),
      {
        runtime: 'automatic',
      },
    ],
    //  Disable for now looks incompatible with vite ecosystem
    // TODO: Production build find a way to compile code for supporting last 2 years browsers releases
    // [
    //   require.resolve('@babel/preset-env'),
    //   {
    //     targets: 'last 2 years',
    //     useBuiltIns: 'usage',
    //     corejs: '3',
    //     shippedProposals: true,
    //     loose: true,
    //     // modules: false,
    //   },
    // ],
    [
      require.resolve('@babel/preset-typescript'),
      {
        isTSX: true,
        allExtensions: true,
      },
    ],
  ],
  plugins: [
    //  Required stuff
    [require.resolve('@babel/plugin-proposal-class-properties'), { loose: true }],
    [require.resolve('@babel/plugin-proposal-private-methods'), { loose: true }],
    [require.resolve('@babel/plugin-proposal-private-property-in-object'), { loose: true }],
    //  Testing coverage
    process.env.STORYBOOK_TESTING && [
      'babel-plugin-istanbul',
      {
        include: ['packages/*/src/**'],
        exclude: [
          '**/*.d.ts',
          '**/*{.,-}{spec,stories,index.export,types}.{ts,tsx}'
        ],
      },
    ],
  ].filter(Boolean),
};
