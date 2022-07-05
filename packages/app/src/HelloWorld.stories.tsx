import { ComponentMeta, ComponentStoryObj } from '@storybook/react';

import {HelloWorld} from './App';
import {userEvent, within} from "@storybook/testing-library";
import {expect} from "@storybook/jest";

export default {
  component: HelloWorld,
} as ComponentMeta<typeof HelloWorld>;

type Story = ComponentStoryObj<typeof HelloWorld>;

export const Playground: Story = {
  play: async ({ canvasElement, args }) => {
    expect('Begin').toStrictEqual('Begin');

    const btn = await within(canvasElement).getByRole('button');
    await userEvent.click(btn);
    //  This is a jest.fn() provided automatically by addons-actions
    expect(args.onClick).toHaveBeenCalled();

    expect('End').toStrictEqual('End');
  }
};
