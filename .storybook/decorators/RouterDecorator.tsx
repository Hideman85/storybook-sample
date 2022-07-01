import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';

/**
 * Provide components routing support with simulated route
 * it renders the component with a mocked history based on the route passed
 *
 * @see https://reactrouterdotcom.fly.dev/docs/en/v6/routers/memory-router
 * @example
 * export const MyStory: Story = {
 *   parameters: {
 *     routerMock: {
 *       path: '/page/:ID',
 *       url: '/page/page-hello-world',
 *     },
 *   },
 * };
 */
export const RouterDecorator: any = (StoryFn, { parameters: { routerMock } }) => {
  // if there's no route config, just return the story in a Router
  if (!routerMock) {
    return (
      <BrowserRouter>
        <StoryFn />
      </BrowserRouter>
    );
  }
  const { path, url } = routerMock;
  return (
    <MemoryRouter initialEntries={[url]}>
      <Routes>
        <Route path={path} element={<StoryFn />} />
      </Routes>
    </MemoryRouter>
  );
};
