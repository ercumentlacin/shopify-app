import { render } from 'react-dom';

import { BrowserRouter } from 'react-router-dom';

import 'scss/main.scss';
import Spinner from 'components/Spinner';
import { Suspense, lazy } from 'react';

const App = lazy(() => import('./App'));

const root = document.getElementById('root');

render(
  <BrowserRouter>
    <Suspense fallback={<Spinner />}><App /></Suspense>
  </BrowserRouter>,
  root,
);
