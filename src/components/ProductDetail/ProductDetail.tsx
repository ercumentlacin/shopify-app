/* eslint-disable max-len */
/* eslint-disable no-unreachable */
/* eslint-disable react/require-default-props */
/* eslint-disable react/no-danger */
import useProducts from 'hooks/useProducts';
import { lazy, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IProducts, IProduct } from 'types/products';

const ErrorPage = lazy(() => import('components/ErrorPage'));
const Spinner = lazy(() => import('components/Spinner'));

interface IProps {
  data?: IProducts
}

export default function ProductDetail({ data }: IProps) {
  const params = useParams();
  const [detail, setDetail] = useState({} as IProduct | undefined);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(!((data && data.length > 0)));
  const [initData, setInitData] = useState(data || []);

  const {
    products,
    error: e,
  } = useProducts();

  useEffect(() => {
    if (data && data.length > 0) {
      setIsLoading(false);
      setError(false);
    } else {
      setIsLoading(true);
    }
  }, [isLoading]);

  useEffect(() => {
    if (isLoading && products && products.length > 0) {
      setInitData(products);
      setError(false);
      setIsLoading(false);
    }
  }, [isLoading, products.length]);

  useEffect(() => {
    if (Object.hasOwnProperty.call(params, 'productId') && !error && initData && !isLoading) {
      const { productId } = params;
      const filteredData = initData.find(({ id }) => +id === Number(productId));

      if (typeof filteredData !== 'undefined') {
        setError(false);
        setDetail(filteredData);
      } else {
        setError(true);
      }

      setIsLoading(false);
    }
  }, [initData, isLoading]);

  if (isLoading && !products.length) return <Spinner />;

  if (detail === undefined || error || !detail?.title) return <ErrorPage />;

  return (
    <div className="product-detail">
      <div className="product-detail__image">
        <img src={detail.image.src} alt={detail.title} />
      </div>

      <div className="product-detail__info">
        <h1 className="product-detail__info__title">
          {detail.title}
        </h1>
        <div className="product-detail__info__description" dangerouslySetInnerHTML={{ __html: detail.body_html }} />
        <div className="product-detail__info__price">
          <strong>Price:</strong>
          {' '}
          {detail.variants[0].price}
        </div>
        <div className="product-detail__info__status">
          <strong>Status:</strong>
          {' '}
          {detail.status}
        </div>
        <div className="product-detail__info__vendor">
          <strong>Vendor:</strong>
          {' '}
          {detail.vendor}
        </div>
        <div className="product-detail__info__tags">
          <strong>Tag:</strong>
          {detail.tags}
        </div>
        <div className="product-detail__info__variants">
          <strong>Variants:</strong>
          {' '}
          {detail.variants.map(({ title }) => <span key={title}>{title}</span>)}
        </div>
      </div>
    </div>
  );
}
