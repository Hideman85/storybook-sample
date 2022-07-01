import { useState } from 'react';

import { Source } from '@storybook/components';
import { ComponentMeta, ComponentStoryObj } from '@storybook/react';

import { Editor } from './App';
import {userEvent, within} from "@storybook/testing-library";
import {expect} from "@storybook/jest";

export default {
  component: Editor,
} as ComponentMeta<typeof Editor>;

type Story = ComponentStoryObj<typeof Editor>;


//  Helpers


const waitNextFrame = () => new Promise((resolve) => {
  window.requestAnimationFrame(resolve);
});

const clearTextSelection = async (): Promise<Selection> => {
  const selection = window.getSelection()!;
  selection.removeAllRanges();
  await waitNextFrame();
  return selection;
};


const getHelpers = (root: HTMLElement, isDemo: boolean) => ({
  findText: async (text: string, target = root): Promise<Selection> => {
    const selection = await clearTextSelection();

    const offset = target.textContent?.indexOf(text) ?? -1;
    if (offset >= 0) {
      console.info('Target', target, offset)
      target.dispatchEvent(new FocusEvent('focus'));
      await userEvent.pointer([{ keys: '[MouseLeft>]', target, offset }, { offset: offset + text.length }]);
    }

    //  Need to wait the browser update the selection
    await waitNextFrame();

    //  Assert the selection exist
    expect(selection.rangeCount).toStrictEqual(1);
    const range = selection.getRangeAt(0);
    expect(range.toString()).toStrictEqual(text);

    return selection;
  },
  selectEnd: async (target = root) => {
    const selection = await clearTextSelection();

    await userEvent.pointer({
      keys: '[MouseLeft]',
      target,
      offset: target.textContent!.length - 1,
    });

    await waitNextFrame();

    expect(selection.rangeCount).toStrictEqual(1);

    return selection
  },
  type: async (text: string, target = root) => {
    await userEvent.type(target, text, { skipClick: true, delay: isDemo ? 20 : 0 });
  },
})


//  Stories

const Render: typeof Editor = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  const [value, onChange] = useState(props.initialValue);

  return (
    <>
      <Editor {...props} onChange={onChange} />
      <Source dark code={value} language='html' />
    </>
  );
};


export const Playground: Story = {
  args: {
    initialValue: '<p>Hello <strong>world</strong> is <u>beautiful</u></p>',
  },
  render: (props) => <Render {...props} />,
  play: async ({ canvasElement, globals }) => {
    expect('Begin').toStrictEqual('Begin');

    await new Promise(resolve => setTimeout(resolve, 300));
    const isDemo = globals.interaction === 'demo';
    const editor = canvasElement.querySelector('#editor') as HTMLElement;

    //  Helpers
    const { selectEnd, findText, type } = getHelpers(editor, isDemo);

    //  Test
    await findText('Hello world ');
    await type('You are ');

    await selectEnd();
    await type(' :rocket:');

    await findText('beautiful');
    userEvent.paste('awesome', { document: editor.ownerDocument });

    expect('End').toStrictEqual('End');
  }
};
