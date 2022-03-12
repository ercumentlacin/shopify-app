import { useEffect, useState } from 'react';
import services from 'services';
import { IProducts } from 'types/products';
import useMount from './useMount';

export default function useProducts() {
  const [products, setProducts] = useState<IProducts>([]);
  const [error, setError] = useState(false);

  const isMounted = useMount();

  useEffect(() => {
    services.getAllProducts()
      .then((response) => {
        const { data: { products: data } } = response;
        if (isMounted()) setProducts(data);
      })
      .catch((err) => setError(err));
  }, []);

  return {
    products,
    error,
  };
}
