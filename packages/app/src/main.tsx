// eslint-disable-next-line promise/catch-or-return,promise/always-return
Promise.all([import('./Root'), import('./App')]).then(([{ default: render }, { default: App }]) => {
  render(App);
});

// ts(1208)
export {};
