import usePagination from 'hooks/usePagination';
import { useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Variant, IProducts } from 'types/products';

interface IProps {
  data: IProducts
  searchQuery: string
  onSearch: (params: string) => void
}

export default function Table({ data, searchQuery, onSearch }: IProps) {
  const copyData = [...data];
  const navigate = useNavigate();
  const params = useParams();

  if (Object.hasOwnProperty.call(params, 'productId')) {
    const { productId } = params;
    data = copyData.filter(({ id }) => id === Number(productId));
  }

  if (searchQuery) {
    data = copyData.filter(({ title }) => title.toLowerCase().includes(searchQuery.toLowerCase()));
  }

  const {
    currentProducts, currentPage, setCurrentPage, totalPages,
  } = usePagination({ data });

  const theads = ['Image', 'Title', 'Price', 'Status', 'Variants', 'Actions'];

  function onClickDetail(id: number) {
    onSearch('');
    navigate(`/products/${id}`);
  }

  const renderTheads = useCallback(
    () => theads.map((item) => <th key={item}>{item}</th>),
    [],
  );

  const renderVariants = ({ title }: Variant) => title;

  const renderTbody = useCallback(
    () => currentProducts.map((item) => (
      <tr key={item.id}>
        <td>
          <img src={item.image.src} alt={item.title} />
        </td>
        <td>{item.title}</td>
        <td>{item.variants[0].price}</td>
        <td>{item.status}</td>
        <td>{item.variants.map(renderVariants).join(', ')}</td>
        <td><button type="button" onClick={() => onClickDetail(item.id)}>Detail</button></td>
      </tr>
    )),
    [currentProducts],
  );

  const renderTfoot = useCallback(
    () => (
      <tr>
        <td colSpan={theads.length}>
          <button disabled={currentPage === 1} type="button" onClick={() => currentPage !== 1 && setCurrentPage(currentPage - 1)}>
            Previous
          </button>
          <button disabled={currentPage === totalPages} type="button" onClick={() => currentPage !== totalPages && setCurrentPage(currentPage + 1)}>
            Next
          </button>
        </td>
      </tr>
    ),
    [currentPage, setCurrentPage],
  );

  if (!currentProducts.length) return null;

  return (
    <table className="table">
      <thead><tr>{renderTheads()}</tr></thead>
      <tbody>{renderTbody()}</tbody>
      <tfoot>{renderTfoot()}</tfoot>
    </table>
  );
}
