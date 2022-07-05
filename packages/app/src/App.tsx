import React, {useCallback} from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

//  Typing just for testing with storybook
export const HelloWorld: React.FC<{ number?: number, string?: string, boolean?: boolean, onClick?: () => void }> = ({ onClick }) => (
  <>
    <h1>Hello world</h1>
    <p><Link to='/editor'>Editor</Link></p>
    <button onClick={onClick}>Click me</button>
  </>
);

export const Editor: React.FC<{ initialValue?: string, onChange?: (val: string) => void }> = ({ initialValue: __html, onChange }) => (
  <div
    id="editor"
    contentEditable
    onInput={useCallback(evt => onChange?.((evt.target as HTMLDivElement).innerHTML), [onChange])}
    //  Emulate an initialValue
    dangerouslySetInnerHTML={React.useMemo(() => __html ? ({__html}) : undefined, [__html])}
    style={{ border: '1px solid black', padding: '0.5rem 1rem' }}
  ></div>
);

const App = () => (
  <>
    <BrowserRouter basename={import.meta.env.BASE_URL || undefined}>
      <Routes>
        <Route path='/' element={<HelloWorld />} />
        <Route path='/editor' element={<Editor initialValue='<p>Hello world</p>' />} />
      </Routes>
    </BrowserRouter>
  </>
);

// eslint-disable-next-line import/no-default-export
export default App
