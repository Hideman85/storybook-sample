import {ComponentType, StrictMode} from 'react';
import {createRoot} from 'react-dom/client';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

function render(App: ComponentType) {
  root.render(
    <StrictMode>
      <App/>
    </StrictMode>,
  );
}

// eslint-disable-next-line import/no-default-export
export default render;
