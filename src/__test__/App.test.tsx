import {
  fireEvent,
  render, screen, waitFor, within,
} from '@testing-library/react';
import App from 'App';
import Spinner from 'components/Spinner/Spinner';
import { Suspense } from 'react';
import { MemoryRouter } from 'react-router-dom';

import { rest } from 'msw';
import { setupServer } from 'msw/node';

import modelProduct from 'assets/models/product.json';

const server = setupServer(
  rest.get('/products', (req, res, ctx) => res(
    ctx.status(200),
    ctx.json({
      products: modelProduct,
    }),
  )),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

let ComponentWithWrapper: JSX.Element;

beforeEach(() => {
  ComponentWithWrapper = (
    <Suspense fallback={<Spinner />}>
      <App />
    </Suspense>
  );
});

describe('App', () => {
  it('should render with spinner', () => {
    render(ComponentWithWrapper, { wrapper: MemoryRouter });

    const [spinnerImg] = screen.getAllByRole('img') as HTMLImageElement[];
    expect(spinnerImg).toHaveAttribute('src', 'spinner.svg');
  });

  it('should be able to fetch correctly', async () => {
    render(ComponentWithWrapper, { wrapper: MemoryRouter });

    await waitFor(() => screen.getByRole('img', {
      name: /12 ti xelium skis/i,
    }));
    expect(screen.getByRole('img', {
      name: /12 ti xelium skis/i,
    })).toBeInTheDocument();
  });

  it('handles server error', async () => {
    server.use(
      rest.get('/products', (req, res, ctx) => res(ctx.status(500))),
    );

    render(ComponentWithWrapper, { wrapper: MemoryRouter });

    await waitFor(() => screen.getByText(/sorry, something went wrong/i));
    expect(screen.getByText(/sorry, something went wrong/i)).toBeInTheDocument();
  });

  it('when the detail button is clicked, it should be able to go to the product page', async () => {
    render(ComponentWithWrapper, { wrapper: MemoryRouter });

    await waitFor(() => screen.getByRole('row', {
      name: /12 ti xelium skis 12 ti xelium skis 299\.00 active 163cm detail/i,
    }));

    const row = screen.getByRole('row', {
      name: /12 ti xelium skis 12 ti xelium skis 299\.00 active 163cm detail/i,
    });
    const detailButton = within(row).getByRole('button', { name: /detail/i });

    expect(detailButton).toBeInTheDocument();

    const productId = '7550807507163';

    fireEvent.click(detailButton);

    await waitFor(() => screen.getByRole('heading', { name: /12 ti xelium skis/i }));

    expect(screen.getByRole('heading', { name: /12 ti xelium skis/i })).toBeInTheDocument();
  });
});
