import logo from 'assets/svg/logo.svg';
import { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface IProps {
  // eslint-disable-next-line no-unused-vars
  onSearch: (params: string) => void;
}

export default function Header({ onSearch }: IProps) {
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const search = formData.get('search');
    const params = new URLSearchParams();

    e.currentTarget.reset();

    if (!search) {
      params.delete('search');
      onSearch('');
      navigate('/');
    } else {
      const { href } = window.location;
      if (href.includes('products')) {
        navigate(`/?search=${search}`);
      } else {
        params.append('search', search.toString());
        onSearch(search.toString());
      }
    }
  };

  return (
    <header className="header">
      <Link to="/" className="header__brand">
        <img className="header__brand__logo" src={logo} alt="Prodorp" loading="lazy" />
        <span className="header__brand__name">Prodorp</span>
      </Link>

      <form className="header__search-area" onSubmit={handleSubmit}>
        <label htmlFor="search" aria-hidden="true" aria-labelledby="search" />
        <input id="search" name="search" className="header__search-area__input" type="text" placeholder="🔍    Search any product" />
        <button className="header__search-area__button" type="submit">
          Search
        </button>
      </form>
    </header>
  );
}
