import {
  lazy, useCallback, useEffect, useState,
} from 'react';

import { Routes, Route } from 'react-router-dom';

import useProducts from 'hooks/useProducts';

const Header = lazy(() => import('components/Layout/Header/Header'));
const Main = lazy(() => import('components/Layout/Main'));
const Table = lazy(() => import('components/Table'));
const ProductDetail = lazy(() => import('components/ProductDetail'));
const ErrorPage = lazy(() => import('components/ErrorPage'));

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const onSearch = useCallback(
    (params: string) => setSearchQuery(params),
    [],
  );

  useEffect(() => {
    if (window.location.search) {
      const search = new URLSearchParams(window.location.search).get('search');
      if (search) {
        setSearchQuery(search);
      }
    } else {
      setSearchQuery('');
    }
  }, [window.location.href]);

  const {
    products,
    error,
  } = useProducts();

  if (error) return <ErrorPage />;

  return (
    <div className="container full-page">
      <Header onSearch={onSearch} />
      <Main>
        <Routes>
          <Route path="/" element={<Table data={products} searchQuery={searchQuery} onSearch={onSearch} />} />
          <Route
            path="products/:productId"
            element={<ProductDetail data={products} />}
          />
        </Routes>
      </Main>
    </div>
  );
}

export default App;
