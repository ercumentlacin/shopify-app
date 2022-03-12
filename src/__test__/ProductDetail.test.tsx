import {
  render, screen, waitFor, waitForElementToBeRemoved,
} from '@testing-library/react';
import ProductDetail from 'components/ProductDetail';
import { renderWithSuspenseAndRouter } from 'utils/test';

import { Suspense } from 'react';
import Spinner from 'components/Spinner';
import {
  MemoryRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { server } from 'mocks/server';
import { rest } from 'msw';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

let ComponentWithWrapper: JSX.Element;

beforeEach(() => {
  ComponentWithWrapper = (
    <Suspense fallback={<Spinner />}>
      <MemoryRouter initialEntries={['/products/7550807507163']}>
        <Routes>
          <Route path="products/:productId" element={<ProductDetail />} />
        </Routes>
      </MemoryRouter>
    </Suspense>
  );
});

describe('ProductDetail', () => {
  it('should render ProductDetail with spinner', () => {
    renderWithSuspenseAndRouter(<ProductDetail />, {
      route: '/products/7550807507163',
    });

    expect(screen.getByRole('img', { name: /spinner/i })).toBeInTheDocument();
  });

  it('should render ProductDetail with product', async () => {
    render(ComponentWithWrapper);

    expect(screen.getByRole('img', { name: /spinner/i })).toBeInTheDocument();

    await waitForElementToBeRemoved(() => screen.getByRole('img', { name: /spinner/i }));

    expect(screen.getByRole('heading', {
      name: /12 ti xelium skis/i,
    })).toBeInTheDocument();

    expect(screen.queryByRole('img', { name: /spinner/i })).not.toBeInTheDocument();
  });

  it('handles server error', async () => {
    server.use(
      rest.get('/products', (req, res, ctx) => res(ctx.status(500))),
    );

    render(ComponentWithWrapper);
    await waitForElementToBeRemoved(() => screen.getByRole('img', { name: /spinner/i }));
    await waitFor(() => screen.getByText(/sorry, something went wrong/i));
    expect(screen.getByText(/sorry, something went wrong/i)).toBeInTheDocument();
  });
});
