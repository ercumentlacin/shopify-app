/* eslint-disable no-unused-vars */
import { render } from '@testing-library/react';
import Spinner from 'components/Spinner/Spinner';
import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

type RenderWithRouter = (ui: React.ReactElement, { route }: {route?: string}) => any;

export const renderWithRouter: RenderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return render(ui, { wrapper: BrowserRouter });
};

type RenderWithSuspenseAndRouter = (ui: JSX.Element | any, { route }: {route?: string}) => any;

export const renderWithSuspenseAndRouter: RenderWithSuspenseAndRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return render(
    <Suspense fallback={<Spinner />}>
      {ui}
    </Suspense>,
    { wrapper: BrowserRouter },
  );
};
