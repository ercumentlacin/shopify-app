import { useState, useEffect, useMemo } from 'react';
import { IProducts } from 'types/products';

interface IProps {
  data: IProducts
}

export default function usePagination({ data }: IProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);

  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  const totalPages = useMemo(() => Math.ceil(data.length / productsPerPage), [data]);

  const indexOfLastProduct = useMemo(
    () => currentPage * productsPerPage,
    [currentPage, productsPerPage],
  );

  const indexOfFirstProduct = useMemo(
    () => indexOfLastProduct - productsPerPage,
    [indexOfLastProduct, productsPerPage],
  );

  const currentProducts = useMemo(
    () => data.slice(indexOfFirstProduct, indexOfLastProduct),
    [data, indexOfFirstProduct, indexOfLastProduct],
  );

  return {
    currentProducts, currentPage, setCurrentPage, totalPages,
  };
}
