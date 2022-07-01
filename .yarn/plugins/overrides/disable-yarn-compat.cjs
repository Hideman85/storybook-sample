//  Why? https://github.com/yarnpkg/berry/issues/2384
//  Compat is a feature of yarn to enable PnP feature for modules that does not support it
//  They patch these modules on the fly but the patch has often a hash conflict on different machine
//  In addition we do not use PnP feature and rather prefer the standard node linker
//  So we can disable manually the compat feature since it is not needed for us and cause us more issues

module.exports = {
  name: `@yarnpkg/plugin-compat`,
  factory: () =>
    // dummy implementation to override the built-in version of this plugin
    ({}),
};
