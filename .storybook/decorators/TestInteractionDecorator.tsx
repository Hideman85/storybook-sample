import { userEvent } from '@storybook/testing-library';

export function wait(ms: number): Promise<void> {
  // @ts-ignore
  if (global.test) {
    return new Promise((resolve) => {
      resolve(undefined);
    });
  }
  return new Promise((resolve) => {
    // animate mouse pointer from previous to current element
    setTimeout(resolve, ms);
  });
}

export async function mouseTo(target: Element, delay = 1500) {
  if (!!global.test || !target) {
    return new Promise((resolve) => {
      resolve(undefined);
    });
  }
  return new Promise((resolve) => {
    // animate mouse pointer from previous to current element
    let cursorEl = document.getElementById('demoCursor');
    if (!cursorEl) {
      cursorEl = document.createElement('div');
      cursorEl.id = 'demoCursor';
      cursorEl.addEventListener(
        'transitionend',
        () => {
          if (cursorEl) {
            cursorEl.className = 'hide';
            setTimeout(() => {
              if (cursorEl) {
                cursorEl.style.top = `${Math.round(document.body.offsetHeight / 2)}px`;
                cursorEl.style.left = `${Math.round(document.body.offsetWidth / 2)}px`;
              }
            }, Math.round(delay * 0.2));
          }
          target.dispatchEvent?.(new MouseEvent('mouseover', { view: window, bubbles: true, cancelable: true }));
        },
        { capture: true },
      );

      document.body.appendChild(cursorEl);
    }

    if (!target.getBoundingClientRect) {
      // eslint-disable-next-line no-console
      console.log('target does not have getBoundingClientRect', target);
      resolve(undefined);
    } else {
      const { left, top, width, height } = target.getBoundingClientRect();
      const sTop = `${Math.round(top + Math.min(height / 2, 100))}px`;
      const sLeft = `${Math.round(left + Math.min(width / 2, 100))}px`;

      cursorEl.className = 'moving';
      cursorEl.style.top = sTop;
      cursorEl.style.left = sLeft;
      cursorEl.style.transitionDuration = `${Math.round(delay * 0.8)}ms`;
      // ^ bakes in a 10% time delay from movement ending to click event

      setTimeout(resolve, delay);
    }
  });
}

const { click } = userEvent;

export async function animatedUserEventClick(target: Element, delay = 1500) {
  await mouseTo(target, delay);
  return click(target);
}

export const TestInteractionDecorator = (Story, { globals }) => {
  // @ts-ignore
  userEvent.click = globals.interaction === 'demo' ? (animatedUserEventClick as any) : click;

  return <Story />;
};
