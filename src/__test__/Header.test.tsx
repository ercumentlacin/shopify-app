import Header from 'components/Layout/Header/Header';
import { render, screen } from '@testing-library/react'
import { Suspense } from 'react';
import Spinner from 'components/Spinner/Spinner';
import { MemoryRouter } from 'react-router-dom';

describe('Header Component', () => {
  // eslint-disable-next-line no-undef
  let ComponentWithWrapper: JSX.Element;
  let onSearch;

  beforeEach(() => {
    onSearch = jest.fn();
    ComponentWithWrapper = (
      <Suspense fallback={<Spinner />}>
        <Header onSearch={onSearch} />
      </Suspense>
    );
  });
  it('should render correctly', () => {
    const onSearch = jest.fn();
    render(ComponentWithWrapper, { wrapper: MemoryRouter });

    const logo = screen.queryByRole('img') as HTMLImageElement;
    expect(logo.getAttribute('alt')).toBe('Prodorp');
  });
});
