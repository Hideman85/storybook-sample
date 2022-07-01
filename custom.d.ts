/* eslint-disable import/no-default-export */

//  File extension support
declare module '*.svg?inline' {
  const content: any;
  export default content;
}

declare module '*.svg' {
  const content: any;
  export default content;
}

//  Not working yet
declare module '@storybook/csf' {
  declare type Parameters = {
    routerMock?: {
      path: string;
      url: string;
    };
  };
}

//  From vite, allow us to gather source as text (css injection, story source, ...)
declare module '*?raw' {
  const content: string;
  export default content;
}
